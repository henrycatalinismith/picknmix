const fs = require("fs-extra")
const htmlmin = require("html-minifier")
const { JSDOM } = require("jsdom")
const sass = require("sass")

module.exports = function(eleventyConfig) {
  console.log("picknmix")

  eleventyConfig.addGlobalData(
    "css",
    function() {
      return sass.renderSync({ file: "style.scss" }).css
    }
  )

  eleventyConfig.addPassthroughCopy("column/margin.gif")

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

  const url = process.env.COMMIT_REF ? "https://hen.cat/picknmix" : ""

  eleventyConfig.addTransform(
    "links",
    function(content, outputPath) {
      if (outputPath && outputPath.endsWith(".html")) {
        const dom = new JSDOM(content)
        const images = dom.window.document.querySelectorAll("img")

        for (const img of images) {
          if (img.src.startsWith("/")) {
            img.src = url + img.src
          }
        }
        content = dom.serialize()
      }
      return content
    }
  )

  eleventyConfig.addWatchTarget("style.scss")
}

