const allowedMacros = ["Compat"];

module.exports = {
  settings: {},
  plugins: [
    require("./rules/html-require-compat-macro"),
    [require("./rules/html-warn-macros"), allowedMacros]
  ]
};
