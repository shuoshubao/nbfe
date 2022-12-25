const { join } = require('path')
const webpack = require('webpack')
const TerserPlugin = require('terser-webpack-plugin')
const { WebpackManifestPlugin } = require('webpack-manifest-plugin')
const { BundleAnalyzerPlugin } = require('webpack-bundle-analyzer')
const { packConfig } = require('./config')
const { getDllDir, manifestPluginGenerate } = require('./dll-helper')

module.exports = isDevelopment => {
  const mode = isDevelopment ? 'development' : 'production'
  const libraryName = isDevelopment ? '__webpack_dll_[name]' : '__webpack_dll_[name]_[fullhash]'

  const webpackConfig = {
    mode,
    entry: packConfig.dllEntry,
    output: {
      publicPath: packConfig.publicPath,
      filename: isDevelopment ? '[name].js' : '[name]_[contenthash].js',
      path: getDllDir(isDevelopment),
      library: libraryName
    },
    optimization: {
      minimizer: [
        new TerserPlugin({
          extractComments: false
        })
      ]
    },
    externals: packConfig.configureWebpack.externals,
    plugins: [
      new WebpackManifestPlugin({
        generate: (seed, files, entries) => {
          return manifestPluginGenerate(isDevelopment, entries)
        }
      }),
      new webpack.DllPlugin({
        name: libraryName,
        path: join(getDllDir(isDevelopment), '[name].manifest.json')
      })
    ],
    performance: {
      hints: false
    }
  }

  if (!isDevelopment) {
    webpackConfig.plugins.push(
      new BundleAnalyzerPlugin({
        analyzerMode: 'static',
        openAnalyzer: false,
        logLevel: 'silent',
        reportFilename: 'WebpackAnalyzerReport.html'
      })
    )
  }
  return webpackConfig
}
