/* eslint-disable no-console */

const { existsSync, readFileSync, writeFileSync } = require('fs');
const { join, extname } = require('path');
const util = require('util');
const { isEqual, omit, flattenDeep, sortBy, uniq } = require('lodash');
const prettier = require('prettier');
const dayjs = require('dayjs');
const filesize = require('filesize');
const chalk = require('chalk');
const { createElement } = require('@nbfe/js2html');
const { enableWebpackDll, packConfig, pkgVersionsKey } = require('./config');
const { dllManifestPath } = require('./dll-helper');
const prettierConfig = require('../prettier.config');

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

// 检测是否需要运行 dll
const checkNeedUpdateDll = () => {
    if (!existsSync(dllManifestPath)) {
        return true;
    }
    const cacheDllManifest = require(dllManifestPath);
    const cacheDllManifestVersions = cacheDllManifest[pkgVersionsKey];
    const dllManifestVersions = Object.keys(packConfig.dllEntry).reduce((prev, cur) => {
        const itemVersions = packConfig.dllEntry[cur].map(v => {
            const { version } = require([v, 'package.json'].join('/'));
            return {
                [v]: version
            };
        });
        prev[cur] = itemVersions;
        return prev;
    }, {});
    const isSame = isEqual(cacheDllManifestVersions, dllManifestVersions);
    if (isSame) {
        console.log('[webpack dll] 与之前版本号相同, 不执行 webpack.DllReferencePlugin 构建');
    } else {
        console.log('[webpack dll] 与之前版本号不同, 将执行 webpack.DllReferencePlugin 构建');
        console.log('[webpack dll] 之前的版本号:');
        console.log(cacheDllManifestVersions);
        console.log('[webpack dll] 之前的版本号:');
        console.log(dllManifestVersions);
    }
    return !isSame;
};

// WebpackManifestPlugin generate
const manifestPluginGenerate = (seed, files, entries) => {
    let dllManifest = {};
    if (enableWebpackDll) {
        dllManifest = require(dllManifestPath);
        dllManifest = omit(dllManifest, [pkgVersionsKey]);
    }
    const manifest = Object.entries(packConfig.entry).reduce((prev, [k]) => {
        // optimization.splitChunks.cacheGroups
        const itemCacheGroups = files
            .filter(v2 => {
                const name = v2.name.split('.')[0];
                return name === 'common';
            })
            .map(v2 => {
                return v2.path;
            });

        const entryFiles = entries[k].map(v2 => {
            return files.find(v3 => {
                return v3.path.includes(v2);
            });
        });

        const sortedEntryFiles = sortBy(entryFiles, v2 => {
            return files.findIndex(v3 => {
                return v3.path === v2.path;
            });
        }).map(v2 => {
            return v2.path;
        });

        const list = flattenDeep([
            Object.values(packConfig.assets),
            Object.values(dllManifest),
            itemCacheGroups,
            sortedEntryFiles
        ]);
        prev[k] = convertManifest(uniq(list));
        return prev;
    }, {});

    const manifestData = {
        date: dayjs().format('YYYY-MM-DD HH:mm:ss'),
        seed,
        files: files.map(v => {
            return omit(v, ['chunk']);
        }),
        entries,
        dllManifest,
        manifest
    };
    // 单entry
    if (Object.keys(packConfig.entry).length === 1) {
        const entryKey = Object.keys(packConfig.entry)[0];
        manifestData.css = manifest[entryKey].css;
        manifestData.js = manifest[entryKey].js;
    }
    return manifestData;
};

// 生成html文件
const generateHtml = () => {
    const templateContent = readFileSync(packConfig.template).toString();
    const { manifest } = require(join(packConfig.outputDir, packConfig.manifestFileName));
    Object.entries(packConfig.entry).forEach(([k]) => {
        const { css, js } = manifest[k];
        const cssHtml = css
            .map(v => {
                return createElement({
                    tagName: 'link',
                    attrs: {
                        rel: 'stylesheet',
                        href: v
                    }
                });
            })
            .join('');
        const jsHtml = js
            .map(v => {
                return createElement({
                    tagName: 'script',
                    attrs: {
                        src: v
                    }
                });
            })
            .join('');
        const content = templateContent.replace('</head>', `${cssHtml}</head>`).replace('</body>', `</body>${jsHtml}`);
        const filename = join(packConfig.outputDir, `${k}.html`);
        writeFileSync(filename, prettier.format(content, { parser: 'html', ...prettierConfig }));
    });
};

module.exports = {
    log,
    logObject,
    logSymbols,
    webpackStatsLog,
    checkNeedUpdateDll,
    manifestPluginGenerate,
    generateHtml
};
