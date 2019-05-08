const fs = require('fs');
const path = require('path');

const marked = require('marked');

function package(contributorsPath) {
    const contributorsMD = fs.readFileSync(contributorsPath, 'utf8');
    console.log(contributorsMD)
        console.log(marked(contributorsMD))
    return marked(contributorsMD);
}

module.exports = {
  package
}
