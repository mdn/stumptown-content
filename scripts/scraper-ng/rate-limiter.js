const { RateLimit } = require("async-sema");

module.exports = RateLimit(16, { uniformDistribution: true });
