const path = require("path");
const fs = require("fs");

const { processFromSource } = require("./utils");

const recipesDir = path.resolve(__dirname, "../../../recipes");
const allRecipes = fs
  .readdirSync(recipesDir)
  .map((f) => path.join(recipesDir, f));

describe("html-require-recipe-ingredients", () => {
  test.only.each(allRecipes)(
    "All recipe ingredients are loggable: %s",
    (recipePath) => {
      const file = processFromSource("", recipePath);
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
