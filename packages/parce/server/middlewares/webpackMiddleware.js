const fs = require('fs')
const path = require('path')
const webpack = require('webpack')
const singleEntryPlugin = require('webpack/lib/SingleEntryPlugin')
const HtmlwebpackPlugin = require('html-webpack-plugin')
const { hotMiddleware } = require('koa-webpack-middleware')
const webpackDevMiddleware = require('webpack-dev-middleware')
const webpackConfig = require('../../webpack/webpack.config')
const { pathConfig, projectConfig } = require('../../config')

const deepClone = data => JSON.parse(JSON.stringify(data))

const projectEntry = deepClone(webpackConfig.entry)

webpackConfig.entry = {
  common: ['webpack-hot-middleware/client?path=/__webpack_hmr&timeout=10000&reload=true', pathConfig.common]
}

/**
 * 以下代码为了解决webpack 第一次启动重启很多次的bug
 * https://github.com/webpack/watchpack/issues/25
 */

const utimeFn = strPath => {
  const now = Date.now() / 1000
  const then = now - 10
  fs.utimes(strPath, then, then, err => {
    if (err) {
      throw err
    }
  })
}
const setFileUtime = entryPath => {
  if (Array.isArray(entryPath)) {
    entryPath.forEach(utimeFn)
  } else {
    utimeFn(entryPath)
  }
}

const getSingleHtmlPlugin = (entryKey, entryValue) => {
  setFileUtime(entryValue)
  return new HtmlwebpackPlugin({
    filename: `${entryKey}.html`,
    template: pathConfig.template,
    title: projectConfig.title,
    favicon: pathConfig.favicon,
    NODE_ENV: process.env.NODE_ENV,
    chunks: ['manifest', 'common', entryKey]
  })
}

module.exports = app => {
  const htmlCache = {}
  const compiler = webpack(webpackConfig)
  const devMiddlewareInstance = webpackDevMiddleware(compiler, {
    publicPath: '/',
    stats: webpackConfig.stats
  })

  app.use(async (ctx, next) => {
    if (ctx.path === '/' || ctx.path.endsWith('.html')) {
      const entryKey = ctx.path === '/' ? 'index' : path.join(ctx.path.replace('.html', '').substring(1))
      const entryValue = projectEntry[entryKey]
      if (entryValue) {
        if (htmlCache[entryKey]) {
          await next()
        } else {
          compiler.apply(new singleEntryPlugin(pathConfig.root, entryValue, entryKey))
          compiler.apply(getSingleHtmlPlugin(entryKey, entryValue))
          devMiddlewareInstance.invalidate()
          htmlCache[entryKey] = true
          await next()
        }
      } else {
        const viewAbsolute = path.join(pathConfig.view, ctx.path.slice(0, -5))
        const viewRelative = path.relative(pathConfig.root, viewAbsolute)
        ctx.status = 404
        ctx.body = {
          code: 404,
          msg: '视图文件不存在',
          data: `${viewRelative}/index.vue`
        }
      }
    } else {
      await next()
    }
  })

  app.use(async (ctx, next) => {
    ctx.status = 200
    await devMiddlewareInstance(ctx.req, ctx.res, async () => {
      await next()
    })
  })

  app.use(hotMiddleware(compiler))
}
