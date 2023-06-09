const { relative } = require('path')
const { createServer } = require('vite')
const react = require('@vitejs/plugin-react-swc')
const { viteExternalsPlugin } = require('vite-plugin-externals')
const { packConfig } = require('./config')
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
    name: 'html-transform',
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
  server: {
    port: devServer.port,
    host: devServer.host
  },
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
  const server = await createServer(viteConfig)
  await server.listen()
  server.printUrls()
}
