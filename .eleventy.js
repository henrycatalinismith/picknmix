const fs = require("fs-extra")
const htmlmin = require("html-minifier")
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

  eleventyConfig.addWatchTarget("style.scss")
}

