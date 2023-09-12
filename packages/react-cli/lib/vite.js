const { relative } = require('path')
const { createServer } = require('vite')
const { version: VITE_VERSION } = require('vite/package.json')
const react = require('@vitejs/plugin-react-swc')
const { viteExternalsPlugin } = require('vite-plugin-externals')
const { default: svgr } = require('vite-plugin-svgr')
const { isString, pick } = require('lodash')
const colors = require('picocolors')
const { performance } = require('perf_hooks')
const { packConfig } = require('./config')
const { getNetworkUrl, getDefineData } = require('./helpers')
const devServer = require('./devServer')

const { rootPath, entry, alias, assets, configureWebpack, define } = packConfig
const { externals } = configureWebpack

const tags = [
  assets.css.map(v => {
    if (isString(v)) {
      return {
        injectTo: 'head-prepend',
        tag: 'link',
        attrs: {
          rel: 'stylesheet',
          href: v
        }
      }
    }
    const { innerHTML, ...attrs } = v
    return {
      injectTo: 'head-prepend',
      tag: 'style',
      attrs,
      children: innerHTML
    }
  }),
  [
    ...assets.js,
    ...entry.index.map(v => {
      return {
        type: 'module',
        src: relative(rootPath, v)
      }
    })
  ].map(v => {
    if (isString(v)) {
      return {
        injectTo: 'body-prepend',
        tag: 'script',
        attrs: {
          src: v
        }
      }
    }
    const { innerHTML, ...attrs } = v
    return {
      injectTo: 'body-prepend',
      tag: 'script',
      attrs,
      children: innerHTML
    }
  })
].flat()

const htmlPlugin = () => {
  return {
    name: 'vite:html',
    transformIndexHtml: {
      enforce: 'pre',
      async transform(html) {
        return {
          html,
          tags
        }
      }
    }
  }
}

const viteConfig = {
  configFile: false,
  server: pick(devServer, 'port', 'host', 'proxy'),
  css: {
    preprocessorOptions: {
      less: {
        javascriptEnabled: true
      }
    }
  },
  resolve: {
    alias
  },
  define: getDefineData(define),
  plugins: [react(), svgr(), externals && viteExternalsPlugin(externals), htmlPlugin()].filter(Boolean)
}

module.exports = async () => {
  const viteStartTime = performance.now()

  const server = await createServer(viteConfig)
  await server.listen()

  const { info } = server.config.logger

  const startupDurationString = colors.dim(
    `ready in ${colors.reset(colors.bold(Math.ceil(performance.now() - viteStartTime)))} ms`
  )

  const viteVersionString = `${colors.bold('VITE')} v${VITE_VERSION}`

  info(`  ${colors.green(viteVersionString)}  ${startupDurationString}`, {
    clear: !server.config.logger.hasWarned
  })

  server.printUrls()

  info(`  ${colors.green('➜')}  ${colors.bold('Network')}: ${getNetworkUrl(devServer)}`)
}
