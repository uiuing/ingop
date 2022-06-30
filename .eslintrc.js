module.exports = {
  extends: [
    "eslint:recommended",
    "plugin:vue/vue3-recommended",
    "airbnb-base",
    "plugin:prettier/recommended",
  ],
  plugins: ["simple-import-sort", "prettier"],
  parser: "vue-eslint-parser",
  rules: {
    "import/no-extraneous-dependencies": "off",
    "import/no-unresolved": "off",
    "import/extensions": "off",
    "simple-import-sort/imports": "error",
    "simple-import-sort/exports": "error",
  },
};
