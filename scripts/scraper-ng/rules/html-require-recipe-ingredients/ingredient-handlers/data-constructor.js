const select = require("hast-util-select");

const utils = require("./utils.js");
const checkLinkList = require("./link-list-checker.js");

function checkText(node, text) {
  return node.type === "text" && node.value === text;
}

function checkTag(node, tag) {
  return node.type === "element" && node.tagName === tag;
}

/**
 * Handler for the `data.constructor` ingredient.
 */
function handleDataConstructor(tree, logger) {
  // Check common link list structure
  checkLinkList("Constructor", tree, logger);

  // Constructor is a mandatory property
  const heading = select.select(`h2#Constructor`, tree);
  if (heading === null) {
    logger.expected(tree, `h2#Constructor`, "expected-heading");
    return;
  }

  // This link list is only allowed one entry
  const section = utils.sliceSection(heading, tree);
  const dts = select.selectAll("dt", section);
  if (dts.length !== 1) {
    logger.fail(
      section,
      "Constructor section may only contain one DT item",
      "only-single-constructor-dt"
    );
  }
  const dds = select.selectAll("dd", section);
  if (dds.length !== 1) {
    logger.fail(
      section,
      "Constructor section may only contain one DD item",
      "only-single-constructor-dd"
    );
    return;
  }

  // The dd must be of the form: "Creates a new <a>...</a> object."
  const dd = dds[0];
  if (dd.children.length !== 3) {
    logger.fail(
      section,
      "Constructor description must contain three nodes",
      "constructor-description-three-nodes"
    );
    return;
  }

  if (!checkText(dd.children[0], "Creates a new ")) {
    logger.fail(
      section,
      "Constructor description first node is incorrect",
      "constructor-description-first-node"
    );
  }

  if (!checkTag(dd.children[1], "a")) {
    logger.fail(
      section,
      "Constructor description second node is incorrect",
      "constructor-description-second-node"
    );
  }

  if (!checkText(dd.children[2], " object.")) {
    logger.fail(
      section,
      "Constructor description third node is incorrect",
      "constructor-description-third-node"
    );
  }
}

module.exports = handleDataConstructor;
