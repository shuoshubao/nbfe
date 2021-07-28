const { merge } = require('lodash');
const EslintConfig = require('./eslint-common');

module.exports = merge(EslintConfig, {
    parserOptions: {},
    extends: [...EslintConfig.extends, 'airbnb', 'plugin:react-hooks/recommended', 'prettier/react'],
    rules: {
        ...EslintConfig.rules,
        'react/destructuring-assignment': [0],
        'react/prop-types': [0],
        'jsx-a11y/click-events-have-key-events': [0],
        'jsx-a11y/no-static-element-interactions': [0],
        'react/jsx-props-no-spreading': [0],
        'react/static-property-placement': [1],
        'react/jsx-fragments': [2, 'element'],
        'react/forbid-prop-types': [0],
        'jsx-a11y/anchor-is-valid': [1], // a javascript:void(0)
        'jsx-a11y/no-noninteractive-element-interactions': [0],
        'react/jsx-filename-extension': [2, { extensions: ['.js', '.jsx'] }]
    }
});
