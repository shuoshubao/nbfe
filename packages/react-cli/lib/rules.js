/* eslint-disable sonarjs/no-duplicate-string */

const { packConfig } = require('./config');
const injectCssRules = require('./css');

module.exports = chainableConfig => {
    chainableConfig.module
        .rule('js')
        .test(/\.m?jsx?$/)
        .pre()
        .include.add(packConfig.srcPath)
        .end()
        .use('thread-loader')
        .loader('thread-loader')
        .end()
        .use('babel-loader')
        .loader('babel-loader')
        .options({
            cacheDirectory: true,
            ...packConfig.babelConfig
        });

    chainableConfig.module
        .rule('ts')
        .test(/\.tsx?$/)
        .pre()
        .include.add(packConfig.srcPath)
        .end()
        .use('ts-loader')
        .loader('ts-loader');

    chainableConfig.module
        .rule('svg')
        .test(/\.svg$/)
        .use('babel-loader')
        .loader('babel-loader')
        .options({
            cacheDirectory: true,
            ...packConfig.babelConfig
        })
        .end()
        .use('@svgr/webpack')
        .loader('@svgr/webpack')
        .options({
            babel: false
        });

    injectCssRules(chainableConfig);
};