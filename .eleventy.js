const { rehypePlugin } = require("@hendotcat/11tyhype")
const { sassPlugin } = require("@hendotcat/11tysass")
const { reactPlugin } = require("@hendotcat/11tysnap")
const markdownIt = require("markdown-it")
const syntaxHighlight = require("@11ty/eleventy-plugin-syntaxhighlight")
const fs = require("fs-extra")
const yaml = require("js-yaml")
const _ = require("lodash")
const { JSDOM } = require("jsdom")
const rehypeMinifyWhitespace = require("rehype-minify-whitespace")
const rehypeUrls = require("rehype-urls")
const sass = require("sass")

module.exports = function(eleventyConfig) {
  console.log("picknmix")

  eleventyConfig.setFrontMatterParsingOptions({
    delims: ["/*---", "---*/"],
  })

  eleventyConfig.addCollection(
    "mixins",
    function(collectionApi) {
      return collectionApi
        .getFilteredByGlob("mixins/*.scss")
        .sort((a, b) =>
          a.data.name > b.data.name ? 1
            : a.data.name < b.data.name ? -1 : 0
        ).map(f => {
          f.data.dependencies = (f.data.dependencies || []).map(name => {
            return collectionApi
              .getFilteredByGlob(`mixins/${name}.scss`)[0]
          })
          return f
        }).map(f => {
          f.data.dependents = collectionApi
            .getFilteredByGlob("mixins/*.scss")
            .filter(g => {
              const names = g.data.dependencies.map(d => d?.data?.name)
              return names.includes(f.data.name)
            })
          return f
        })
    }
  )

  eleventyConfig.addCollection(
    "examples",
    function(collectionApi) {
      const mixins = collectionApi.getFilteredByGlob("mixins/*.scss")
      const examples = []

      mixins.forEach(mixin => {
        (mixin.data.examples || []).forEach(example => {
          examples.push({
            ...example,
            mixin: mixin.data.name,
          })
        })
      })

      return examples
    }
  )

  eleventyConfig.addCollection(
    "readmeSections",
    function() {
      const readmeMarkdown = fs.readFileSync("readme.md", "utf-8")
      const readmeHtml = markdownIt({ html: true }).render(readmeMarkdown)
      const readmeDocument = new JSDOM(readmeHtml)
      const readmeSections = []
      for (const section of readmeDocument.window.document.querySelectorAll("section")) {
        readmeSections.push(section.innerHTML)
      }
      return readmeSections
    }
  )

  eleventyConfig.addPassthroughCopy("picknmix.svg")
  eleventyConfig.addPassthroughCopy("plots/*.svg")
  eleventyConfig.addPassthroughCopy("videos/*.mp4")

  eleventyConfig.addPlugin(syntaxHighlight)
  eleventyConfig.addPlugin(reactPlugin)

  eleventyConfig.addPlugin(sassPlugin, {
    files: [{
      file: "style.scss",
      outFile: "style.[hash].css",
      outputStyle: "compressed",
    }],
    verbose: true,
  })

  eleventyConfig.addPlugin(rehypePlugin, {
    plugins: [
      [rehypeMinifyWhitespace],
      [rehypeUrls, url => {
        if (url.href.startsWith("/") && process.env.GITHUB_ACTIONS) {
          return `https://hen.cat/picknmix/${url.href}`
        }
      }],
    ]
  })

  eleventyConfig.addWatchTarget("picknmix.scss")
  eleventyConfig.addWatchTarget("**/*.scss")

  eleventyConfig.addTemplateFormats("scss")
  eleventyConfig.addExtension("scss", {
    read: false,
    data: true,
    getData: true,
    getInstanceFromInputPath: async (inputPath) => {
      const scss = fs.readFileSync(inputPath, "utf-8")
      const lines = scss.split(/\n/)
      const pivot = _.indexOf(lines, "*/")
      const frontmatter = lines.slice(1, pivot).join("\n")
      const mixin = lines.slice(pivot + 2).join("\n")
      const data = yaml.load(frontmatter)
      data.layout = "mixin"
      data.mixin = mixin
      return { data }
    },

    compile: (permalink, inputPath) => data => {
      if (!data.notes) {
        return ""
      }

      const notes = "<section>" + (data.notes || []).map(note => {
        return markdownIt({
          html: true,
        }).render(`## ${note.title}\n${note.text}`)
      }).join("</section><section>") + "</section>"

      return notes
    }
  })
}

