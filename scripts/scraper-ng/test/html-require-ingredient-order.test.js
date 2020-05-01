const path = require("path");

const { process } = require("./framework/utils");

test("ingredient order", () => {
  const file = process(
    path.resolve(__dirname, "./javascript-constructor.html"),
    "javascript-constructor"
  );

  expect(file).not.hasMessageWithId("ingredient-out-of-order");
});

test("ingredient disorder", () => {
  const file = process(
    `<h2 id="Error_type">Error type</h2>
     <h2 id="Something_else">Something else</h2>
     <h2 id="Description">Description</h2>`,
    {
      body: ["prose.description", "prose.*", "prose.error_type"],
    }
  );

  expect(file).hasMessageWithId("ingredient-out-of-order");
});

// test("prose.* ingredient disorder", () => {
//   const file = process(
//     `<h2 id="Description">Description</h2>
//      <h2 id="Error_type">Error type</h2>
//      <h2 id="Something_else">Something else</h2>`,
//     {
//       body: ["prose.description", "prose.*", "prose.error_type"],
//     }
//   );

//   expect(file).hasMessageWithId("ingredient-out-of-order");
// });
