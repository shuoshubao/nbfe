const { resolve } = require('path');

const { NODE_ENV } = process.env;
const [isDevelopment, isProduction] = [NODE_ENV === 'development', NODE_ENV === 'production'];

const root = process.cwd();

const resolveRootPath = (to = '', from = root) => {
    return resolve(from, to);
};

const projectConfigPath = resolveRootPath('project.config.js');

const nodeModulePath = resolveRootPath('node_modules');

const tempPath = resolveRootPath('.cache/parce', nodeModulePath);

const originalProjectConfig = require(projectConfigPath);

const defaultProjectConfig = {
    port: 9000,
    title: 'Document',
    favicon: 'https://github.githubassets.com/favicon.ico',
    staticPrefix: '',
    loaders: [],
    printRouter: true,
    webpackProvide: {},
    webpackAlias: {},
    webpackDefineConfig: {},
    webpackExclude: [],
    webpackExcludeOverride: [],
    injectWebpackConfig(webpackConfig) {
        return webpackConfig;
    },
    injectTsConfig(TsConfig) {
        return TsConfig;
    }
};

const projectConfig = {
    ...defaultProjectConfig,
    ...originalProjectConfig
};

// webpackExclude
if (projectConfig.webpackExcludeOverride.length === 0) {
    if (projectConfig.webpackExclude.length === 0) {
        projectConfig.webpackExclude = [/node_modules/];
    } else {
        projectConfig.webpackExclude = [new RegExp(`node_modules\\/(?!${projectConfig.webpackExclude.join('|')})`)];
    }
} else {
    projectConfig.webpackExclude = [...projectConfig.webpackExcludeOverride];
}

const pathConfig = Object.assign(
    {
        root,
        src: resolveRootPath('src'),
        view: resolveRootPath('src/view'),
        common: resolveRootPath('src/common.js'),
        mock: resolveRootPath('mock'),
        build: resolveRootPath('dist'),
        nodeModulePath,
        ViewCacheDirectory: resolve(tempPath, 'view'),
        AwesomeTypescriptCacheDirectory: resolve(tempPath, 'awesome-typescript'),
        TsConfigFilePath: resolve(tempPath, 'tsconfig.json'),
        webpackBundleAnalyzer: resolve(tempPath, 'webpackBundleAnalyzer'),
        webpackAssets: resolve(tempPath, 'webpackAssets')
    },
    projectConfig.pathConfig
);

Object.entries(pathConfig).forEach(([k, v]) => {
    pathConfig[k] = resolveRootPath(v);
});

module.exports = {
    NODE_ENV,
    isDevelopment,
    isProduction,
    projectConfig,
    pathConfig
};
