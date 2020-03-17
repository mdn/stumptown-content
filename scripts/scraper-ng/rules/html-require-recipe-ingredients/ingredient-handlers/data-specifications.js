const { select } = require("hast-util-select");
const visit = require("unist-util-visit");

const utils = require("./utils.js");

/**
 * Handler for the `data.specifications` ingredient.
 */
function handleDataSpecifications(tree, file, context) {
  const id = "Specifications";
  const body = select(`body`, tree);

  const heading = select(`h2#${id}`, body);
  if (heading === null) {
    const message = file.message(
      `Expected h2#${id}`,
      body,
      `${context.source}:${context.recipeName}/${context.ingredient}/expected-heading`
    );
    message.fatal = true;
    utils.logMissingIngredient(file, context);
    return;
  }

  let sectionOk = false;
  visit(utils.sliceSection(heading, body), "text", node => {
    if (utils.isMacro(node, "SpecName")) {
      sectionOk = true;
      return visit.SKIP;
    }

    if (node.value.includes("Not part of any standard")) {
      sectionOk = true;
      return visit.SKIP;
    }
  });

  if (!sectionOk) {
    const message = file.message(
      `Expected SpecName macro for ${context.recipeName}: ${context.ingredient}`,
      heading,
      `${context.source}:${context.recipeName}/${context.ingredient}/expected-macro`
    );
    message.fatal = true;
    utils.logMissingIngredient(file, context);
  }
}

module.exports = handleDataSpecifications;
