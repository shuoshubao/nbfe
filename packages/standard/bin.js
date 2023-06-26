#!/usr/bin/env node

/* eslint-disable no-console */

const { readFileSync, writeFileSync } = require('fs')
const { writeJsonSync, removeSync, copySync } = require('fs-extra')
const { resolve, join, basename } = require('path')
const { merge } = require('lodash')
const { sync: globSync } = require('glob')
const { Command } = require('commander')
const { spawnSync } = require('child_process')

const rootPath = process.cwd()

const pkgPath = resolve(rootPath, 'package.json')

const pkg = require(pkgPath)

const init = () => {
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
      '*.{ts,tsx,js,jsx,vue,css,less,scss,sass,json,md}': ['prettier --write', 'git add'],
      '*.{css,less,scss,sass}': ['npx stylelint --fix', 'git add'],
      '*.{ts,tsx,js,jsx,vue}': ['eslint -f table', 'git add']
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

  console.log('// 删除之前的钩子')
  console.log('rm -rf .git/hooks', '\n')

  console.log('husky 权限问题')
  console.log('chmod ug+x .husky/*', '\n')
}

const program = new Command()

program
  .command('init')
  .description('初始化')
  .action(() => {
    init()
  })

program
  .command('prettier [source...]')
  .description('prettier')
  .action(source => {
    const prettierConfigPath = resolve(__dirname, 'prettier.config.js')
    const { stdout, stderr } = spawnSync('prettier', ['--config', prettierConfigPath, '-w', source.join(' ')], {
      cwd: rootPath,
      stdio: 'inherit'
    })
    if (stdout) {
      console.log(stdout.toString())
    }
    if (stderr) {
      console.log(stderr.toString())
    }
  })

program
  .command('eslint')
  .argument('<source...>')
  .option('--language <language>', '技术栈')
  .action(async (source, options) => {
    const { ESLint } = require('eslint')
    const { getESLintConfig } = require('.')

    const eslintConfig = getESLintConfig((options.language || 'react').split(','))

    eslintConfig.parserOptions.requireConfigFile = false
    eslintConfig.parserOptions.babelOptions = {
      babelrc: false,
      configFile: false,
      presets: ['@babel/preset-env', '@babel/preset-react']
    }

    const eslint = new ESLint({
      useEslintrc: false,
      cwd: __dirname,
      overrideConfig: eslintConfig
    })

    const files = source.map(v => {
      if (v.includes('.')) {
        return join(rootPath, v)
      }
      return join(rootPath, `${v}/**/*.{js,jsx,ts,tsx,vue}`)
    })

    const results = await eslint.lintFiles(files)

    const rulesMeta = eslint.getRulesMetaForResults(results)

    const htmlFormatter = require('eslint-formatter-html')

    const resultText = htmlFormatter(results, { cwd: rootPath, rulesMeta })

    writeFileSync(resolve(rootPath, 'ESLintReport.html'), resultText)
  })

program.parse(process.argv)
