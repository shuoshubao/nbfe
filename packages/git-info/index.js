const { existsSync, readFileSync } = require('fs');
const { join, resolve } = require('path');
const ini = require('ini');

// 查找路径所在的 .git 目录
const findGitFolder = (dir = '') => {
    const folder = join(dir, '.git');
    if (existsSync(folder)) {
        return folder;
    }
    if (dir === resolve(dir, '..')) {
        return false;
    }
    return findGitFolder(resolve(dir, '..'));
};

// 格式化数据
const formatIniData = (data = {}) => {
    return Object.entries(data).reduce((prev, [k, v]) => {
        if (k.includes('"')) {
            const [k1, k2] = k.slice(0, -1).split(' "');
            if (prev[k1]) {
                prev[k1][k2] = v;
            } else {
                prev[k1] = {
                    [k2]: v
                };
            }
        } else {
            prev[k] = v;
        }
        return prev;
    }, {});
};

module.exports = dir => {
    const gitFolder = findGitFolder(dir);
    const headData = readFileSync(join(gitFolder, 'HEAD')).toString();
    const configData = readFileSync(join(gitFolder, 'config')).toString();
    const iniConfigData = ini.parse(configData);
    return {
        projectPath: resolve(gitFolder, '..'),
        gitFolder,
        config: formatIniData(iniConfigData),
        HEAD: headData.trim().split('refs/heads/')[1]
    };
};
