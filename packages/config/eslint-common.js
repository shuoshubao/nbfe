const { existsSync } = require('fs');
const { resolve } = require('path');
const { cosmiconfigSync } = require('prettier/third-party');
const PrettierConfig = require('./prettier.config');

const rootPath = process.cwd();

const explorerSync = cosmiconfigSync('prettier', { stopDir: rootPath });

const { config: projectPrettierConfig } = explorerSync.search() || {};

const PrettierEslintConfig = projectPrettierConfig || PrettierConfig;

const EslintConfig = {
    parser: 'babel-eslint',
    parserOptions: {
        sourceType: 'module',
        ecmaVersion: 2020,
        ecmaFeatures: {
            jsx: true,
            legacyDecorators: true
        }
    },
    extends: ['eslint:recommended', 'prettier', 'plugin:prettier/recommended'],
    plugins: ['prettier', 'import'],
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
        indent: [2, 4, { SwitchCase: 1 }], // 缩进
        'no-plusplus': [2, { allowForLoopAfterthoughts: true }], // ++ --
        'comma-dangle': [2, 'never'], // 尾逗号
        'no-console': [2], // console
        'arrow-parens': [2, 'as-needed'], //
        'global-require': [0], // require 置顶
        'no-return-await': [0], // return await
        'no-param-reassign': [2, { props: false }], // 不要改写函数参数
        'arrow-body-style': [0], // 函数返回值简写
        'object-curly-newline': [2, { multiline: true }],
        // const let
        'prefer-const': [
            2,
            {
                destructuring: 'all'
            }
        ],
        'import/no-unresolved': [0], // import
        'import/no-dynamic-require': [0], // require 动态url
        'import/prefer-default-export': [0], // 当只有一个export的时候 建议使用 export default
        'import/no-extraneous-dependencies': [
            2,
            {
                devDependencies: true,
                peerDependencies: true
            }
        ],
        'import/extensions': [0], // 文件后缀
        'class-methods-use-this': [0],
        'no-useless-catch': [0],
        'object-curly-newline': [0],
        'no-empty': [2, { allowEmptyCatch: true }]
    }
};

const isTypeScript = existsSync(resolve(rootPath, 'tsconfig.json'));

if (isTypeScript) {
    EslintConfig.extends.push(
        'plugin:@typescript-eslint/eslint-recommended',
        'plugin:@typescript-eslint/recommended',
        'prettier/@typescript-eslint'
    );
    EslintConfig.plugins.push('@typescript-eslint');
    EslintConfig.parserOptions.parser = '@typescript-eslint/parser';
    EslintConfig.parserOptions.tsconfigRootDir = rootPath;
    Object.assign(EslintConfig.rules, {
        '@typescript-eslint/interface-name-prefix': [2, { prefixWithI: 'always' }]
    });
}

module.exports = EslintConfig;
