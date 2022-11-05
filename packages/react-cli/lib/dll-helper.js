const { join } = require('path');
const webpack = require('webpack');
const AddAssetHtmlPlugin = require('add-asset-html-webpack-plugin');
const { packConfig } = require('./config');

const { outputDir, dllEntry } = packConfig;

const getDllDir = isDevelopment => {
    return ['dll', isDevelopment ? 'development' : 'production'].join('-');
};

const getDllManifestFileName = isDevelopment => {
    return [getDllDir(isDevelopment), 'manifest.json'].join('/');
};

const getDllManifestPath = isDevelopment => {
    return join(outputDir, getDllManifestFileName(isDevelopment));
};

const injectDllReferencePlugins = (isDevelopment, chainableConfig) => {
    Object.keys(dllEntry).forEach(dllEntryKey => {
        const manifestPath = join(outputDir, getDllDir(isDevelopment), `${dllEntryKey}.manifest.json`);
        chainableConfig.plugin(['DllReferencePlugin', dllEntryKey].join('_')).use(webpack.DllReferencePlugin, [
            {
                manifest: require(manifestPath)
            }
        ]);
    });
};

const injectAddAssetHtmlPlugins = (isDevelopment, chainableConfig) => {
    const manifest = require(getDllManifestPath(isDevelopment));
    Object.keys(dllEntry).forEach(dllEntryKey => {
        chainableConfig.plugin(['AddAssetHtmlPlugin', dllEntryKey].join('_')).use(AddAssetHtmlPlugin, [
            {
                filepath: join(outputDir, getDllDir(isDevelopment), `${dllEntryKey}.js`),
                includeSourcemap: false
            }
        ]);
    });
};

module.exports = {
    getDllDir,
    getDllManifestFileName,
    getDllManifestPath,
    injectDllReferencePlugins,
    injectAddAssetHtmlPlugins
};
