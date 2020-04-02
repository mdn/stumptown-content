const findAndReplace = require("hast-util-find-and-replace");
const rehypeParser = require("rehype-parse");
const stringify = require("rehype-stringify");
const unified = require("unified");

const kumaScriptParser = require("../vendor/parser");
const normalizeMacroName = require("../normalize-macro-name");

/**
 * A unified plugin that wraps `rehype-parse` with some code that protects
 * KumaScript macro source from being parsed as HTML.
 *
 * KumaScript allows some HTML to be passed as arguments to KumaScript macro
 * calls. Because rehype is not aware of KumaScript, it parses such HTML as if
 * it were part of the document. This breaks attempts to find KumaScript macros
 * in hast trees produced by rehype. To avoid this problem, this plugin:
 *
 * 1. Finds all the macro calls in the source and preserves the original source
 *    elsewhere, using KumaScript's parser.
 * 2. Scrubs the arguments of the macro calls from the source.
 * 3. Parses the HTML into a hast tree.
 * 4. Reinstates the original macro call source back into the hast tree as text
 *    nodes with additional data.
 */
const processor = unified()
  .use(rehypeParser)
  .use(KumaScriptRehypeParser)
  .use(stringify);

/**
 * Wrap the `Parser` provided by rehype with macro finding, removal, and reinstatement.
 *
 */
function KumaScriptRehypeParser() {
  const originalRehypeParser = this.Parser;
  this.Parser = function (doc, file) {
    findMacros(doc, file);

    const ast = originalRehypeParser(removeMacroArgs(doc, file), file);

    return reinstateMacroArgs(ast, file);
  };
}

/**
 * Use the KumaScript parser to find and record details about macro calls in
 * wiki source. This adds a new `data` attribute to the `VFile`, `ksMacroData`.
 *
 * @param {String} doc - the source of a page
 * @param {VFile} file - a VFile
 */
function findMacros(doc, file) {
  const macros = kumaScriptParser.parse(doc).flatMap((item) => {
    if (item.type === "MACRO") {
      item.originalString = doc.substring(
        item.location.start.offset,
        item.location.end.offset
      );
      return [item];
    }
    return [];
  });

  file.data.ksMacroData = macros;
}

/**
 * Remove KumaScript macro call args from files annotated with `findMacros`, in
 * preparation for parsing with Rehype.
 *
 * @param {String} doc - the source of the page
 * @param {VFile} file - a VFile with `vfile.data.ksMacroData`
 * @returns the source without the original macro calls
 */
function removeMacroArgs(doc, file) {
  for (const macro of file.data.ksMacroData) {
    const sourceLength =
      macro.location.end.offset - macro.location.start.offset;
    const placeholder = `{{${macro.name.padEnd(sourceLength - 4, "-")}}}`;

    doc = replaceAt(doc, placeholder, macro.location.start.offset);
  }

  return doc;
}

/**
 * Restore KumaScript macro calls back into the text of a source treated with
 * `removeMacroArgs`.
 *
 * @param {Node} ast - a hast tree
 * @param {VFile} file - a VFile with `vfile.data.ksMacroData`
 * @returns a hast tree
 */
function reinstateMacroArgs(ast, file) {
  const newAst = findAndReplace(ast, /\{\{\s*([^(} ]+\}\})/g, (match) => {
    const nextMacro = file.data.ksMacroData.shift();

    if (match.length !== nextMacro.originalString.length) {
      throw Error(
        "Reinstating a macro call into the source failed with a length mistmatch. This is a bug. Please file an issue."
      );
    }

    return {
      type: "text",
      value: nextMacro.originalString,
      position: nextMacro.location.start,
      data: {
        macroCall: nextMacro.name,
        macroName: normalizeMacroName(nextMacro.name),
        macroParams: nextMacro.args,
      },
    };
  });

  if (file.data.ksMacroData.length > 0) {
    throw Error(
      "Not all macro calls were reinstated into the source. This is a bug. Please file an issue."
    );
  }

  delete file.data.ksMacroData;
  return newAst;
}

/**
 * Replace a substring at a given offset.
 *
 * @param {String} str - a string
 * @param {String} newText - the new text to insert
 * @param {Number} start - the starting offset to overwrite from
 * @returns {String} the string with text replaced
 */
function replaceAt(str, newText, start) {
  const before = str.substring(0, start);
  const after = str.substring(start + newText.length);
  return [before, newText, after].join("");
}

module.exports = processor;
