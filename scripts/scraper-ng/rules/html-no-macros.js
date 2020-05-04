const visit = require("unist-util-visit");

const normalizeMacroName = require("../normalize-macro-name");

const source = "html-no-macros";

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
      (node) =>
        node.type === "text" &&
        node.data &&
        node.data.macroName &&
        !allowedMacros.includes(node.data.macroName),
      (node) => {
        const message = file.message(
          `Macro: ${node.data.macroCall}`,
          node,
          `${source}:${node.data.macroName}`
        );
        message.note = `With arguments: ${JSON.stringify(
          node.data.macroParams
        )}`;
      }
    );
  };
}

module.exports = attacher;
