const { cosmiconfigSync } = require('prettier/third-party');
const PrettierConfig = require('./prettier');

const rootPath = process.cwd();

const explorerSync = cosmiconfigSync('prettier', {
    stopDir: rootPath
});

const { config: projectPrettierConfig } = explorerSync.search() || {};

const PrettierEslintConfig = projectPrettierConfig || PrettierConfig;

module.exports = {
    parser: 'vue-eslint-parser',
    parserOptions: {
        parser: '@typescript-eslint/parser',
        ecmaVersion: 2020,
        extraFileExtensions: ['.vue'],
        tsconfigRootDir: rootPath,
        ecmaFeatures: {
            jsx: true
        }
    },
    extends: [
        'eslint:recommended',
        'plugin:vue/essential',
        'plugin:prettier/recommended',
        'plugin:@typescript-eslint/eslint-recommended',
        'plugin:@typescript-eslint/recommended',
        'prettier',
        'prettier/vue',
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
        'import/extensions': [
            2,
            'never',
            {
                vue: 'always'
            }
        ],
        'class-methods-use-this': [0],
        'no-empty': [2, { allowEmptyCatch: true }],
        // typescript-eslint
        '@typescript-eslint/interface-name-prefix': [2, { prefixWithI: 'always' }]
    },
    overrides: [
        {
            // 项目中的js文件一般是 nodejs代码, 允许使用 require
            files: ['*.js'],
            rules: {
                '@typescript-eslint/no-var-requires': [0]
            }
        }
    ]
};
