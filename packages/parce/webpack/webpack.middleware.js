const { utimes } = require('fs');
const webpack = require('webpack');
const koaWebpack = require('koa-webpack');
const HtmlwebpackPlugin = require('html-webpack-plugin');
const webpackConfig = require('./webpack.config');
const { pagesConfig } = require('./utils/routers');
const getSingleHtml = require('./utils/getSingleHtml');

const cacheEntries = Object.entries(webpackConfig.entry).reduce((prev, [k, v]) => {
    prev[k] = [v];
    return prev;
}, {});

webpackConfig.entry = () => {
    return cacheEntries;
};

// 以下代码为了解决webpack 第一次启动重启很多次的bug https://github.com/webpack/watchpack/issues/25
const utimeFun = strPath => {
    const now = Date.now() / 1000;
    const then = now - 10;
    utimes(strPath, then, then, err => {
        if (err) {
            throw err;
        }
    });
};

const setFileUtime = entryPath => {
    if (Array.isArray(entryPath)) {
        entryPath.forEach(utimeFun);
    } else {
        utimeFun(entryPath);
    }
};

const getSingleHtmlPlugin = page => {
    const { entryPath, outputPath } = page;
    setFileUtime(entryPath);
    return new HtmlwebpackPlugin({
        filename: `${outputPath}.html`,
        inject: false,
        chunks: [outputPath],
        chunksSortMode: 'manual',
        templateContent: templateParams => {
            return getSingleHtml(outputPath, templateParams);
        }
    });
};

module.exports = function(app) {
    const htmlCache = {};

    const compiler = webpack(webpackConfig);

    koaWebpack({
        compiler,
        config: webpackConfig,
        devMiddleware: {
            publicPath: '/',
            stats: webpackConfig.stats,
            watchOptions: {
                poll: true
            }
        },
        hotClient: {
            allEntries: true
        }
    }).then(middleware => {
        const devMiddlewareInstance = middleware.devMiddleware;

        app.use(async (ctx, next) => {
            if (ctx.path === '/' || ctx.path.endsWith('.html')) {
                // 根据path得到pagesConfig中对应的entry
                const entry = ctx.path === '/' ? 'index' : ctx.path.replace('.html', '').substr(1);
                if (htmlCache[entry]) {
                    await next();
                } else {
                    const page = pagesConfig.find(v => entry === v.outputPath);
                    if (page) {
                        // 添加一个plugin
                        compiler.apply(getSingleHtmlPlugin(page));
                        // 触发重新编译
                        devMiddlewareInstance.invalidate();
                        htmlCache[entry] = true;
                        await next();
                    }
                }
            } else {
                await next();
            }
        });

        app.use(middleware);
    });
};
