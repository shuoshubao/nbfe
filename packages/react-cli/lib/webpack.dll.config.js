const path = require('path');
const webpack = require('webpack');
const TerserPlugin = require('terser-webpack-plugin');
const { WebpackManifestPlugin } = require('webpack-manifest-plugin');
const { BundleAnalyzerPlugin } = require('webpack-bundle-analyzer');
const { isDevelopment, isProduction, packConfig, pkgVersionsKey } = require('./config');
const { dllManifestFileName } = require('./dll-helper');

const { outputDir, dllDir } = packConfig;

const libraryName = isDevelopment ? '__webpack_dll_[name]' : '__webpack_dll_[name]_[fullhash]';

const webpackConfig = {
    mode: packConfig.mode,
    entry: packConfig.dllEntry,
    output: {
        publicPath: packConfig.publicPath,
        filename: isDevelopment ? `${dllDir}/[name].js` : `${dllDir}/[name]_[contenthash].js`,
        path: outputDir,
        library: libraryName
    },
    optimization: {
        minimizer: [
            new TerserPlugin({
                extractComments: false
            })
        ]
    },
    plugins: [
        new WebpackManifestPlugin({
            fileName: dllManifestFileName,
            generate: (seed, files, entries) => {
                // 注入 publicPath
                const versions = Object.keys(entries).reduce((prev, cur) => {
                    const itemVersions = packConfig.dllEntry[cur].map(v => {
                        const { version } = require([v, 'package.json'].join('/'));
                        return {
                            [v]: version
                        };
                    });
                    prev[cur] = itemVersions;
                    return prev;
                }, {});
                return Object.entries(entries).reduce(
                    (prev, [k, v]) => {
                        prev[k] = v.map(v2 => {
                            return [packConfig.publicPath, v2].join('');
                        });
                        return prev;
                    },
                    { [pkgVersionsKey]: versions }
                );
            }
        }),
        new webpack.DllPlugin({
            name: libraryName,
            path: path.join(outputDir, `${dllDir}/[name].manifest.json`)
        })
    ],
    performance: {
        hints: false
    }
};

if (isProduction) {
    webpackConfig.plugins.push(
        new BundleAnalyzerPlugin({
            analyzerMode: 'static',
            openAnalyzer: false,
            logLevel: 'silent',
            reportFilename: [dllDir, 'WebpackAnalyzerReport.html'].join('/')
        })
    );
}

module.exports = webpackConfig;
