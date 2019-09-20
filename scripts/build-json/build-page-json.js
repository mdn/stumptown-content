const fs = require('fs');
const path = require('path');
const yaml = require('js-yaml');
const matter = require('gray-matter');

const { packageBCD } = require('./resolve-bcd');
const { packageExamples } = require('./compose-examples');
const { packageAttributes } = require('./compose-attributes');
const { packageInteractiveExample } = require('./compose-interactive-example');
const { packageProse } = require('./slice-prose');
const { packageContributors } = require('./resolve-contributors');
const related = require('./related-content');
const guide = require('./build-guide-page-json');
const landing = require('./build-landing-page-json');
const { ROOT } = require('./constants');


function writeToFile(json, elementPath) {
    // 'elementPath' is the folder the source came from
    // Like '/path/to/stumptown/content/html/element/video for example. 
    const propertyName = path.basename(elementPath);
    const dirName = path.dirname(elementPath);
    const dest = path.join(dirName.replace(
        path.join(ROOT, 'content'),
        path.join(ROOT, 'packaged')
    ), `${propertyName}.json`);
    const destDir = path.dirname(dest);
    if (!fs.existsSync(destDir)) {
        fs.mkdirSync(destDir, { recursive: true });
    }
    fs.writeFileSync(dest, JSON.stringify(json, null, 2));
    return dest;
}

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

async function buildFromRecipe(elementPath, data, content) {
    const recipePath = path.join(__dirname, '..', '..', 'recipes', `${data.recipe}.yaml`);
    const recipe = yaml.safeLoad(fs.readFileSync(recipePath, 'utf8'));
    const item = {
      title: data.title,
      mdn_url: data.mdn_url,
      related_content: await related.buildRelatedContent(recipe.related_content),
      body: []
    };

    const proseSections = await packageProse(content);

    // for each ingredient in the recipe, process the item's ingredient
    for (let ingredient of recipe.body) {
        const [ingredientType, ingredientName] = ingredient.replace(/\?$/, '').split('.');
        if (ingredientType === 'meta') {
            // non-prose ingredients, which are specified in front matter
            const value = await processMetaIngredient(elementPath, ingredientName, data);
            if (value !== null) {
                item.body.push({
                  type: ingredientName,
                  value: value
                });
            }
        } else if (ingredientType === 'prose' && ingredientName === '*') {
            // additional (unnamed) prose sections
            const additionalProse = proseSections.filter(section => !section.value.id);
            item.body.push(...additionalProse);
        } else if (ingredientType === 'prose') {
            // named prose sections
            const matches = proseSections.filter(section => section.value.id === ingredientName);
            item.body.push(...matches);
        } else {
            throw new Error(`Unrecognized ingredient type: ${ingredientType} in ${elementPath}`);
        }
    }

    const contributorsPath = path.join(elementPath, 'contributors.md');
    item.contributors = await packageContributors(contributorsPath);

    return item;
}

async function buildPageJSON(docsPath) {
    // open docs.md and parse front matter(data) from Markdown(content)
    const docsDirectory = path.dirname(docsPath);
    const docs = fs.readFileSync(docsPath, 'utf8');
    const { data, content } = matter(docs);

    // What was written
    let destPath = null;

    // check whether this is a buildable item
    if (data && data.recipe) {
        // build the item
        let item = null;

        let elementDirectory = docsDirectory;

        switch (data.recipe) {
            case 'guide':
                item = await guide.buildGuidePageJSON(docsDirectory, data, content);
                // Guide pages are special because they don't have their own 
                // directory. Instead, individual .md files share a directory. 
                // So we need to override the name of the directory to write to.
                elementDirectory = path.join(docsDirectory, path.basename(docsPath).split('.')[0]);
                break;
            case 'landing-page':
                item = await landing.buildLandingPageJSON(docsDirectory, data, content);
                // Landing pages are special because they don't have their own
                // directory. Instead, individual .md files share a directory.
                // So we need to override the name of the directory to write to.
                elementDirectory = path.join(docsDirectory, path.basename(docsPath).split('.')[0]);
                break;
            case 'html-element':
                item = await buildFromRecipe(docsDirectory, data, content);
                break;
            default:
                throw new Error(`Not a supported recipe: ${data.recipe}`);
        }

        destPath = writeToFile(item, elementDirectory);
    } 

    return { docsPath, destPath };
}

module.exports = {
    buildPageJSON
}
