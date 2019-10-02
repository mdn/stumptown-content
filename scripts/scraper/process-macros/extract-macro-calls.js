/**
 * Given the name of a macro and some HTML,
 * find the all invocations of the macro in the HTML.
 *
 * Return an array, containing one element per invocation,
 * where each element is itself an array containing the arguments
 * with which the macro was called in that invocation.
 */
function extractMacroCalls(macroName, html) {
  const regex = new RegExp(`{{\\ ?${macroName}\\((.*?)\\)}}`, 'gi');
  let allInvocations = [];
  let thisInvocation = [];

  while ((thisInvocation = regex.exec(html)) !== null) {
      // Split by ",", then strip leading and trailing spaces and quotes
      allInvocations.push((thisInvocation[1].split(',').map(piece => piece.replace(/^['" ]+|['" ]+$/g, ''))));
  }

  return allInvocations;
}

module.exports = {
  extractMacroCalls
};
