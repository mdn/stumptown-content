/**
 * Content authors provide keyword values for the height of the iframe needed
 * for their example. We map keywords to pixel values here.
 */
const keywordToPixels = {
  "js-short": 410,
  "js-standard": 490,
  "js-tall": 692,
  "css-standard": 390,
  "html-short": 375,
  "html-standard": 445,
  "html-tall": 655,
};

function packageInteractiveExample(interactiveExampleSpec) {
  const heightInPixels = keywordToPixels[interactiveExampleSpec.height];
  if (!heightInPixels) {
    throw new Error(
      `Unrecognized value for interactive_examples.height: ${interactiveExampleSpec.height}`
    );
  }
  return {
    url: interactiveExampleSpec.url,
    height: heightInPixels,
  };
}

module.exports = {
  packageInteractiveExample,
};
