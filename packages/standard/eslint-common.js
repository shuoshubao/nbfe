const { existsSync } = require('fs')
const { resolve } = require('path')
const PresetPrettierConfig = require('./prettier.config')

const LocalPrettierConfigPath = resolve(process.cwd(), './prettier.config.js')

const LocalPrettierConfig = existsSync(LocalPrettierConfigPath) ? require(LocalPrettierConfigPath) : {}

const PrettierConfig = { ...PresetPrettierConfig, ...LocalPrettierConfig }

const EslintConfig = {
  parser: '@babel/eslint-parser',
  parserOptions: {
    requireConfigFile: false,
    sourceType: 'module',
    ecmaVersion: 2022,
    ecmaFeatures: {
      jsx: true,
      legacyDecorators: true
    },
    extraFileExtensions: ['.js', '.jsx', '.ts', '.tsx', '.vue']
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
  overrides: [
    {
      files: ['*.js', '*.jsx'],
      rules: {
        'no-unused-vars': [2],
        '@typescript-eslint/no-unused-vars': [0]
      }
    },
    {
      files: ['*.ts', '*.tsx'],
      rules: {
        'no-unused-vars': [0],
        '@typescript-eslint/no-unused-vars': [2]
      }
    }
  ],
  rules: {
    'prettier/prettier': [2, PrettierConfig, { usePrettierrc: false }],
    'max-len': [0], // 一行最大的代码量
    semi: [2, PrettierConfig.semi ? 'always' : 'never'], // 不要分号
    indent: [1, PrettierConfig.tabWidth, { SwitchCase: 1 }], // 缩进
    'operator-linebreak': [0], // 与 prettier 的冲突
    'no-plusplus': [0], // ++ --
    'no-eval': [1], // eval 一般是必须使用的场景才用吧
    'no-unused-expressions': [1], // 短路运算符
    'no-underscore-dangle': [1], // 变量名下划线
    'no-console': [2], // console
    'no-return-await': [0], // return await
    'no-param-reassign': [2, { props: false }], // 不要改写函数参数
    'anchor-is-valid': [0], // a 链接 href
    'comma-dangle': [2, 'never'], // 尾逗号
    'arrow-parens': [2, 'as-needed'], //
    'global-require': [0], // require 置顶
    'arrow-body-style': [0], // 函数返回值简写 (万恶之源: Eslint 自动修复在这个规则上会经常暴雷)
    'generator-star-spacing': [0], // generator 函数星号前后加空格, 直接按照 prettier 的就行
    'prefer-const': [2, { destructuring: 'all' }], // const let
    'prefer-destructuring': [
      2,
      {
        VariableDeclarator: {
          array: false,
          object: true
        },
        AssignmentExpression: {
          array: false,
          object: false
        }
      }
    ],
    'no-script-url': [1], // javascript:void(0)
    'no-restricted-syntax': [1], // for-in
    'guard-for-in': [1], // for-in
    'import/no-unresolved': [0], // import
    'import/no-dynamic-require': [0], // require 动态url
    'import/prefer-default-export': [0], // 当只有一个export的时候 建议使用 export default
    'import/no-extraneous-dependencies': [0],
    'import/extensions': [0], // 文件后缀
    'class-methods-use-this': [0],
    'no-useless-catch': [0],
    'object-curly-newline': [0],
    'no-empty': [2, { allowEmptyCatch: true }]
  }
}

module.exports = EslintConfig
