const rule = require("unified-lint-rule");
const visit = require("unist-util-visit-parents");

module.exports = rule("html-warn-on-macros", warnOnMacros);

/**
 * Issue a warning for each macro
 */
function warnOnMacros(tree, file) {
  visit(
    tree,
    node => node.type === "text" && node.data && node.data.macroName,
    (node, ancestors) => {
      // Because macro nodes are generated, they don't have position
      // information. The parent node's position is used instead.
      const parent = ancestors[ancestors.length - 1];
      file.message(`Macro: ${node.data.macroName}`, parent);
    }
  );
}
