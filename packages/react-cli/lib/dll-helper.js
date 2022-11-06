const { join } = require('path');
const webpack = require('webpack');
const AddAssetHtmlPlugin = require('add-asset-html-webpack-plugin');
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

const injectAddAssetHtmlPlugins = (isDevelopment, chainableConfig) => {
    Object.keys(dllEntry).forEach(dllEntryKey => {
        chainableConfig.plugin(['AddAssetHtmlPlugin', dllEntryKey].join('_')).use(AddAssetHtmlPlugin, [
            {
                filepath: join(getDllDir(isDevelopment), `${dllEntryKey}.js`),
                includeSourcemap: false
            }
        ]);
    });
};

module.exports = {
    getDllDir,
    getDllManifestPath,
    injectDllReferencePlugins,
    injectAddAssetHtmlPlugins
};
