const fs = require("fs");
const path = require("path");
const yaml = require("js-yaml");

const collectedRecipes = {};

/**
 * Returns an object consisting of recipe names and objects from the parsed YAML for each recipe.
 */
function collectRecipes(start = "recipes") {
  function loadRecipes() {
    const files = fs.readdirSync(start);
    for (const f of files) {
      const fp = path.join(start, f);
      const recipeName = path.basename(f, ".yaml");
      const yamlObj = yaml.safeLoad(fs.readFileSync(fp));

      collectedRecipes[recipeName] = yamlObj;
    }
  }

  if (Object.entries(collectedRecipes).length === 0) {
    loadRecipes();
  }

  return collectedRecipes;
}

module.exports = collectRecipes;
