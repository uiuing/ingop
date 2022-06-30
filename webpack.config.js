const { resolve } = require("path");

module.exports = {
  resolve: {
    extensions: [".js", ".json", ".vue"],
    alias: {
      "@": resolve(__dirname, "./src"),
    },
  },
};
