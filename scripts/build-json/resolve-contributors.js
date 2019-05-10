const fs = require('fs');
const path = require('path');

const marked = require('marked');

function package(contributorsPath) {
    const contributorsMD = fs.readFileSync(contributorsPath, 'utf8');
    return marked(contributorsMD);
}

module.exports = {
  package
}
