const { select } = require("hast-util-select");
const visit = require("unist-util-visit");

const { isMacro, isWhiteSpaceTextNode, sliceSection } = require("./utils");

function handleDataFormalDefinition(tree, logger) {
  const id = "Formal_definition";
  const body = select(`body`, tree);
  const heading = select(`h2#${id}`, body);

  if (heading === null) {
    logger.expected(body, `h2#${id}`, "expected-heading");
    return null;
  }

  // Section must have an immediate child P element containing the CSSInfo macro
  const section = sliceSection(heading, body);

  // Find the first P with a CSSInfo macro as one of its children
  let expectedMacro;
  let expectedP = section.children.find((node) => {
    if (node.tagName === "p" && node.children) {
      // Get first CSSInfo child node, if it exists
      expectedMacro = node.children.find((node) => isMacro(node, "CSSInfo"));
      if (expectedMacro) {
        return true;
      }
    }
    return false;
  });

  if (!expectedP) {
    logger.expected(
      section,
      "CSSInfo macro paragraph",
      "expected-cssinfo-macro"
    );
    return null;
  }

  // After the H2, the section must only contain `<p>{{CSSInfo}}</p>` (and
  // space)
  const isExpected = (node) =>
    node.type === "root" ||
    isWhiteSpaceTextNode(node) ||
    node === expectedP ||
    node === expectedMacro;

  let extraneousNode;
  visit(section, (node) => {
    if (node === heading) {
      return visit.SKIP;
    } else if (isExpected(node)) {
      return visit.CONTINUE;
    } else {
      extraneousNode = node;
      return visit.EXIT;
    }
  });

  if (extraneousNode) {
    logger.fail(
      extraneousNode,
      "No other elements allowed in formal definition",
      "expected-macro-only"
    );
    return null;
  }

  return heading;
}

module.exports = handleDataFormalDefinition;
