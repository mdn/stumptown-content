const fs = require('fs');
const path = require('path');
const yaml = require('js-yaml');
const { ROOT } = require('./constants');

function packageSpecs(specUrls) {

  // spec_url can be just "non-standard", route it through in that case
  if (specUrls === 'non-standard') {
    return specUrls;
  }

  const dataDir = path.resolve(ROOT, 'content', 'data');
  const specMap = yaml.safeLoad(fs.readFileSync(path.join(dataDir, 'specifications.yaml'), 'utf8'));

  function findTitle(specUrl) {
    let title = ''
    Object.entries(specMap).forEach(([key, value]) => {
      if (specUrl.includes(key)) {
        title = value;
      }
    });
    if (title === '') {
      throw new Error(`Domain for "${specUrl}" not found in data/specifications.json`);
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
  packageSpecs
}
