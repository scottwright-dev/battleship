module.exports = {
  env: {
    browser: true,
    es2021: true,
  },
  extends: ["eslint-config-airbnb-base", "prettier"],
  parserOptions: {
    ecmaVersion: "latest",
    sourceType: "module",
  },
  rules: {},
  overrides: [
    {
      files: ["webpack.config.js"],
      rules: {
        "import/no-extraneous-dependencies": "off",
      },
    },
  ],
};
