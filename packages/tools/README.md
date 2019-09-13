## 概述

-   封装业务中常用的工具函数
-   依赖包: `lodash`

## 安装

-   yarn add @nbfe/tools

## 使用

```
import * as tools from '@nbfe/tools';

import { search } from '@nbfe/tools';
```

## 开发者需知

-   请在 `lib` 目录下修改
-   `dist/index.js` 是 `rollup.js` 打包出来的, 请不要动
-   执行 `npm run build` 打包
-   发包时会自动 `build`
