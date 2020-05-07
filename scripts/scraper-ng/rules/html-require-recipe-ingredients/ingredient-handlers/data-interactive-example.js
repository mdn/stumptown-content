const { select } = require("hast-util-select");
const visit = require("unist-util-visit");

const utils = require("./utils.js");

/**
 * Tests whether the given node is a DIV containing only
 * a call to the EmbedInteractiveExample macro.
 */
function isInteractiveExampleNode(node) {
  return (
    node.tagName === "div" &&
    node.children.length === 1 &&
    utils.isMacro(node.children[0], "EmbedInteractiveExample")
  );
}

/**
 * Tests whether the given node is a P node
 * that isn't a warning or a note.
 */
function isAdmonition(node) {
  return (
    node.tagName === "p" &&
    node.properties.className &&
    (node.properties.className.includes("warning") ||
      node.properties.className.includes("note"))
  );
}

/**
 * Tests whether the given node is a paragraph and not an admonition.
 */
function isParagraph(node) {
  return node && node.tagName === "p" && !isAdmonition(node);
}

/**
 * Handler for the `data.interactive_example?` ingredient.
 */
function handleDataInteractiveExample(tree, logger) {
  let ok = true;
  const body = select("body", tree);

  // check the part of the doc from the first H2 onwards
  // it must contain zero interactive examples
  const firstH2 = select("h2", body);
  if (firstH2) {
    const afterFirstH2 = utils.sliceBetween(firstH2, () => false, body);
    visit(
      afterFirstH2,
      (node) => utils.isMacro(node, "EmbedInteractiveExample"),
      (node) => {
        logger.fail(
          node,
          "Interactive examples are not allowed after first H2",
          "interactive-example-after-first-h2"
        );
        ok = false;
      }
    );
  }

  // check the part of the doc up to the first H2
  // it must contain zero or one interactive examples
  const beforeFirstH2 = utils.sliceSection(body.children[0], body);
  let interactiveExampleParent = null;
  visit(
    beforeFirstH2,
    (node) => utils.isMacro(node, "EmbedInteractiveExample"),
    (node, index, parent) => {
      // if we have already seen an interactive example, seeing another one is an error
      if (interactiveExampleParent) {
        logger.fail(
          node,
          "Only one interactive example is allowed",
          "at-most-one-interactive-example"
        );
        ok = false;
      } else {
        interactiveExampleParent = parent;
      }
    }
  );

  // if the part of the doc up to the first H2 contains
  // zero interactive examples, we have no more checks
  if (interactiveExampleParent === null) {
    return null;
  }

  // if the part of the doc up to the first H2 contains
  // one interactive example, it must be a DIV
  if (interactiveExampleParent.tagName !== "div") {
    logger.fail(
      interactiveExampleParent,
      "Interactive example must be in a DIV",
      "interactive-example-inside-div"
    );
    ok = false;
  }

  // finally check where it is in the "beforeFirstH2" section
  // it must be at the top level, after a P that's not an admonition

  // first, though, we don't care about newline-only text nodes
  const nodes = beforeFirstH2.children.filter(
    (node) => !utils.isNewlineOnlyTextNode(node)
  );
  let previous = null;
  for (const node of nodes) {
    if (isInteractiveExampleNode(node)) {
      if (!isParagraph(previous)) {
        logger.fail(
          node,
          "Interactive example must be preceded by a P node",
          "interactive-example-preceded-by-p"
        );
        ok = false;
      }
    }
    previous = node;
  }

  if (ok) {
    return interactiveExampleParent;
  } else {
    return null;
  }
}

module.exports = handleDataInteractiveExample;
