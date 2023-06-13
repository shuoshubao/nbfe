/*
 * @Author: shuoshubao
 * @Date:   2023-06-13 19:39:57
 * @Last Modified by:   shuoshubao
 * @Last Modified time: 2023-06-13 19:45:43
 */
const util = require('util')
const chalk = require('chalk')

// 打印带颜色的信息
const log = (str, color) => {
  // eslint-disable-next-line no-console
  console.log(color ? chalk[color](str) : str)
}

// 打印对象
const logObject = obj => {
  // eslint-disable-next-line no-console
  console.log(util.inspect(obj, { showHidden: false, depth: null }))
}

const logSymbols = {
  info: 'ℹ️',
  success: '✅',
  warning: '⚠️',
  error: '❌️'
}

const getExternalUrl = config => {
  const { type = 'unpkg', name, file } = config

  let { version } = config

  if (!version) {
    version = require(name).version
  }

  if (type === 'jsdelivr') {
    return ['https://cdn.jsdelivr.net/npm'[(name, version)].join('@'), file].join('/')
  }

  return ['https://unpkg.com', [name, version].join('@'), file].join('/')
}

module.exports = {
  log,
  logObject,
  logSymbols,
  getExternalUrl
}
