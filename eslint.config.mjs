// @ts-check
import withNuxt from "./.nuxt/eslint.config.mjs";

export default withNuxt({
  rules: {
    quotes: [2, "backtick", "single"],
    "vue/multi-word-component-names": "off",
  },
});
// Your custom configs here
