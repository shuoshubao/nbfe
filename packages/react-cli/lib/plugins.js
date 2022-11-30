const { WebpackManifestPlugin } = require('webpack-manifest-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const NodePolyfillPlugin = require('node-polyfill-webpack-plugin');
const { BundleAnalyzerPlugin } = require('webpack-bundle-analyzer');
const dayjs = require('dayjs');
const HtmlWebpackAssetsPlugin = require('./HtmlWebpackAssetsPlugin');
const { packConfig, MiniCssExtractPlugin, enableWebpackDll } = require('./config');
const { injectDllReferencePlugins } = require('./dll-helper');
const { getAssets, manifestPluginGenerate } = require('./utils');

module.exports = (isDevelopment, chainableConfig) => {
    chainableConfig.plugin('MiniCssExtractPlugin').use(MiniCssExtractPlugin, [
        {
            filename: isDevelopment ? 'css/[name].css' : 'css/[name].[contenthash].css',
            ignoreOrder: true
        }
    ]);
    if (enableWebpackDll) {
        injectDllReferencePlugins(isDevelopment, chainableConfig);
    }
    Object.entries(packConfig.entry).forEach(([k]) => {
        chainableConfig.plugin(['HtmlWebpackPlugin', k].join('_')).use(HtmlWebpackPlugin, [
            {
                filename: `${k}.html`,
                template: packConfig.template,
                scriptLoading: 'blocking',
                minify: false,
                cache: false
            }
        ]);

        chainableConfig.plugin(['HtmlWebpackAssetsPlugin', k].join('_')).use(HtmlWebpackAssetsPlugin, [
            {
                assets: getAssets(isDevelopment)
            }
        ]);
    });
    if (!isDevelopment) {
        chainableConfig.plugin('BundleAnalyzerPlugin').use(BundleAnalyzerPlugin, [
            {
                analyzerMode: 'static',
                openAnalyzer: false,
                logLevel: 'silent',
                reportFilename: 'WebpackAnalyzerReport.html',
                reportTitle: () => {
                    return ['WebpackAnalyzerReport', dayjs().format('YYYY-MM-DD HH:mm:ss')].join(': ');
                }
            }
        ]);
    }
    chainableConfig.plugin('NodePolyfillPlugin').use(NodePolyfillPlugin);
    chainableConfig.plugin('WebpackManifestPlugin').use(WebpackManifestPlugin, [
        {
            generate: (seed, files, entries) => {
                return manifestPluginGenerate(isDevelopment, entries);
            }
        }
    ]);
};
