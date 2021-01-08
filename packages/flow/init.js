/* eslint-disable no-console */

const { readFileSync } = require('fs');
const { writeJsonSync, removeSync, copySync } = require('fs-extra');
const { resolve, basename, relative } = require('path');
const { get, merge, intersection } = require('lodash');
const { sync: globSync } = require('glob');
const { execSync } = require('child_process');
const getGitInfo = require('@nbfe/git-info');

const rootPath = process.cwd();
const pkgPath = resolve(rootPath, 'package.json');

const pkg = require(pkgPath);

const gitInfo = getGitInfo(rootPath);

const commitizenPath = ['.', relative(gitInfo.projectPath, rootPath), 'node_modules/cz-conventional-changelog']
    .filter(Boolean)
    .join('/');

merge(pkg, {
    scripts: {
        commit: 'npx git-cz',
        prettier: 'npx prettier --write',
        lint: 'npx eslint --ext .ts,.tsx,.js,.jsx,.vue -f html -o ESLintReport.html',
        'lint:style':
            'npx stylelint --config node_modules/@nbfe/config/stylelint.config.js --fix -o StyleLintReport.html --aei --custom-formatter node_modules/stylelint-formatters-html **/*.{css,less,scss,sass}'
    },
    husky: {
        hooks: {
            'commit-msg': 'commitlint -e $GIT_PARAMS',
            'pre-commit': ['lint-staged']
        }
    },
    'lint-staged': {
        linters: {
            '*.{ts,tsx,js,jsx,vue,css,less,scss,sass,json,md}': ['prettier --write', 'git add'],
            '*.{css,less,scss,sass}': [
                'npx stylelint --config node_modules/@nbfe/config/stylelint.config.js --fix',
                'git add'
            ],
            '*.{ts,tsx,js,jsx,vue}': ['eslint -f table', 'git add']
        },
        ignore: ['CHANGELOG.md']
    },
    config: {
        commitizen: {
            path: commitizenPath
        }
    },
    commitlint: {
        extends: ['@commitlint/config-conventional']
    }
});

// 删除多余的钩子
delete pkg.scripts.precommit;

// 删除废弃的钩子
delete pkg.scripts['release:patch'];
delete pkg.scripts['release:minor'];
delete pkg.scripts['release:major'];

// 删除 eslint 其他配置文件
removeSync(resolve(rootPath, '.eslintrc.json'));

// 删除 prettier 其他配置文件
removeSync(resolve(rootPath, '.prettierrc'));

// 需要发包的项目
if (!pkg.private) {
    merge(pkg, {
        scripts: {
            'version:patch': 'standard-version --release-as patch',
            'version:minor': 'standard-version --release-as minor',
            'version:major': 'standard-version --release-as major',
            release: 'npm publish && git push && git push --follow-tags origin'
        }
    });
}

// 复制模板
const templates = globSync(resolve(__dirname, './templates/*'), { dot: true });

templates.forEach(v => {
    const fileName = basename(v);
    const to = resolve(rootPath, fileName);
    copySync(v, to);
});

// 获取 package.json 里的分隔
// 保持原来的空格数量或者 tab, 防止过多 diff 导致无法进行 code-review
const getPkgSpaces = () => {
    const pkgText = readFileSync(pkgPath).toString();
    const firstRow = pkgText.split('\n').find(v => v.includes('name'));
    return firstRow.slice(0, firstRow.indexOf('"'));
};
writeJsonSync(pkgPath, pkg, { spaces: getPkgSpaces() });

// 清理重复的包, 避免重复安装
(() => {
    const { dependencies } = require('./package.json');
    try {
        // eslint-disable-next-line import/no-extraneous-dependencies
        const pkgConfig = require('@nbfe/config/package.json');
        Object.assign(dependencies, get(pkgConfig, 'dependencies', {}));
    } catch (e) {}
    const projectDependencies = { ...get(pkg, 'dependencies', {}), ...get(pkg, 'devDependencies', {}) };
    const intersectionDependencies = intersection(Object.keys(dependencies), Object.keys(projectDependencies));
    if (!intersectionDependencies.length) {
        return;
    }
    const execSyncList = list => {
        list.forEach(v => {
            console.log('开始执行: ', v);
            execSync(v);
        });
    };
    const packages = ['@nbfe/config', '@nbfe/flow'];
    const execUninstall = ['npm un', ...intersectionDependencies, ...packages].join(' ');
    const execInstall = ['npm i -D ', ...packages].join(' ');
    execSyncList([execUninstall, execInstall]);
    console.log('执行完毕!');
})();
