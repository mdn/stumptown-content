const select = require("hast-util-select");

const utils = require("./utils.js");

function checkLinkList(id, tree, logger) {
  const body = select.select("body", tree);

  const heading = select.select(`h2#${id}`, body);
  // This is an optional ingredient, so if there's no `h2`,
  // assume that the page intends to omit it.
  if (heading === null) {
    return;
  }

  const section = utils.sliceSection(heading, body);
  // The first element is always the `h2`, which we are not interested in
  const children = section.children.slice(1);

  // At the top level a link list must contain exactly one element,
  // and it must be a <dl>.
  const elements = children.filter((child) => child.type === "element");
  if (elements.length !== 1 || elements[0].tagName !== "dl") {
    logger.fail(
      body,
      "Link list must contain a single DL element and no other elements",
      "only-single-dl-element-in-link-list"
    );
    return;
  }

  // At the top level, if a link list contains text nodes,
  // they may only contain newlines.
  const textNodes = children.filter((child) => child.type === "text");
  for (const node of textNodes) {
    const newlinesOnly = /^\n*$/;
    if (!node.value.match(newlinesOnly)) {
      logger.fail(
        node,
        "Text nodes in list of links top level may only contain newlines",
        "text-nodes-in-link-list"
      );
    }
  }

  const dl = elements[0];

  // The link list's <dl> must contain at least one <dt>.
  const dts = select.selectAll("dt", dl);
  if (dts.length === 0) {
    logger.fail(
      body,
      "Link list dl must contain at least one dt",
      "dl-must-contain-dt"
    );
    return;
  }

  // Each <dt> must contain only a single <a> element
  for (const dt of dts) {
    if (
      dt.children.length !== 1 ||
      dt.children[0].type !== "element" ||
      dt.children[0].tagName !== "a"
    ) {
      logger.fail(
        dt,
        "dt elements in link lists must contain a single anchor element",
        "only-single-anchor-element-in-link-list-dt"
      );
    }
  }

  // <code> elements in <dt> elements must contain only a single text node
  const dtCodeContents = select.selectAll("dt>a>code", dl);
  for (const dtCode of dtCodeContents) {
    if (dtCode.children.length !== 1 || dtCode.children[0].type !== "text") {
      logger.fail(
        dtCode,
        "code elements in dt elements in link lists must contain a single text node",
        "only-single-text-node-element-in-link-list-code"
      );
    }
  }

  // <dt><dd> pairs must be ordered by the alphabetical order of
  // the <dt><a><code> text content
  let previousTitle = "";
  for (const dtCode of dtCodeContents) {
    if (dtCode.children[0].value.localeCompare(previousTitle, "en") <= 0) {
      logger.fail(
        dtCode,
        "Links in link lists must be listed in alphabetical order",
        "link-list-alpha-order"
      );
    }
    previousTitle = dtCode.children[0].value;
  }
}

module.exports = checkLinkList;
