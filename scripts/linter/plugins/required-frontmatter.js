const ruleId = "stumptown-linter:frontmatter-required-keys";

/**
 * If a tree has `tree.data.recipe` (i.e., it's a Markdown doc with a
 * known-valid recipe), then log messages if it's missing essential frontmatter.
 */
function attacher() {
    return function transformer(tree, file) {
        if (tree.data && tree.data.recipe) {
            const { yaml } = tree.children[0].data;
            const requiredFrontmatter = [];

            // Right now, there's no way to collect the required frontmatter
            // keys from the recipe itself, so they're hardcoded for now.
            if (yaml.recipe === "html-element") {
                requiredFrontmatter.push(
                    "attributes",
                    "attributes.global",
                    "examples"
                );
            }

            for (const key of requiredFrontmatter) {
                // This Rube Goldberg machine will try to look up `a.b.c` and
                // throw (and log a message) if `a.b.c` is undefined or if any
                // of `a` or `b` are undefined
                try {
                    const obj = key.split(".").reduce((o, i) => o[i], yaml);
                    if (obj === undefined) {
                        throw `${key} not found`;
                    }
                } catch (err) {
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
