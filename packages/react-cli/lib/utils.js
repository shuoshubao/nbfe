/* eslint-disable no-console */

const { extname } = require('path')
const { sortBy, cloneDeep } = require('lodash')
const dayjs = require('dayjs')
const filesize = require('filesize')
const { enableWebpackDll, packConfig } = require('./config')
const { getDllManifestPath } = require('./dll-helper')
const { log } = require('./helpers')

// webpack 打包信息输出
const webpackStatsLog = (webpackConfig, err, stats) => {
  if (err) {
    console.error(err.stack || err)
    if (err.details) {
      console.error(err.details)
    }
    return
  }
  const {
    startTime,
    endTime,
    compilation: { assets }
  } = stats

  log(stats.toString(webpackConfig.stats))

  const data = Object.keys(assets).reduce((prev, cur) => {
    const type = extname(cur)
    if (['.html', '.json'].includes(type)) {
      return prev
    }
    prev.push({
      name: cur,
      type,
      size: filesize(assets[cur].size())
    })
    return prev
  }, [])

  console.log('[webpack 构建耗时]', endTime - startTime, 'ms')
  console.log('[webpack 资源清单]')
  // 权重
  const weightRank = ['.js', '.css', '.png', '.jpg', '.jpeg', '.svg']
  const sortData = sortBy(data, v => {
    const { name, type } = v
    const index = data.findIndex(v2 => {
      return v2.name === name
    })
    const typeIndex = weightRank.indexOf(type)
    return index + data.length * (typeIndex === -1 ? weightRank.length : typeIndex)
  })
  console.table(sortData)
}

// 合并 packConfig.assets 和 webpack.dll 产物
const getAssets = isDevelopment => {
  const assets = cloneDeep(packConfig.assets)
  if (enableWebpackDll) {
    const { manifest } = require(getDllManifestPath(isDevelopment))
    assets.js.push(...Object.values(manifest))
  }
  return assets
}

// WebpackManifestPlugin generate
const manifestPluginGenerate = (isDevelopment, entries) => {
  const manifest = Object.entries(entries).reduce((prev, [k, v]) => {
    const assets = getAssets(isDevelopment)
    const list = v.map(v2 => {
      return [packConfig.publicPath, v2].join('')
    })
    assets.css.push(...list.filter(v2 => v2.endsWith('.css')))
    assets.js.push(...list.filter(v2 => v2.endsWith('.js')))
    prev[k] = assets
    return prev
  }, {})
  return {
    date: dayjs().format('YYYY-MM-DD HH:mm:ss'),
    manifest
  }
}

module.exports = {
  webpackStatsLog,
  getAssets,
  manifestPluginGenerate
}
