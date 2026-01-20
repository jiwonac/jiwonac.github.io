const Image = require("@11ty/eleventy-img");
const path = require("path");
const { imageConfig } = require("./images");

module.exports = function markdownImagePlugin(md) {
    const defaultRender = md.renderer.rules.image || function(tokens, idx, options, env, self) {
        return self.renderToken(tokens, idx, options);
    };

    md.renderer.rules.image = function(tokens, idx, options, env, self) {
        const token = tokens[idx];
        const src = token.attrGet("src");
        const alt = token.content || "";

        // Skip external URLs and SVGs
        if (!src || src.startsWith("http") || src.endsWith(".svg")) {
            return defaultRender(tokens, idx, options, env, self);
        }

        const inputPath = src.startsWith("/")
            ? path.join("./src", src)
            : src;

        try {
            // Use statsSync for synchronous rendering in markdown-it
            const metadata = Image.statsSync(inputPath, {
                widths: imageConfig.presets.markdownDefault.widths,
                formats: imageConfig.formats,
                outputDir: imageConfig.outputDir,
                urlPath: imageConfig.urlPath,
                filenameFormat: (id, src, width, format) => {
                    const name = path.basename(src, path.extname(src));
                    return `${name}-${width}w.${format}`;
                }
            });

            // Queue the actual image generation (async, runs in background)
            Image(inputPath, {
                widths: imageConfig.presets.markdownDefault.widths,
                formats: imageConfig.formats,
                outputDir: imageConfig.outputDir,
                urlPath: imageConfig.urlPath,
                filenameFormat: (id, src, width, format) => {
                    const name = path.basename(src, path.extname(src));
                    return `${name}-${width}w.${format}`;
                }
            });

            return Image.generateHTML(metadata, {
                alt,
                loading: "lazy",
                decoding: "async",
            });
        } catch (e) {
            console.warn(`Markdown image processing failed for ${src}:`, e.message);
            return defaultRender(tokens, idx, options, env, self);
        }
    };
};
