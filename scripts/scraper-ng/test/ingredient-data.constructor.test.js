const { process } = require("./framework/utils");

const sources = {
  valid_constructor: `<h2 id="Constructor">Constructor</h2>
<dl>
  <dt><a><code>Thing</code></a></dt>
  <dd>Creates a new <a>Thing</a> object.</dd>
</dl>`,

  invalid_constructor_section_missing: `<p>Some content</p>`,

  invalid_multiple_constructors: `<h2 id="Constructor">Constructor</h2>
<dl>
  <dt><a><code>Thing</code></a></dt>
  <dd>Creates a new <a>Thing</a> object.</dd>
  <dt><a><code>Thing2</code></a></dt>
  <dd>Creates a new <a>Thing2</a> object.</dd>
</dl>`,

  invalid_dd_structure: `<h2 id="Constructor">Constructor</h2>
<dl>
  <dt><a><code>Thing</code></a></dt>
  <dd>Creates a new Thing object.</dd>
</dl>`,

  invalid_dd_content: `<h2 id="Constructor">Constructor</h2>
<dl>
  <dt><a><code>Thing</code></a></dt>
  <dd>Create a <a>Thing</a> object.</dd>
</dl>`,
};

describe("data.constructor", () => {
  const testRecipe = { body: ["data.constructor"] };

  test("valid constructor", () => {
    const file = process(sources.valid_constructor, testRecipe);

    expect(file.messages).toStrictEqual([]);
  });

  test("constructor section missing", () => {
    const file = process(
      sources.invalid_constructor_section_missing,
      testRecipe
    );

    expect(file.messages.length).toBe(1);
    expect(file).hasMessageWithId("data.constructor/expected-heading");
  });

  test("multiple constructors", () => {
    const file = process(sources.invalid_multiple_constructors, testRecipe);

    expect(file.messages.length).toBe(2);
    expect(file).hasMessageWithId(
      "data.constructor/only-single-constructor-dt"
    );
    expect(file).hasMessageWithId(
      "data.constructor/only-single-constructor-dd"
    );
  });

  test("invalid dd structure", () => {
    const file = process(sources.invalid_dd_structure, testRecipe);

    expect(file.messages.length).toBe(1);
    expect(file).hasMessageWithId(
      "data.constructor/constructor-description-three-nodes"
    );
  });

  test("invalid dd content", () => {
    const file = process(sources.invalid_dd_content, testRecipe);

    expect(file.messages.length).toBe(1);
    expect(file).hasMessageWithId(
      "data.constructor/constructor-description-first-node"
    );
  });
});
