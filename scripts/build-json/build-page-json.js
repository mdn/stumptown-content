const fs = require('fs');
const path = require('path');
const yaml = require('js-yaml');

const bcd = require('./resolve-bcd');
const examples = require('./compose-examples');
const attributes = require('./compose-attributes');
const prose = require('./slice-prose');
const contributors = require('./resolve-contributors');

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

    // open meta.yaml and check the recipe type
    const meta = yaml.safeLoad(fs.readFileSync(path.join(elementPath, 'meta.yaml'), 'utf8'));
    if (meta.recipe !== 'html-element') {
        console.warn(`Not an HTML element: ${elementPath}`);
        return 2;
    }

    // initialise some paths for more resources
    const examplesPaths = meta.examples.map(relativePath => path.join(elementPath, relativePath));
    const prosePath = path.join(elementPath, 'prose.md');
    const contributorsPath = path.join(elementPath, 'contributors.md');

    // set up data
    const data = {};
    data.title = meta.title;
    data.mdn_url = meta['mdn-url'];
    data.interactive_example_url = meta['interactive-example'];
    data.browser_compatibility = bcd.package(meta['browser-compatibility']);
    if (meta.attributes['element-specific']) {
        const attributesPath = path.join(elementPath, meta.attributes['element-specific']);
        data.attributes = await attributes.package(attributesPath);
    } else {
        data.attributes = [];
    }
    data.examples = await examples.package(examplesPaths);
    data.prose = await prose.package(prosePath);

    // set up element metadata
    data.contributors = await contributors.package(contributorsPath);

    writeToFile(data, elementRelativePath);
    console.log(`Processed: ${elementRelativePath}`);
    return 0;
}

module.exports = {
    buildPageJSON
}
