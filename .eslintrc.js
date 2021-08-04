const EslintConfig = require('@nbfe/flow/eslint');

EslintConfig.parserOptions.tsconfigRootDir = __dirname;
EslintConfig.parserOptions.extraFileExtensions = ['.vue'];

module.exports = {
    ...EslintConfig
};
