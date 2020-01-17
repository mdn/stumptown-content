const fetch = require("node-fetch");

const limiter = require("../rate-limiter");

/**
 * Add MDN `$json` data to the VFile's `data` attribute:
 *
 * - `VFile.data.tags` - An array of tags for the page
 * - `VFile.data.title` - The title of the page
 *
 * @returns {Function} A unified transformer
 */
function kumaMetadataPlugin() {
  return async function transformer(tree, file) {
    try {
      const { title, tags } = await fetchJson(file.data.url);
      // eslint-disable-next-line require-atomic-updates
      file.data.tags = tags;
      // eslint-disable-next-line require-atomic-updates
      file.data.title = title;
    } catch (err) {
      const message = file.message(err.message);
      message.fatal = true;
    }
  };
}

/**
 * Fetch the `$json` data for an MDN URL.
 *
 * @param {URL} - an MDN URL
 * @returns {Promise} - A promise for the `$json` URL's JSON data
 */
async function fetchJson(url) {
  await limiter;
  const response = await fetch(toJson(url));
  if (!response.ok) {
    throw Error(
      `Could not fetch page info from ${response.url} (${response.status} ${response.statusText})`
    );
  }

  return response.json();
}

/**
 * Append `$json` to a URL.
 *
 * @param {URL} url
 * @returns {URL} A URL
 */
function toJson(url) {
  const jsonUrl = new URL(url);
  jsonUrl.pathname += "$json";
  return jsonUrl;
}

module.exports = kumaMetadataPlugin;
