const rule = require("unified-lint-rule");
const visit = require("unist-util-visit");

/**
 * Require one or more named macros.
 */
function requireMacros(tree, file, required = []) {
  visit(
    tree,
    node =>
      node.type === "text" &&
      node.data &&
      required.includes(node.data.macroName),
    node => {
      required = required.filter(macro => node.data.macroName !== macro);
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
