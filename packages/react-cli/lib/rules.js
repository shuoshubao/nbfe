/* eslint-disable sonarjs/no-duplicate-string */

const { packConfig } = require('./config')
const injectCssRules = require('./css')

module.exports = (isDevelopment, chainableConfig) => {
  chainableConfig.module
    .rule('js')
    .test(/\.m?jsx?$/)
    .pre()
    .include.add(packConfig.rootPath)
    .end()
    .pre()
    .exclude.add(/node_modules/)
    .end()
    .use('thread-loader')
    .loader('thread-loader')
    .end()
    .use('babel-loader')
    .loader('babel-loader')
    .options({
      cacheDirectory: true,
      ...packConfig.babelConfig
    })

  chainableConfig.module
    .rule('ts')
    .test(/\.tsx?$/)
    .pre()
    .include.add(packConfig.rootPath)
    .end()
    .pre()
    .exclude.add(/node_modules/)
    .end()
    .use('ts-loader')
    .loader('ts-loader')

  injectCssRules(isDevelopment, chainableConfig)
}
