const fetch = require("node-fetch");
const vfile = require("vfile");

/**
 * Returns a promise for the creation of a `VFile` object with the following
 * details:
 *
 * - `pathname` is the URL pathname (e.g.,
 *   `https://developer.mozilla.org/en-US/docs/Web/HTML/Element/span` becomes
 *   `/en-US/docs/Web/HTML/Element/span`)
 * - `contents` is the contents of the fetched page with query parameters `raw`
 * - `data.url` is the original URL
 *
 */
async function toVFile(url) {
  const { pathname } = new URL(url);
  const f = vfile({
    path: pathname,
    cwd: null,
    data: { url }
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
