const {
  process,
  expectNullPosition,
  expectPositionElement,
} = require("./framework/utils");

const sources = {
  no_static_methods: `<p>Some content.</p>
<p>Some more content.</p>`,

  valid_static_methods_with_a: `<p>Some content.</p>
<h2 id="Static_methods">Static methods</h2>
<dl>
  <dt><a><code>A link</code></a></dt>
  <dd>A description</dd>
  <dt><a><code>Another link</code></a></dt>
  <dd>A description</dd>
</dl>`,

  valid_static_methods_with_xref: `<p>Some content.</p>
<h2 id="Static_methods">Static methods</h2>
<dl>
  <dt>{{jsxref}}</dt>
  <dd>A description</dd>
</dl>`,

  invalid_static_methods_empty_heading: `<p>Some content.</p>
<h2 id="Static_methods">Static methods</h2>`,

  invalid_static_methods_empty_dl: `<p>Some content.</p>
<h2 id="Static_methods">Static methods</h2>
<dl></dl>`,

  invalid_static_methods_heading_with_non_dl: `<p>Some content.</p>
<h2 id="Static_methods">Static methods</h2>
<p>Not a dl</p>
<dl></dl>`,

  invalid_static_methods_heading_with_multiple_dl: `<p>Some content.</p>
<h2 id="Static_methods">Static methods</h2>
<dl>
  <dt><a><code>A link</code></a></dt>
  <dd>A description</dd>
</dl>
<dl>
  <dt><a><code>A link</code></a></dt>
  <dd>A description</dd>
</dl>`,

  invalid_static_methods_no_valid_dt: `<p>Some content.</p>
<h2 id="Static_methods">Static methods</h2>
<dl>
  <dt><p>A link</p></dt>
  <dd>A description</dd>
</dl>`,

  invalid_static_methods_unordered_dl: `<p>Some content.</p>
<h2 id="Static_methods">Static methods</h2>
<dl>
  <dt><a><code>Another link</code></a></dt>
  <dd>A description</dd>
  <dt><a><code>A link</code></a></dt>
  <dd>A description</dd>
</dl>`,
};

describe("data.static_methods", () => {
  const testRecipe = { body: ["data.static_methods?"] };

  test("no static methods", () => {
    const file = process(sources.no_static_methods, testRecipe);

    expect(file.messages).toStrictEqual([]);
  });

  test("valid static methods with A elements", () => {
    const file = process(sources.valid_static_methods_with_a, testRecipe);

    expect(file.messages).toStrictEqual([]);
  });

  test("valid static methods with jsxref", () => {
    const file = process(sources.valid_static_methods_with_xref, testRecipe);

    expect(file.messages.length).toBe(1);
    expect(file.messages[0].ruleId).toEqual("jsxref");
    expectPositionElement(
      file.data.ingredients[0],
      "data.static_methods?",
      "h2"
    );
  });

  test("invalid static methods with empty heading", () => {
    const file = process(
      sources.invalid_static_methods_empty_heading,
      testRecipe
    );

    expect(file.messages.length).toBe(1);
    expect(file).hasMessageWithId(
      "data.static_methods?/only-single-dl-element-in-link-list"
    );
    expectNullPosition(file.data.ingredients[0], "data.static_methods?");
  });

  test("invalid static methods with empty dl", () => {
    const file = process(sources.invalid_static_methods_empty_dl, testRecipe);

    expect(file.messages.length).toBe(1);
    expect(file).hasMessageWithId("data.static_methods?/dl-must-contain-dt");
    expectNullPosition(file.data.ingredients[0], "data.static_methods?");
  });

  test("invalid static methods with extra non-dl", () => {
    const file = process(
      sources.invalid_static_methods_heading_with_non_dl,
      testRecipe
    );

    expect(file.messages.length).toBe(1);
    expect(file).hasMessageWithId(
      "data.static_methods?/only-single-dl-element-in-link-list"
    );
    expectNullPosition(file.data.ingredients[0], "data.static_methods?");
  });

  test("invalid static methods with multiple dl", () => {
    const file = process(
      sources.invalid_static_methods_heading_with_multiple_dl,
      testRecipe
    );

    expect(file.messages.length).toBe(1);
    expect(file).hasMessageWithId(
      "data.static_methods?/only-single-dl-element-in-link-list"
    );
    expectNullPosition(file.data.ingredients[0], "data.static_methods?");
  });

  test("invalid static methods with invalid dt", () => {
    const file = process(
      sources.invalid_static_methods_no_valid_dt,
      testRecipe
    );

    expect(file.messages.length).toBe(1);
    expect(file).hasMessageWithId(
      "data.static_methods?/only-single-anchor-element-or-xref-in-link-list-dt"
    );
    expectNullPosition(file.data.ingredients[0], "data.static_methods?");
  });

  test("invalid static methods with unordered dl", () => {
    const file = process(
      sources.invalid_static_methods_unordered_dl,
      testRecipe
    );

    expect(file.messages.length).toBe(1);
    expect(file).hasMessageWithId("data.static_methods?/link-list-alpha-order");
    expectNullPosition(file.data.ingredients[0], "data.static_methods?");
  });
});
