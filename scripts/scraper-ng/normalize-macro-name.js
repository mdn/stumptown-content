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
  return name.toLowerCase();
}

module.exports = normalizeMacroName;
