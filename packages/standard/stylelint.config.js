module.exports = {
  extends: ['stylelint-config-standard', 'stylelint-config-prettier', 'stylelint-config-rational-order'],
  plugins: ['stylelint-prettier'],
  // overrides: [
  //   {
  //     files: ['**/*.scss'],
  //     customSyntax: 'postcss-scss'
  //   },
  //   {
  //     files: ['**/*.less'],
  //     customSyntax: 'postcss-less'
  //   }
  // ],
  rules: {
    'max-nesting-depth': 10,
    'selector-pseudo-class-no-unknown': [
      true,
      { ignorePseudoClasses: ['export', 'import', 'global', 'local', 'external', 'deep'] }
    ],
    'comment-empty-line-before': null,
    'no-invalid-double-slash-comments': null,
    'no-descending-specificity': null,
    'declaration-empty-line-before': null,
    'unit-no-unknown': null,
    'prettier/prettier': true,
    'font-family-no-missing-generic-family-keyword': null,
    'selector-class-pattern': '^[a-zA-Z][-_a-zA-Z0-9]+$',
    'color-function-notation': 'legacy',
    'import-notation': 'string',
    'alpha-value-notation': 'number'
  }
}
