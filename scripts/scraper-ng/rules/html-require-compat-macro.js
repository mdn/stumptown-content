const rule = require("unified-lint-rule");
const visit = require("unist-util-visit");

function requireCompatMacro(tree, file) {
  let foundCompat = false;

  visit(
    tree,
    node =>
      node.type === "text" && node.data && node.data.macroName === "Compat",
    () => {
      foundCompat = true;
      return visit.EXIT;
    }
  );

  if (!foundCompat) {
    const message = file.message(
      "At least one compat macro expected but not found"
    );
    message.fatal = true;
  }
}

module.exports = rule("html-require-compat-macro", requireCompatMacro);
