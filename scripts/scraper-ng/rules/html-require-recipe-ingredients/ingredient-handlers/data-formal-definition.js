const { findUnexpectedNode, isMacro, sectionHandler } = require("./utils");

const handleDataFormalDefinition = sectionHandler("Formal_definition", handle);

function handle(section, logger) {
  const heading = section.children[0];

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

  // The section must contain only a heading and `<p>{{CSSInfo}}</p>`
  const extraneousNode = findUnexpectedNode(
    section,
    [heading],
    [expectedP, expectedMacro]
  );
  if (extraneousNode !== null) {
    logger.fail(
      extraneousNode,
      "No other elements allowed in data.formal_definition",
      "expected-macro-only"
    );
    return null;
  }

  return heading;
}

module.exports = handleDataFormalDefinition;
