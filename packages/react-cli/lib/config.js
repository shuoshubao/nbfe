const { existsSync } = require('fs');
const { resolve } = require('path');
const ip = require('ip');
const { cloneDeep, noop, flatten, merge } = require('lodash');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

const { NODE_ENV = 'production' } = process.env;

process.env.NODE_ENV = NODE_ENV;

const [isDevelopment, isProduction] = [NODE_ENV === 'development', NODE_ENV === 'production'];

const isMac = process.platform === 'darwin';

const mode = isDevelopment ? 'development' : 'production';

const resolveRootPath = (to = '', from = process.cwd()) => {
    return resolve(from, to);
};

const ipAddress = ip.address();

const babelConfig = {
    presets: [
        [
            '@babel/preset-env',
            {
                useBuiltIns: false,
                modules: false,
                loose: true
            }
        ],
        '@babel/preset-react'
    ],
    plugins: [
        '@babel/plugin-proposal-export-default-from',
        ['@babel/plugin-proposal-decorators', { legacy: true }],
        ['@babel/plugin-proposal-private-methods', { loose: true }],
        ['@babel/plugin-proposal-class-properties', { loose: true }],
        [
            '@babel/plugin-transform-runtime',
            {
                helpers: false,
                regenerator: true
            }
        ]
    ]
};

const defaultConfig = {
    mode,
    srcPath: 'src',
    packConfigPath: 'react.config.js',
    rootPath: process.cwd(),
    template: 'public/index.html',
    publicPath: '/',
    outputDir: 'dist',
    manifestFileName: 'cdnResource.json',
    entry: { index: 'src/index.js' },
    dllEntry: null,
    dllDir: ['dll', mode].join('-'),
    enableMock: true,
    alias: {},
    devServer: {},
    // external 所需的cdn资源, 或者其他需要预先加载的 css js 资源
    assets: {
        css: [],
        js: []
    },
    css: {
        requireModuleExtension: true, // https://cli.vuejs.org/zh/config/#css-requiremoduleextension
        loaderOptions: {} // https://cli.vuejs.org/zh/config/#css-loaderoptions
    },
    // https://cli.vuejs.org/zh/guide/webpack.html#简单的配置方式
    configureWebpack: {},
    // https://cli.vuejs.org/zh/guide/webpack.html#链式操作-高级
    chainWebpack: noop,
    manifestPluginGenerate: null,
    generateHtmlFile: true, // 构建完成后生成 html 文件
    babelConfig
};

let packConfig = cloneDeep(defaultConfig);

if (existsSync(resolveRootPath(defaultConfig.packConfigPath))) {
    const defineConfig = require(resolveRootPath(defaultConfig.packConfigPath));
    const projectConfig = defineConfig({
        mode,
        isDevelopment,
        isProduction,
        isMac,
        ipAddress,
        defaultConfig
    });
    packConfig = merge(defaultConfig, projectConfig);
}

packConfig.srcPath = resolveRootPath(packConfig.srcPath);

packConfig.packConfigPath = resolveRootPath(packConfig.packConfigPath);

packConfig.template = resolveRootPath(packConfig.template);
if (!existsSync(packConfig.template)) {
    packConfig.template = resolve(__dirname, './index.html');
}

packConfig.entry = Object.entries(packConfig.entry).reduce((prev, [k, v]) => {
    const files = flatten([v]).map(v2 => {
        const filePath = resolveRootPath(v2);
        if (existsSync(filePath)) {
            return filePath;
        }
        return v2;
    });
    prev[k] = files;
    return prev;
}, {});

packConfig.alias = Object.entries(packConfig.alias).reduce(
    (prev, [k, v]) => {
        prev[k] = resolveRootPath(v);
        return prev;
    },
    {
        '@': packConfig.srcPath
    }
);
packConfig.outputDir = resolveRootPath(packConfig.outputDir);

const enableWebpackDll = Object.keys(packConfig.dllEntry || {}).length !== 0;

const pkgVersionsKey = 'pkgVersions';

module.exports = {
    mode,
    isDevelopment,
    isProduction,
    isMac,
    packConfig,
    MiniCssExtractPlugin,
    enableWebpackDll,
    pkgVersionsKey
};
