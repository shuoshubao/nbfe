const { existsSync } = require('fs');
const { resolve } = require('path');
const { get } = require('lodash');

const rootPath = process.cwd();

const pkgPath = resolve(rootPath, 'package.json');

const pkg = require(pkgPath);

const isVue = !!get(pkg, 'dependencies.vue');

const isReact = !!get(pkg, 'dependencies.react');

const isTypeScript = existsSync(resolve(rootPath, 'tsconfig.json'));

const hasPrettierConfig = existsSync(resolve(rootPath, 'prettier.config.js'));

module.exports = {
    isVue,
    isReact,
    isTypeScript,
    hasPrettierConfig
};
