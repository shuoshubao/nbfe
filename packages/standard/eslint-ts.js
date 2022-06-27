module.exports = {
  parser: '@typescript-eslint/parser',
  extends: ['plugin:@typescript-eslint/eslint-recommended', 'plugin:@typescript-eslint/recommended'],
  plugins: ['@typescript-eslint'],
  rules: {
    '@typescript-eslint/no-var-requires': [0]
  }
}
