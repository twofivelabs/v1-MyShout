module.exports = {
  "root": true,
  "env": {
    es6: true,
    node: true,
  },
  "extends": [
    "eslint:recommended",
    "google",
  ],
  "rules": {
    "quotes": ["error", "double"],
    "max-len": ["error", {"code": 220}],
    "linebreak-style": ["error", "windows"],
  },
  "parserOptions": {
    // Required for certain syntax usages
    "ecmaVersion": 2020,
  },
};
