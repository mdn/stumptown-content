module.exports = {
  "env": {
    "es6": true,
    "node": true
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
