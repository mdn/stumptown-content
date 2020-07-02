const visit = require("unist-util-visit");

const {
  findUnexpectedNode,
  isWhiteSpaceTextNode,
  sectionHandler,
  sliceBetween,
} = require("./utils");

const handleDataConstituentProperties = sectionHandler(
  "Constituent_properties",
  (section, logger) => {
    const introText =
      "This property is a shorthand for the following CSS properties:";
    const expectedIntroTextP = findIntroTextP(section, introText);

    if (expectedIntroTextP === null) {
      logger.expected(section, `"${introText}" paragraph`, "expected-intro-p");
      return null;
    }

    const expectedUl = findNextUl(expectedIntroTextP, section);
    if (expectedUl === null) {
      logger.expected(
        expectedIntroTextP,
        "constituent property list UL after intro text",
        "expected-ul"
      );
      return null;
    }

    const lis = findLis(expectedUl);

    if (lis.length < 2) {
      logger.expected(
        expectedUl,
        "two or more LIs in constituent property list",
        "expected-more-lis"
      );
      return null;
    }

    for (const li of lis) {
      if (!isWellFormedProperty(li)) {
        logger.fail(
          li,
          "Constituent property list entry is malformed",
          "expected-li-a-code"
        );
        return null;
      }
    }

    const unsorted = findUnsortedProperty(lis);
    if (unsorted !== null) {
      logger.fail(
        unsorted,
        "Constituent property list is not in alphabetical order",
        "expected-alpha-sorted-properties"
      );
      return null;
    }

    let unexpectedNode = findUnexpectedNode(
      section,
      [section.children[0], expectedIntroTextP, ...lis],
      [expectedUl]
    );
    if (unexpectedNode !== null) {
      logger.fail(
        unexpectedNode,
        "No other elements allowed in constituent properties",
        "unexpected-content"
      );
      return false;
    }

    return true;
  }
);

function findIntroTextP(section, text) {
  return (
    section.children.find((node) => {
      return (
        node.tagName === "p" &&
        node.children.length === 1 &&
        node.children[0].value.trim() === text
      );
    }) || null
  );
}

function findNextUl(startNode, tree) {
  let ul = null;
  visit(
    sliceBetween(startNode, () => {}, tree),
    (node) => node.tagName === "ul",
    (node) => {
      ul = node;
      return visit.EXIT;
    }
  );
  return ul;
}

function findLis(ul) {
  let lis = [];

  if (ul.children) {
    lis = ul.children.filter((child) => child.tagName === "li");
  }

  return lis;
}

/**
 * Check if `node` is in the form `<li><a><code>text</code></a></li>`, ignoring
 * white space.
 *
 * @param {Object} node - A hast node
 * @returns {Boolean} - `true` or `false`
 */
function isWellFormedProperty(node) {
  const expectations = [
    (node) => node.tagName === "li" && node.children,
    (node) => node.tagName === "a" && node.children,
    (node) => node.tagName === "code" && node.children,
    (node) => node.type === "text" && !node.children,
  ];

  let count = 0;
  let ok = true;
  visit(
    node,
    (node) => !isWhiteSpaceTextNode(node),
    (node) => {
      const check = expectations[count];
      if (!check || !check(node)) {
        ok = false;
        return visit.EXIT;
      }
      count = count + 1;
    }
  );
  return ok;
}

/**
 * From an array of well-formed property list entries, get the first list item
 * out of order, or return `null`.
 *
 * @param {Array<Object>} lis - An array of LI nodes
 * @returns {Object|null} - A node that's out of order or `null`
 */
function findUnsortedProperty(lis) {
  let previous = "";
  for (const li of lis) {
    const literalText = li.children[0].children[0].children[0].value;
    if (previous.localeCompare(literalText) > 0) {
      return li;
    }
    previous = literalText;
  }
  return null;
}

module.exports = handleDataConstituentProperties;
