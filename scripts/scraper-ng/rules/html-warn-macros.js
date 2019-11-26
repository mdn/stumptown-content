const rule = require("unified-lint-rule");
const visit = require("unist-util-visit-parents");

/**
 * Issue a warning for each macro
 */
function warnOnMacros(tree, file, allowedMacros) {
  allowedMacros = Array.isArray(allowedMacros) ? allowedMacros : [];

  visit(
    tree,
    node =>
      node.type === "text" &&
      node.data &&
      node.data.macroName &&
      !allowedMacros.includes(node.data.macroName),
    (node, ancestors) => {
      // Because macro nodes are generated, they don't have position
      // information. The parent node's position is used instead.
      const parent = ancestors[ancestors.length - 1];
      const message = file.message(`Macro: ${node.data.macroName}`, parent);
      message.note = `With arguments: ${JSON.stringify(node.data.macroParams)}`;
    }
  );
}

module.exports = rule("html-warn-on-macros", warnOnMacros);
