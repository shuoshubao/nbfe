/* eslint-disable no-console */

const webpack = require('webpack');
const { merge } = require('webpack-merge');
const Config = require('webpack-chain');
const WebpackDevServer = require('webpack-dev-server');
const { packConfig, enableWebpackDll } = require('./config');
const { log, logObject, checkNeedUpdateDll, logSymbols, webpackStatsLog, generateHtml } = require('./utils');
const devServer = require('./devServer');
const babelConfig = require('../babel.config');

const webpackCompiler = webpackConfig => {
    return new Promise((resolve, reject) => {
        webpack(webpackConfig, (err, stats) => {
            webpackStatsLog(webpackConfig, err, stats);
            if (err) {
                reject(err);
                return;
            }
            resolve();
        });
    });
};

const webpackBuildDll = async () => {
    if (!enableWebpackDll) {
        return;
    }
    if (!checkNeedUpdateDll()) {
        return;
    }
    console.log('[webpack dll] 执行');
    const webpackConfig = require('./webpack.dll.config');
    try {
        console.time('[webpack dll]');
        await webpackCompiler(webpackConfig);
        console.timeEnd('[webpack dll]');
    } catch (e) {
        log(e);
        process.exit(1);
    }
};

const getWebpackConfig = () => {
    const webpackConfig = require('./webpack.config');
    const injectPlugins = require('./plugins');
    const injectRules = require('./rules');
    const chainableConfig = new Config();
    injectPlugins(chainableConfig);
    injectRules(chainableConfig);
    packConfig.chainWebpack(chainableConfig);
    return merge(webpackConfig, packConfig.configureWebpack, chainableConfig.toConfig());
};

const webpackServe = async () => {
    try {
        await webpackBuildDll();
        console.time('[webpack serve]');
        const webpackConfig = getWebpackConfig();
        const compiler = webpack(webpackConfig);
        const server = new WebpackDevServer(devServer, compiler);
        server.start(devServer.port, devServer.host, err => {
            if (err) {
                log(err);
            }
            console.timeEnd('[webpack serve]');
        });
    } catch (e) {
        log(e);
        process.exit(1);
    }
};

const webpackBuild = async () => {
    try {
        await webpackBuildDll();
        const webpackConfig = getWebpackConfig();
        console.time('[webpack build]');
        await webpackCompiler(webpackConfig);
        console.log(logSymbols.success, 'webpack 构建成功!');
        console.timeEnd('[webpack build]');
        if (packConfig.generateHtmlFile) {
            generateHtml();
        }
    } catch (e) {
        console.log(logSymbols.error, 'webpack 构建失败!');
        log(e);
        process.exit(1);
    }
};

// 打印 webpack 配置
const inspectWebpackConfig = () => {
    log(packConfig.mode, 'cyan');
    logObject(getWebpackConfig());
};

const getBabelConfig = () => {
    return babelConfig;
};

module.exports = {
    getBabelConfig,
    getWebpackConfig,
    inspectWebpackConfig,
    webpackServe,
    webpackBuild
};
