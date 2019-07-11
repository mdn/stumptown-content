const fs = require('fs');
const path = require('path');
const yaml = require('js-yaml');

const bcd = require('./resolve-bcd');
const examples = require('./compose-examples');
const attributes = require('./compose-attributes');
const prose = require('./slice-prose');
const contributors = require('./resolve-contributors');

const writeToFile = (propertyName, json) => {
  const data = {
    html: {
      elements: {
        [propertyName]: json,
      }
    }
  };

  const dest = path.join(process.cwd(),'packaged/html/reference/elements', `${propertyName}.json`);
  const destDir = path.dirname(dest);
  if (!fs.existsSync(destDir)) {
      fs.mkdirSync(destDir, { recursive: true });
  }
  fs.writeFileSync(dest, `${JSON.stringify(data, null, 2)}`);
};

async function buildPageJSON(elementPath) {
    elementPath = path.join(process.cwd(), './content', elementPath);

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

    // make the package
    const element = {};
    element.title = meta.title;
    element.mdn_url = meta['mdn-url'];
    element.interactive_example_url = meta['interactive-example'];
    element.browser_compatibility = bcd.package(meta['browser-compatibility']);
    if (meta.attributes['element-specific']) {
        const attributesPath = path.join(elementPath, meta.attributes['element-specific']);
        element.attributes = await attributes.package(attributesPath);
    } else {
        element.attributes = [];
    }
    element.examples = await examples.package(examplesPaths);
    element.prose = await prose.package(prosePath);
    element.contributors = await contributors.package(contributorsPath);

    const elementName = path.basename(elementPath);
    writeToFile(elementName, element);
    console.log(`Processed: ${elementPath}`);
    return 0;
}

module.exports = {
    buildPageJSON
}
