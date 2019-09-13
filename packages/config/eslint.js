const { omit } = require('lodash');
const PrettierConfig = require('./prettier');

const PrettierEslintConfig = omit(PrettierConfig, ['parser', 'overrides']);

module.exports = {
    parser: 'vue-eslint-parser',
    parserOptions: {
        parser: '@typescript-eslint/parser',
        ecmaVersion: 2019,
        extraFileExtensions: ['.vue'],
        project: './tsconfig.json',
        tsconfigRootDir: __dirname
    },
    extends: [
        'eslint:recommended',
        'plugin:vue/base',
        'airbnb-base',
        'plugin:prettier/recommended',
        'prettier/standard',
        'plugin:@typescript-eslint/eslint-recommended',
        'plugin:@typescript-eslint/recommended',
        'plugin:@typescript-eslint/recommended-requiring-type-checking',
        'prettier/@typescript-eslint'
    ],
    plugins: ['prettier', 'import', '@typescript-eslint'],
    env: {
        browser: true,
        es6: true,
        node: true,
        amd: true,
        mocha: true,
        jest: true
    },
    rules: {
        'prettier/prettier': [2, PrettierEslintConfig, { usePrettierrc: false }],
        'max-len': [0], // 一行最大的代码量
        'no-console': [2], // console
        'global-require': [0], // require 置顶
        'no-return-await': [0], // return await
        'no-param-reassign': [2, { props: false }], // 不要改写函数参数
        'prefer-const': [
            2,
            {
                destructuring: 'all'
            }
        ], // const let
        // import
        'import/no-unresolved': [0],
        'import/no-dynamic-require': [0], // require 动态url
        'import/prefer-default-export': [0], // 当只有一个export的时候 建议使用 export default
        'import/no-extraneous-dependencies': [
            2,
            {
                devDependencies: true,
                peerDependencies: true
            }
        ],
        // typescript-eslint
        '@typescript-eslint/interface-name-prefix': [2, { prefixWithI: 'always' }]
    }
};
