const {
  process,
  expectPositionElement,
  expectNullPosition,
} = require("./framework/utils");

describe("data.formal_definition", () => {
  const ingredientName = "data.formal_definition";
  const recipe = { body: [ingredientName] };
  const expectedMacroMessageId = /data.formal_definition\/expected-cssinfo-macro/;

  test("valid", () => {
    const valid = `<h2 id="Formal_definition">Formal definition</h2>
                   <p>{{CSSInfo}}</p>`;
    const file = process(valid, recipe);

    expect(file).not.hasMessageWithId(ingredientName);
    expectPositionElement(file.data.ingredients[0], ingredientName, "h2");
  });

  test("missing h2", () => {
    const file = process("", recipe);

    expect(file).hasMessageWithId(/data.formal_definition\/expected-heading/);
    expectNullPosition(file.data.ingredients[0], ingredientName);
  });

  test("missing CSSInfo macro", () => {
    const missingMacro = '<h2 id="Formal_definition">Formal definition</h2>';
    const file = process(missingMacro, recipe);

    expect(file).hasMessageWithId(expectedMacroMessageId);
    expectNullPosition(file.data.ingredients[0], ingredientName);
  });

  test("wrong wrapper", () => {
    const wrongWrapper = `<h2 id="Formal_definition">Formal definition</h2>
                          <div>{{CSSInfo}}</div>`;
    const file = process(wrongWrapper, recipe);

    expect(file).hasMessageWithId(expectedMacroMessageId);
    expectNullPosition(file.data.ingredients[0], ingredientName);
  });

  test("unexpected elements", () => {
    const extraneousElements = `<h2 id="Formal_definition">Formal definition</h2>
                                <p>Some notes about this that don't belong here.</p>
                                <p>{{CSSInfo}}</p>`;
    const file = process(extraneousElements, recipe);

    expect(file).hasMessageWithId(
      /data.formal_definition\/expected-macro-only/
    );
    expectNullPosition(file.data.ingredients[0], ingredientName);
  });
});
