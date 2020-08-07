const { merge } = require('lodash');
const EslintConfig = require('./eslint-common');

module.exports = merge(EslintConfig, {
    parser: 'babel-eslint',
    parserOptions: {},
    extends: [...EslintConfig.extends, 'airbnb', 'plugin:react-hooks/recommended', 'prettier/react']
});
