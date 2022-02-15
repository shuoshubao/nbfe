const path = require('path');
const webpack = require('webpack');
const AddAssetHtmlPlugin = require('add-asset-html-webpack-plugin');
const { packConfig } = require('./config');

const { outputDir, dllEntry, dllDir } = packConfig;

const dllManifestFileName = [dllDir, 'manifest.json'].join('/');

const dllManifestPath = path.join(outputDir, dllManifestFileName);

const injectDllReferencePlugins = chainableConfig => {
    Object.keys(dllEntry).forEach(dllEntryKey => {
        const manifestPath = path.join(outputDir, dllDir, `${dllEntryKey}.manifest.json`);
        chainableConfig.plugin(['DllReferencePlugin', dllEntryKey].join('_')).use(webpack.DllReferencePlugin, [
            {
                manifest: require(manifestPath)
            }
        ]);
    });
};

const injectAddAssetHtmlPlugins = chainableConfig => {
    const manifest = require(dllManifestPath);
    Object.keys(dllEntry).forEach(dllEntryKey => {
        const filePath = manifest[dllEntryKey][0];
        chainableConfig.plugin(['AddAssetHtmlPlugin', dllEntryKey].join('_')).use(AddAssetHtmlPlugin, [
            {
                filepath: path.join(outputDir, dllDir, `${dllEntryKey}.js`),
                includeSourcemap: false
            }
        ]);
    });
};

module.exports = {
    dllManifestFileName,
    dllManifestPath,
    injectDllReferencePlugins,
    injectAddAssetHtmlPlugins
};
