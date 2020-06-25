const { select } = require("hast-util-select");
const visit = require("unist-util-visit");

const {
  findUnexpectedNode,
  isMacro,
  isWhiteSpaceTextNode,
  sliceSection,
} = require("./utils");

function handleDataFormalSyntax(tree, logger) {
  const id = "Formal_syntax";
  const body = select(`body`, tree);
  const heading = select(`h2#${id}`, body);

  if (heading === null) {
    logger.expected(body, `h2#${id}`, "expected-heading");
    return null;
  }

  // Section must contain pre.syntaxbox
  const section = sliceSection(heading, body);
  const expectedSyntaxBox = select("pre.syntaxbox", section);
  if (expectedSyntaxBox === null) {
    logger.expected(section, "pre.syntaxbox", "expected-pre.syntaxbox");
    return null;
  }

  // pre.syntaxbox must contain CSSSyntax macro
  let expectedMacro = null;
  visit(
    expectedSyntaxBox,
    (node) => !isWhiteSpaceTextNode(node),
    (node) => {
      if (isMacro(node, "CSSSyntax")) {
        expectedMacro = node;
        return visit.EXIT;
      }
    }
  );
  if (expectedMacro === null) {
    logger.expected(section, "CSSSyntax macro", "expected-macro");
    return null;
  }

  // The section must contain only the `h2`, `pre.syntaxbox`, and macro call
  const extraneousNode = findUnexpectedNode(
    section,
    [heading],
    [expectedSyntaxBox, expectedMacro]
  );
  if (extraneousNode !== null) {
    logger.fail(
      extraneousNode,
      "No other elements allowed in data.formal_syntax",
      "syntax-only"
    );
    return null;
  }

  return heading;
}

module.exports = handleDataFormalSyntax;
