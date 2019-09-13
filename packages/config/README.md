## 使用

> yarn add @nbfe/config -D

### Eslint

```
// .eslintrc.js

const EslintConfig = require('@nbfe/config/eslint');

EslintConfig.parserOptions.tsconfigRootDir = __dirname;

module.exports = EslintConfig;
```

#### 规则

```
{
    parserOptions: {
        parser: '@typescript-eslint/parser',
        ecmaVersion: 2019,
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
        'no-console': [2],
        'global-require': [0], // require 置顶
        'no-return-await': [0], // return await
        'no-param-reassign': [2, { props: false }], // 不要改写函数参数
        'prefer-const': [
            2,
            {
                destructuring: 'all'
            }
        ],
        'import/no-unresolved': [0],
        'import/no-dynamic-require': [0], // require 动态url
        'import/prefer-default-export': [0], // 当只有一个export的时候 建议使用 export default
        'import/no-extraneous-dependencies': [
            2,
            {
                devDependencies: true,
                peerDependencies: true
            }
        ]
    }
}
```

### prettier

// prettier.config.js

```
const PrettierConfig = require('@nbfe/config/prettier');

module.exports = {
    ...PrettierConfig
};
```
