const path = require("path");

const { process } = require("./framework/utils");

test("javascript-constructor", () => {
  const file = process(
    path.resolve(__dirname, "./javascript-constructor.html"),
    "javascript-constructor"
  );

  // Allow messages with handler-not-implemented
  expect(file).not.hasMessageWithId(
    /javascript-constructor\/.*\/(?!handler-not-implemented)/
  );
});
