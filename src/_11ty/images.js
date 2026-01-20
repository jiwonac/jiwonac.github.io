const Image = require("@11ty/eleventy-img");
const path = require("path");

const imageConfig = {
    outputDir: "./_site/img/",
    urlPath: "/img/",
    formats: ["webp", "jpeg"],

    presets: {
        blogThumbnail: { widths: [180, 360] },
        articleThumbnail: { widths: [160, 320] },
        smallImage: { widths: [200, 400] },
        wideImage: { widths: [400, 700, 1000] },
        microblogGrid: { widths: [300, 500, 800] },
        microblogSingle: { widths: [400, 800] },
        markdownDefault: { widths: [400, 700, 1000] },
        icon: { widths: [32, 64], formats: ["webp", "png"] },
    }
};

async function generateImage(src, alt, preset, extraAttrs = {}) {
    if (!src) return "";

    const inputPath = src.startsWith("/")
        ? path.join("./src", src)
        : src;

    // Skip SVGs - return simple img tag
    if (src.endsWith(".svg")) {
        const attrs = formatAttrs({ src, alt: alt || "", ...extraAttrs });
        return `<img ${attrs}>`;
    }

    const config = imageConfig.presets[preset] || imageConfig.presets.wideImage;

    try {
        const metadata = await Image(inputPath, {
            widths: config.widths,
            formats: config.formats || imageConfig.formats,
            outputDir: imageConfig.outputDir,
            urlPath: imageConfig.urlPath,
            filenameFormat: (id, src, width, format) => {
                const name = path.basename(src, path.extname(src));
                return `${name}-${width}w.${format}`;
            }
        });

        return Image.generateHTML(metadata, {
            alt: alt || "",
            loading: "lazy",
            decoding: "async",
            ...extraAttrs
        });
    } catch (e) {
        console.warn(`Image processing failed for ${src}:`, e.message);
        const attrs = formatAttrs({ src, alt: alt || "", ...extraAttrs });
        return `<img ${attrs}>`;
    }
}

function formatAttrs(attrs) {
    return Object.entries(attrs)
        .filter(([_, v]) => v !== undefined && v !== null && v !== "")
        .map(([k, v]) => `${k}="${v}"`)
        .join(" ");
}

module.exports = { imageConfig, generateImage };
