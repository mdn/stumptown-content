const fs = require('fs');
const path = require('path');
const yaml = require('js-yaml');

const bcd = require('./resolve-bcd');
const examples = require('./compose-examples');
const attributes = require('./compose-attributes');
const prose = require('./slice-prose');
const contributors = require('./resolve-contributors');

const htmlElements = '/content/html/elements';

const writeToFile = (propertyName, json) => {
  const data = {
    html: {
      elements: {
        [propertyName]: json,
      }
    }
  };

  const dest = path.join(process.cwd(),'packaged/html/elements', `${propertyName}.json`);
  const destDir = path.dirname(dest);
  if (!fs.existsSync(destDir)) {
      fs.mkdirSync(destDir, { recursive: true });
  }
  fs.writeFileSync(dest, `${JSON.stringify(data, null, 2)}`);
};

function buildPageJSON(elementPath) {
    elementPath = path.join(process.cwd(), './content', elementPath);

    if (!fs.existsSync(elementPath)) {
        console.error(`Could not find an item at "${elementPath}"`);
        return;
    }

    // open meta.yaml and check the recipe type
    const meta = yaml.safeLoad(fs.readFileSync(path.join(elementPath, 'meta.yaml'), 'utf8'));
    if (meta.recipe !== 'html-element') {
        console.log(`Not an HTMl element: ${elementPath}`);
        return;
    }

    // initialise some paths for more resources
    const examplesPaths = meta.examples.map(relativePath => path.join(elementPath, relativePath));
    const prosePath = path.join(elementPath, 'prose.md');
    const contributorsPath = path.join(elementPath, 'contributors.md');
  
    // make the package
    const element = {};
    element.title = meta.title;
    element.interactive_example_url = meta['interactive-example'];
    element.browser_compatibility = bcd.package(meta['browser-compatibility']);
    if (meta.attributes['element-specific']) {
        const attributesPath = path.join(elementPath, meta.attributes['element-specific']);
        element.attributes = attributes.package(attributesPath);
    } else {
        element.attributes = null;
    }
    element.examples = examples.package(examplesPaths);
    element.prose = prose.package(prosePath);
    element.contributors = contributors.package(contributorsPath);

    const elementName = path.basename(elementPath);
    writeToFile(elementName, element);
    console.log(`Processed: ${elementPath}`);
}

module.exports = {
    buildPageJSON
}
