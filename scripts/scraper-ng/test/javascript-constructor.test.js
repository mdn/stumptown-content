const path = require("path");
const fs = require("fs");

const { processFromSource } = require("./utils");

test.only("javascript-constructor", () => {
  const file = processFromSource(
    fs.readFileSync(
      path.resolve(__dirname, "./javascript-constructor.html"),
      "utf8"
    ),
    path.resolve(__dirname, "../../../recipes/javascript-constructor.yaml")
  );

  // Allow messages with handler-not-implemented
  expect(file).not.hasMessageWithId(
    /javascript-constructor\/.*\/(?!handler-not-implemented)/
  );
});
