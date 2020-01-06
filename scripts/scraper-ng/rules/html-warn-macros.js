const visit = require("unist-util-visit-parents");

const normalizeMacroName = require("../normalize-macro-name");

/**
 * Issue a warning for each macro call (except for the array of macro names in
 * `allowedMacros`)
 */
function attacher(allowedMacros) {
  allowedMacros = Array.isArray(allowedMacros)
    ? allowedMacros.map(normalizeMacroName)
    : [];

  return function warnOnMacros(tree, file) {
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
        const message = file.message(`Macro: ${node.data.macroCall}`, parent);
        message.ruleId = `html-warn-on-macros:${node.data.macroName}`;
        message.note = `With arguments: ${JSON.stringify(
          node.data.macroParams
        )}`;
      }
    );
  };
}

module.exports = attacher;
