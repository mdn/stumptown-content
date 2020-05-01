const { process } = require("./framework/utils");

const sources = {
  no_interactive_examples: `<p>An intro</p>
<h2 id="A_heading">A heading</h2>
<p>Some more stuff</p>`,

  two_interactive_examples: `<p>An intro</p>
<div>{{EmbedInteractiveExample()}}</div>
<h2 id="A_heading">A heading</h2>
<p>Some more stuff</p>
<div>{{EmbedInteractiveExample()}}</div>`,

  interactive_example_after_h2: `<p>An intro</p>
<h2 id="A_heading">A heading</h2>
<p>Some more stuff</p>
<div>{{EmbedInteractiveExample()}}</div>`,

  interactive_example_not_in_div: `<p>An intro</p>
<p>{{EmbedInteractiveExample()}}</p>
<h2 id="A_heading">A heading</h2>
<p>Some more stuff</p>`,

  valid_interactive_example: `<p>An intro</p>
<div>{{EmbedInteractiveExample()}}</div>
<h2 id="A_heading">A heading</h2>
<p>Some more stuff</p>`,
};

describe("data.examples", () => {
  const testRecipe = { body: ["data.interactive_example?"] };

  test("no interactive examples", () => {
    const file = process(sources.no_interactive_examples, testRecipe);

    expect(file.messages.length).toBe(1);
    expect(file).hasMessageWithId("/unknown-heading");
  });

  test("two interactive examples", () => {
    const file = process(sources.two_interactive_examples, testRecipe);

    expect(file.messages.length).toBe(2);
    expect(file).hasMessageWithId("/unknown-heading");
    expect(file).hasMessageWithId(
      "data.interactive_example?/at-most-one-interactive-example"
    );
  });

  test("interactive example after H2", () => {
    const file = process(sources.interactive_example_after_h2, testRecipe);

    expect(file.messages.length).toBe(2);
    expect(file).hasMessageWithId("/unknown-heading");
    expect(file).hasMessageWithId(
      "data.interactive_example?/interactive-example-before-first-h2"
    );
  });

  test("interactive example not in DIV", () => {
    const file = process(sources.interactive_example_not_in_div, testRecipe);

    expect(file.messages.length).toBe(2);
    expect(file).hasMessageWithId("/unknown-heading");
    expect(file).hasMessageWithId(
      "data.interactive_example?/interactive-example-in-div"
    );
  });

  test("valid interactive example", () => {
    const file = process(sources.valid_interactive_example, testRecipe);

    expect(file.messages.length).toBe(1);
    expect(file).hasMessageWithId("/unknown-heading");
  });
});
