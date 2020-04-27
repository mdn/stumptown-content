/**
 * Matches any `vfile` object with one or more messages with an expected `ruleId`.
 *
 * @param {vfile} received - A file to inspect
 * @param {String|RegExp} expected - A string (or matching regex) expected in one or more `ruleId` values
 * @returns {Object} result
 * @returns {function} result.message - returns a message for failures
 * @returns {Boolean} result.pass - whether there was a match or not
 */
function hasMessageWithId(received, expected) {
  let isMatchy;

  if (expected instanceof RegExp) {
    isMatchy = (str) => expected.test(str);
  } else {
    isMatchy = (str) => str.includes(expected);
  }

  const pass = received.messages.some((msg) => isMatchy(msg.ruleId));

  if (pass) {
    return {
      message: () =>
        this.utils.matcherHint("hasMessageId") +
        "\n\n" +
        `Expected: not ${this.utils.printExpected(expected)}\n` +
        `Received: ${this.utils.printReceived(
          received.messages.map((msg) => msg.ruleId)
        )}`,
      pass,
    };
  } else {
    return {
      message: () =>
        this.utils.matcherHint("hasMessageId") +
        "\n\n" +
        `Expected: ${this.utils.printExpected(expected)}\n` +
        `Received: ${this.utils.printReceived(
          received.messages.map((msg) => msg.ruleId)
        )}`,
      pass,
    };
  }
}

expect.extend({
  hasMessageWithId,
});
