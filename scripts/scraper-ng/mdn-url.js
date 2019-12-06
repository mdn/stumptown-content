/**
 * Return an absolute URI baed on `developer.mozilla.org`. If the input string
 * is an absolute reference (such as `/en-US/docs/Web/HTML/Element/input`), then
 * return an absolute URI (such as
 * `https://developer.mozilla.org/en-US/docs/Web/HTML/Element/input`). If the
 * input string is already an absolute URI, then return that (whether it's an
 * MDN URI or not.)
 *
 * @param {String} input
 * @returns {URL} an absolute URI
 */
function mdnUrl(input) {
  return new URL(input, "https://developer.mozilla.org/");
}

module.exports = mdnUrl;
