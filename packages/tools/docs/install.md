# 安装

```sh
npm i @nbfe/tools
```

# 使用

```javascript
import { search, getLabelByValue, classNames, copyText } from '@nbfe/tools';
```

# 调试

本文档为了方便调试, 特地将工具包打包成 umd 模式, 直接注入到了页面中, 挂载到了 windows.tools

你可以直接打开浏览器控制台, 输入 `Object.keys(tools)` 即可看到所有的方法

例如, 输入 `tools.classNames('a', { b: true, c: 2 < 1 })`, 将会得到 `'a b'`

# runkit

传送门: [runkit.com](https://runkit.com/)

由于 _runkit_ 运行环境是 _Nodejs_, 因此工具库中的很多 _browser_ 方法调试运行会报错. 此时就推荐在浏览器命令行直接调用当然, 工具库中部分方法可同时运行在 _Nodejs_ 和 _browser_ 环境中
