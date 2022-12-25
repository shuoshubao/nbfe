const axios = require('axios')
const chalk = require('chalk')
const { projectConfig } = require('../../config')

module.exports = () => {
  return async (ctx, next) => {
    const { path, method, query } = ctx
    if (!path.startsWith('/api/')) {
      return await next()
    }

    const proxyConfig = projectConfig.apiProxy[path]
    let url = ''

    if (!proxyConfig) {
      return await next()
    }

    const typeIdentify = Object.prototype.toString.call(proxyConfig).slice(8, -1)

    if (typeIdentify === 'AsyncFunction') {
      console.log('✨', chalk.green('proxy: '), `${path} -> AsyncFunction`)
      const data = await proxyConfig(axios, {
        method,
        params: query,
        data: ctx.request.body || {}
      }).then(res => res.data)
      ctx.body = data
      return
    }

    if (typeIdentify === 'String') {
      url = proxyConfig
    }
    if (typeIdentify === 'Object') {
      url = proxyConfig.url
    }

    console.log('✨', chalk.green('proxy: '), `${path} -> ${url}`)

    await axios
      .request({
        url,
        method,
        params: query,
        data: ctx.request.body || {},
        headers: proxyConfig.headers || {}
      })
      .then(rs => {
        ctx.body = rs.data
      })
      .catch(e => {
        ctx.body = {
          code: 500,
          msg: e.message,
          data: null
        }
      })
  }
}
