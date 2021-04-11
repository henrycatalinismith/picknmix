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

  eleventyConfig.addPassthroughCopy("column/margin-pause.gif")
  eleventyConfig.addPassthroughCopy("column/mobile-zoom.gif")
  eleventyConfig.addPassthroughCopy("font-sizes/margin-pause.gif")
  eleventyConfig.addPassthroughCopy("font-sizes/mobile-zoom.gif")

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
        const images = dom.window.document.querySelectorAll("img")

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

        content = dom.serialize()
      }
      return content
    }
  )

  eleventyConfig.addWatchTarget("style.scss")
}

