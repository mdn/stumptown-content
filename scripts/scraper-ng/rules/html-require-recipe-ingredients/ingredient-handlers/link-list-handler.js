/**
 * Check text nodes at the top level of the static_methods section.
 * Text nodes here may only contain newlines.
 */
function checkTextNode(node, logError) {
  const newlinesOnly = /^\n*$/;
  if (!node.value.match(newlinesOnly)) {
    logError(
      "Text nodes in section may only contain newlines",
      "text-nodes-in-section"
    );
  }
}

/**
 * Check elements at the top level of the static_methods section.
 * Only `dl` elements are allowed.
 */
function checkElementNode(node, logError) {
  if (node.tagName !== "dl") {
    logError(
      "Section may only contain DL elements",
      "non-dl-elements-in-section"
    );
    return;
  }
  checkDL(node, logError);
}

/**
 * Check the structure of a `dl` element that represents a list of links.
 */
function checkDL(node, logError) {
  let title = "";
  for (const child of node.children) {
    // We are only going to check `dt` elements, and will tolerate
    // any others
    if (child.tagName === "dt") {
      if (child.children.length !== 1 || child.children[0].tagName !== "a") {
        logError(
          "DT elements in link lists must contain a single anchor element",
          "link-list-dt-element-child-is-anchor"
        );
        return;
      }
      const link = child.children[0];
      if (link.children.length !== 1 || link.children[0].tagName !== "code") {
        logError(
          "Anchor elements in link lists must contain a single code element",
          "link-list-anchor-element-child-is-code"
        );
        return;
      }
      const code = link.children[0];
      if (code.children.length !== 1 || code.children[0].type !== "text") {
        logError(
          "Code elements in link lists must contain a single text node",
          "link-list-code-element-child-is-text"
        );
        return;
      }
      if (code.children[0].value.localeCompare(title, "en") <= 0) {
        logError(
          "Links in link lists must be listed in alphabetical order",
          "link-list-alpha-order"
        );
      }
      title = code.children[0].value;
    }
  }
}

function checkLinkList(section, logError) {
  for (const node of section) {
    switch (node.type) {
      case "text":
        checkTextNode(node, logError);
        break;
      case "element":
        checkElementNode(node, logError);
        break;
      default:
        logError("Unexpected node type in link list", "link-list-node-types");
    }
  }
}

module.exports = checkLinkList;
