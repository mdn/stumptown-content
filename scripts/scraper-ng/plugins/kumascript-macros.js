const findAndReplace = require("hast-util-find-and-replace");

const normalizeMacroName = require("../normalize-macro-name");

/*
 * Find KumaScript macros in text literal nodes and put them in separate nodes
 * with data about the macro calls.
 */

const macroRegex = /{{ ?(\w+)\((.*?)\) ?}}/g;

function kumascriptMacrosPlugin() {
  return function transformer(tree) {
    findAndReplace(tree, macroRegex, match => {
      const groups = match.match(new RegExp(macroRegex.source, ""));
      const macroCall = groups[1];
      const macroName = normalizeMacroName(macroCall);
      const macroParams = processParams(groups[2]);

      return {
        type: "text",
        value: match,
        data: {
          macroCall,
          macroName,
          macroParams
        }
      };
    });
  };
}

function processParams(paramsString) {
  return paramsString
    .split(",")
    .map(param => dequote(param.trim(), ["'", '"']));
}

function dequote(str, quoteChars) {
  for (const char of quoteChars) {
    if (str.startsWith(char) && str.endsWith(char)) {
      return str.slice(1, -1);
    }
  }
  return str;
}

module.exports = kumascriptMacrosPlugin;
