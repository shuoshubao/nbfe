const { existsSync } = require('fs')
const { resolve } = require('path')
const ip = require('ip')
const { cloneDeep, noop, flatten, merge } = require('lodash')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const babelConfig = require('../babel.config')

const isMac = process.platform === 'darwin'

const ipAddress = ip.address()

const rootPath = process.cwd()

const resolveRootPath = (to = '') => {
  return resolve(rootPath, to)
}

// 获取默认的 entry index
const getDefaultIndexEntry = () => {
  const indexJs = 'src/index.js'
  const indexJsx = 'src/index.jsx'
  const indexTs = 'src/index.ts'
  const indexTsx = 'src/index.tsx'
  if (existsSync(resolve(rootPath, indexJs))) {
    return indexJs
  }
  if (existsSync(resolve(rootPath, indexJsx))) {
    return indexJsx
  }
  if (existsSync(resolve(rootPath, indexTs))) {
    return indexTs
  }
  if (existsSync(resolve(rootPath, indexTsx))) {
    return indexTsx
  }
  return indexJs
}

const defaultConfig = {
  srcPath: 'src',
  packConfigPath: 'react.config.js',
  rootPath,
  template: 'index.html',
  enableVite: true,
  publicPath: '/',
  outputDir: 'dist',
  manifestFileName: 'manifest.json',
  entry: {
    index: getDefaultIndexEntry()
  },
  dllEntry: null,
  enableMock: true,
  alias: {},
  devServer: {},
  // external 所需的cdn资源, 或者其他需要预先加载的 css js 资源
  assets: {
    css: [],
    js: []
  },
  css: {
    requireModuleExtension: true, // https://cli.vuejs.org/zh/config/#css-requiremoduleextension
    loaderOptions: {} // https://cli.vuejs.org/zh/config/#css-loaderoptions
  },
  // https://cli.vuejs.org/zh/guide/webpack.html#简单的配置方式
  configureWebpack: {},
  // https://cli.vuejs.org/zh/guide/webpack.html#链式操作-高级
  chainWebpack: noop,
  manifestPluginGenerate: null,
  babelConfig
}

let packConfig = cloneDeep(defaultConfig)

if (existsSync(resolveRootPath(defaultConfig.packConfigPath))) {
  const defineConfig = require(resolveRootPath(defaultConfig.packConfigPath))
  const projectConfig = defineConfig({
    isDevelopment: process.env.REACT_CLI__ENV === 'development',
    isMac,
    ipAddress
  })
  packConfig = merge(defaultConfig, projectConfig)
}

packConfig.srcPath = resolveRootPath(packConfig.srcPath)

packConfig.packConfigPath = resolveRootPath(packConfig.packConfigPath)

packConfig.template = resolveRootPath(packConfig.template)
if (!existsSync(packConfig.template)) {
  packConfig.template = resolve(__dirname, '../index.html')
}

packConfig.entry = Object.entries(packConfig.entry).reduce((prev, [k, v]) => {
  const files = flatten([v]).map(v2 => {
    const filePath = resolveRootPath(v2)
    if (existsSync(filePath)) {
      return filePath
    }
    return v2
  })
  prev[k] = files
  return prev
}, {})

packConfig.alias = Object.entries(packConfig.alias).reduce(
  (prev, [k, v]) => {
    prev[k] = resolveRootPath(v)
    return prev
  },
  {
    '@': packConfig.srcPath
  }
)

packConfig.outputDir = resolveRootPath(packConfig.outputDir)

const enableWebpackDll = Object.keys(packConfig.dllEntry || {}).length !== 0

module.exports = {
  isMac,
  packConfig,
  MiniCssExtractPlugin,
  enableWebpackDll
}
