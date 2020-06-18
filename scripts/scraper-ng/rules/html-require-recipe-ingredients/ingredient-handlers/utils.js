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
 * Find the first node that you didn't expect to find, or return `null`.
 *
 * @param {Object} tree - the tree to search for unexpected nodes
 * @param {Array} expectedTrees - An array of nodes such that each node itself
 *   and all of its descendants are permited. An expected tree's descendants are
 *   never visited.
 * @param {Array} expectedNodes - An array of nodes such that each node is
 *   permitted. An expected node's descendants are visited, if they exist. The
 *   starting node and white space are always expected.
 * @returns {Object|null} a node or `null`
 */
function findExtraneousNode(tree, expectedTrees, expectedNodes) {
  let extraneousNode = null;

  visit(
    tree,
    (node) => node !== tree,
    (node) => {
      if (expectedTrees.includes(node)) {
        return visit.SKIP;
      }
      if (expectedNodes.includes(node) || isWhiteSpaceTextNode(node)) {
        return visit.CONTINUE;
      }
      extraneousNode = node;
      return visit.EXIT;
    }
  );

  return extraneousNode;
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
 * Function returning true only if the given node is a text node
 * that contains only newlines.
 */
function isNewlineOnlyTextNode(node) {
  return node.type === "text" && node.value.match(/^\n*$/);
}

/**
 * Check if a node's type is `"text"` and that contains only white space
 * characters.
 *
 * @param {Object} node - An unist node
 * @returns {Boolean} `true` for white space, `false` for anything else
 */
function isWhiteSpaceTextNode(node) {
  return node.type === "text" && !/\S/.test(node.value);
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
  findExtraneousNode,
  isMacro,
  isNewlineOnlyTextNode,
  isWhiteSpaceTextNode,
  Logger,
  sliceBetween,
  sliceSection,
};
