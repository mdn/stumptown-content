const fs = require('fs');
const path = require('path');

const escape = require('escape-html');
const { renderIE } = require('./render-ie');
const { renderAttributes } = require('./render-attributes');
const { renderExamples } = require('./render-examples');

const writeToFile = (elementName, html) => {
    const destDir = path.join(process.cwd(),'rendered/html/elements');
    if (!fs.existsSync(destDir)) {
      fs.mkdirSync(destDir, { recursive: true });
  }
    fs.writeFileSync(path.join(destDir, `${elementName}.html`), html);
};

function renderHTML(elementName) {
    elementPath = path.join(process.cwd(), './packaged/html/elements', `${elementName}.json`);

    if (!fs.existsSync(elementPath)) {
        console.error(`Could not find an item at "${elementPath}"`);
        return 1;
    }

    const elementJSON = JSON.parse(fs.readFileSync(elementPath, 'utf8')).html.elements[elementName];

    let rendered =
`<!DOCTYPE html>

<html lang="en">
  <head>
    <meta charset="utf-8">
    <title>${elementJSON.title}</title>
  </head>
<body>`;
    rendered += `<h1>${escape(elementJSON.title)}</h1>\n`;
    rendered += `${elementJSON.prose['short-description']}\n`;
    rendered += renderIE(elementJSON.interactive_example_url);
    rendered += `${elementJSON.prose.overview}\n`;
    rendered += renderAttributes(elementJSON.attributes);
    rendered += renderExamples(elementJSON.examples);
    rendered += '</body></html>';

    writeToFile(elementName, rendered);
}

renderHTML(process.argv.slice(2));
