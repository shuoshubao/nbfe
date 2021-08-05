const TerserPlugin = require('terser-webpack-plugin');
const CssMinimizerPlugin = require('css-minimizer-webpack-plugin');
const { isDevelopment, isMac, packConfig } = require('./config');
const devServer = require('./devServer');

module.exports = {
    mode: packConfig.mode,
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
                test: /\.(png|jpe?g|gif|svg|mp3|woff2?|eot|ttf|otf)(\?.*)?$/,
                type: 'asset/resource'
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
};
