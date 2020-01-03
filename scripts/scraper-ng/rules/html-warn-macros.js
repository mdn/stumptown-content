const visit = require("unist-util-visit-parents");

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
        !allowedMacros.includes(normalizeMacroName(node.data.macroName)),
      (node, ancestors) => {
        // Because macro nodes are generated, they don't have position
        // information. The parent node's position is used instead.
        const parent = ancestors[ancestors.length - 1];
        const message = file.message(`Macro: ${node.data.macroName}`, parent);
        message.ruleId = `html-warn-on-macros:${normalizeMacroName(
          node.data.macroName
        )}`;
        message.note = `With arguments: ${JSON.stringify(
          node.data.macroParams
        )}`;
      }
    );
  };
}

/**
 * Make the case of a macro consistent with other possible invocations of this
 * macro.
 *
 * The right thing to do probably involves finding out the canonical name of
 * every macro, but for now, this just lower cases the name.
 *
 * @param {String} name - a macro name
 * @returns {String}
 */
function normalizeMacroName(name) {
  return name.toLowerCase();
}

module.exports = attacher;
