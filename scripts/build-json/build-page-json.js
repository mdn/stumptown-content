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

async function buildPageJSON(elementRelativePath) {
    const elementPath = path.join(process.cwd(), './content', elementRelativePath);

    if (!fs.existsSync(elementPath)) {
        console.error(`Could not find an item at "${elementPath}"`);
        return 1;
    }

    // open docs.md and parse front matter(data) from Markdown(content)
    const docsPath = path.join(elementPath, 'docs.md');
    const docs = fs.readFileSync(docsPath, 'utf8');
    const { data, content } = matter(docs);

    // check the recipe type
    if (data.recipe !== 'html-element') {
        console.warn(`Not an HTML element: ${elementPath}`);
        return 2;
    }

    // make the package
    const item = {};

    // load the recipe to get related_content
    const recipePath = path.join(process.cwd(), './recipes', `${data.recipe}.yaml`);
    const recipe = yaml.safeLoad(fs.readFileSync(recipePath, 'utf8'));
    item.related_content = related.buildRelatedContent(recipe.related_content);

    item.title = data.title;
    item.mdn_url = data.mdn_url;
    item.interactive_example_url = data.interactive_example;
    item.browser_compatibility = bcd.package(data.browser_compatibility);
  
    if (data.attributes.element_specific) {
        const attributesPath = path.join(elementPath, data.attributes.element_specific);
        item.attributes = await attributes.package(attributesPath);
    } else {
        item.attributes = [];
    }

    const examplesPaths = data.examples.map(relativePath => path.join(elementPath, relativePath));
    item.examples = await examples.package(examplesPaths);
    item.prose = await prose.package(content);

    const contributorsPath = path.join(elementPath, 'contributors.md');
    item.contributors = await contributors.package(contributorsPath);

    writeToFile(item, elementRelativePath);
    console.log(`Processed: ${elementRelativePath}`);
    return 0;
}

module.exports = {
    buildPageJSON
}
