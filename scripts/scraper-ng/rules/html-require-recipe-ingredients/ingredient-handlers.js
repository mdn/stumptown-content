const { select } = require("hast-util-select");
const filter = require("unist-util-filter");
const toString = require("hast-util-to-string");
const visit = require("unist-util-visit");

const normalizeMacroName = require("../../normalize-macro-name");

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
    const heading = select(`h2#${id}`, body);

    if (heading === null) {
      const message = file.message(
        `Expected h2#${id} for ${context.recipeName}: ${context.ingredient}`,
        body,
        `${ruleNamespace}:${context.recipeName}/${context.ingredient}/expected-heading`
      );
      message.fatal = true;
      logMissingIngredient(file, context);
      return;
    }

    let macroCount = 0;
    visit(
      sliceSection(heading, body),
      node => isMacro(node, "Compat"),
      () => {
        macroCount += 1;
      }
    );

    if (macroCount !== 1) {
      logMissingIngredient(file, context);
    }
  },
  "data.examples": requireTopLevelHeading("Examples"),
  "data.specifications": (tree, file, context) => {
    const id = "Specifications";
    const body = select(`body`, tree);

    const heading = select(`h2#${id}`, body);
    if (heading === null) {
      const message = file.message(
        `Expected h2#${id} ${context.recipeName}: ${context.ingredient}`,
        body,
        `${ruleNamespace}:${context.recipeName}/${context.ingredient}/expected-heading`
      );
      message.fatal = true;
      logMissingIngredient(file, context);
      return;
    }

    let sectionOk = false;
    visit(sliceSection(heading, body), "text", node => {
      if (isMacro(node, "SpecName")) {
        sectionOk = true;
        return visit.SKIP;
      }

      if (node.value.includes("Not part of any standard")) {
        sectionOk = true;
        return visit.SKIP;
      }
    });

    if (!sectionOk) {
      const message = file.message(
        `Expected SpecName macro for ${context.recipeName}: ${context.ingredient}`,
        heading,
        `${ruleNamespace}:${context.recipeName}/${context.ingredient}/expected-macro`
      );
      message.fatal = true;
      logMissingIngredient(file, context);
    }
  },
  "prose.description": requireTopLevelHeading("Description"),
  "prose.error_type": requireTopLevelHeading("Error_type"),
  "prose.message": requireTopLevelHeading("Message"),
  "prose.see_also": requireTopLevelHeading("See_also"),
  "prose.short_description": (tree, file, context) => {
    // Short descriptions are complicated!
    //
    // A short description is understood to be either an seoSummary <span> or
    // the first <p> that precedes:
    //
    // - an interactive example macro
    // - an <h2>
    // - the end of the document
    //
    // whichever comes first, but excluding <p>'s that are admonitions (warnings
    // or notes).

    const body = select("body", tree);

    if (select("span.seoSummary", tree) !== null) {
      return;
    }

    // Slice the tree to the nodes between the firt element in <body> and
    // a terminating node (interactive example or h2) or the end of the
    // document
    const introSection = sliceBetween(
      select(":first-child", body),
      node => {
        if (node.tagName === "h2") {
          return true;
        }

        let containsInteractiveExample = false;
        visit(
          node,
          node => isMacro(node, "EmbedInteractiveExample"),
          () => {
            containsInteractiveExample = true;
            return visit.EXIT;
          }
        );
        return containsInteractiveExample;
      },
      body
    );

    // Remove admonition paragraphs
    const isAdmonition = node =>
      node.tagName === "p" &&
      node.properties.className &&
      (node.properties.className.includes("warning") ||
        node.properties.className.includes("note"));
    const filtered = filter(introSection, node => !isAdmonition(node));

    // Get the first paragraph left over
    const shortDescriptionP = select("p", filtered);

    if (shortDescriptionP === null) {
      logMissingIngredient(file, context);
      return;
    }

    // Check if the paragraph actually contains text
    const shortDescriptionText = toString(shortDescriptionP).trim();

    // See if there's any text remaining
    if (!shortDescriptionText.length) {
      logMissingIngredient(file, context);
    }
  },
  "prose.syntax": requireTopLevelHeading("Syntax"),
  "prose.what_went_wrong": requireTopLevelHeading("What_went_wrong")
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
      logMissingIngredient(file, context);
    }
  };
}

/**
 * Get a subset of `tree` starting with `startNode` and ending just before the
 * next H2 element (or the end of the document, if it doesn't exist).
 *
 * @param {String} startNode - the starting node (e.g., some section heading)
 * @param {Object} tree - a hast tree
 * @returns {Object} a hast tree
 */
function sliceSection(startNode, tree) {
  return sliceBetween(startNode, node => node.tagName === "h2", tree);
}

/**
 * Get a subset of `tree` starting with `startNode` and ending just before the
 * first node that passes `endCondition`.
 *
 * @param {Object} startNode - the starting node (e.g., some section heading)
 * @param {Function} endCondition - a function that takes a node as an argument
 * and returns a boolean (e.g., to stop at a specific node, use `(node) => node
 * === someNode`)
 * @param {Object} tree - a hast tree
 * @returns {Object} a hast tree
 */
function sliceBetween(startNode, endCondition, tree) {
  const newRoot = { type: "root", children: [] };

  let inBounds = false;
  visit(tree, node => {
    if (node === startNode) {
      inBounds = true;
      newRoot.children.push(node);
      return visit.SKIP;
    }

    if (inBounds) {
      if (endCondition(node)) {
        return visit.EXIT;
      }

      newRoot.children.push(node);
      return visit.SKIP;
    }
  });

  return newRoot;
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
    (macroName === undefined ||
      node.data.macroName === normalizeMacroName(macroName))
  );
}

/**
 * Log a message when a file is missing an ingredient.
 *
 * @param {VFile} file - a VFile
 * @param {Object} context - a context object with recipe name and ingredient
 * strings
 */
function logMissingIngredient(file, context) {
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
