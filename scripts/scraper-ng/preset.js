const allowedMacros = ["Compat"];
const requiredMacros = ["Compat"];

module.exports = {
  settings: {},
  plugins: [
    // Signature for adding linting rules (that use unified-lint-rule):
    //   [require('./rules/rule-name'), [severity, settings]]
    // Or you can default to 'warn' without including severity
    //   [require('./rules/rule-name'), settings]
    [require("./rules/html-require-macros"), ["error", requiredMacros]],
    [require("./rules/html-warn-macros"), allowedMacros]
  ]
};
