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
    const source = `<h2 id="Static_methods">Static methods</h2>\n\n<dl>
     <dt><a href="/en-US/docs/Web/JavaScript/Reference/Global_Objects/BigInt/asIntN"><code>BigInt.asIntN()</code></a></dt>
     <dd>Wraps a <code>BigInt</code> value to a signed integer between <code>-2<var><sup>width</sup></var><sup>-1</sup></code> and <code>2<var><sup>width</sup></var><sup>-1</sup>&nbsp;-&nbsp;1</code>.</dd>
     <dt><a href="/en-US/docs/Web/JavaScript/Reference/Global_Objects/BigInt/asUintN"><code>BigInt.asUintN()</code></a></dt>
     <dd>Wraps a <code>BigInt</code> value to an unsigned integer between <code>0</code> and <code>2<var><sup>width</sup></var>&nbsp;-&nbsp;1</code>.</dd>
    </dl>`;

    const file = process(source, { body: ["data.static_methods?"] });

    expect(file.data.ingredients.length).toBe(1);

    const ingredient = file.data.ingredients[0];

    expect(ingredient).toHaveProperty("name", "data.static_methods?");
    expect(ingredient).toHaveProperty("position.type", "element");
    expect(ingredient).toHaveProperty("position.tagName", "h2");
  });

  test("data.specifications", () => {
    const source = `<h2 id="Specifications">Specifications</h2>

    <table class="standard-table">
     <thead>
      <tr>
       <th scope="col">Specification</th>
      </tr>
     </thead>
     <tbody>
      <tr>
       <td>{{SpecName("ESDraft", "#sec-bigint-objects", "<code>BigInt</code> objects")}}</td>
      </tr>
     </tbody>
    </table>`;

    const file = process(source, { body: ["data.specifications"] });

    expect(file.data.ingredients.length).toBe(1);

    const ingredient = file.data.ingredients[0];
    expect(ingredient).toHaveProperty("name", "data.specifications");
    expect(ingredient).toHaveProperty("position.type", "element");
    expect(ingredient).toHaveProperty("position.tagName", "h2");
  });

  test("prose.description?", () => {
    const ingredientName = "prose.description?";
    const source = '<h2 id="Description">Description</h2>';
    const file = process(source, { body: [ingredientName] });

    expect(file).not.hasMessageWithId(ingredientName);

    expect(file.data.ingredients.length).toBe(1);

    const ingredient = file.data.ingredients[0];
    expect(ingredient).toHaveProperty("name", ingredientName);
    expect(ingredient).toHaveProperty("position.type", "element");
    expect(ingredient).toHaveProperty("position.tagName", "h2");
  });

  test("prose.short_description", () => {
    const source = `<div>{{JSRef}}</div>

    <p>The <strong><code>BigInt.asIntN</code></strong> static method is used to wrap a BigInt value to a signed integer between -2<sup>width-1</sup> and 2<sup>width-1</sup>-1.</p>
    
    <div>{{EmbedInteractiveExample("pages/js/bigint-asintn.html", "taller")}}</div>
    
    <div class="hidden">The source for this interactive example is stored in a GitHub repository. If you'd like to contribute to the interactive examples project, please clone <a href="https://github.com/mdn/interactive-examples">https://github.com/mdn/interactive-examples</a> and send us a pull request.</div>
    
    <h2 id="Syntax">Syntax</h2>`;

    const file = process(source, { body: ["prose.short_description"] });

    expect(file.data.ingredients.length).toBe(1);

    const ingredient = file.data.ingredients[0];
    expect(ingredient).toHaveProperty("name", "prose.short_description");
    expect(ingredient).toHaveProperty("position.type", "element");
    expect(ingredient).toHaveProperty("position.tagName", "p");
  });

  test("other prose sections (h2s)", () => {
    const source = `<h2 id="Syntax">Syntax</h2>`;

    const file = process(source, { body: ["prose.syntax"] });

    expect(file.data.ingredients.length).toBe(1);

    const ingredient = file.data.ingredients[0];
    expect(ingredient).toHaveProperty("name", "prose.syntax");
    expect(ingredient).toHaveProperty("position.type", "element");
    expect(ingredient).toHaveProperty("position.tagName", "h2");
  });
});

test("html-require-recipe-ingredients optional ingredients don't error when missing", () => {
  const source = "<p>Nothing to see here.</p>";
  const file = process(source, { body: ["prose.description?"] });
  expect(file).not.hasMessageWithId("prose.description?");
});
