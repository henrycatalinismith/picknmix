const fs = require("fs-extra")
const htmlmin = require("html-minifier")
const { JSDOM } = require("jsdom")
const sass = require("sass")

module.exports = function(eleventyConfig) {
  console.log("picknmix")

  eleventyConfig.addCollection(
    "features",
    function(collectionApi) {
      return collectionApi
        .getFilteredByGlob("*/*.md")
        .sort((a, b) =>
          a.data.name > b.data.name ? 1
            : a.data.name < b.data.name ? -1 : 0
        )
    }
  )

  eleventyConfig.addGlobalData(
    "css",
    function() {
      return sass.renderSync({ file: "style.scss" }).css
    }
  )

  eleventyConfig.addPassthroughCopy("column/margin-pause.mp4")
  eleventyConfig.addPassthroughCopy("column/mobile-zoom.mp4")
  eleventyConfig.addPassthroughCopy("font-sizes/margin-pause.mp4")
  eleventyConfig.addPassthroughCopy("font-sizes/mobile-zoom.mp4")

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
  eleventyConfig.addWatchTarget("style.scss")
}

