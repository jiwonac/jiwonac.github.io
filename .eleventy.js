const markdownIt = require("markdown-it");
const pluginRss = require("@11ty/eleventy-plugin-rss");

module.exports = function(eleventyConfig) {

    /* Copy some files directly */
    eleventyConfig.addPassthroughCopy("src/style.css");
    eleventyConfig.addPassthroughCopy("src/favicon.ico");
    eleventyConfig.addPassthroughCopy("src/assets");

    /* Make .md files more powerful */
    let mdoptions = {
        html: true,
        breaks: true,
        linkify: true
    }
    eleventyConfig.setLibrary("md", markdownIt(mdoptions));

    /* Enable RSS */
    eleventyConfig.addPlugin(pluginRss);

    /* Collection of everything except for stuff that should only be on HOME */
    eleventyConfig.addCollection('allexcepthome', collection => {
            return collection
                .getAll()
                .filter(post => !post.data.tags.includes('home'))
                .sort((a, b) => (b.date - a.date))
        }
    );
    
    /* Set directories */
    return {
        dir: {
            input: "src",
            includes: "_includes",
            data: "_data",
            output: "www"
        },
    };
};