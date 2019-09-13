const { statSync } = require('fs');
const { basename, resolve } = require('path');
const glob = require('glob');
const { isDevelopment, pathConfig, projectConfig } = require('../config');
const { entry } = require('./utils/routers');

const alias = glob
    .sync(`${pathConfig.src}/*`)
    .filter(v => {
        return statSync(v).isDirectory();
    })
    .reduce(
        (prev, cur) => {
            prev[basename(cur)] = cur;
            return prev;
        },
        {
            __src: pathConfig.src
        }
    );

Object.entries(projectConfig.webpackAlias).forEach(([k, v]) => {
    alias[k] = resolve(pathConfig.root, v);
});

const webpackConfig = {
    mode: isDevelopment ? 'development' : 'production',
    entry,
    output: {
        path: pathConfig.build,
        filename: `static/js/[name]${isDevelopment ? '' : '.[chunkhash]'}.js`,
        publicPath: `${projectConfig.publicPath || ''}/`
    },
    externals: projectConfig.externals,
    resolve: {
        alias,
        extensions: ['.js', '.json', '.vue', '.ts', '.tsx'],
        modules: [pathConfig.src, pathConfig.nodeModulePath]
    },
    resolveLoader: {
        modules: [pathConfig.nodeModulePath]
    },
    performance: {
        hints: false
    },
    stats: {
        colors: true,
        modules: false,
        children: false,
        chunks: false
    }
};

if (isDevelopment) {
    webpackConfig.devtool = 'cheap-module-source-map';
} else {
    webpackConfig.optimization = {
        splitChunks: {
            chunks: 'all',
            name: () => {
                return 'parce__common';
            },
            minChunks: 2
        }
    };
}

module.exports = { webpackConfig };
