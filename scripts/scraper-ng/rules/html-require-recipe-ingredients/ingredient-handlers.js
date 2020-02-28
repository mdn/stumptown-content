const { select } = require("hast-util-select");
const visit = require("unist-util-visit");

const ruleNamespace = "html-require-ingredient";

/**
 * Functions to check for recipe ingredients in Kuma page sources.
 *
 * The key is the name of a recipe ingredient (e.g.,
 * `data.browser_compatbiility` or `prose.syntax`) and the value is a function
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
  default: (tree, file, context) => {
    const { recipeName, ingredient } = context;
    const rule = `${recipeName}/${ingredient}`;
    const origin = `${ruleNamespace}:${rule}`;

    file.message(`Linting ${ingredient} ingredient is unimplemented`, origin);
  },
  "data.browser_compatibility": (tree, file, context) => {
    const id = "Browser_compatibility";
    const body = select(`body`, tree);

    const heading = select(`h2#${id}`, tree);
    if (heading === null) {
      warnMissingIngredient(file, context);
      return;
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
      warnMissingIngredient(file, context);
    }
  },
  "data.examples": requireTopLevelHeading("Examples"),
  "data.specifications": (tree, file, context) => {
    const id = "Specifications";
    const body = select(`body`, tree);

    const heading = select(`h2#${id}`, tree);
    if (heading === null) {
      warnMissingIngredient(file, context);
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
      warnMissingIngredient(file, context);
    }
  },
  "prose.description": requireTopLevelHeading("Description"),
  "prose.see_also": requireTopLevelHeading("See_also"),
  "prose.short_description": (tree, file, context) => {
    if (select("body > p", tree) === null) {
      warnMissingIngredient(file, context);
    }
  },
  "prose.syntax": requireTopLevelHeading("Syntax")
};

/**
 * A convenience function that returns ingredient handlers for checking the existence of a certain H2 in a hast tree.
 *
 * @param {String} ingredient - an ingredient name
 * @param {String} id - an id of an H2 to look for in the hast tree
 * @returns {Function} a function
 */
function requireTopLevelHeading(id) {
  return (tree, file, context) => {
    const heading = select(`h2#${id}`, tree);
    if (heading === null) {
      warnMissingIngredient(file, context);
    }
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
function warnMissingIngredient(file, context) {
  const { recipeName, ingredient } = context;
  const rule = `${recipeName}/${ingredient}`;
  const origin = `${ruleNamespace}:${rule}`;

  const message = file.message(
    `Missing from ${recipeName}: ${ingredient}`,
    origin
  );
  message.fatal = true;
}

module.exports = ingredientHandlers;
