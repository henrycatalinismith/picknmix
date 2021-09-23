import { rehypePlugin } from "@hendotcat/11tyhype"
import { sassPlugin } from "@hendotcat/11tysass"
import { reactPlugin } from "@hendotcat/11tysnap"
import { EleventyCollection, EleventyLayout } from "@hendotcat/11tytype"
import markdownIt from "markdown-it"
import fs from "fs-extra"
import yaml from "js-yaml"
import _ from "lodash"
import { JSDOM } from "jsdom"
import rehypeMinifyWhitespace from "rehype-minify-whitespace"
import rehypeUrls from "rehype-urls"

declare global {
  interface Home {
    title: string
    description: string
    links: {
      href: string
      text: string
    }[]
  }

  interface Example {
    name: string
    description: string
    html: string
    scss: string
  }

  interface Dependency {
    data: {
      name: string
      description: string
    }
  }

  interface MixinIndex {
    title: string
    description: string
  }

  interface Mixin {
    name: string
    description: string
    mixin: string
    dependents: Dependency[]
    dependencies: Dependency[]
    examples: Example[]
    notes: {
      title: string
      text: string
    }[]
  }

  type ReadmeSection = string

  type Collections = {
    examples: EleventyCollection<Example>
    mixins: EleventyCollection<Mixin>
    readmeSections: string[]
  }

  type Layout<Template> = EleventyLayout<Template, Collections>
}

module.exports = function(eleventyConfig) {
  console.log("picknmix")

  eleventyConfig.addCollection(
    "mixins",
    function(collectionApi) {
      return collectionApi
        .getFilteredByGlob("mixins/*.scss")
        .sort((a, b) => {
          return a.data.name > b.data.name ? 1
            : a.data.name < b.data.name ? -1 : 0
        }).map(f => {
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

  eleventyConfig.addPlugin(reactPlugin, {
    verbose: true,
  })

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

      const notes = (data.notes || []).map(note => {
        return {
          title: note.title,
          text: markdownIt({ html: true }).render(note.text),
        }
      })

      return notes
    }
  })

  const dir = {
    includes: "_includes",
    layouts: "_layouts",
  }

  return {
    dir,
  }
}

