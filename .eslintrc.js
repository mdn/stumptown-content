module.exports = {
  "plugins": ["jest"],
  "env": {
    "es6": true,
    "node": true,
    "jest/globals": true
  },
  "overrides": [
    {
      "files": [ "scripts/**/*.js" ],
      "extends": "eslint:recommended",
      "parserOptions": {
        "ecmaVersion": 2018,
        "sourceType": "module"
      }
    }
  ]
};
