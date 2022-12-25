# 安装

```
yarn add -D @nbfe/format-stats-webpack-plugin
```

# 使用

```javascript
const FormatStatsWebpackPlugin = require('@nbfe/format-stats-webpack-plugin')

{
  plugins: [new FormatStatsWebpackPlugin()]
}
```

# options

- 开发模式下不开启

```javascript
{
  disable: boolean = false // 禁用功能
}
```
