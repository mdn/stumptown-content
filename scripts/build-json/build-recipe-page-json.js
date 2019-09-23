const path = require('path');

const { packageBCD } = require('./resolve-bcd');
const { packageExamples } = require('./compose-examples');
const { packageAttributes } = require('./compose-attributes');
const { packageInteractiveExample } = require('./compose-interactive-example');
const { packageProse } = require('./slice-prose');

async function processMetaIngredient(elementPath, ingredientName, data) {
    switch (ingredientName) {
        case 'interactive_example':
            // interactive_example is optional
            if (!data.interactive_example) {
                return null;
            }
            return packageInteractiveExample(data.interactive_example);
        case 'browser_compatibility':
            return packageBCD(data.browser_compatibility);
        case 'attributes':
            if (data.attributes.element_specific) {
                const attributesPath = path.join(elementPath, data.attributes.element_specific);
                return await packageAttributes(attributesPath);
            } else {
                return [];
            }
        case 'examples': {
          const examplesPaths = data.examples.map(relativePath => path.join(elementPath, relativePath));
          return await packageExamples(examplesPaths);
        }
        case 'info_box':
            // TODO: implement packaging for info boxes
            // See: https://github.com/mdn/stumptown-content/issues/106
            return 'info_box-value';
        default:
            throw new Error(`Unrecognized ingredient: ${ingredientName}`);
    }
}

async function buildRecipePageJSON(elementPath, data, content, recipe) {
    const body = [];

    const proseSections = await packageProse(content);

    // for each ingredient in the recipe, process the item's ingredient
    for (let ingredient of recipe.body) {
        const [ingredientType, ingredientName] = ingredient.replace(/\?$/, '').split('.');
        if (ingredientType === 'meta') {
            // non-prose ingredients, which are specified in front matter
            const value = await processMetaIngredient(elementPath, ingredientName, data);
            if (value !== null) {
                body.push({
                  type: ingredientName,
                  value: value
                });
            }
        } else if (ingredientType === 'prose' && ingredientName === '*') {
            // additional (unnamed) prose sections
            const additionalProse = proseSections.filter(section => !section.value.id);
            body.push(...additionalProse);
        } else if (ingredientType === 'prose') {
            // named prose sections
            const matches = proseSections.filter(section => section.value.id === ingredientName);
            body.push(...matches);
        } else {
            throw new Error(`Unrecognized ingredient type: ${ingredientType} in ${elementPath}`);
        }
    }

    return body;
}

module.exports = {
    buildRecipePageJSON
}
