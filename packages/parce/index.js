#!/usr/bin/env node

process.env.NODE_ENV = process.env.NODE_ENV || 'development';
const { resolve } = require('path');
const commander = require('commander');
const { log } = require('./utils');

const pkg = require(resolve(__dirname, './package.json'));

commander
    .version(pkg.version)
    .description(pkg.description)
    .usage('[Options]')
    .option('dev', '本地开发')
    .option('build', '打包构建')
    .option('eslint', 'Eslint')
    .option('tinypng', 'Tinypng 压缩图片')
    .parse(process.argv);

if (commander.dev) {
    const { prepack } = require('./webpack/utils');
    (async () => {
        try {
            prepack();
            require('./server');
        } catch (e) {
            log(e);
        }
    })();
}

if (commander.build) {
    const { webpackBuild } = require('./webpack');
    (async () => {
        try {
            webpackBuild();
        } catch (e) {
            log(e);
        }
    })();
}

if (commander.eslint) {
    require('./bin/eslint');
}

if (commander.tinypng) {
    require('./bin/tinypng');
}

if (commander.update) {
    require('./bin/update');
}
