const { select } = require("hast-util-select");
const visit = require("unist-util-visit");

const {
  findUnexpectedNode,
  isMacro,
  isWhiteSpaceTextNode,
  sectionHandler,
} = require("./utils");

const handleDataFormalSyntax = sectionHandler(
  "Formal_syntax",
  (section, logger) => {
    // Section must contain pre.syntaxbox
    const expectedSyntaxBox = select("pre.syntaxbox", section);
    if (expectedSyntaxBox === null) {
      logger.expected(section, "pre.syntaxbox", "expected-pre.syntaxbox");
      return false;
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
      return false;
    }

    // The section must contain only the `h2`, `pre.syntaxbox`, and macro call
    const extraneousNode = findUnexpectedNode(
      section,
      [section.children[0]],
      [expectedSyntaxBox, expectedMacro]
    );
    if (extraneousNode !== null) {
      logger.fail(
        extraneousNode,
        "No other elements allowed in data.formal_syntax",
        "syntax-only"
      );
      return false;
    }

    return true;
  }
);

module.exports = handleDataFormalSyntax;
