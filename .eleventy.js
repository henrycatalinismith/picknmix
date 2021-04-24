const sassPlugin = require("@hendotcat/11tysass")
const markdownIt = require("markdown-it")
const syntaxHighlight = require("@11ty/eleventy-plugin-syntaxhighlight")
const fs = require("fs-extra")
const yaml = require("js-yaml")
const _ = require("lodash")
const htmlmin = require("html-minifier")
const { JSDOM } = require("jsdom")
const sass = require("sass")

module.exports = function(eleventyConfig) {
  console.log("picknmix")

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

  eleventyConfig.addGlobalData(
    "readmeSections",
    function() {
      const readmeMarkdown = fs.readFileSync("readme.md", "utf-8")
      const readmeHtml = markdownIt({ html: true }).render(readmeMarkdown)
      const readmeDocument = new JSDOM(readmeHtml)
      const readmeSections = []
      for (const section of readmeDocument.window.document.querySelectorAll("section")) {
        readmeSections.push(section.outerHTML)
      }
      return readmeSections
    }
  )

  eleventyConfig.addPlugin(sassPlugin, {
    files: [{
      alias: "css",
      file: "style.scss",
    }],
  })

  eleventyConfig.addPassthroughCopy("picknmix.svg")
  eleventyConfig.addPassthroughCopy("plots/*.svg")
  eleventyConfig.addPassthroughCopy("videos/*.mp4")

  eleventyConfig.addPlugin(syntaxHighlight)

  eleventyConfig.addTransform(
    "htmlmin",
    function(content, outputPath) {
      if (outputPath && outputPath.endsWith(".html")) {
        content = htmlmin.minify(content, {
          useShortDoctype: true,
          removeComments: true,
          collapseWhitespace: true
        })
      }
      return content
    }
  )

  const url = process.env.CI ? "https://hen.cat/picknmix" : ""

  eleventyConfig.addTransform(
    "links",
    function(content, outputPath) {
      if (outputPath && outputPath.endsWith(".html")) {
        const dom = new JSDOM(content)
        const links = dom.window.document.querySelectorAll("a")
        const iframes = dom.window.document.querySelectorAll("iframe")
        const images = dom.window.document.querySelectorAll("img")
        const videos = dom.window.document.querySelectorAll("video")

        for (const a of links) {
          if (a.href.startsWith("/")) {
            a.href = url + a.href
          }
        }

        for (const img of images) {
          if (img.src.startsWith("/")) {
            img.src = url + img.src
          }
        }

        for (const iframe of iframes) {
          if (iframe.src.startsWith("/")) {
            iframe.src = url + iframe.src
          }
        }

        for (const video of videos) {
          if (video.src.startsWith("/")) {
            video.src = url + video.src
          }
        }

        content = dom.serialize()
      }
      return content
    }
  )

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

