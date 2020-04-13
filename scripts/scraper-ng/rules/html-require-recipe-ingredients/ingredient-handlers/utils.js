const visit = require("unist-util-visit");

const normalizeMacroName = require("../../../normalize-macro-name");

/**
 * Get a subset of `tree` starting with `startNode` and ending just before the
 * next H2 element (or the end of the document, if it doesn't exist).
 *
 * @param {String} startNode - the starting node (e.g., some section heading)
 * @param {Object} tree - a hast tree
 * @returns {Object} a hast tree
 */
function sliceSection(startNode, tree) {
  return sliceBetween(startNode, (node) => node.tagName === "h2", tree);
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
  visit(tree, (node) => {
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

function Logger(file, source, recipeName, ingredient) {
  return {
    expected: function (node, name, id) {
      const text = `Expected ${name} for ${ingredient}`;
      this.fail(node, text, id);
    },
    fail: function (node, text, id) {
      const message = file.message(
        text,
        node,
        `${source}:${recipeName}/${ingredient}/${id}`
      );
      message.fatal = true;
    },
  };
}

module.exports = {
  sliceSection,
  sliceBetween,
  isMacro,
  Logger,
};
