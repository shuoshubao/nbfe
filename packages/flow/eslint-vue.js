const { merge } = require('lodash');
const EslintConfig = require('./eslint-common');

module.exports = merge(EslintConfig, {
    parser: 'vue-eslint-parser',
    parserOptions: {
        extraFileExtensions: ['.vue']
    },
    extends: [...EslintConfig.extends, 'airbnb-base', 'plugin:vue/essential', 'prettier/vue']
});
