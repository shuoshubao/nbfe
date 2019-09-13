const webpack = require('webpack');
const { log, noop, formatStats } = require('./utils');

const webpackCompiler = (webpackConfig, callback = noop) => {
    return new Promise((resolve, reject) => {
        const compiler = webpack(webpackConfig);
        compiler.run((err, stats) => {
            if (err || stats.hasErrors()) {
                log('webpack 编译报错, 请仔细阅读错误信息!', 'red');
                if (err) {
                    log(err.details, 'red');
                } else {
                    const info = stats.toJson();
                    log(info.errors, 'red');
                }
                reject(err);
            } else {
                log(stats.toString(webpackConfig.stats));
                formatStats(stats);
                resolve();
            }
        });
        compiler.plugin('done', callback);
    });
};

const webpackBuild = async () => {
    try {
        const webpackConfig = require('./webpack.config.js');
        const { prepack, afterpack } = require('./utils');
        prepack();
        await webpackCompiler(webpackConfig);
        afterpack();
    } catch (e) {
        log(e);
        process.exit(1);
    }
};

module.exports = { webpackBuild };
