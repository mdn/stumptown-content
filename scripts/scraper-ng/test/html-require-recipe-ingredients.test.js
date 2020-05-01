const path = require("path");
const fs = require("fs");

const { process, recipesDir } = require("./framework/utils");

const allRecipes = fs
  .readdirSync(recipesDir)
  .map((f) => path.join(recipesDir, f));

describe("html-require-recipe-ingredients", () => {
  test.each(allRecipes)(
    "All recipe ingredients are loggable: %s",
    (recipePath) => {
      const file = process("", recipePath);
      const ingredients = file.data.recipe.body;
      const required = ingredients.filter(
        (i) => !(i.endsWith("?") || i.endsWith("*"))
      );

      expect(file.messages.length).toBeGreaterThanOrEqual(required.length);
      expect(file).not.hasMessageWithId("prose.*");
      for (const ingredient of required) {
        expect(file).hasMessageWithId(ingredient);
      }
    }
  );
});

describe("html-require-recipe-ingredients logs recipe positions", () => {
  test("data class members", () => {
    const source = `<h2 id="Static_methods">Static methods</h2><dl><dt><a href="/en-US/docs/Web/JavaScript/Reference/Global_Objects/BigInt/asIntN"><code>BigInt.asIntN()</code></a></dt><dd>Wraps a <code>BigInt</code> value to a signed integer between <code>-2<var><sup>width</sup></var><sup>-1</sup></code> and <code>2<var><sup>width</sup></var><sup>-1</sup> - 1</code>.</dd><dt><a href="/en-US/docs/Web/JavaScript/Reference/Global_Objects/BigInt/asUintN"><code>BigInt.asUintN()</code></a></dt><dd>Wraps a <code>BigInt</code> value to an unsigned integer between <code>0</code> and <code>2<var><sup>width</sup></var> - 1</code>.</dd></dl>`;

    const file = process(source, { body: ["data.static_methods?"] });

    expect(file.data.ingredients.length).toBe(1);

    const ingredient = file.data.ingredients[0];

    expect(ingredient).toHaveProperty("name", "data.static_methods?");
    expect(ingredient).toHaveProperty("position.type", "element");
    expect(ingredient).toHaveProperty("position.tagName", "h2");
  });
});
