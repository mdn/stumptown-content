const { isMacro, sliceSection } = require("./utils");
const { select } = require("hast-util-select");
const visit = require("unist-util-visit");

function handleDataFormalSyntax(tree, logger) {
  const id = "Formal_syntax";
  const body = select(`body`, tree);
  const heading = select(`h2#${id}`, body);
  const section = sliceSection(heading, body);

  if (heading === null) {
    logger.expected(body, `h2#${id}`, "expected-heading");
    return null;
  }

  // The first non-whitespace node after the `h2` must be pre.syntaxbox
  const relevantChildren = section.children.filter(
    (child) => child.tagName !== "h2" && !isWhiteSpaceTextNode(child)
  );
  const expectedPre = relevantChildren.length > 0 ? relevantChildren[0] : null;
  if (
    expectedPre === null ||
    expectedPre.type !== "element" ||
    expectedPre.tagName !== "pre" ||
    !Array.isArray(expectedPre.properties.className) ||
    !expectedPre.properties.className.includes("syntaxbox")
  ) {
    logger.expected(tree, expectedPre, "expected-pre.syntaxbox");
    return null;
  }

  // The `pre` tag's first child must be a macro node
  const expectedMacro =
    expectedPre.children.length > 0 ? expectedPre.children[0] : null;
  if (expectedMacro === null || !isMacro(expectedMacro, "CSSSyntax")) {
    logger.expected(tree, expectedPre, "expected-macro");
    return null;
  }

  // Do not allow any nodes other than the expected `<h2/><pre>{{macro}}</pre>`
  let extraneousNode = null;
  visit(
    section,
    (node) => node.type !== "root",
    (node) => {
      if (node === heading) {
        return visit.SKIP; // ignore the heading text
      }
      if (
        isWhiteSpaceTextNode(node) ||
        node === expectedPre ||
        node === expectedMacro
      ) {
        return visit.CONTINUE;
      }

      extraneousNode = node;
      return visit.EXIT;
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

function isWhiteSpaceTextNode(node) {
  return node.type === "text" && !/\S/.test(node.value);
}

module.exports = handleDataFormalSyntax;
