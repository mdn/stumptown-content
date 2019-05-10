const fs = require('fs');
const path = require('path');
const yaml = require('js-yaml');

const bcd = require('./package-bcd');
const examples = require('./package-examples');
const attributes = require('./package-attributes');
const prose = require('./package-prose');
const contributors = require('./package-contributors');

const htmlElements = '/content/html/elements';

const writeToFile = (propertyName, json) => {
  const data = {
    html: {
      elements: {
        [propertyName]: json,
      }
    }
  };

  const dest = path.join(process.cwd(),'packaged', `${propertyName}.json`);
  const destDir = path.dirname(dest);
  if (!fs.existsSync(destDir)) {
      fs.mkdirSync(destDir, { recursive: true });
  }
  fs.writeFileSync(dest, `${JSON.stringify(data, null, 2)}`);
};

function package(elementName) {
    const elementPath = path.join(process.cwd(), htmlElements, elementName);

    if (!fs.existsSync(elementPath)) {
        console.error(`Could not find an element called "${elementName}"`);
        return;
    }

    // open meta.yaml
    const meta = yaml.safeLoad(fs.readFileSync(path.join(elementPath, 'meta.yaml'), 'utf8'));

    // initialise some paths for more resources
    const examplesPaths = meta.examples.map(relativePath => path.join(elementPath, relativePath));
    const attributesPath = path.join(elementPath, meta.attributes['element-specific']);
    const prosePath = path.join(elementPath, 'prose.md');
    const contributorsPath = path.join(elementPath, 'contributors.md');
  
    // make the package
    const element = {};
    element.title = meta.title;
    element.interactive_example_url = meta['interactive-example'];
    element.browser_compatibility = bcd.package(meta['browser-compatibility']);
    element.examples = examples.package(examplesPaths);
    element.attributes = attributes.package(attributesPath);
    element.prose = prose.package(prosePath);
    element.contributors = contributors.package(contributorsPath);

    writeToFile(elementName, element);
}

package(process.argv[2]);
