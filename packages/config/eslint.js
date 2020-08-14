const { resolve } = require('path');
const { get } = require('lodash');

const rootPath = process.cwd();

const pkgPath = resolve(rootPath, 'package.json');

const pkg = require(pkgPath);

const isReact = get(pkg, 'dependencies.react');

module.exports = require(`./eslint-${isReact ? 'react' : 'vue'}`);
