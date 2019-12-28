module.exports = {
  root: true,
  parserOptions: {
    parser: "babel-eslint",
    sourceType: "module"
  },
  extends: ["@nuxtjs"],
  rules: {
    quotes: ["error", "single", { "allowTemplateLiterals": true }]
  }
};
