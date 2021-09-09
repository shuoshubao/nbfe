## 使用

> npm i -D @nbfe/react-cli

### 命令行

-   npx react-cli serve // 启动开发服务器
-   npx react-cli build // 生产环境下构建
-   npx react-cli inspect // 检查内部 webpack 配置

### api 调用

```js
const { getWebpackConfig } = require('@nbfe/react-cli');

// process.env.NODE_ENV = 'development'|'production';
const webpackConfig = getWebpackConfig();
```

## pack.config.js

```js
module.exports = config => {
    const { mode, isDevelopment, isProduction, isMac, defaultConfig } = config;
    console.log('mode', mode);
    return {
        devServer: {
            port: 3000
        },
        dllEntry: {
            vendor: ['react', 'react-dom']
        }
    };
};
```


[Vue CLI 文档](https://cli.vuejs.org/zh/guide/)
