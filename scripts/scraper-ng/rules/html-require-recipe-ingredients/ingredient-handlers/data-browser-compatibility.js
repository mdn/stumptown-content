const { select } = require("hast-util-select");
const visit = require("unist-util-visit");

const utils = require("./utils.js");

/**
 * Handler for the `data.browser_compatibility` ingredient.
 */
function handleDataBrowserCompatibility(tree, file, context) {
  const id = "Browser_compatibility";
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

  let macroCount = 0;
  visit(
    utils.sliceSection(heading, body),
    node => utils.isMacro(node, "Compat"),
    () => {
      macroCount += 1;
    }
  );

  if (macroCount !== 1) {
    utils.logMissingIngredient(file, context);
  }
}

module.exports = handleDataBrowserCompatibility;
