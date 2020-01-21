const { RateLimit } = require("async-sema");

module.exports = RateLimit(4, { uniformDistribution: true });
