const findAndReplace = require("hast-util-find-and-replace");

/*
 * Find KumaScript macros in text literal nodes and put them in separate nodes
 * with data about the macro calls.
 */

module.exports = kumascriptMacrosPlugin;

const macroRegex = /{{ ?(\w+)\((.*?)\) ?}}/;

function kumascriptMacrosPlugin() {
  return function transformer(tree) {
    findAndReplace(tree, macroRegex, match => {
      const groups = match.match(macroRegex);
      const macroName = groups[1];
      const macroParams = groups[2];

      return {
        type: "text",
        value: match,
        data: {
          macroName,
          macroParams
        }
      };
    });
  };
}
