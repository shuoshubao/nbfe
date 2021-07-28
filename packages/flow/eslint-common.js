const { resolve } = require('path');
const PrettierConfig = require('./prettier.config');
const { isTypeScript, isVue, hasPrettierConfig } = require('./env');

const rootPath = process.cwd();

let projectPrettierConfig;

if (hasPrettierConfig) {
    projectPrettierConfig = require(resolve(rootPath, 'prettier.config.js'));
}

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
    plugins: ['prettier', 'import', 'sonarjs'],
    extends: ['eslint:recommended', 'prettier', 'plugin:prettier/recommended', 'plugin:sonarjs/recommended'],
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
        'operator-linebreak': [0], // 与 prettier 的冲突
        'no-plusplus': [1, { allowForLoopAfterthoughts: true }], // ++ --
        'no-eval': [1], // eval 一般是必须使用的场景才用吧
        'comma-dangle': [2, 'never'], // 尾逗号
        'no-console': [2], // console
        'arrow-parens': [2, 'as-needed'], //
        'global-require': [0], // require 置顶
        'no-return-await': [0], // return await
        'no-param-reassign': [2, { props: false }], // 不要改写函数参数
        'arrow-body-style': [0], // 函数返回值简写
        // const let
        'prefer-const': [
            2,
            {
                destructuring: 'all'
            }
        ],
        'no-script-url': [1], // javascript:void(0)
        'import/no-unresolved': [0], // import
        'no-restricted-syntax': [1], // for-in
        'guard-for-in': [1], // for-in
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

if (isTypeScript) {
    if (!isVue) {
        delete EslintConfig.parser;
    }
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
