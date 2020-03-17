const { select } = require("hast-util-select");

const handleDataSpecifications = require("./data-specifications");
const handleDataBrowserCompatibility = require("./data-browser-compatibility");
const handleProseShortDescription = require("./prose-short-description");

const utils = require("./utils.js");

/**
 * Functions to check for recipe ingredients in Kuma page sources.
 *
 * The key is the name of a recipe ingredient (e.g.,
 * `data.browser_compatibiility` or `prose.syntax`) and the value is a function
 * to process a tree and file for that.
 *
 * Handler functions must take three arguments: a hast tree, a VFile, and a
 * context object. The context object has two entries:
 *
 * - `ingredient` - the name of the ingredient
 * - `recipeName` - the name of the recipe
 *
 * Handler functions may log messages against the file.
 *
 */
const ingredientHandlers = {
  default: unimplementedHandler,
  "data.browser_compatibility": handleDataBrowserCompatibility,
  "data.examples": requireTopLevelHeading("Examples"),
  "data.specifications": handleDataSpecifications,
  "prose.description": requireTopLevelHeading("Description"),
  "prose.error_type": requireTopLevelHeading("Error_type"),
  "prose.message": requireTopLevelHeading("Message"),
  "prose.see_also": requireTopLevelHeading("See_also"),
  "prose.short_description": handleProseShortDescription,
  "prose.syntax": requireTopLevelHeading("Syntax"),
  "prose.what_went_wrong": requireTopLevelHeading("What_went_wrong")
};

/**
 * The default handler, that's called when we haven't yet implemented a handler
 * for a given ingredient.
 */
function unimplementedHandler(tree, file, context) {
  const { recipeName, ingredient, source } = context;
  const rule = `${recipeName}/${ingredient}`;
  const origin = `${source}:${rule}`;

  file.message(`Linting ${ingredient} ingredient is unimplemented`, origin);
}

/**
 * A convenience function that returns ingredient handlers for checking
 * the existence of a certain H2 in a hast tree.
 *
 * @param {String} ingredient - an ingredient name
 * @param {String} id - an id of an H2 to look for in the hast tree
 * @returns {Function} a function
 */
function requireTopLevelHeading(id) {
  return (tree, file, context) => {
    const heading = select(`h2#${id}`, tree);
    if (heading === null) {
      utils.logMissingIngredient(file, context);
    }
  };
}

module.exports = ingredientHandlers;
