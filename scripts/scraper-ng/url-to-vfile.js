const fetch = require("node-fetch");
const vfile = require("vfile");

const mdnUrl = require("./mdn-url");

/**
 * Returns a promise for the creation a `VFile` object with the following
 * properties:
 *
 * - `pathname` - the URL pathname (e.g.,
 *   `https://developer.mozilla.org/en-US/docs/Web/HTML/Element/span` becomes
 *   `/en-US/docs/Web/HTML/Element/span`)
 * - `contents` - the HTML of the fetched page with the `raw` query parameter
 * - `data.url` - the absolute URL (without the `raw` query paramter)
 *
 * @param {string} input - An absolute reference or URI for an MDN page
 * @returns {vfile} The `VFile` representing the page
 */
async function toVFile(input) {
  const url = mdnUrl(input);

  const f = vfile({
    path: url,
    cwd: null,
    data: { url },
  });

  try {
    const response = await fetchPage(toRaw(url));
    f.contents = await response.text();
  } catch (err) {
    const message = f.message(err.message);
    message.fatal = true;
  }

  return f;
}

async function fetchPage(url) {
  const response = await fetch(url);
  if (!response.ok) {
    throw Error(`${response.status} ${response.statusText}`);
  }
  return response;
}

function toRaw(url) {
  const u = new URL(url);
  u.search = `?raw`;

  return u;
}

module.exports = toVFile;
