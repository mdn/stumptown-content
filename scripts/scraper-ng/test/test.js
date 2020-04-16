const path = require("path");

const vfile = require("vfile");

const kumascriptRehype = require("../plugins/kumascript-rehype-parse");

// This processor skips fetching anything from the wiki
const processor = kumascriptRehype().use([require("../preset")]);

/**
 * Process a source string as if it were wiki source.
 *
 * @param {String} sourceString - Some Kuma HTML
 * @param {*} recipePath - The path to a file that looks like a recipe YAML file (e.g., has a `body` with valid ingredients)
 * @returns {vfile} a processed vfile
 */
function processFromSource(sourceString, recipePath) {
  const file = vfile({ contents: sourceString, data: { recipePath } });
  file.data.recipePath = processor.processSync(file);
  return file;
}

describe("data.browser_compatibility", () => {
  test("valid ingredient", () => {
    const file = processFromSource(
      `<h2 id="Browser_compatibility">Browser compatibility</h2>
      <div class="hidden">The compatibility table on this page is generated from structured data. If you'd like to contribute to the data, please check out <a class="external" href="https://github.com/mdn/browser-compat-data">https://github.com/mdn/browser-compat-data</a> and send us a pull request.</div>
      <p>{{Compat("javascript.builtins.BigInt")}}</p>`,
      path.resolve(__dirname, "bcd-test-recipe.yaml")
    );

    expect(file.messages).toStrictEqual([]);
  });

  test("missing heading", () => {
    const file = processFromSource(
      "\n", // The KumaScript parser (vendor/parser.js) requires at least a newline, or it'll throw a SyntaxError
      path.resolve(__dirname, "bcd-test-recipe.yaml")
    );

    expect(file.messages.length).toBe(1);
    expect(file.messages[0].ruleId).toMatch(/expected-heading/);
  });

  test("missing compat macro", () => {
    const file = processFromSource(
      `<h2 id="Browser_compatibility">Browser compatibility</h2>
      <div class="hidden">The compatibility table on this page is generated from structured data. If you'd like to contribute to the data, please check out <a class="external" href="https://github.com/mdn/browser-compat-data">https://github.com/mdn/browser-compat-data</a> and send us a pull request.</div>
      <p>Ain't nobody here but us chickens</p>`,
      path.resolve(__dirname, "bcd-test-recipe.yaml")
    );

    expect(file.messages.length).toBe(1);
    expect(file.messages[0].ruleId).toMatch(/expected-macro/);
  });
});
