const { process } = require("./framework/utils");

describe("html-h2-avoid-name-attribute", () => {
  const recipe = { body: ["data.browser_compatibility"] };
  const messageId = /h2-name-attr/;

  test("warning-on-h2-name-attr", () => {
    const file = process(
      `<h2 id="Browser_compatability" name="Browser_compatability">Browser compatability</h2>`,
      recipe
    );

    expect(file).hasMessageWithId(messageId);
  });

  test("no-warning-without-h2-attr", () => {
    const file = process(
      `<h2 id="Browser_compatability">Browser compatability</h2>`,
      recipe
    );

    expect(file).not.hasMessageWithId(messageId);
  });
});
