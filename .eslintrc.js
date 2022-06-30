module.exports = {
  extends: [
    "eslint:recommended",
    "plugin:vue/vue3-recommended",
    "airbnb-base",
    "plugin:prettier/recommended",
  ],
  parser: "vue-eslint-parser",
  rules: {
    "import/no-extraneous-dependencies": "off",
    "import/no-unresolved": "off",
    "import/extensions": "off",
  },
};
