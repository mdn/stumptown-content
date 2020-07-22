const { selectAll } = require("hast-util-select");
const toText = require("hast-util-to-text");

const source = "html-h2-avoid-name-attribute";
const id = "h2-name-attr-mismatch";
const reason = (node) =>
  `H2 has name attribute mismatch (h2[name="${node.properties.name}"])`;

/**
 * Warn about H2s with name attributes, since this can lead to surprises.
 */
function htmlH2AvoidNameAttributePlugin() {
  return function warnOnH2NameAttr(tree, file) {
    for (const node of selectAll("h2[name]", tree)) {
      if (isMismatch(node)) {
        file.message(reason(node), node, `${source}:${id}`);
      }
    }
  };
}

function isMismatch(node) {
  return toAttr(toText(node)) !== node.properties.name;
}

function toAttr(str) {
  return str.replace(/ /g, "_");
}

module.exports = htmlH2AvoidNameAttributePlugin;
