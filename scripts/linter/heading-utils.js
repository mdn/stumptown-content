const remark2retext = require("remark-retext");
const stringify = require("retext-stringify");
const unified = require("unified");

/**
 * Convert an mdast node to plain text.
 */
function remarkToText(node) {
    return unified()
        .use(remark2retext)
        .use(stringify)
        .stringify(node);
}

/**
 * Convert an mdast node to a section slug.
 */
function remarkToSlug(node) {
    return remarkToText(node)
        .toLowerCase()
        .replace(" ", "_");
}

/**
 * Check if an mdast node is an H2.
 */
function isHeadingLevel2(node) {
    return node.type === "heading" && node.depth == 2;
}

module.exports = {
    isHeadingLevel2,
    remarkToSlug,
    remarkToText
};
