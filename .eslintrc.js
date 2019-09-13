const EslintConfig = require('@nbfe/config/eslint');

EslintConfig.parserOptions.tsconfigRootDir = __dirname;
EslintConfig.parserOptions.extraFileExtensions = ['.vue'];

module.exports = {
    ...EslintConfig
};
