const markdownIt = require("markdown-it");
const pluginRss = require("@11ty/eleventy-plugin-rss");
const fs = require("fs");
const path = require("path");

module.exports = function(eleventyConfig) {
    /* Bundle CSS files from src/_css into _site/style.css */
    eleventyConfig.on("eleventy.before", () => {
        const cssDir = "src/_css";
        const outputDir = "_site";
        const cssFiles = [
            "base.css",
            "theme.css",
            "typography.css",
            "landing.css",
            "blog.css",
            "article.css",
            "microblog.css",
            "images.css",
            "layout.css",
            "responsive.css",
            "utilities.css"
        ];
        const combined = cssFiles
            .map(f => fs.readFileSync(path.join(cssDir, f), "utf8"))
            .join("\n");

        // Ensure output directory exists
        if (!fs.existsSync(outputDir)) {
            fs.mkdirSync(outputDir, { recursive: true });
        }
        fs.writeFileSync(path.join(outputDir, "style.css"), combined);
    });

    /* Copy some files directly */
    eleventyConfig.addPassthroughCopy("src/_scripts/theme-toggle.js");
    eleventyConfig.addPassthroughCopy("src/_scripts/rough-cards.js");
    eleventyConfig.addPassthroughCopy("src/_scripts/microblog-cards.js");
    eleventyConfig.addPassthroughCopy("src/favicon.ico");
    eleventyConfig.addPassthroughCopy("src/assets");
    eleventyConfig.addPassthroughCopy("src/admin");

    /* Make .md files more powerful */
    let mdoptions = {
        html: true,
        breaks: true,
        linkify: true
    }
    eleventyConfig.setLibrary("md", markdownIt(mdoptions));

    /* Enable RSS */
    eleventyConfig.addPlugin(pluginRss);

    /* Set directories */
    return {
        dir: {
            input: "src",
            includes: "_includes",
            data: "_data",
            output: "_site"
        },
    };
};