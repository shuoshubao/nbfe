/* eslint-disable no-console */

const { readFileSync } = require('fs')
const { writeJsonSync, removeSync, copySync } = require('fs-extra')
const { resolve, basename } = require('path')
const { merge } = require('lodash')
const { sync: globSync } = require('glob')

const rootPath = process.cwd()

const pkgPath = resolve(rootPath, 'package.json')

const pkg = require(pkgPath)

merge(pkg, {
  scripts: {
    prepare: 'husky install',
    commit: 'npx git-cz',
    prettier: 'npx prettier --write',
    lint: 'npx eslint --ext .ts,.tsx,.js,.jsx,.vue -f html -o ESLintReport.html',
    'lint:style':
      'npx stylelint --fix -o StyleLintReport.html --custom-formatter node_modules/stylelint-formatters-html **/*.{css,less,scss,sass}'
  },
  'lint-staged': {
    linters: {
      '*.{ts,tsx,js,jsx,vue,css,less,scss,sass,json,md}': ['prettier --write', 'git add'],
      '*.{css,less,scss,sass}': ['npx stylelint --fix', 'git add'],
      '*.{ts,tsx,js,jsx,vue}': ['eslint -f table', 'git add']
    },
    ignore: ['CHANGELOG.md']
  },
  config: {
    commitizen: {
      path: 'cz-conventional-changelog'
    }
  },
  commitlint: {
    extends: ['@commitlint/config-conventional']
  }
})

// 删除多余的钩子
delete pkg.scripts.precommit

// 删除 eslint 其他配置文件
removeSync(resolve(rootPath, '.eslintrc.json'))

// 删除 prettier 其他配置文件
removeSync(resolve(rootPath, '.prettierrc'))

// 需要发包的项目
if (!pkg.private) {
  merge(pkg, {
    scripts: {
      'version:patch': 'standard-version --release-as patch',
      'version:minor': 'standard-version --release-as minor',
      'version:major': 'standard-version --release-as major',
      release: 'npm publish && git push && git push --follow-tags origin'
    }
  })
}

// 复制模板
const templates = globSync(resolve(__dirname, './templates/*'), { dot: true })

templates.forEach(v => {
  const fileName = basename(v)
  const to = resolve(rootPath, fileName)
  copySync(v, to)
})

// 获取 package.json 里的分隔
// 保持原来的空格数量或者 tab, 防止过多 diff 导致无法进行 code-review
const getPkgSpaces = () => {
  const pkgText = readFileSync(pkgPath).toString()
  const firstRow = pkgText.split('\n').find(v => v.includes('name'))
  return firstRow.slice(0, firstRow.indexOf('"'))
}
writeJsonSync(pkgPath, pkg, { spaces: getPkgSpaces() })
