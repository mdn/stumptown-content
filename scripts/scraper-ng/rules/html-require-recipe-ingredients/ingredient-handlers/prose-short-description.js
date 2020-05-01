const { select } = require("hast-util-select");
const toString = require("hast-util-to-string");
const visit = require("unist-util-visit");

const utils = require("./utils.js");

/**
 * Handler for the `prose.short_description` ingredient.
 */
function handleProseShortDescription(tree, logger) {
  // Short descriptions are complicated!
  //
  // A short description is understood to be either an seoSummary <span> or
  // the first <p> that precedes:
  //
  // - an interactive example macro
  // - an <h2>
  // - the end of the document
  //
  // whichever comes first, but excluding <p>'s that are admonitions (warnings
  // or notes).

  const body = select("body", tree);

  const seoSummary = select("span.seoSummary", tree);
  if (seoSummary !== null) {
    return seoSummary;
  }

  // Slice the tree to the nodes between the first element in <body> and
  // a terminating node (interactive example or h2) or the end of the
  // document
  const introSection = utils.sliceBetween(
    select(":first-child", body),
    (node) => {
      if (node.tagName === "h2") {
        return true;
      }

      let containsInteractiveExample = false;
      visit(
        node,
        (node) => utils.isMacro(node, "EmbedInteractiveExample"),
        () => {
          containsInteractiveExample = true;
          return visit.EXIT;
        }
      );
      return containsInteractiveExample;
    },
    body
  );

  // Get the first paragraph not an admonition
  const shortDescriptionP = select("p:not(.warning):not(.note)", introSection);

  if (shortDescriptionP === null) {
    logger.expected(body, `short description`, "missing-prose-section");
    return null;
  }

  // Check if the paragraph actually contains text
  const shortDescriptionText = toString(shortDescriptionP).trim();

  // See if there's any text remaining
  if (!shortDescriptionText.length) {
    logger.expected(
      shortDescriptionP,
      `short description`,
      "missing-prose-section"
    );
    return null;
  }

  return shortDescriptionP;
}

module.exports = handleProseShortDescription;
