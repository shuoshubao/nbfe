const { writeJsonSync } = require('fs-extra');
const { resolve } = require('path');
const { merge } = require('lodash');

const rootPath = process.cwd();
const pkgPath = resolve(rootPath, 'package.json');

const pkg = require(pkgPath);

merge(pkg, {
    scripts: {
        commit: 'npx git-cz',
        prettier: 'npx prettier --write',
        lint: 'npx eslint --ext .ts,.tsx,.js,.jsx,.vue -f html -o ESLintReport.html'
    },
    husky: {
        hooks: {
            'commit-msg': 'commitlint -e $GIT_PARAMS',
            'pre-commit': ['pretty-quick --staged', 'lint-staged']
        }
    },
    'lint-staged': {
        linters: {
            '*.{ts,tsx,js,jsx,vue}': ['eslint -f table', 'git add']
        }
    },
    config: {
        commitizen: {
            path: './node_modules/cz-conventional-changelog'
        }
    },
    commitlint: {
        extends: ['@commitlint/config-conventional']
    }
});

// 需要发包的项目
if (!pkg.private) {
    merge(pkg, {
        scripts: {
            'release:patch': 'standard-version --release-as patch',
            'release:minor': 'standard-version --release-as minor',
            ':major': 'standard-version --release-as major',
            release: 'npm publish && git push && git push --follow-tags origin'
        }
    });
}

console.log(pkg);

writeJsonSync(pkgPath, pkg, { spaces: 4 });
