const TerserPlugin = require('terser-webpack-plugin')
const CssMinimizerPlugin = require('css-minimizer-webpack-plugin')
const miniSVGDataURI = require('mini-svg-data-uri')
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
      ],
      splitChunks: {
        chunks: 'initial',
        minSize: 30000,
        minChunks: 1,
        maxAsyncRequests: 5,
        maxInitialRequests: 3,
        cacheGroups: {
          default: false,
          vendors: false,
          common: {
            name: 'common',
            chunks: 'all',
            minChunks: 3,
            reuseExistingChunk: true
          }
        }
      }
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
          test: /\.svg$/i,
          type: 'asset',
          generator: {
            dataUrl(content) {
              return miniSVGDataURI(content.toString())
            }
          },
          parser: {
            dataUrlCondition: {
              maxSize: assetsMaxSize
            }
          }
        },
        {
          test: /\.(otf|eot|woff2?|ttf|svg)$/i,
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
