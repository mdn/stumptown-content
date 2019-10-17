const fs = require('fs');
const path = require('path');

const { ROOT } = require('./constants');

function buildSpecs(specUrls) {

  // spec_url is optional, return nothing so there is no specifications property
  if (!specUrls) {
    return;
  }
  // spec_url can be just "non-standard", route it through in that case
  if (specUrls === 'non-standard') {
    return specUrls;
  }

  const dataDir = path.resolve(ROOT, 'content', 'data');
  const file = fs.readFileSync(dataDir + '/specifications.json', 'utf8');
  const specMap = JSON.parse(file);

  function findTitle(specUrl) {
    let title = ''
    Object.entries(specMap).forEach(([key, value]) => {
      if (specUrl.includes(key)) {
        title = value;
      }
    });
    if (title === '') {
      console.error(`Domain for "${specUrl}" not found in data/specifications.json`);
    }
    return title;
  }

  // For authoring convenience, you can provide one or more specs
  if (!Array.isArray(specUrls)) {
    specUrls = [specUrls];
  }

  let specifications = [];
  specUrls.forEach(specUrl => {
    specifications.push({
      url: specUrl,
      title: findTitle(specUrl)
    });
  });

  return specifications;
}

module.exports = {
  buildSpecs
}
