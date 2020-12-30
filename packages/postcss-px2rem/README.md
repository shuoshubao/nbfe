# @nbfe/postcss-px2rem

-   [postcss-px2rem](https://www.npmjs.com/package/postcss-px2rem)
-   [px2rem](https://www.npmjs.com/package/px2rem)

由于 `px2rem`包已经很多年没有更新了，而其依赖的 `fs-extra` 版本过低，会导致很多问题。

> 本项目源码基本是从这俩包里 copy 来的

# 使用

```javascript
// npm i -D @nbfe/postcss-px2rem

const px2rem = require('@nbfe/postcss-px2rem');

px2rem({ remUnit: 100 });
```

# 改动点

## px2rem

* 不支持原有的 [cli功能](https://github.com/songsiqi/px2rem/blob/master/bin/px2rem.js)
* 移除依赖 `extend `, 使用 es6的api 和 `lodash.cloneDeep`

## postcss-px2rem

* 移除依赖 `postcss `, 因为宿主环境一定会有这个依赖



