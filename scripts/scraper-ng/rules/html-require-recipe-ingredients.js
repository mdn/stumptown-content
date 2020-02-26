const fs = require("fs");
const path = require("path");

const { select } = require("hast-util-select");
const visit = require("unist-util-visit");
const yaml = require("js-yaml");

/**
 * A unified plugin that issues an error on pages that are missing ingredients.
 */
function requireRecipeIngredientsPlugin() {
  return function warnOnMissingRecipeIngredients(tree, file) {
    const recipe = loadRecipe(file.data.recipePath);

    const requiredBody = recipe.body.filter(
      ingredientName =>
        !(ingredientName.endsWith("?") || ingredientName.endsWith(".*"))
    );

    let ok = true;
    for (const ingredient of requiredBody) {
      if (ingredient in ingredientHandlers) {
        ok = ingredientHandlers[ingredient](tree, file) && ok;
      } else {
        file.message(`No handler for ingredient ${ingredient}`);
        ok = false;
      }
    }

    if (!ok) {
      const recipeName = path.basename(file.data.recipePath, ".yaml");
      const message = file.message(`Page doesn't match recipe ${recipeName}`);
      message.ruleId = `html-must-match-recipe:${recipeName}`;
      message.fatal = true;
    }
  };
}

/**
 * Functions to check for recipe ingredients in Kuma page sources.
 *
 * The key is the name of a recipe ingredient (e.g.,
 * `data.browser_compatbiility` or `prose.syntax`) and the value is a function
 * to process a tree and file.
 *
 * The functions must take two arguments: a hast tree and a VFile. The function
 * must return `true` if the page contains the recipe ingredient, or `false` if
 * not. The function may also log messages against the file.
 *
 */
const ingredientHandlers = {
  "data.browser_compatibility": (tree, file) => {
    const id = "Browser_compatibility";
    const ingredient = "data.browser_compatibility";
    const body = select(`body`, tree);

    const heading = select(`h2#${id}`, tree);
    if (heading === null) {
      warnMissingIngredient(file, ingredient);
      return false;
    }

    const nextHeading = select(`#${id} ~ h2`, tree);
    const sectionStart = body.children.indexOf(heading);
    const sectionEnd =
      nextHeading !== null
        ? body.children.indexOf(nextHeading)
        : body.children.length;
    const subTree = {
      type: "root",
      children: body.children.slice(sectionStart, sectionEnd)
    };

    let macroCount = 0;
    visit(
      subTree,
      node => isMacro(node, "compat"),
      () => {
        macroCount += 1;
      }
    );

    if (macroCount !== 1) {
      warnMissingIngredient(file, ingredient);
      return false;
    }
    return true;
  },
  "data.examples": requireTopLevelHeading("data.examples", "Examples"),
  "data.specifications": (tree, file) => {
    const id = "Specifications";
    const ingredient = "data.specifications";
    const body = select(`body`, tree);

    const heading = select(`h2#${id}`, tree);
    if (heading === null) {
      warnMissingIngredient(file, ingredient);
      return false;
    }

    const sectionStart = body.children.indexOf(heading);
    const sectionEnd = body.children.indexOf(select(`#${id} ~ h2`, tree));
    const subTree = {
      type: "root",
      children: body.children.slice(sectionStart, sectionEnd)
    };

    let sectionOk = false;
    visit(subTree, "text", node => {
      if (isMacro(node) && node.data.macroName === "specname") {
        sectionOk = true;
        return visit.SKIP;
      }

      if (node.value.includes("Not part of any standard")) {
        sectionOk = true;
        return visit.SKIP;
      }
    });

    if (!sectionOk) {
      warnMissingIngredient(file, ingredient);
      return false;
    }
    return true;
  },
  "prose.description": requireTopLevelHeading(
    "prose.description",
    "Description"
  ),
  "prose.see_also": requireTopLevelHeading("prose.see_also", "See_also"),
  "prose.short_description": (tree, file) => {
    if (select("body > p", tree) === null) {
      warnMissingIngredient(file, "prose.short_description");
      return false;
    }
    return true;
  },
  "prose.syntax": requireTopLevelHeading("prose.syntax", "Syntax")
};

/**
 * A convenience function that returns ingredient handlers for checking the existence of a certain H2 in a hast tree.
 *
 * @param {String} ingredient - an ingredient name
 * @param {String} id - an id of an H2 to look for in the hast tree
 * @returns {Function} a function
 */
function requireTopLevelHeading(ingredient, id) {
  return (tree, file) => {
    const heading = select(`h2#${id}`, tree);
    if (heading === null) {
      warnMissingIngredient(file, ingredient);
      return false;
    }
    return true;
  };
}

/**
 * Test if `node` is a macro call and, optionally, whether it calls a specific macro name.
 *
 * For use with `unist-util-visit` and similar.
 *
 * @param {Object} node - the node to test
 * @param {string} [macroName] - the name of the macro
 * @returns {Boolean} `true` or `false`
 */
function isMacro(node, macroName) {
  const isMacroType =
    node.type === "text" &&
    node.data !== undefined &&
    node.data.macroName !== undefined;

  return (
    isMacroType &&
    (macroName === undefined || node.data.macroName === macroName)
  );
}

/**
 * Log a warning when a file is missing a named ingredient.
 *
 * @param {VFile} file - a VFile
 * @param {String} ingredient - an ingredient name
 */
function warnMissingIngredient(file, ingredient) {
  const message = file.message(`Missing ingredient: ${ingredient}`);
  message.ruleId = `html-require-recipe-ingredient:${ingredient}`;
}

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

module.exports = requireRecipeIngredientsPlugin;
