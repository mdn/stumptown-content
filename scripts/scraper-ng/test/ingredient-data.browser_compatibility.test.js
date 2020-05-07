const {
  process,
  expectPositionNode,
  expectNullPosition,
} = require("./framework/utils");

describe("data.browser_compatibility", () => {
  const testRecipe = { body: ["data.browser_compatibility"] };
  const p = (src) => process(src, testRecipe);

  test("valid ingredient", () => {
    const file = p(
      `<h2 id="Browser_compatibility">Browser compatibility</h2>
      <div class="hidden">The compatibility table on this page is generated from structured data. If you'd like to contribute to the data, please check out <a class="external" href="https://github.com/mdn/browser-compat-data">https://github.com/mdn/browser-compat-data</a> and send us a pull request.</div>
      <p>{{Compat("javascript.builtins.BigInt")}}</p>`,
      testRecipe
    );

    expect(file.messages).toStrictEqual([]);
    expect(file).not.hasMessageWithId(/expected-heading/);
    expectPositionNode(file.data.ingredients[0], "data.browser_compatibility");
  });

  test("missing heading", () => {
    const file = p("");

    expect(file.messages.length).toBe(1);
    expect(file).hasMessageWithId(/expected-heading/);
    expectNullPosition(file.data.ingredients[0], "data.browser_compatibility");
  });

  test("missing compat macro", () => {
    const file = p(
      `<h2 id="Browser_compatibility">Browser compatibility</h2>
      <div class="hidden">The compatibility table on this page is generated from structured data. If you'd like to contribute to the data, please check out <a class="external" href="https://github.com/mdn/browser-compat-data">https://github.com/mdn/browser-compat-data</a> and send us a pull request.</div>
      <p>Ain't nobody here but us chickens</p>`
    );

    expect(file.messages.length).toBe(1);
    expect(file).hasMessageWithId(/expected-macro/);
    expectNullPosition(file.data.ingredients[0], "data.browser_compatibility");
  });
});
