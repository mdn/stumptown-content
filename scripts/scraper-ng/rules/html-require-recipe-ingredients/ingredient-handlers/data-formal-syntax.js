const { isMacro, isWhiteSpaceTextNode, sliceSection } = require("./utils");
const { select } = require("hast-util-select");
const visit = require("unist-util-visit");

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
    logger.expected(tree, section, "expected-pre.syntaxbox");
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

  // Section must only contain `<pre>{{macro}}</pre>` and space
  const isExpected = (node) => {
    return (
      isWhiteSpaceTextNode(node) ||
      [expectedSyntaxBox, expectedMacro].includes(node)
    );
  };

  let extraneousNode = null;
  visit(
    section,
    (node) => node.type !== "root",
    (node) => {
      if (node === heading) {
        return visit.SKIP; // skip over heading text
      } else if (isExpected(node)) {
        return visit.CONTINUE;
      } else {
        extraneousNode = node;
        return visit.EXIT;
      }
    }
  );
  if (extraneousNode !== null) {
    logger.fail(
      extraneousNode,
      "No other elements allowed in formal syntax",
      "syntax-only"
    );
    return null;
  }

  return heading;
}

module.exports = handleDataFormalSyntax;
