const {
  process,
  expectPositionElement,
  expectNullPosition,
} = require("./framework/utils");

describe("data.constituent_properties", () => {
  const ingredientName = "data.constituent_properties";
  const recipe = { body: [ingredientName] };
  const errorIds = {
    missingHeading: /data.constituent_properties\/expected-heading/,
    missingText: /data.constituent_properties\/expected-intro-p/,
    missingUl: /data.constituent_properties\/expected-ul/,
    missingLis: /data.constituent_properties\/expected-li-a-code/,
    hasExtraContent: /data.constituent_properties\/unexpected-content/,
  };

  test("valid", () => {
    const valid = `<h2 id="Constituent_properties">Constituent properties</h2>
                   <p>This property is a shorthand for the following CSS properties:</p>
                   <ul>
                    <li><a><code>property-one</code></a></li>
                    <li><a><code>property-two</code></a></li>
                    <li><a><code>property-three</code></a></li>
                   </ul>`;
    const file = process(valid, recipe);

    expect(file).not.hasMessageWithId(ingredientName);
    expectPositionElement(file.data.ingredients[0], ingredientName, "h2");
  });

  test("missing-h2", () => {
    const file = process("", recipe);

    expect(file).hasMessageWithId(errorIds.missingHeading);
    expectNullPosition(file.data.ingredients[0], ingredientName);
  });

  test("missing-text", () => {
    const missingText = `<h2 id="Constituent_properties">Constituent properties</h2>`;
    const file = process(missingText, recipe);

    expect(file).hasMessageWithId(errorIds.missingText);
    expectNullPosition(file.data.ingredients[0], ingredientName);
  });

  test("missing-list", () => {
    const missingList = `<h2 id="Constituent_properties">Constituent properties</h2>
                         <p>This property is a shorthand for the following CSS properties:</p>`;
    const file = process(missingList, recipe);

    expect(file).hasMessageWithId(errorIds.missingUl);
    expectNullPosition(file.data.ingredients[0], ingredientName);
  });

  test("missing-list-items", () => {
    const missingListItems = `<h2 id="Constituent_properties">Constituent properties</h2>
                              <p>This property is a shorthand for the following CSS properties:</p>
                              <ul>
                                <li><a><code>property-one</code></a></li>
                                <li><a><code>property-two</code></a></li>
                                <li><a><code>property-three</code></a></li>
                              </ul>`;
    const file = process(missingListItems, recipe);

    expect(file).hasMessageWithId(errorIds.missingLis);
    expectNullPosition(file.data.ingredients[0], ingredientName);
  });

  test("insufficient-list-items", () => {
    const insufficientListItems = `<h2 id="Constituent_properties">Constituent properties</h2>
                                   <p>This property is a shorthand for the following CSS properties:</p>
                                   <ul>
                                     <li><a><code>property-one</code></a></li>
                                   </ul>`;
    const file = process(insufficientListItems, recipe);

    expect(file).hasMessageWithId(errorIds.missingLis);
    expectNullPosition(file.data.ingredients[0], ingredientName);
  });

  test("unexpected-content", () => {
    const extraneousContent = `<h2 id="Constituent_properties">Constituent properties</h2>
                               <p>This property is a shorthand for the following CSS properties:</p>
                               <ul>
                                 <li><a><code>property-one</code></a></li>
                                 <li><a><code>property-two</code></a></li>
                               </ul>
                               <p>This paragraph is forbidden.</p>`;
    const file = process(extraneousContent, recipe);

    expect(file).hasMessageWithId(errorIds.hasExtraContent);
    expectNullPosition(file.data.ingredients[0], ingredientName);
  });
});
