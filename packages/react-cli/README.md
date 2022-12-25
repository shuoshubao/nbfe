## 使用

> npm i -D @nbfe/react-cli

### 命令行

- npx react-cli serve // 启动开发服务器
- npx react-cli build // 生产环境下构建
- npx react-cli inspect // 检查内部 webpack 配置

### api 调用

```js
const { getWebpackConfig } = require('@nbfe/react-cli')

const webpackConfig = getWebpackConfig(false)
```

## react.config.js

```js
module.exports = config => {
  const { isDevelopment, isMac, ipAddress } = config
  return {
    devServer: {
      port: 3000
    },
    dllEntry: {
      vendor: ['react', 'react-dom']
    }
  }
}
```

[Vue CLI 文档](https://cli.vuejs.org/zh/guide/)
