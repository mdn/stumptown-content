const { extractMacroCalls } = require('./extract-macro-calls');
const { removeNode } = require('../clean-html.js');

function processCompat(htmlWithMacroCalls, result) {
  const macroCalls = extractMacroCalls('Compat', htmlWithMacroCalls);
  if (macroCalls[0]) {
    result.frontMatter += macroCalls.length? `browser_compatibility: ${macroCalls[0][0]}\n`: '';
  }
  removeNode(result.dom, 'div.bc-data');
  return result;
}

module.exports = {
  processCompat
};
