const HtmlWebpackPlugin = require('html-webpack-plugin')
const prettier = require('prettier')
const { isString, memoize } = require('lodash')

const formatHtml = memoize(html => {
  return prettier.format(html, {
    parser: 'html',
    printWidth: 120
  })
})

const convertManifestToHtmlPlugin = memoize(assets => {
  const { css, js } = assets

  return {
    css: css.map(v => {
      if (isString(v)) {
        return {
          tagName: 'link',
          voidTag: true,
          attributes: {
            rel: 'stylesheet',
            href: v
          }
        }
      }
      const { innerHTML, ...attributes } = v
      return {
        tagName: 'style',
        voidTag: false,
        innerHTML,
        attributes
      }
    }),
    js: js.map(v => {
      if (isString(v)) {
        return {
          tagName: 'script',
          voidTag: false,
          attributes: {
            src: v
          }
        }
      }
      const { innerHTML, ...attributes } = v
      return {
        tagName: 'script',
        voidTag: false,
        innerHTML,
        attributes
      }
    })
  }
})

const PluginName = 'HtmlWebpackAssetsPlugin'

module.exports = class {
  constructor(options) {
    this.options = options
  }

  apply(compiler) {
    compiler.hooks.compilation.tap(PluginName, compilation => {
      const hooks = HtmlWebpackPlugin.getHooks(compilation)

      hooks.alterAssetTagGroups.tapAsync(PluginName, (data, callback) => {
        const { css, js } = convertManifestToHtmlPlugin(this.options.assets)

        data.headTags.unshift(...css)

        data.bodyTags.unshift(...js)

        return callback(null, data)
      })

      hooks.beforeEmit.tapAsync(PluginName, (data, callback) => {
        data.html = formatHtml(data.html)
        return callback(null, data)
      })
    })
  }
}
