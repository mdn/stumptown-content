const vfile = require("vfile");
const h = require("hastscript");

const handleDataBrowserCompatibility = require("./data-browser-compatibility");
const { Logger } = require("./utils");

let file;
let logger;

const treeWithBCD = h("body", [
  h("h2#Browser_compatibility", "Browser compatibility"),
  h("div.hidden", "The compatibility table on this page…"),
  h("p", {
    type: "text",
    value: '{{Compat("javascript.builtins.BigInt")}}',
    data: {
      macroCall: "Compat",
      macroName: "compat",
      macroParams: ["javascript.builtins.BigInt"],
    },
  }),
]);

beforeEach(() => {
  file = new vfile();
  logger = Logger(
    file,
    "testHandler",
    "testRecipe",
    "data.browser_compatability"
  );
});

describe("data.browser_compatability handler", () => {
  test("valid section has no errors", () => {
    handleDataBrowserCompatibility(treeWithBCD, logger);
    expect(file.messages).toStrictEqual([]);
  });

  test("heading must exist", () => {
    const tree = h("body"); // empty

    handleDataBrowserCompatibility(tree, logger);

    expect(file.messages.length).toBe(1);
    expect(file.messages[0].ruleId).toMatch(/expected-heading/);
  });

  test("compat macro must exist", () => {
    h("body", [
      h("h2#Browser_compatibility", "Browser compatibility"),
      h("div.hidden", "The compatibility table on this page…"),
      h("p"),
    ]);
  });
});
