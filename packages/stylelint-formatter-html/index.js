const { readFileSync } = require('fs')
const { relative, resolve } = require('path')
const stripAnsi = require('strip-ansi')
const { generateDocument } = require('@nbfe/js2html')

const rootPath = process.cwd()

/**
 * source => 相对路径
 * source => 删掉
 * output => 删掉
 */
const formatStylelintResults = (results = []) => {
  results.forEach(v => {
    const { source, _postcssResult = '' } = v
    v.source = relative(rootPath, source)
    v.css = _postcssResult.toString()
    v.warnings = v.warnings.map(v2 => {
      return {
        ...v2,
        text: stripAnsi(v2.text)
      }
    })
    delete v._postcssResult
  })
}

const getFileContent = fileName => {
  return readFileSync(resolve(__dirname, 'lib', fileName)).toString()
}

module.exports = (results, returnValue) => {
  if (results.every(v => v.warnings.length === 0)) {
    return ''
  }

  formatStylelintResults(results)

  return generateDocument({
    title: 'StylelintReport',
    link: [
      {
        rel: 'icon',
        href: 'https://stylelint.io/img/favicon.ico'
      }
    ],
    style: [
      'https://static.meituan.net/bs/@ss/mtd-vue/0.3.5/lib/theme2/index.css',
      {
        text: getFileContent('style.css')
      }
    ],
    script: [
      { src: 'https://static.meituan.net/bs/vue/2.6.11/vue.min.js' },
      { src: 'https://static.meituan.net/bs/@ss/mtd-vue/0.3.5/lib/index.js' },
      { src: 'https://static.meituan.net/bs/lodash/4.17.15/lodash.min.js' },
      {
        text: `window.StylelintResults = ${JSON.stringify(results)};`
      },
      {
        text: getFileContent('script.js')
      }
    ],
    bodyHtml: [getFileContent('template.html')]
  })
}
