const vfile = require("vfile");
const fetch = require("node-fetch");

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
    const response = await fetch(toRawMacros(url));
    if (response.ok) {
      f.contents = await response.text();
    } else {
      const message = f.message(`${response.status} ${response.statusText}`);
      message.fatal = true;
    }
  } catch (err) {
    f.message(err.message);
    f.fatal = true;
    return f;
  }

  return f;
}

function toRawMacros(url) {
  const u = new URL(url);
  u.search = `?raw`;

  return u;
}

module.exports = toVFile;
