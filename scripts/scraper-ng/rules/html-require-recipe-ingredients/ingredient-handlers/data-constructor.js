const select = require("hast-util-select");

const utils = require("./utils.js");
const checkLinkList = require("./link-list-checker.js");

const noConstructor = "This object cannot be instantiated directly.";

function checkText(node, text) {
  return node.type === "text" && node.value === text;
}

function checkTag(node, tag) {
  return node.type === "element" && node.tagName === tag;
}

function startsWithText(node, text) {
  return node.type === "text" && node.value.startsWith(text);
}

function checkNoConstructor(elements) {
  const topLevelElements = elements.filter((node) => node.type === "element");
  if (
    topLevelElements.length > 1 &&
    topLevelElements[1].tagName === "p" &&
    topLevelElements[1].children.length > 0 &&
    startsWithText(topLevelElements[1].children[0], noConstructor)
  ) {
    return true;
  }
  return false;
}

/**
 * Handler for the `data.constructor` ingredient.
 */
const handleDataConstructor = utils.sectionHandler(
  "Constructor",
  (section, logger) => {
    // Constructor sections are allowed to have no actual links
    // to constructors, if they explicitly record this fact
    if (checkNoConstructor(section.children)) {
      return true;
    }
    // Otherwise they must include a link to a constructor

    // Check common link list structure
    let ok = checkLinkList(section, logger);

    // This link list is only allowed one entry
    const dts = select.selectAll("dt", section);
    if (dts.length !== 1) {
      logger.fail(
        section,
        "Constructor section may only contain one DT item",
        "only-single-constructor-dt"
      );
      ok = false;
    }
    const dds = select.selectAll("dd", section);
    if (dds.length !== 1) {
      logger.fail(
        section,
        "Constructor section may only contain one DD item",
        "only-single-constructor-dd"
      );
      return false;
    }

    // The dd must be of the form: "Creates a new <code>...</code> object."
    const dd = dds[0];
    if (dd.children.length < 3) {
      logger.fail(
        dd,
        "Constructor description must be in the form `Creates a new <code>...</code> object.`",
        "constructor-description-at-least-three-nodes"
      );
      return false;
    }

    if (!checkText(dd.children[0], "Creates a new ")) {
      logger.fail(
        section,
        "Constructor description must be in the form 'Creates a new <code>...</code> object.'",
        "constructor-description-first-node"
      );
      ok = false;
    }

    if (!checkTag(dd.children[1], "code")) {
      logger.fail(
        section,
        "Constructor description must contain <code>Object</code> after 'Creates a new'",
        "constructor-description-second-node"
      );
      ok = false;
    }

    if (
      !(
        startsWithText(dd.children[2], " object.") ||
        startsWithText(dd.children[2], " value.")
      )
    ) {
      logger.fail(
        section,
        "Constructor description must end first sentence with ' object.' or ' value.'",
        "constructor-description-third-node"
      );
      ok = false;
    }

    return ok;
  }
);

module.exports = handleDataConstructor;
