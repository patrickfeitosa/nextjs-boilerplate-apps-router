/**
 * stylelint configuration
 * https://stylelint.io/user-guide/configuration/
 */
module.exports = {
  customSyntax: "postcss-styled-syntax",
  rules: {
    'declaration-empty-line-before': 'never',
    'max-nesting-depth': 10,
    'property-no-vendor-prefix': null,
    'at-rule-no-unknown': [true, {
      ignoreAtRules: ["extends"]
    }],
    // New standard rule. Break props on styled-components
    'value-keyword-case': null,
  },
  syntax: 'scss',
};
