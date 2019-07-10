const fs = require('fs');

const markdown = require('./markdown-converter');

async function package(contributorsPath) {
    const contributorsMD = fs.readFileSync(contributorsPath, 'utf8');
    return markdown.toHTML(contributorsMD);
}

module.exports = {
  package
}
