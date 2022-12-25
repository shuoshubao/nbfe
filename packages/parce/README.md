# Useage

- mkdir your_project
- cd your_project
- yarn init -y
- yarn add parce
- npx parce init
- npx parce dev
- npx parce build

> parce -h

# Init

> 执行 `init` 操作之后, 会生成一个简易项目模板

```
├── project.config.js
└── src
    ├── common.js
    └── view
        └── index
            └── index.vue
```

- project.config.js 项目配置文件
- src/common.js 项目公用文件
- src/view/\*\*/index.vue 根据 `index.vue` 生成页面

# project.config.js

```
module.exports = {
    port: 8080, // 端口号
    title: '', // 项目标题
    publicPath: '', // publicPath
    pathConfig: {
        src: 'src',
        common: 'src/common.js',
        view: 'src/view',
        injectWebpackConfig: ''
    },
    devServer: {},
    apiProxy: {},
    webpackProvide: {}, // webpack.ProvidePlugin
    loaders: [], // rules.loader
}
```

# projectConfig. injectWebpackConfig

```
injectWebpackConfig: webpackConfig => {

    // console.log(webpackConfig)

    return webpackConfig
}
```

# webpackAlias

> `src` 的所有子目录

```
webpackAlias: {

}
```

# webpack.ProvidePlugin

> project.config.js

```
webpackProvide: {
    qs: 'qs',
    _: 'lodash'
}
```

# .npmrc

```
registry=https://registry.npm.taobao.org
sass_binary_site=https://npm.taobao.org/mirrors/node-sass/
```

# .gitignore

```
.DS_Store
node_modules
npm-debug.log*
yarn-debug.log*
yarn-error.log*
package-lock.json
```

### mark

- npm publish --registry https://registry.npmjs.org
