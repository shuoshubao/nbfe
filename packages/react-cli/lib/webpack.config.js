const TerserPlugin = require('terser-webpack-plugin')
const CssMinimizerPlugin = require('css-minimizer-webpack-plugin')
const { isMac, packConfig } = require('./config')
const devServer = require('./devServer')

module.exports = isDevelopment => {
  const mode = isDevelopment ? 'development' : 'production'
  const assetsMaxSize = isDevelopment ? 0 : 1024 * 8

  return {
    mode,
    target: 'web',
    entry: packConfig.entry,
    output: {
      publicPath: packConfig.publicPath,
      path: packConfig.outputDir,
      filename: isDevelopment ? 'js/[name].js' : 'js/[name].[contenthash].js',
      assetModuleFilename: 'assets/[name].[hash][ext]',
      crossOriginLoading: 'anonymous'
    },
    devServer: isDevelopment ? devServer : {},
    devtool: isDevelopment ? 'eval-cheap-module-source-map' : false,
    optimization: {
      minimizer: [
        new TerserPlugin({
          parallel: isMac || 3,
          extractComments: false
        }),
        new CssMinimizerPlugin()
      ]
    },
    module: {
      rules: [
        {
          test: /\.(jpe?g|png|gif)$/i,
          type: 'asset',
          generator: {
            filename: 'assets/images/[name].[hash][ext]'
          },
          parser: {
            dataUrlCondition: {
              maxSize: assetsMaxSize
            }
          }
        },
        {
          test: /\.svg$/,
          use: [
            {
              loader: '@svgr/webpack'
            }
          ]
        },
        {
          test: /\.(otf|eot|woff2?|ttf)$/i,
          type: 'asset',
          generator: {
            filename: 'assets/fonts/[name].[hash][ext]'
          }
        },
        {
          test: /\.(txt|xml)$/i,
          type: 'asset/source'
        }
      ]
    },
    resolve: {
      alias: packConfig.alias,
      extensions: ['.js', '.jsx', '.ts', '.tsx', '.json']
    },
    performance: {
      hints: false
    },
    stats: {
      colors: true,
      modules: false,
      children: false,
      chunks: false
    }
  }
}
