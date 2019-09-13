const { resolve, relative, dirname } = require('path');
const glob = require('glob');
const { pathConfig } = require('../../config');

const routers = glob.sync(`${pathConfig.view}/**/index.vue`);
const entry = {};
const pagesConfig = [];

routers.forEach(v => {
    const entryKey = dirname(relative(pathConfig.view, v));
    const entryVal = resolve(pathConfig.ViewCacheDirectory, entryKey, 'index.js');
    entry[entryKey] = entryVal;
    pagesConfig.push({
        vuePath: v,
        outputPath: entryKey,
        entryPath: entryVal
    });
});

module.exports = { entry, pagesConfig };
