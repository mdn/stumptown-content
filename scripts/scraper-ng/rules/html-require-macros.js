const rule = require("unified-lint-rule");
const visit = require("unist-util-visit");

const normalizeMacroName = require("../normalize-macro-name");

/**
 * Require one or more named macros.
 */
function requireMacros(tree, file, required = []) {
  visit(
    tree,
    node =>
      node.type === "text" &&
      node.data &&
      required.map(normalizeMacroName).includes(node.data.macroName),
    node => {
      required = required.filter(
        macro => node.data.macroName !== normalizeMacroName(macro)
      );

      if (!required.length) {
        return visit.EXIT;
      }
    }
  );

  for (const macro of required) {
    file.message(`${macro} macro call required but not found`);
  }
}

module.exports = rule("html-require-macros", requireMacros);
