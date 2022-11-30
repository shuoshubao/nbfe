/* eslint-disable no-console */

const { extname } = require('path');
const util = require('util');
const { sortBy, flatten } = require('lodash');
const dayjs = require('dayjs');
const filesize = require('filesize');
const chalk = require('chalk');
const { enableWebpackDll, packConfig } = require('./config');
const { getDllManifestPath } = require('./dll-helper');

// 打印带颜色的信息
const log = (str, color) => {
    console.log(color ? chalk[color](str) : str);
};

// 打印对象
const logObject = obj => {
    console.log(util.inspect(obj, { showHidden: false, depth: null }));
};

const logSymbols = {
    info: 'ℹ️',
    success: '✅',
    warning: '⚠️',
    error: '❌️'
};

// webpack 打包信息输出
const webpackStatsLog = (webpackConfig, err, stats) => {
    if (err) {
        console.error(err.stack || err);
        if (err.details) {
            console.error(err.details);
        }
        return;
    }
    const {
        startTime,
        endTime,
        compilation: { assets }
    } = stats;

    log(stats.toString(webpackConfig.stats));

    const data = Object.keys(assets).reduce((prev, cur) => {
        const type = extname(cur);
        if (['.html', '.json'].includes(type)) {
            return prev;
        }
        prev.push({
            name: cur,
            type,
            size: filesize(assets[cur].size())
        });
        return prev;
    }, []);

    console.log('[webpack 构建耗时]', endTime - startTime, 'ms');
    console.log('[webpack 资源清单]');
    // 权重
    const weightRank = ['.js', '.css', '.png', '.jpg', '.jpeg', '.svg'];
    const sortData = sortBy(data, v => {
        const { name, type } = v;
        const index = data.findIndex(v2 => {
            return v2.name === name;
        });
        const typeIndex = weightRank.indexOf(type);
        return index + data.length * (typeIndex === -1 ? weightRank.length : typeIndex);
    });
    console.table(sortData);
};

/**
 * [将资源转换为 css 和 js 数组]
 * @param  {Array}  list [资源列表]
 * @return {Object}      [css 和 js 数组]
 */
const convertManifest = (list = []) => {
    const css = list.filter(v => {
        return v.endsWith('.css');
    });
    const js = list.filter(v => {
        return v.endsWith('.js');
    });
    return {
        css,
        js
    };
};

const getAssets = isDevelopment => {
    const assets = Object.values(packConfig.assets);
    if (enableWebpackDll) {
        const { manifest } = require(getDllManifestPath(isDevelopment));
        assets.push(Object.values(manifest));
    }
    return flatten(assets);
};

// WebpackManifestPlugin generate
const manifestPluginGenerate = (isDevelopment, entries) => {
    const manifest = Object.entries(entries).reduce((prev, [k, v]) => {
        const assets = getAssets(isDevelopment);
        assets.push(
            ...v.map(v2 => {
                return [packConfig.publicPath, v2].join('');
            })
        );
        prev[k] = convertManifest(assets);
        return prev;
    }, {});
    return {
        date: dayjs().format('YYYY-MM-DD HH:mm:ss'),
        manifest
    };
};

module.exports = {
    log,
    logObject,
    logSymbols,
    webpackStatsLog,
    convertManifest,
    getAssets,
    manifestPluginGenerate
};
