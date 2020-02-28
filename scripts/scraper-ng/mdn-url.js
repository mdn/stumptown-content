/**
 * Return an absolute URL based on `https://wiki.developer.mozilla.org`.
 * If the input string is an absolute reference (such as
 * `/en-US/docs/Web/HTML/Element/input`), then return an absolute URL (such as
 * `https://wiki.developer.mozilla.org/en-US/docs/Web/HTML/Element/input`).
 * If the input string is already an absolute URL, then return that
 * (whether it's an MDN URL or not.)
 *
 * @param {String} input
 * @returns {URL} an absolute URL
 */
function mdnUrl(input) {
  return new URL(input, "https://wiki.developer.mozilla.org/");
}

module.exports = mdnUrl;
