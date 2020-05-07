const { process } = require("./framework/utils");

const sources = {
  no_interactive_examples: `<p>An intro</p>
<h2 id="A_heading">A heading</h2>
<p>Some more stuff</p>`,

  two_interactive_examples: `<p>An intro</p>
<div>{{EmbedInteractiveExample()}}</div>
<p>Some more stuff</p>
<div>{{EmbedInteractiveExample()}}</div>
<h2 id="A_heading">A heading</h2>
<p>Some more stuff</p>`,

  interactive_example_after_h2: `<p>An intro</p>
<h2 id="A_heading">A heading</h2>
<p>Some more stuff</p>
<div>{{EmbedInteractiveExample()}}</div>`,

  interactive_example_not_in_div: `<p>An intro</p>
<p>{{EmbedInteractiveExample()}}</p>
<h2 id="A_heading">A heading</h2>
<p>Some more stuff</p>`,

  interactive_example_not_after_p: `<div>An intro</div>
<div>{{EmbedInteractiveExample()}}</div>
<h2 id="A_heading">A heading</h2>
<p>Some more stuff</p>`,

  valid_interactive_example: `<p>An intro</p>
<div>{{EmbedInteractiveExample()}}</div>
<h2 id="A_heading">A heading</h2>
<p>Some more stuff</p>`,
};

describe("data.interactive_example?", () => {
  const testRecipe = { body: ["data.interactive_example?"] };

  test("no interactive examples", () => {
    const file = process(sources.no_interactive_examples, testRecipe);

    expect(file.messages.length).toBe(1);
    expect(file).not.hasMessageWithId("data.interactive_example?");
  });

  test("two interactive examples", () => {
    const file = process(sources.two_interactive_examples, testRecipe);

    expect(file.messages.length).toBe(2);
    // expect that it doesn't have any messages with ID "data.interactive_example?"
    // unless they are followed by "/at-most-one-interactive-example"
    expect(file).not.hasMessageWithId(
      /data\.interactive_example\?(?!\/at-most-one-interactive-example)/
    );
    expect(file).hasMessageWithId(
      "data.interactive_example?/at-most-one-interactive-example"
    );
  });

  test("interactive example after H2", () => {
    const file = process(sources.interactive_example_after_h2, testRecipe);

    expect(file.messages.length).toBe(2);
    // expect that it doesn't have any messages with ID containing "data.interactive_example?"
    // unless it is followed by "/interactive-example-after-first-h2"
    expect(file).not.hasMessageWithId(
      /data\.interactive_example\?(?!\/interactive-example-after-first-h2)/
    );
    expect(file).hasMessageWithId(
      "data.interactive_example?/interactive-example-after-first-h2"
    );
  });

  test("interactive example not in DIV", () => {
    const file = process(sources.interactive_example_not_in_div, testRecipe);

    expect(file.messages.length).toBe(2);
    // expect that it doesn't have any messages with ID containing "data.interactive_example?"
    // unless it is followed by "/interactive-example-inside-div"
    expect(file).not.hasMessageWithId(
      /data\.interactive_example\?(?!\/interactive-example-inside-div)/
    );
    expect(file).hasMessageWithId(
      "data.interactive_example?/interactive-example-inside-div"
    );
  });

  test("interactive example not after P", () => {
    const file = process(sources.interactive_example_not_after_p, testRecipe);

    expect(file.messages.length).toBe(2);
    // expect that it doesn't have any messages with ID containing "data.interactive_example?"
    // unless it is followed by "/interactive-example-preceded-by-p"
    expect(file).not.hasMessageWithId(
      /data\.interactive_example\?(?!\/interactive-example-preceded-by-p)/
    );
    expect(file).hasMessageWithId(
      "data.interactive_example?/interactive-example-preceded-by-p"
    );
  });

  test("valid interactive example", () => {
    const file = process(sources.valid_interactive_example, testRecipe);

    expect(file.messages.length).toBe(1);
    expect(file).not.hasMessageWithId("data.interactive_example?");
  });
});
