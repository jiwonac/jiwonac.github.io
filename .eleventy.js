const markdownIt = require("markdown-it");
const pluginRss = require("@11ty/eleventy-plugin-rss");
const cacheBuster = require("@mightyplow/eleventy-plugin-cache-buster");
const fs = require("fs");
const path = require("path");
const { generateImage } = require("./src/_11ty/images");
const markdownImagePlugin = require("./src/_11ty/markdown-image-plugin");

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
    eleventyConfig.addPassthroughCopy("src/_scripts/theme-init.js");
    eleventyConfig.addPassthroughCopy("src/_scripts/theme-toggle.js");
    eleventyConfig.addPassthroughCopy("src/_scripts/rough-cards.js");
    eleventyConfig.addPassthroughCopy("src/_scripts/microblog-cards.js");
    eleventyConfig.addPassthroughCopy("src/favicon.ico");
    eleventyConfig.addPassthroughCopy("src/robots.txt");
    eleventyConfig.addPassthroughCopy("src/.htaccess");
    eleventyConfig.addPassthroughCopy("src/assets");
    eleventyConfig.addPassthroughCopy("src/admin");

    /* Make .md files more powerful */
    let mdoptions = {
        html: true,
        breaks: true,
        linkify: true
    }
    let md = markdownIt(mdoptions);
    md.use(markdownImagePlugin);
    eleventyConfig.setLibrary("md", md);

    /* Image shortcodes */
    eleventyConfig.addAsyncShortcode("blogThumbnail", async (src, alt) => {
        return generateImage(src, alt, "blogThumbnail", { class: "blog-thumbnail" });
    });

    eleventyConfig.addAsyncShortcode("articleThumbnail", async (src, alt) => {
        return generateImage(src, alt, "articleThumbnail", { class: "article-thumbnail" });
    });

    eleventyConfig.addAsyncShortcode("smallImage", async (src, alt) => {
        return generateImage(src, alt, "smallImage", { class: "small-image" });
    });

    eleventyConfig.addAsyncShortcode("wideImage", async (src, alt) => {
        return generateImage(src, alt, "wideImage", { class: "wide-image" });
    });

    eleventyConfig.addAsyncShortcode("microblogImage", async (src, alt) => {
        return generateImage(src, alt, "microblogGrid", {});
    });

    eleventyConfig.addAsyncShortcode("icon", async (src, alt, className) => {
        return generateImage(src, alt, "icon", { class: className || "textsize-image" });
    });

    /* Enable RSS */
    eleventyConfig.addPlugin(pluginRss);

    /* Cache busting for CSS/JS assets */
    eleventyConfig.addPlugin(cacheBuster({
        outputDirectory: "_site"
    }));

    /* Date formatting filter */
    eleventyConfig.addFilter("formatDate", (date) => {
        const d = new Date(date);
        const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun",
                        "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
        return `${months[d.getUTCMonth()]} ${d.getUTCDate()}, ${d.getUTCFullYear()}`;
    });

    /* Auto-blurb filter: strips HTML and truncates content */
    eleventyConfig.addFilter("autoBlurb", (content, maxLength = 150) => {
        if (!content) return "";
        // Strip HTML tags
        const text = content.replace(/<[^>]*>/g, "").replace(/\s+/g, " ").trim();
        if (text.length <= maxLength) return text;
        // Truncate at word boundary
        const truncated = text.substring(0, maxLength);
        const lastSpace = truncated.lastIndexOf(" ");
        return (lastSpace > 0 ? truncated.substring(0, lastSpace) : truncated) + "...";
    });

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