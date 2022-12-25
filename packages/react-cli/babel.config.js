/*
 * @Author: fangt11
 * @Date:   2022-04-27 15:17:50
 * @Last Modified by:   shuoshubao
 * @Last Modified time: 2022-04-27 15:22:06
 * @Desc: babel 配置
 */
module.exports = {
  presets: [
    [
      '@babel/preset-env',
      {
        useBuiltIns: false,
        modules: false,
        loose: true
      }
    ],
    '@babel/preset-react'
  ],
  plugins: [
    '@babel/plugin-proposal-export-default-from',
    ['@babel/plugin-proposal-decorators', { legacy: true }],
    ['@babel/plugin-proposal-private-methods', { loose: true }],
    ['@babel/plugin-proposal-class-properties', { loose: true }],
    [
      '@babel/plugin-transform-runtime',
      {
        helpers: false,
        regenerator: true
      }
    ]
  ]
}
