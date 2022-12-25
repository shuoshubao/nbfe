const { existsSync } = require('fs')
const { join } = require('path')
const chalk = require('chalk')
const { pathConfig } = require('../../config')

module.exports = () => {
  return async (ctx, next) => {
    if (!ctx.path.startsWith('/mock')) {
      return await next()
    }

    const mockPathTemp = ctx.path.split('/')
    const mockFilePath = mockPathTemp.slice(2, -1).join('/')
    const mockFile = join(pathConfig.mock, mockFilePath)
    const mockMethodName = mockPathTemp.slice(-1)[0]

    if (!existsSync(mockFile + '.js')) {
      ctx.status = 404
      ctx.body = {
        code: 404,
        msg: '文件不存在',
        data: mockFile
      }
      return
    }

    console.log('✨', chalk.green('mock: '), ctx.path)

    delete require.cache[mockFile]
    const mockService = require(mockFile)

    if (typeof mockService[mockMethodName] !== 'function') {
      ctx.status = 404
      ctx.body = {
        code: 404,
        msg: '方法不存在',
        data: `${mockFilePath}.js -> function ${mockMethodName} () {}`
      }
      return
    }

    ctx.body = {
      code: 0,
      msg: '',
      data: await mockService[mockMethodName]({ query: ctx.query, body: ctx.request.body })
    }
  }
}
