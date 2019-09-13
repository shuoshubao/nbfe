const webpack = require('webpack');
const chalk = require('chalk');
const ProgressBarPlugin = require('progress-bar-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const OptimizeCSSAssetsPlugin = require('optimize-css-assets-webpack-plugin');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const AssetsWebpackPlugin = require('assets-webpack-plugin');
const VueLoaderPlugin = require('vue-loader/lib/plugin');
const { BundleAnalyzerPlugin } = require('webpack-bundle-analyzer');
const { convertDefine } = require('./utils');
const { isDevelopment, pathConfig, projectConfig } = require('../config');

const plugins = [
    new VueLoaderPlugin(),
    new ProgressBarPlugin({
        format: `🚀  build [:bar] ${chalk.green.bold(':percent')} (:elapsed seconds)`
    }),
    new webpack.EnvironmentPlugin(['NODE_ENV']),
    new webpack.DefinePlugin(convertDefine(projectConfig.webpackDefineConfig)),
    new webpack.ProvidePlugin(projectConfig.webpackProvide)
];

if (!isDevelopment) {
    plugins.push(
        ...[
            new MiniCssExtractPlugin({
                filename: `static/css/[name]${isDevelopment ? '' : '.[chunkhash]'}.css`
            }),
            new OptimizeCSSAssetsPlugin(),
            new CleanWebpackPlugin(),
            new AssetsWebpackPlugin({
                path: pathConfig.webpackAssets,
                filename: 'index.json',
                processOutput(assets) {
                    delete assets[''];
                    return JSON.stringify(assets, null, 4);
                },
                prettyPrint: true
            }),
            new BundleAnalyzerPlugin({
                analyzerMode: 'static',
                openAnalyzer: false,
                reportFilename: `${pathConfig.webpackBundleAnalyzer}/${Date.now()}.html`
            })
        ]
    );
}

module.exports = plugins;
