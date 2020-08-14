const EslintConfig = require('@nbfe/config/eslint-react');

EslintConfig.parserOptions.tsconfigRootDir = __dirname;
EslintConfig.parserOptions.extraFileExtensions = ['.vue'];

module.exports = {
    ...EslintConfig
};
