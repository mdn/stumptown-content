const ruleId = "stumptown-linter:frontmatter-required-keys";

/**
 * Extract the keys of required top-level frontmatter from a recipe.
 */
function required(recipe) {
  const data = recipe.data.filter((entry) => !entry.endsWith("?"));
  const body = recipe.body
    .filter(
      (entry) =>
        typeof entry === "string" &&
        entry.startsWith("data.") &&
        !entry.endsWith("?")
    )
    .map((entry) => entry.match("data.(.*)")[1]);

  return data.concat(body);
}

/**
 * If a tree has `tree.data.recipe` (i.e., it's a Markdown doc with a
 * known-valid recipe), then log messages if it's missing essential frontmatter.
 */
function attacher() {
  return function transformer(tree, file) {
    if (tree.data && tree.data.recipe) {
      const { yaml } = tree.children[0].data;
      const keys = required(tree.data.recipe);

      for (const key of keys) {
        if (yaml[key] === undefined) {
          const message = file.message(
            `\`${key}\` frontmatter key not found`,
            tree.children[0],
            ruleId
          );
          message.fatal = true;
        }
      }
    }
  };
}

module.exports = attacher;
