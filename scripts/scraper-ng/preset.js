const allowedMacros = ["Compat", "EmbedInteractiveExample", "SpecName"];

module.exports = {
  settings: {},
  plugins: [
    // Signature for adding linting rules that use unified-lint-rule:
    //   [require('./rules/rule-name'), [severity, settings]]
    // For non-unified-lint-rule rules (or to default to 'warn'), omit serverity:
    //   [require('./rules/rule-name'), settings]
    // For rules that don't need settings of any kind:
    //   [require('./rules/rule-name')]
    [require("./rules/file-require-recipe")],
    [require("./plugins/load-recipes")],
    [require("./plugins/index-tree")], // Required for html-require-recipe-ingredients and html-require-ingredient-order
    [require("./rules/html-no-macros"), allowedMacros],
    [require("./rules/html-require-recipe-ingredients")],
    [require("./rules/html-require-ingredient-order")], // Must be after html-require-recipe-ingredients
    [require("./rules/html-warn-unknown-headings")],
  ],
};
