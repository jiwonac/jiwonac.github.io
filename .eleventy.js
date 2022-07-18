const markdownIt = require("markdown-it");

module.exports = function(eleventyConfig) {
    /* Copy some files directly */
    eleventyConfig.addPassthroughCopy("src/style.css");
    eleventyConfig.addPassthroughCopy("src/_assets");
    /* Make .md files more powerful */
    let mdoptions = {
        html: true,
        breaks: true,
        linkify: true
    }
    eleventyConfig.setLibrary("md", markdownIt(mdoptions));
    /* Set directories */
    return {
        dir: {
            input: "src",
            includes: "_includes",
            data: "_data",
            output: "docs"
        },
    };
};