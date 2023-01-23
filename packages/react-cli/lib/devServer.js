const cors = require('cors')
const { packConfig } = require('./config')
const { getDllDir } = require('./dll-helper')
const mock = require('./mock')

module.exports = {
  host: 'localhost',
  port: 8080,
  hot: true,
  allowedHosts: 'all',
  liveReload: true,
  historyApiFallback: true,
  static: [
    {
      directory: packConfig.outputDir,
      watch: false
    },
    {
      directory: getDllDir(true),
      publicPath: '/dll-development',
      watch: false
    }
  ],
  setupMiddlewares: (middlewares, devServer) => {
    const { app } = devServer
    app.use(cors())
    if (packConfig.enableMock) {
      mock(app)
    }
    return middlewares
  },
  ...packConfig.devServer
}
