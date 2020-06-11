const {
  process,
  expectPositionElement,
  expectNullPosition,
} = require("./framework/utils");

describe("data.formal_definition", () => {
  const ingredientName = "data.formal_definition";
  const recipe = { body: [ingredientName] };

  test("valid", () => {
    const valid = `<h2 id="Formal_definition">Formal definition</h2>
                   <p>{{CSSInfo}}</p>`;
    const file = process(valid, recipe);

    expect(file).not.hasMessageWithId(ingredientName);
    expectPositionElement(file.data.ingredients[0], ingredientName, "h2");
  });
});
