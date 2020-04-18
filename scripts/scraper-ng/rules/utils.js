const fs = require("fs");

const yaml = require("js-yaml");

const recipesCache = {};

/**
 * Load a recipe object from a path.
 *
 * @param {String} path - the path to a recipe YAML file
 * @returns {Object} - the loaded recipe object
 */
function loadRecipe(path) {
  if (path === undefined) {
    return undefined;
  }

  if (recipesCache[path] === undefined) {
    recipesCache[path] = yaml.safeLoad(fs.readFileSync(path));
  }

  return recipesCache[path];
}

module.exports = {
  loadRecipe,
};
