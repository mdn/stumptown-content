/**
 * Make the case of a macro consistent with other possible invocations of this
 * macro.
 *
 * The right thing to do probably involves finding out the canonical name of
 * every macro, but for now, this just lower cases the name.
 *
 * @param {String} name - a macro name
 * @returns {String}
 */
function normalizeMacroName(name) {
  // This is the same method that KumaScript itself uses for normalization
  // https://github.com/mdn/kumascript/blob/f6ecd0b/src/render.js#L54
  return name.replace(/:/g, "-").toLowerCase();
}

module.exports = normalizeMacroName;
