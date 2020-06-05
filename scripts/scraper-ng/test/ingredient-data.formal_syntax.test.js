const {
  process,
  expectPositionElement,
  expectNullPosition,
} = require("./framework/utils");

describe("data.formal_syntax", () => {
  /*
  TODO: update the specification for the formal syntax
  */

  const ingredientName = "data.formal_syntax";
  const recipe = { body: [ingredientName] };

  test("valid", () => {
    const valid = `<h2 id="Formal_syntax">Formal syntax</h2>
                 <pre class="syntaxbox notranslate">{{ csssyntax("display") }}</pre>`;
    const file = process(valid, recipe);

    expect(file).not.hasMessageWithId(ingredientName);
    expectPositionElement(file.data.ingredients[0], ingredientName, "h2");
  });

  test.skip("missing h2", () => {
    const file = process("", recipe);

    expect(file.messages.length).toBeGreaterThan(0);
    expect(file).hasMessageWithId(/data.formal_syntax\/expected-heading/);
    expectNullPosition(file.data.ingredients[0], ingredientName);
  });

  test.skip("missing pre", () => {
    const missingPre = `<h2 id="Formal_syntax">Formal syntax</h2>
                   {{ csssyntax("display") }}`;
    const file = process(missingPre, recipe);

    expect(file.messages.length).toBeGreaterThan(0);
    expectNullPosition(file.data.ingredients[0], ingredientName);
  });

  test.skip("missing macro", () => {
    const missingMacro = `<h2 id="Formal_syntax">Formal syntax</h2>
                          <h2 id="Next_heading>Next heading</h2>`;
    const file = process(missingMacro, recipe);

    expect(file.messages.length).toBeGreaterThan(0);
    expectNullPosition(file.data.ingredients[0], ingredientName);
  });
});
