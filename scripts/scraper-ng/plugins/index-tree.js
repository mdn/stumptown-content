const visit = require("unist-util-visit");

/**
 * Annotate every node with `node.data.pageIndex`, its index in the original
 * tree in a [preorder](https://github.com/syntax-tree/unist#preorder)
 * traversal.
 *
 * For example, given some tree based on the HTML:
 *
 * ```html
 * <span><a>Some text</a></span>
 * ```
 *
 * The `data.pageIndex` `for `<span>` is `0` and `data.pageIndex` for the
 * literal `Some text` is 2.
 *
 */
function indexTreePlugin() {
  return function transformer(tree) {
    let pageIndex = -1;
    visit(tree, (node) => {
      pageIndex = pageIndex + 1;

      if (node.data == undefined) {
        node.data = {};
      }

      node.data.pageIndex = pageIndex;
    });
  };
}

module.exports = indexTreePlugin;
