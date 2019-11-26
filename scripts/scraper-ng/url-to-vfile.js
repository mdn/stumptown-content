const fetch = require("node-fetch");
const isVFileMessage = require("is-vfile-message");
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
    data: { url: url }
  });

  try {
    const response = await fetch(toRaw(url));
    if (response.ok) {
      f.contents = await response.text();
    } else {
      f.fail(`${response.status} ${response.statusText}`);
    }
  } catch (err) {
    if (!isVFileMessage(err)) {
      const message = f.message(err.message);
      message.fatal = true;
    }
    return f;
  }

  return f;
}

function toRaw(url) {
  const u = new URL(url);
  u.search = `?raw`;

  return u;
}

module.exports = toVFile;
