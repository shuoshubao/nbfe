const { merge, omit, isString, words } = require('lodash')
const PrettierConfig = require('./prettier.config')
const StylelintConfig = require('./stylelint.config')
const EslintCommon = require('./eslint-common')
const EslintReact = require('./eslint-react')
const EslintVue = require('./eslint-vue')
const EslintTs = require('./eslint-ts')

const mergeEslintConfig = (config = {}) => {
  const keys = ['plugins', 'extends']
  merge(EslintCommon, omit(config, keys))
  keys.forEach(v => {
    EslintCommon[v].push(...(config[v] || []))
  })
}

const getESLintConfig = (rule = [], config = {}) => {
  const languages = isString(rule) ? words(rule) : rule
  if (languages.includes('ts')) {
    mergeEslintConfig(EslintTs)
  }
  if (languages.includes('react')) {
    mergeEslintConfig(EslintReact)
  }
  if (languages.includes('vue')) {
    mergeEslintConfig(EslintVue)
    EslintCommon.parserOptions.parser = languages.includes('ts') ? '@typescript-eslint/parser' : '@babel/eslint-parser'
  }
  mergeEslintConfig(config)
  return EslintCommon
}

module.exports.PrettierConfig = PrettierConfig
module.exports.StylelintConfig = StylelintConfig
module.exports.getESLintConfig = getESLintConfig
