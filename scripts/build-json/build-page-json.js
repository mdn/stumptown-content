const fs = require('fs');
const path = require('path');
const yaml = require('js-yaml');
const matter = require('gray-matter');

const bcd = require('./resolve-bcd');
const examples = require('./compose-examples');
const attributes = require('./compose-attributes');
const prose = require('./slice-prose');
const contributors = require('./resolve-contributors');
const related = require('./related-content');
const guide = require('./build-guide-page-json');

function writeToFile(json, elementPath) {
  const propertyName = path.basename(elementPath);
  const dirName = path.dirname(elementPath);
  const dest = path.join(process.cwd(), 'packaged', dirName, `${propertyName}.json`);
  const destDir = path.dirname(dest);
  if (!fs.existsSync(destDir)) {
      fs.mkdirSync(destDir, { recursive: true });
  }
  fs.writeFileSync(dest, `${JSON.stringify(json, null, 2)}`);
};

async function processMetaIngredient(elementPath, ingredientName, data) {
    switch (ingredientName) {
        case 'interactive_example':
            return data.interactive_example;
        case 'browser_compatibility':
            return bcd.package(data.browser_compatibility);
        case 'attributes':
            if (data.attributes.element_specific) {
                const attributesPath = path.join(elementPath, data.attributes.element_specific);
                return await attributes.package(attributesPath);
            } else {
                return [];
            }
        case 'examples':
            const examplesPaths = data.examples.map(relativePath => path.join(elementPath, relativePath));
            return await examples.package(examplesPaths);
        case 'info_box':
            // TODO: implement packaging for info boxes
            // See: https://github.com/mdn/stumptown-content/issues/106
            return 'info_box-value';
        default:
            console.error(`Error: Unrecognized ingredient: ${ingredient}`);
            return null;
    }
}

async function processProseIngredient(ingredientName, proseSections) {
    if (ingredientName !== '*') {
        const matches = proseSections.filter(section => section.value.id === ingredientName);
        if (matches.length > 0) {
            return matches[0];
        }
    } else {
        const additional = proseSections.filter(section => !section.value.id);
        return {
          type: 'additional_prose',
          value: additional
        };
    }
}

async function buildFromRecipe(elementPath, data, content) {
    const item = {};
    item.title = data.title;
    item.mdn_url = data.mdn_url;

    const recipePath = path.join(process.cwd(), './recipes', `${data.recipe}.yaml`);
    const recipe = yaml.safeLoad(fs.readFileSync(recipePath, 'utf8'));
    item.related_content = related.buildRelatedContent(recipe.related_content);

    // for each ingredient in the recipe, process the item's ingredient
    const proseSections = await prose.package(content);
    item.body = await Promise.all(recipe.body.map(async ingredient => {
        const [ingredientType, ingredientName] = ingredient.replace(/\?$/, '').split('.');
        if (ingredientType === 'meta') {
            const value = await processMetaIngredient(elementPath, ingredientName, data);
            if (value) {
                return {
                  type: ingredientName,
                  value: value
                };
            }
        } else if (ingredientType === 'prose') {
            return await processProseIngredient(ingredientName, proseSections);
        } else {
            throw (`Error: Unrecognized ingredient type: ${ingredientType}`);
        }
    }));
    // filter out missing ingredients
    item.body = item.body.filter(x => !!x);

    const contributorsPath = path.join(elementPath, 'contributors.md');
    item.contributors = await contributors.package(contributorsPath);

    return item;
}

async function buildPageJSON(elementRelativePath, elementFilename) {
    const elementPath = path.join(process.cwd(), './content', elementRelativePath);

    if (!fs.existsSync(elementPath)) {
        console.error(`Could not find an item at "${elementPath}"`);
        return 1;
    }

    // open docs.md and parse front matter(data) from Markdown(content)
    const docsPath = path.join(elementPath, elementFilename);
    const docs = fs.readFileSync(docsPath, 'utf8');
    const { data, content } = matter(docs);

    // check whether this is a buildable item
    if (!data || !data.recipe) {
        return 0;
    }

    // build the item
    let item = null;

    switch (data.recipe) {
        case 'guide':
            item = await guide.buildGuidePageJSON(elementPath, data, content);
            elementRelativePath = path.join(elementRelativePath, elementFilename.split('.')[0]);
            break;
        case 'html-element':
            item = await buildFromRecipe(elementPath, data, content);
            break;
        default:
            console.warn(`Not a supported recipe: ${elementPath}`);
            return 2;
    }

    writeToFile(item, elementRelativePath);
    console.log(`Processed: ${elementRelativePath}`);
    return 0;
}

module.exports = {
    buildPageJSON
}
