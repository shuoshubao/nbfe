const { relative } = require('path')
const { format } = require('url')
const { createServer } = require('vite')
const { version: VITE_VERSION } = require('vite/package.json')
const react = require('@vitejs/plugin-react-swc')
const { viteExternalsPlugin } = require('vite-plugin-externals')
const { pick } = require('lodash')
const colors = require('picocolors')
const { performance } = require('perf_hooks')
const { ipAddress, packConfig } = require('./config')
const devServer = require('./devServer')

const { rootPath, entry, alias, assets, configureWebpack } = packConfig
const { externals } = configureWebpack

const tags = [
  assets.css.map(v => {
    return {
      injectTo: 'head-prepend',
      tag: 'link',
      attrs: {
        rel: 'stylesheet',
        href: v
      }
    }
  }),
  entry.index.map(v => {
    return {
      injectTo: 'body-prepend',
      tag: 'script',
      attrs: {
        type: 'module',
        src: relative(rootPath, v)
      }
    }
  }),
  assets.js.map(v => {
    return {
      injectTo: 'body-prepend',
      tag: 'script',
      attrs: {
        src: v
      }
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
  plugins: [react(), externals && viteExternalsPlugin(externals), htmlPlugin()].filter(Boolean)
}

module.exports = async () => {
  const viteStartTime = performance.now()

  const server = await createServer(viteConfig)
  await server.listen()

  const { info } = server.config.logger

  const startupDurationString = colors.dim(
    `ready in ${colors.reset(colors.bold(Math.ceil(performance.now() - viteStartTime)))} ms`
  )

  info(`  ${colors.green(`${colors.bold('VITE')} v${VITE_VERSION}`)}  ${startupDurationString}`, {
    clear: !server.config.logger.hasWarned
  })

  server.printUrls()

  const url = format({
    protocol: 'http',
    hostname: ipAddress,
    port: devServer.port,
    pathname: '/'
  })

  info(`  ${colors.green('➜')}  ${colors.bold('Network')}: ${url}`)
}
