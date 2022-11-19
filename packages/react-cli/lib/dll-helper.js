const { existsSync } = require('fs');
const { basename, join } = require('path');
const { isEqual } = require('lodash');
const { formatTime } = require('@nbfe/tools');
const webpack = require('webpack');
const pkg = require('../package.json');
const { packConfig } = require('./config');

const { rootPath, outputDir, dllEntry } = packConfig;

const getDllDir = isDevelopment => {
    if (isDevelopment) {
        return join(rootPath, 'node_modules/.cache', pkg.name, 'dll-development');
    }
    return join(outputDir, 'dll-production');
};

const getDllManifestPath = isDevelopment => {
    return join(getDllDir(isDevelopment), 'manifest.json');
};

const injectDllReferencePlugins = (isDevelopment, chainableConfig) => {
    Object.keys(dllEntry).forEach(dllEntryKey => {
        const manifestPath = join(getDllDir(isDevelopment), `${dllEntryKey}.manifest.json`);
        chainableConfig.plugin(['DllReferencePlugin', dllEntryKey].join('_')).use(webpack.DllReferencePlugin, [
            {
                manifest: require(manifestPath)
            }
        ]);
    });
};

const getDllVersions = () => {
    return Object.entries(dllEntry).reduce((prev, [k, v]) => {
        prev[k] = v.reduce((prev2, cur) => {
            const { version } = require([cur, 'package.json'].join('/'));
            prev2[cur] = version;
            return prev2;
        }, {});
        return prev;
    }, {});
};

// WebpackManifestPlugin generate
const manifestPluginGenerate = (isDevelopment, entries) => {
    const versions = getDllVersions();
    const manifest = Object.entries(entries).reduce((prev, [k, v]) => {
        prev[k] = [packConfig.publicPath, basename(getDllDir(isDevelopment)), '/', v[0]].join('');
        return prev;
    }, {});
    return {
        date: formatTime(Date.now(), 'YYYY-MM-DD HH:mm:ss'),
        publicPath: packConfig.publicPath,
        versions,
        manifest
    };
};

// 检测是否需要运行 dll
const checkNeedUpdateDll = isDevelopment => {
    if (!existsSync(getDllManifestPath(isDevelopment))) {
        return true;
    }
    const { publicPath, versions } = require(getDllManifestPath(isDevelopment));
    return !isEqual(
        {
            publicPath,
            versions
        },
        {
            publicPath: packConfig.publicPath,
            versions: getDllVersions()
        }
    );
};

module.exports = {
    getDllDir,
    getDllManifestPath,
    injectDllReferencePlugins,
    manifestPluginGenerate,
    checkNeedUpdateDll
};
