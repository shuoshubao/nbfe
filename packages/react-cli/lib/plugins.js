const { WebpackManifestPlugin } = require('webpack-manifest-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const NodePolyfillPlugin = require('node-polyfill-webpack-plugin');
const { BundleAnalyzerPlugin } = require('webpack-bundle-analyzer');
const { injectDllReferencePlugins, injectAddAssetHtmlPlugins } = require('./dll-helper');
const { manifestPluginGenerate } = require('./utils');

const { packConfig, MiniCssExtractPlugin, enableWebpackDll } = require('./config');

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
    if (isDevelopment) {
        Object.entries(packConfig.entry).forEach(([k]) => {
            chainableConfig.plugin(['HtmlWebpackPlugin', k].join('_')).use(HtmlWebpackPlugin, [
                {
                    filename: `${k}.html`,
                    template: packConfig.template,
                    scriptLoading: 'blocking',
                    minify: false,
                    cache: false,
                    chunks: [k]
                }
            ]);
        });
    }
    if (isDevelopment) {
        if (enableWebpackDll) {
            injectAddAssetHtmlPlugins(isDevelopment, chainableConfig);
        }
    } else {
        chainableConfig.plugin('BundleAnalyzerPlugin').use(BundleAnalyzerPlugin, [
            {
                analyzerMode: 'static',
                openAnalyzer: false,
                logLevel: 'silent',
                reportFilename: 'WebpackAnalyzerReport.html'
            }
        ]);
    }
    chainableConfig.plugin('NodePolyfillPlugin').use(NodePolyfillPlugin);
    chainableConfig.plugin('WebpackManifestPlugin').use(WebpackManifestPlugin, [
        {
            fileName: packConfig.manifestFileName,
            generate: (seed, files, entries) => {
                const manifestData = manifestPluginGenerate(isDevelopment, seed, files, entries);
                if (packConfig.manifestPluginGenerate) {
                    return packConfig.manifestPluginGenerate({ seed, files, entries, manifestData });
                }
                return manifestData;
            }
        }
    ]);
};
