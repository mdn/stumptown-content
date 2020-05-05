const { process } = require("./framework/utils");

const sources = {
  valid_single_simple: `<h2 id="Examples">Examples</h2>
<h3 id="An_example">An examples</h3>`,

  valid_multiple_simple: `<h2 id="Examples">Examples</h2>
<h3 id="An_example">An example</h3>
<h3 id="Another_example">Another example</h3>`,

  valid_multiple_live_samples: `<h2 id="Examples">Examples</h2>
<h3 id="An_example">An example</h3>
  <p>Some prose description</p>
  <pre class="brush: html">&lt;h1&gt;A heading&lt;/h1&gt;</pre>
  <pre class="brush: css">h1: { color: blue; }</pre>
  {{EmbedLiveSample("An_example")}}
<h3 id="Another_example">Another example</h3>
  <p>Some more prose description</p>
  <pre class="brush: html">&lt;h1&gt;A heading&lt;/h1&gt;</pre>
  <pre class="brush: css">h1: { color: red; }</pre>
  {{EmbedLiveSample("Another_example")}}`,

  valid_simple_live_mixture: `<h2 id="Examples">Examples</h2>
<h3 id="An_example">An example</h3>
  <p>Some prose description</p>
  <pre class="brush: html">&lt;h1&gt;A heading&lt;/h1&gt;</pre>
  <pre class="brush: css">h1: { color: blue; }</pre>
  {{EmbedLiveSample("An_example")}}


<h3 id="Another_example">Another example</h3>
  <p>Some more prose description</p>
  <pre class="brush: html">&lt;h1&gt;A heading&lt;/h1&gt;</pre>
  <pre class="brush: css">h1: { color: red; }</pre>`,

  missing_example_h3: `<h2 id="Examples">Examples</h2>
<p>blah blah</p>`,

  nodes_after_live_sample: `<h2 id="Examples">Examples</h2>
<h3 id="An_example">An example</h3>
  {{EmbedLiveSample("An_example")}}Some more content`,

  live_sample_id_mismatch: `<h2 id="Examples">Examples</h2>
<h3 id="An_example">An example</h3>
  {{EmbedLiveSample("A_different_example")}}`,

  empty_source: "",
};

describe("data.examples", () => {
  const testRecipe = { body: ["data.examples"] };

  const expectPosition = (file) => {
    expect(file.data.ingredients.length).toBe(1);
    const ingredient = file.data.ingredients[0];
    expect(ingredient).toHaveProperty("name", "data.examples");
    expect(ingredient).toHaveProperty("position.type", "element");
    expect(ingredient).toHaveProperty("position.tagName", "h2");
  };

  const expectNullPosition = (file) => {
    expect(file.data.ingredients.length).toBe(1);
    const ingredient = file.data.ingredients[0];
    expect(file.data.ingredients[0]).toHaveProperty("name", "data.examples");
    expect(ingredient).toHaveProperty("position", null);
  };

  test("valid single simple example", () => {
    const file = process(sources.valid_single_simple, testRecipe);

    expect(file.messages).toStrictEqual([]);

    expectPosition(file);
  });

  test("valid multiple simple examples", () => {
    const file = process(sources.valid_multiple_simple, testRecipe);

    expect(file.messages).toStrictEqual([]);

    expectPosition(file);
  });

  test("valid multiple live samples", () => {
    const file = process(sources.valid_multiple_live_samples, testRecipe);

    expect(file.messages.length).toBe(2);
    expect(file.messages[0].ruleId).toBe("embedlivesample");
    expect(file.messages[1].ruleId).toBe("embedlivesample");

    expectPosition(file);
  });

  test("valid mixture of simple and live samples", () => {
    const file = process(sources.valid_simple_live_mixture, testRecipe);

    expect(file.messages.length).toBe(1);
    expect(file).hasMessageWithId(/embedlivesample/);

    expectPosition(file);
  });

  test("missing Examples H3", () => {
    const file = process(sources.missing_example_h3, testRecipe);

    expect(file.messages.length).toBe(1);
    expect(file).hasMessageWithId(/data.examples\/missing-example-h3/);

    expectNullPosition(file);
  });

  test("live sample is not final node", () => {
    const file = process(sources.nodes_after_live_sample, testRecipe);

    expect(file.messages.length).toBe(2);
    expect(file).hasMessageWithId(/embedlivesample/);
    expect(file).hasMessageWithId(/data.examples\/nodes-after-live-sample/);

    expectNullPosition(file);
  });

  test("live sample ID mismatch", () => {
    const file = process(sources.live_sample_id_mismatch, testRecipe);

    expect(file.messages.length).toBe(2);
    expect(file).hasMessageWithId(/embedlivesample/);
    expect(file).hasMessageWithId(/data.examples\/embedlivesample-id-mismatch/);

    expectNullPosition(file);
  });

  test("missing heading", () => {
    const file = process(sources.empty_source, testRecipe);

    expect(file.messages.length).toBe(1);
    expect(file).hasMessageWithId(/data.examples\/expected-heading/);

    expectNullPosition(file);
  });
});
