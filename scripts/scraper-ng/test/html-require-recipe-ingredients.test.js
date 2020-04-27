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
