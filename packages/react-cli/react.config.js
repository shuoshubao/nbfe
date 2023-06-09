module.exports = ({ isDevelopment }) => {
  return {
    configureWebpack: {
      externals: {
        react: 'React',
        'react-dom': 'ReactDOM',
        antd: 'antd',
        moment: 'moment'
      }
    },
    assets: {
      css: ['https://unpkg.com/antd@4.24.10/dist/antd.min.css'],
      js: [
        `https://unpkg.com/react@17.0.2/umd/${isDevelopment ? 'react.development.js' : 'react.production.min.js'}`,
        `https://unpkg.com/react-dom@17.0.2/umd/${
          isDevelopment ? 'react-dom.development.js' : 'react-dom.production.min.js'
        }`,
        'https://unpkg.com/moment@2.29.4/min/moment.min.js',
        'https://unpkg.com/antd@4.24.10/dist/antd.min.js'
      ]
    },
    dllEntry: {
      tools: ['lodash']
    },
    devServer: {
      port: 3000
    }
  }
}
