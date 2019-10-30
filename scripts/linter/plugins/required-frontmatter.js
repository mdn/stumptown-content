const ruleId = "stumptown-linter:frontmatter-required-keys";

/**
 * Extract the keys of required top-level frontmatter from a recipe.
 */
function required(recipe) {
    return recipe.body
        .map(entry => {
            if (typeof entry === "string") {
                return entry;
            } else if (typeof entry === "object") {
                return Object.keys(entry)[0];
            }
        })
        .filter(
            entry =>
                typeof entry === "string" &&
                entry.startsWith("meta.") &&
                !entry.endsWith("?")
        )
        .map(entry => entry.match("meta.(.*)")[1]);
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
