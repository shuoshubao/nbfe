const { existsSync } = require('fs');
const { copySync, writeJsonSync, removeSync } = require('fs-extra');
const { resolve } = require('path');

const rootPath = process.cwd();
const projectTemplate = resolve(__dirname, '../../templates/project');

const pkgPathThis = resolve(__dirname, '../../package.json');
const pkgPathProject = `${rootPath}/package.json`;

const pkgThis = require(pkgPathThis);

// 删除一些文件 .bablerc .prettierrc
const removeFiles = () => {
    removeSync(`${rootPath}/.babelrc`);
    removeSync(`${rootPath}/.prettierrc`);
};

// 复制一些配置文件
const copySyncConfigFiles = () => {
    copySync(resolve(__dirname, '../.editorconfig'), resolve(rootPath, '.editorconfig'));
    copySync(resolve(__dirname, '../prettier.config.js'), resolve(rootPath, 'prettier.config.js'));
    copySync(resolve(__dirname, '../webpack/.eslintrc.js'), resolve(rootPath, '.eslintrc.js'));
};

// 更新 package.json: scripts
const updatePkgFile = () => {
    const pkg = require(pkgPathProject);
    pkg.devDependencies = pkgThis.devDependencies;
    writeJsonSync(pkgPathProject, pkg, { spaces: 2 });
};

// 更新shell脚本
const updateDeployShell = () => {
    if (existsSync(resolve(rootPath, 'bin'))) {
        copySync(resolve(projectTemplate, 'bin'), resolve(rootPath, 'bin'));
    }
    copySync(resolve(projectTemplate, 'manifest.yaml'), resolve(rootPath, 'manifest.yaml'));
};

module.exports = {
    removeFiles,
    copySyncConfigFiles,
    updatePkgFile,
    updateDeployShell
};
