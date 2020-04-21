const vfile = require("vfile");

const kumascriptRehype = require("../plugins/kumascript-rehype-parse");

// A unified processor that skips fetching anything from the wiki
const processor = kumascriptRehype().use([require("../preset")]);

/**
 * Process a source string as if it were wiki source.
 *
 * @param {String} sourceString - Some Kuma HTML
 * @param {*} recipePath - The path to a file that looks like a recipe YAML file (e.g., has a `body` with valid ingredients)
 * @returns {vfile} a processed vfile
 */
function processFromSource(sourceString, recipePath) {
  const file = vfile({ contents: sourceString, data: { recipePath } });
  processor.processSync(file);
  return file;
}

module.exports = {
  processFromSource,
};
