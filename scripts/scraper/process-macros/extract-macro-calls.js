/**
 * Given the name of a macro and some HTML,
 * find the all invocations of the macro in the HTML.
 *
 * Return an array, containing one element per invocation,
 * where each element is itself an array containing the arguments
 * with which the macro was called in that invocation.
 */
function extractMacroCalls(macroName, html) {
  const regex = new RegExp(`{{\\ ?${macroName}\\((.*?)\\) ?}}`, "gi");
  let allInvocations = [];
  let thisInvocation = [];

  // When the 'g' flag is set for a regex, it stores the index of the last match.
  // You can then use `exec` to iterate through the string finding successive matches:
  // https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/RegExp/exec#Finding_successive_matches
  // A better way would be to use matchAll (https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String/matchAll)
  // but that's only in Node from v12, and we have to support the LTS, which is v10.
  while ((thisInvocation = regex.exec(html)) !== null) {
    // Split by ",", then strip leading and trailing spaces and quotes
    allInvocations.push(
      thisInvocation[1]
        .split(",")
        .map((piece) => piece.replace(/^['" ]+|['" ]+$/g, ""))
    );
  }

  return allInvocations;
}

module.exports = {
  extractMacroCalls,
};
