const {
  process,
  expectPositionElement,
  expectNullPosition,
} = require("./framework/utils");

describe("data.formal_syntax", () => {
  const ingredientName = "data.formal_syntax";
  const recipe = { body: [ingredientName] };

  test("valid", () => {
    const valid = `<h2 id="Formal_syntax">Formal syntax</h2>
                   <pre class="syntaxbox notranslate">{{ csssyntax("display") }}</pre>`;
    const file = process(valid, recipe);

    expect(file).not.hasMessageWithId(ingredientName);
    expectPositionElement(file.data.ingredients[0], ingredientName, "h2");
  });

  test("missing h2", () => {
    const file = process("", recipe);

    expect(file).hasMessageWithId(/data.formal_syntax\/expected-heading/);
    expectNullPosition(file.data.ingredients[0], ingredientName);
  });

  test("missing pre", () => {
    const missingPre = `<h2 id="Formal_syntax">Formal syntax</h2>
                        {{ csssyntax("display") }}`;
    const file = process(missingPre, recipe);

    expect(file).hasMessageWithId(/data.formal_syntax\/expected-pre.syntaxbox/);
    expectNullPosition(file.data.ingredients[0], ingredientName);
  });

  test("missing syntaxbox class", () => {
    const missingClass = `<h2 id="Formal_syntax">Formal syntax</h2>
                          <pre>{{ csssyntax("display") }}</pre>`;
    const file = process(missingClass, recipe);

    expect(file).hasMessageWithId(/data.formal_syntax\/expected-pre.syntaxbox/);
    expectNullPosition(file.data.ingredients[0], ingredientName);
  });

  test("missing macro", () => {
    const missingMacro = `<h2 id="Formal_syntax">Formal syntax</h2>
                          <pre class="syntaxbox notranslate"></pre>`;
    const file = process(missingMacro, recipe);

    expect(file).hasMessageWithId(/data.formal_syntax\/expected-macro/);
    expectNullPosition(file.data.ingredients[0], ingredientName);
  });

  test("unexpected elements", () => {
    const extraneousElements = `<h2 id="Formal_syntax">Formal syntax</h2>
                                <pre class="syntaxbox notranslate">{{ csssyntax("display") }}</pre>
                                <p>Some notes about this that don't belong here.</p>`;
    const file = process(extraneousElements, recipe);

    expect(file).hasMessageWithId(/data.formal_syntax\/syntax-only/);
    expectNullPosition(file.data.ingredients[0], ingredientName);
  });
});
