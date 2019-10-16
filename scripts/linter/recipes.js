const fsPromises = require("fs").promises;
const path = require("path");
const yaml = require("js-yaml");

const collectedRecipes = {};

/**
 * Returns an object consisting of recipe names and objects from the parsed YAML for each recipe.
 */
async function collectRecipes(start = "recipes") {
    async function loadRecipes() {
        const files = await fsPromises.readdir(start, { withFileTypes: true });
        for (const f of files) {
            const fp = path.join(start, f.name);
            const recipeName = path.basename(f.name, ".yaml");
            const yamlObj = yaml.safeLoad(await fsPromises.readFile(fp));

            collectedRecipes[recipeName] = yamlObj;
        }
    }

    if (Object.entries(collectedRecipes).length === 0) {
        await loadRecipes();
    }

    return collectedRecipes;
}

module.exports = {
    collectRecipes
};
