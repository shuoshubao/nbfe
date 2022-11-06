const { join, dirname } = require('path');
const webpack = require('webpack');
const TerserPlugin = require('terser-webpack-plugin');
const { WebpackManifestPlugin } = require('webpack-manifest-plugin');
const { BundleAnalyzerPlugin } = require('webpack-bundle-analyzer');
const { packConfig, pkgVersionsKey } = require('./config');
const { getDllDir } = require('./dll-helper');

module.exports = isDevelopment => {
    const dllDir = isDevelopment ? 'dll-development' : 'dll-production';
    const mode = isDevelopment ? 'development' : 'production';
    const libraryName = isDevelopment ? '__webpack_dll_[name]' : '__webpack_dll_[name]_[fullhash]';

    const webpackConfig = {
        mode,
        entry: packConfig.dllEntry,
        output: {
            publicPath: packConfig.publicPath,
            filename: isDevelopment ? `${dllDir}/[name].js` : `${dllDir}/[name]_[contenthash].js`,
            path: dirname(getDllDir(isDevelopment)),
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
                fileName: `${dllDir}/manifest.json`,
                generate: (seed, files, entries) => {
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
                                // 注入 publicPath
                                return [packConfig.publicPath, v2].join('');
                            });
                            return prev;
                        },
                        {
                            publicPath: packConfig.publicPath,
                            [pkgVersionsKey]: versions
                        }
                    );
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
    };

    if (!isDevelopment) {
        webpackConfig.plugins.push(
            new BundleAnalyzerPlugin({
                analyzerMode: 'static',
                openAnalyzer: false,
                logLevel: 'silent',
                reportFilename: 'WebpackAnalyzerReport.html'
            })
        );
    }
    return webpackConfig;
};
