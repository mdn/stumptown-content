const { select } = require("hast-util-select");
const visit = require("unist-util-visit");

const {
  findUnexpectedNode,
  isMacro,
  isWhiteSpaceTextNode,
  requiredSectionHandler,
} = require("./utils");

const handleDataFormalSyntax = requiredSectionHandler("Formal_syntax", handle);

function handle(tree, logger, section, heading) {
  // Section must contain pre.syntaxbox
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
    logger.expected(tree, expectedSyntaxBox, "expected-macro");
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
