const { select } = require("hast-util-select");

const utils = require("./utils.js");

/**
 * Handler for the `data.specifications` ingredient.
 */
function handleDataStaticMethods(tree, file, context) {
  /**
   * Convenience function to record an error message.
   */
  function recordError(text, id) {
    const message = file.message(
      text,
      body,
      `${context.source}:${context.recipeName}/${context.ingredient}/${id}`
    );
    message.fatal = true;
    utils.logIngredientError(file, context, "Invalid");
  }

  /**
   * Check text nodes at the top level of the static_methods section.
   * Text nodes here may only contain newlines.
   */
  function checkTextNode(node) {
    const newlinesOnly = /^\n*$/;
    if (!node.value.match(newlinesOnly)) {
      recordError(
        "Text nodes in section may only contain newlines",
        "text-nodes-in-section"
      );
    }
  }

  /**
   * Check elements at the top level of the static_methods section.
   * Only `dl` elements are allowed.
   */
  function checkElementNode(node) {
    if (node.tagName !== "dl") {
      recordError(
        "Section may only contain DL elements",
        "non-dl-elements-in-section"
      );
      return;
    }
    checkLinkList(node);
  }

  /**
   * Check the structure of a `dl` element that represents a list of links.
   */
  function checkLinkList(node) {
    let title = "";
    for (const child of node.children) {
      // We are only going to check `dt` elements, and will tolerate
      // any others
      if (child.tagName === "dt") {
        if (child.children.length !== 1 || child.children[0].tagName !== "a") {
          recordError(
            "DT elements in link lists must contain a single anchor element",
            "link-list-dt-element-child-is-anchor"
          );
          return;
        }
        const link = child.children[0];
        if (link.children.length !== 1 || link.children[0].tagName !== "code") {
          recordError(
            "Anchor elements in link lists must contain a single code element",
            "link-list-anchor-element-child-is-code"
          );
          return;
        }
        const code = link.children[0];
        if (code.children.length !== 1 || code.children[0].type !== "text") {
          recordError(
            "Code elements in link lists must contain a single text node",
            "link-list-code-element-child-is-text"
          );
          return;
        }
        if (code.children[0].value.localeCompare(title, "en") <= 0) {
          recordError(
            "Links in link lists must be listed in alphabetical order",
            "link-list-alpha-order"
          );
        }
        title = code.children[0].value;
      }
    }
  }

  const id = "Static_methods";
  const body = select(`body`, tree);
  const heading = select(`h2#${id}`, body);

  // This is an optional ingredient, so if there's no `h2`,
  // assume that the page intends to omit it.
  if (heading === null) {
    return;
  }

  const section = utils.sliceSection(heading, body);
  // the first element is always the `h2`, which we are not interested in
  const children = section.children.slice(1);

  for (const node of children) {
    switch (node.type) {
      case "text":
        checkTextNode(node);
        break;
      case "element":
        checkElementNode(node);
        break;
      default:
        console.log("error: unexpected node type");
    }
  }
}

module.exports = handleDataStaticMethods;
