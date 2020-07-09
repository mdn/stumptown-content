const {
  expectPositionElement,
  process,
  expectNullPosition,
} = require("./framework/utils");

describe("data.permitted_properties", () => {
  const ingredientName = "data.permitted_properties?";
  const recipe = { body: [ingredientName] };
  const errorIds = {
    hasExtraContent: /data.permitted_properties\?\/unexpected-content/,
    malformedLi: /data.permitted_properties\?\/expected-li-a-code/,
    missingLis: /data.permitted_properties\?\/expected-more-lis/,
    missingText: /data.permitted_properties\?\/expected-intro-p/,
    missingUl: /data.permitted_properties\?\/expected-ul/,
    outOfOrder: /data.permitted_properties\?\/expected-alpha-sorted-properties/,
  };

  test("valid", () => {
    const valid = `
    <h2 id="Permitted_properties">Permitted properties</h2>
    <p>Rules whose selectors include this element may only use the following CSS properties:</p>
    <ul>
      <li><a><code>property-a</code></a></li>
      <li><a><code>property-b</code></a></li>
      <li><a><code>property-c</code></a></li>
    </ul>`;
    const file = process(valid, recipe);

    expect(file).not.hasMessageWithId(ingredientName);
    expectPositionElement(file.data.ingredients[0], ingredientName, "h2");
  });

  test("h2-optional", () => {
    const missingH2 = "";
    const file = process(missingH2, recipe);

    expect(file).not.hasMessageWithId(ingredientName);
    expectNullPosition(file.data.ingredients[0], ingredientName);
  });

  test("intro-missing", () => {
    const introMissing =
      '<h2 id="Permitted_properties">Permitted properties</h2>';
    const file = process(introMissing, recipe);

    expect(file).hasMessageWithId(errorIds.missingText);
    expectNullPosition(file.data.ingredients[0], ingredientName);
  });

  test("list-missing", () => {
    const listMissing = `
    <h2 id="Permitted_properties">Permitted properties</h2>
    <p>Rules whose selectors include this element may only use the following CSS properties:</p>`;
    const file = process(listMissing, recipe);

    expect(file).hasMessageWithId(errorIds.missingUl);
    expectNullPosition(file.data.ingredients[0], ingredientName);
  });

  test("list-items-missing", () => {
    const listItemsMissing = `
    <h2 id="Permitted_properties">Permitted properties</h2>
    <p>Rules whose selectors include this element may only use the following CSS properties:</p>
    <ul></ul>`;
    const file = process(listItemsMissing, recipe);

    expect(file).hasMessageWithId(errorIds.missingLis);
    expectNullPosition(file.data.ingredients[0], ingredientName);
  });

  test("list-items-malformed-incomplete", () => {
    const listItemsMalformedIncomplete = `
    <h2 id="Permitted_properties">Permitted properties</h2>
    <p>Rules whose selectors include this element may only use the following CSS properties:</p>
    <ul>
      <li><a><code>property-a</code></a></li>
      <li><a>property-b</a></li>
      <li><a><code>property-c</code></a></li>
    </ul>`;
    const file = process(listItemsMalformedIncomplete, recipe);

    expect(file).hasMessageWithId(errorIds.malformedLi);
    expectNullPosition(file.data.ingredients[0], ingredientName);
  });

  test("list-items-malformed-extra", () => {
    const listItemsMalformedExtra = `
    <h2 id="Permitted_properties">Permitted properties</h2>
    <p>Rules whose selectors include this element may only use the following CSS properties:</p>
    <ul>
      <li><a><code>property-a</code></a></li>
      <li><a><code>property-b</code></a> - don't use this!</li>
      <li><a><code>property-c</code></a></li>
    </ul>`;
    const file = process(listItemsMalformedExtra, recipe);

    expect(file).hasMessageWithId(errorIds.malformedLi);
    expectNullPosition(file.data.ingredients[0], ingredientName);
  });

  test("lis-items-out-of-order", () => {
    const listItemsDisordered = `
    <h2 id="Permitted_properties">Permitted properties</h2>
    <p>Rules whose selectors include this element may only use the following CSS properties:</p>
    <ul>
      <li><a><code>property-a</code></a></li>
      <li><a><code>property-xyz</code></a></li>
      <li><a><code>property-c</code></a></li>
    </ul>`;
    const file = process(listItemsDisordered, recipe);

    expect(file).hasMessageWithId(errorIds.outOfOrder);
    expectNullPosition(file.data.ingredients[0], ingredientName);
  });

  test("unexpected-content", () => {
    const extraContent = `
    <h2 id="Permitted_properties">Permitted properties</h2>
    <p>Rules whose selectors include this element may only use the following CSS properties:</p>
    <p>Note: there shouldn't be a note here.</p>
    <ul>
      <li><a><code>property-a</code></a></li>
      <li><a><code>property-b</code></a></li>
      <li><a><code>property-c</code></a></li>
    </ul>`;
    const file = process(extraContent, recipe);

    expect(file).hasMessageWithId(errorIds.hasExtraContent);
    expectNullPosition(file.data.ingredients[0], ingredientName);
  });
});
