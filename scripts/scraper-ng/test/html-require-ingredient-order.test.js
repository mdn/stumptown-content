const path = require("path");

const { process } = require("./framework/utils");

describe("html-require-ingredient-order", () => {
  test("ingredient order", () => {
    const file = process(
      path.resolve(__dirname, "./javascript-constructor.html"),
      "javascript-constructor"
    );

    expect(file).not.hasMessageWithId("ingredient-out-of-order");
  });

  test("missing optional ingredient is OK", () => {
    const file = process(
      `<h2 id="Syntax">Syntax</h2>
       <h2 id="Error_type">Error type</h2>`,
      {
        body: ["prose.syntax", "data.static_methods?", "prose.error_type"],
      }
    );

    expect(file).not.hasMessageWithId("ingredient-out-of-order");
  });

  test("ingredient disorder", () => {
    const file = process(
      `<h2 id="Error_type">Error type</h2>
       <h2 id="Something_else">Something else</h2>
       <h2 id="Description">Description</h2>`,
      {
        body: ["prose.description?", "prose.*", "prose.error_type"],
      }
    );

    expect(file).hasMessageWithId("ingredient-out-of-order");
  });

  test("optional ingredient disorder causes message", () => {
    const file = process(
      `<h2 id="Error_type">Error type</h2>
       <h2 id="Description">Description</h2>`,
      {
        body: ["prose.description?", "prose.error_type"],
      }
    );

    expect(file).hasMessageWithId("ingredient-out-of-order");
  });

  test("prose.* ingredient order is OK", () => {
    const file = process(
      `<h2 id="Description">Description</h2>
       <h2 id="Something_else">Something else</h2>
       <h2 id="Error_type">Error type</h2>`,
      {
        body: ["prose.description?", "prose.*", "prose.error_type"],
      }
    );

    expect(file).not.hasMessageWithId("ingredient-out-of-order");
  });

  test("prose.* ingredient disorder causes message", () => {
    const file = process(
      `<h2 id="Description">Description</h2>
       <h2 id="Error_type">Error type</h2>
       <h2 id="Something_else">Something else</h2>`,
      {
        body: ["prose.description?", "prose.*", "prose.error_type"],
      }
    );

    expect(file).hasMessageWithId("ingredient-out-of-order");
  });
});
