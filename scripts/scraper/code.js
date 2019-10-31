"use strict";

module.exports = code;

const has = require("hast-util-has-property");
const toText = require("hast-util-to-text");
const trim = require("trim-trailing-lines");

/**
 * An alternative version of the built-in handler for
 * converting `pre` blocks from HTML to Markdown.
 *
 * The built-in version, in hast-util-to-mdast,
 * sets `lang` based on classes like "language-html".
 *
 * But in MDN code blocks use "brush: html" to indicate
 * language. So this handler looks for that instead.
 */

function code(h, node) {
  let lang;

  if (node.tagName === "pre") {
    if (has(node, "className")) {
      let brushIndex = node.properties.className.indexOf("brush:");
      if (
        brushIndex !== -1 &&
        brushIndex < node.properties.className.length - 1
      ) {
        lang = node.properties.className[brushIndex + 1];
      }
    }
  }

  return h(
    node,
    "code",
    { lang: lang || null, meta: null },
    trim(toText(node))
  );
}
