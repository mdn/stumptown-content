const remark2retext = require("remark-retext");
const stringify = require("retext-stringify");
const unified = require("unified");
const visit = require("unist-util-visit");

/**
 * Convert an mdast node to plain text.
 */
function remarkToText(node) {
  return unified().use(remark2retext).use(stringify).stringify(node);
}

/**
 * Convert an mdast node to a section slug.
 */
function remarkToSlug(node) {
  return remarkToText(node).toLowerCase().replace(" ", "_");
}

/**
 * Check if an mdast node is an H2.
 */
function isHeadingLevel2(node) {
  return node.type === "heading" && node.depth == 2;
}

/**
 * A unified plugin that sets `data.slug` for H2s.
 */
function attacher() {
  return function transformer(tree) {
    if (tree && tree.data && tree.data.recipe !== undefined) {
      visit(tree, isHeadingLevel2, (node) => {
        const slug = remarkToSlug(node);
        node.data = { ...node.data, slug };
      });
    }
  };
}

module.exports = attacher;
