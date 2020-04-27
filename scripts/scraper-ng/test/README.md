# Testing `scraper-ng`

This folder contains files for testing `scraper-ng`. The tests a run with the [Jest](https://jestjs.io/) testing framework.

## How to run tests

Before running tests, install the package dependencies. Run `npm install`.

To run _all_ tests (including the tests in this folder), run `npm test` from the root of the repository.

To run only these tests, run `npx jest`.

### Suggested options

Jest has a number of command line options, some of which may be useful:

- `--watch` monitors changes to your files and automatically re-runs applicable tests based on the diff from Git's `HEAD`.
- `--runInBand` forces Jest to run tests sequentially. Jest's parallelization may cause tests to take longer; trying `--runInBand` may speed things up, depending on your system.
- `--verbose` prints the description of all tests, pass or fail.

## Writing tests

For more information on writing tests with Jest, see Jest's [Getting Started](https://jestjs.io/docs/en/getting-started) documentation, but here are a few hints to get you started

- Jest looks for tests in files with a `.test.js` suffix.

- Related tests may be grouped with `describe()`:

  ```js
  describe("string about this test suite", () => {
    /* tests */
  });
  ```

  `describe` blocks are optional.

- Individual tests are declared with `test`:

  ```js
  test("string about this test", () => {
    /* test code */
  });
  ```

- Assertions in Jest are called [matchers](https://jestjs.io/docs/en/using-matchers). They're called like this:

  ```js
  expect(someValue).matcher(expectedValue);
  expect(1).toBeGreaterThan(0);
  epxect(["hello", "world"]).toContain("hello");
  epxect(["hello", "world"]).not.toContain("goodbye");
  ```

- `./framework/test.setup.js` extends `expect()` with project-specific matchers. Consider adding more!

- `./framework/utils.js` provides a `process()` function make processing pages more convenient. `process()` accepts two arguments: a source and a recipe. The function accepts various types:

  - source as strings or file paths
  - recipes as objects, file paths, or names

  Call it with two arguments and it should return a `vfile` for inspection and asserting against.
