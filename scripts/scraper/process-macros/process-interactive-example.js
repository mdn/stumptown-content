const { extractMacroCalls } = require("./extract-macro-calls");
const { removeNode } = require("../clean-html.js");

function getInteractiveExampleHeight(heightArgument) {
  if (!heightArgument) {
    heightArgument = "tabbed-standard";
  }
  switch (heightArgument) {
    case "tabbed-shorter":
      return "html-short";
    case "tabbed-standard":
      return "html-standard";
    case "tabbed-taller":
      return "html-tall";
    default:
      throw `Unexpected interactive example height: ${heightArgument}`;
  }
}

function processInteractiveExample(htmlWithMacroCalls, result) {
  const macroCalls = extractMacroCalls(
    "EmbedInteractiveExample",
    htmlWithMacroCalls
  );
  if (macroCalls[0]) {
    const url = `https://interactive-examples.mdn.mozilla.net/${macroCalls[0][0]}`;
    const height = getInteractiveExampleHeight(macroCalls[0][1]);
    result.frontMatter += `interactive_example:\n    url: ${url}\n    height: ${height}\n`;
  }
  removeNode(result.dom, "iframe.interactive");
  return result;
}

module.exports = {
  processInteractiveExample,
};
