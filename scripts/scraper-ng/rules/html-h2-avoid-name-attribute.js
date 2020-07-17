const { selectAll } = require("hast-util-select");

const source = "html-h2-avoid-name-attribute";
const id = "h2-name-attr";
const reason = (node) =>
  `H2 has name attribute (h2[name="${node.properties.name}"])`;

/**
 * Warn about H2s with name attributes, since this can lead to surprises.
 */
function htmlH2AvoidNameAttributePlugin() {
  return function warnOnH2NameAttr(tree, file) {
    for (const node of selectAll("h2[name]", tree)) {
      file.message(reason(node), node, `${source}:${id}`);
    }
  };
}

module.exports = htmlH2AvoidNameAttributePlugin;
