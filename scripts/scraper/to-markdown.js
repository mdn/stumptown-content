const unified = require("unified");
const parse = require("rehype-parse");
const stringify = require("remark-stringify");
const rehype2remark = require("rehype-remark");
const code = require("./code");

/**
 * Converts the HTML -> Markdown using unified.
 */
function toMarkdown(html) {
  return unified()
    .use(parse)
    .use(rehype2remark, { handlers: { pre: code } })
    .use(stringify, { fences: true })
    .process(html);
}

module.exports = {
  toMarkdown,
};
