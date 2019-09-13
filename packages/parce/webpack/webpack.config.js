const { isDevelopment, projectConfig } = require('../config');
const rules = require('./rules');
const plugins = require('./plugins');
const { webpackConfig: baseWebpackConfig } = require('./base');

let webpackConfig = {
    module: { rules },
    plugins,
    ...baseWebpackConfig
};

if (!isDevelopment) {
    Object.entries(webpackConfig.entry).forEach(([k, v]) => {
        webpackConfig.entry[k] = [v];
    });
}

webpackConfig = projectConfig.injectWebpackConfig(webpackConfig);

module.exports = webpackConfig;
