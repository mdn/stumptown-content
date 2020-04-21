const fs = require("fs");
const path = require("path");

const { processFromSource, recipePath } = require("./utils");

test.only("javascript-constructor", () => {
  const file = processFromSource(
    fs.readFileSync(
      path.resolve(__dirname, "./javascript-constructor.html"),
      "utf8"
    ),
    recipePath("javascript-constructor")
  );

  // Allow messages with handler-not-implemented
  expect(file).not.hasMessageWithId(
    /javascript-constructor\/.*\/(?!handler-not-implemented)/
  );
});
