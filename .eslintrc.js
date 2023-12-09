module.exports = {
  env: {
    browser: true,
    es2021: true,
    jest: true,
  },
  extends: ["eslint-config-airbnb-base", "prettier"],
  parserOptions: {
    ecmaVersion: "latest",
    sourceType: "module",
  },
  plugins: ["jest"],
  rules: {
    "import/extensions": [
      "error",
      "ignorePackages",
      {
        js: "never",
      },
    ],
  },
  overrides: [
    {
      files: ["webpack.config.js"],
      rules: {
        "import/no-extraneous-dependencies": "off",
      },
    },
  ],
};
