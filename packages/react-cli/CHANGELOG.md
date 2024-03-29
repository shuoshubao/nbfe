# Change Log

All notable changes to this project will be documented in this file.
See [Conventional Commits](https://conventionalcommits.org) for commit guidelines.

## [1.0.9](https://github.com/shuoshubao/nbfe/compare/@nbfe/react-cli@0.3.7...@nbfe/react-cli@1.0.9) (2023-11-07)


### Bug Fixes

* alias 可传入绝对路径, 如果目标位置不存在则不处理 ([b17386e](https://github.com/shuoshubao/nbfe/commit/b17386e5abeed43ad7ba5568db580a6576717688))
* cors mock ([2c81586](https://github.com/shuoshubao/nbfe/commit/2c815869599ff11fdbcaef1890c8819a7574f72d))
* react-cli url-loader ([b899ebf](https://github.com/shuoshubao/nbfe/commit/b899ebf5e308ca28d98c591b75770cc1d46f4a72))
* webpack dll 时也加上 devtool ([8a3d46a](https://github.com/shuoshubao/nbfe/commit/8a3d46a4f87e0c93dda39210ac60e925f9cee534))


### Features

* @svgr/webpack 修改配置, 可以作为 url 引入 ([6b35629](https://github.com/shuoshubao/nbfe/commit/6b35629408a3b42b7ac07e302ec6f09dcb3931cd))
* @svgr/webpack vite-plugin-svgr svg; 不再转base64 ([353ad5c](https://github.com/shuoshubao/nbfe/commit/353ad5ca72236253cf8774410ebb047fa072ca45))
* 启动时默认使用vite, 可配置enableVite启用/关闭 ([03c1181](https://github.com/shuoshubao/nbfe/commit/03c118139b6437d97cb050f18cfbbd7235eac2bb))
* 升级依赖 ([d6fe8ac](https://github.com/shuoshubao/nbfe/commit/d6fe8acf2a9ea16cf210af73ab623451a036c406))
* 同时启用 webpack-bundle-analyzer ([ac014b3](https://github.com/shuoshubao/nbfe/commit/ac014b3b67585312c3834e16495a431e41eea305))
* 透传 devServer port host proxy ([62a051f](https://github.com/shuoshubao/nbfe/commit/62a051fc1b58b18183950298e74f626170734597))
* 新增配置 define, webpack.DefinePlugin, 直接挂到 process.env 上 ([7346fc0](https://github.com/shuoshubao/nbfe/commit/7346fc0f58042c39c8916c63ebdccd1141a74d80))
* 增加工具方法 getExternalUrl, 获取包的npm托管 url ([1f5e71b](https://github.com/shuoshubao/nbfe/commit/1f5e71bb25ea04f5c66fa22e61429a0395d21904))
* 增加helpers文件, 暴露工具方法 ([4d9cc4d](https://github.com/shuoshubao/nbfe/commit/4d9cc4d75564ffab9a2b4bfa172bfaa9b24f25f6))
* 自动获取 entry.index src/index ([9e3af8a](https://github.com/shuoshubao/nbfe/commit/9e3af8a519f069a519b77116df12fe160e4e1b06))
* assets 可以传入对象 ([67b5caf](https://github.com/shuoshubao/nbfe/commit/67b5caf0cdcbed56d3b8a9f82831500943c9b4ef))
* index.html 默认放根目录吧; 移除 public/index.html 设定, 和 vite 保持一致的设计吧 ([f5eae85](https://github.com/shuoshubao/nbfe/commit/f5eae856b8a3a6c7ba54fec77cca51ccbe1e9418))
* splitChunks 留给用户自己配置吧 ([b68358e](https://github.com/shuoshubao/nbfe/commit/b68358e64bb390782f20304c71e10cf62cd9dad5))
* vite 输出版本号,启动时间,ip address ([7460a12](https://github.com/shuoshubao/nbfe/commit/7460a12483ab0de10dd3b2959c3d70eca791fdac))





## [1.0.8](https://github.com/shuoshubao/nbfe/compare/@nbfe/react-cli@1.0.7...@nbfe/react-cli@1.0.8) (2023-09-12)


### Bug Fixes

* react-cli url-loader ([b899ebf](https://github.com/shuoshubao/nbfe/commit/b899ebf5e308ca28d98c591b75770cc1d46f4a72))





## [1.0.7](https://github.com/shuoshubao/nbfe/compare/@nbfe/react-cli@1.0.6...@nbfe/react-cli@1.0.7) (2023-09-12)


### Features

* @svgr/webpack 修改配置, 可以作为 url 引入 ([6b35629](https://github.com/shuoshubao/nbfe/commit/6b35629408a3b42b7ac07e302ec6f09dcb3931cd))





## [1.0.6](https://github.com/shuoshubao/nbfe/compare/@nbfe/react-cli@1.0.5...@nbfe/react-cli@1.0.6) (2023-06-28)


### Features

* assets 可以传入对象 ([67b5caf](https://github.com/shuoshubao/nbfe/commit/67b5caf0cdcbed56d3b8a9f82831500943c9b4ef))





## [1.0.5](https://github.com/shuoshubao/nbfe/compare/@nbfe/react-cli@1.0.4...@nbfe/react-cli@1.0.5) (2023-06-20)


### Bug Fixes

* alias 可传入绝对路径, 如果目标位置不存在则不处理 ([b17386e](https://github.com/shuoshubao/nbfe/commit/b17386e5abeed43ad7ba5568db580a6576717688))





## [1.0.4](https://github.com/shuoshubao/nbfe/compare/@nbfe/react-cli@1.0.3...@nbfe/react-cli@1.0.4) (2023-06-19)

**Note:** Version bump only for package @nbfe/react-cli





## [1.0.3](https://github.com/shuoshubao/nbfe/compare/@nbfe/react-cli@1.0.2...@nbfe/react-cli@1.0.3) (2023-06-15)


### Features

* @svgr/webpack vite-plugin-svgr svg; 不再转base64 ([353ad5c](https://github.com/shuoshubao/nbfe/commit/353ad5ca72236253cf8774410ebb047fa072ca45))





## [1.0.2](https://github.com/shuoshubao/nbfe/compare/@nbfe/react-cli@1.0.1...@nbfe/react-cli@1.0.2) (2023-06-15)


### Features

* 透传 devServer port host proxy ([62a051f](https://github.com/shuoshubao/nbfe/commit/62a051fc1b58b18183950298e74f626170734597))
* 新增配置 define, webpack.DefinePlugin, 直接挂到 process.env 上 ([7346fc0](https://github.com/shuoshubao/nbfe/commit/7346fc0f58042c39c8916c63ebdccd1141a74d80))
* 增加helpers文件, 暴露工具方法 ([4d9cc4d](https://github.com/shuoshubao/nbfe/commit/4d9cc4d75564ffab9a2b4bfa172bfaa9b24f25f6))
* vite 输出版本号,启动时间,ip address ([7460a12](https://github.com/shuoshubao/nbfe/commit/7460a12483ab0de10dd3b2959c3d70eca791fdac))





## [1.0.1](https://github.com/shuoshubao/nbfe/compare/@nbfe/react-cli@1.0.0...@nbfe/react-cli@1.0.1) (2023-06-09)


### Features

* 增加工具方法 getExternalUrl, 获取包的npm托管 url ([1f5e71b](https://github.com/shuoshubao/nbfe/commit/1f5e71bb25ea04f5c66fa22e61429a0395d21904))
* index.html 默认放根目录吧; 移除 public/index.html 设定, 和 vite 保持一致的设计吧 ([f5eae85](https://github.com/shuoshubao/nbfe/commit/f5eae856b8a3a6c7ba54fec77cca51ccbe1e9418))





# [1.0.0](https://github.com/shuoshubao/nbfe/compare/@nbfe/react-cli@0.4.2...@nbfe/react-cli@1.0.0) (2023-06-09)


### Features

* 启动时默认使用vite, 可配置enableVite启用/关闭 ([03c1181](https://github.com/shuoshubao/nbfe/commit/03c118139b6437d97cb050f18cfbbd7235eac2bb))
* 自动获取 entry.index src/index ([9e3af8a](https://github.com/shuoshubao/nbfe/commit/9e3af8a519f069a519b77116df12fe160e4e1b06))





## [0.4.2](https://github.com/shuoshubao/nbfe/compare/@nbfe/react-cli@0.4.1...@nbfe/react-cli@0.4.2) (2023-06-08)


### Bug Fixes

* webpack dll 时也加上 devtool ([8a3d46a](https://github.com/shuoshubao/nbfe/commit/8a3d46a4f87e0c93dda39210ac60e925f9cee534))





## [0.4.1](https://github.com/shuoshubao/nbfe/compare/@nbfe/react-cli@0.4.0...@nbfe/react-cli@0.4.1) (2023-05-26)


### Features

* splitChunks 留给用户自己配置吧 ([b68358e](https://github.com/shuoshubao/nbfe/commit/b68358e64bb390782f20304c71e10cf62cd9dad5))





# [0.4.0](https://github.com/shuoshubao/nbfe/compare/@nbfe/react-cli@0.3.7...@nbfe/react-cli@0.4.0) (2023-05-26)


### Bug Fixes

* cors mock ([2c81586](https://github.com/shuoshubao/nbfe/commit/2c815869599ff11fdbcaef1890c8819a7574f72d))


### Features

* 升级依赖 ([d6fe8ac](https://github.com/shuoshubao/nbfe/commit/d6fe8acf2a9ea16cf210af73ab623451a036c406))
* 同时启用 webpack-bundle-analyzer ([ac014b3](https://github.com/shuoshubao/nbfe/commit/ac014b3b67585312c3834e16495a431e41eea305))





## [0.3.7](https://github.com/shuoshubao/nbfe/compare/@nbfe/react-cli@0.3.6...@nbfe/react-cli@0.3.7) (2023-03-03)


### Bug Fixes

* devServer onBeforeSetupMiddleware => setupMiddlewares ([72e0245](https://github.com/shuoshubao/nbfe/commit/72e024569d91b5dd16e2aa46d03df51a8ddec732))


### Features

* cors ([7487fd7](https://github.com/shuoshubao/nbfe/commit/7487fd71fbdf32d4328494fa561bf5c1373b6e32))
* replace webpack-bundle-analyzer with webpack-analyzer-plugin ([b4e642f](https://github.com/shuoshubao/nbfe/commit/b4e642f8b066368b263f989f6693644250411306))
* upgrade dependencies ([dfcce14](https://github.com/shuoshubao/nbfe/commit/dfcce14fa0c7a14f8d367a0656496dc64c30673e))





## [0.3.6](https://github.com/shuoshubao/nbfe/compare/@nbfe/react-cli@0.3.5...@nbfe/react-cli@0.3.6) (2023-01-14)


### Features

* replace webpack-bundle-analyzer with webpack-analyzer-plugin ([9cf2362](https://github.com/shuoshubao/nbfe/commit/9cf23621dea6bad0f0e7d956cc45ac7764ea957e))





## [0.3.5](https://github.com/shuoshubao/nbfe/compare/@nbfe/react-cli@0.3.4...@nbfe/react-cli@0.3.5) (2022-12-25)


### Bug Fixes

* 调整格式 ([42e276e](https://github.com/shuoshubao/nbfe/commit/42e276ee19c03ca23b3237318fb4d98ec72f8f8f))
* remove node-polyfill-webpack-plugin ([282810b](https://github.com/shuoshubao/nbfe/commit/282810b8a30270287091fb356d322f33a4ea0db9))
* sass scss 配置出错 ([9417f76](https://github.com/shuoshubao/nbfe/commit/9417f760b2a000851210f3d09055727d6442356a))





## [0.3.4](https://github.com/shuoshubao/nbfe/compare/@nbfe/react-cli@0.3.3...@nbfe/react-cli@0.3.4) (2022-11-30)


### Features

* 去掉依赖 @nbfe/tools ([c12ec61](https://github.com/shuoshubao/nbfe/commit/c12ec61ee87a66498fdf9e6346325caa4b176771))





## [0.3.3](https://github.com/shuoshubao/nbfe/compare/@nbfe/react-cli@0.3.2...@nbfe/react-cli@0.3.3) (2022-11-28)

**Note:** Version bump only for package @nbfe/react-cli





## [0.3.2](https://github.com/shuoshubao/nbfe/compare/@nbfe/react-cli@0.3.1...@nbfe/react-cli@0.3.2) (2022-11-26)

**Note:** Version bump only for package @nbfe/react-cli





## [0.3.1](https://github.com/shuoshubao/nbfe/compare/@nbfe/react-cli@0.3.0...@nbfe/react-cli@0.3.1) (2022-11-23)


### Features

* 自研插件HtmlWebpackAssetsPlugin 替换 html-webpack-tags-plugin ([e84ec21](https://github.com/shuoshubao/nbfe/commit/e84ec21e87ed5a39ac744a001e09e7d4d94d894a))
* memoize 优化性能 ([ec999a1](https://github.com/shuoshubao/nbfe/commit/ec999a11d9757c0ca5cbd5c849d4f54c5945fe66))





# [0.3.0](https://github.com/shuoshubao/nbfe/compare/@nbfe/react-cli@0.2.9...@nbfe/react-cli@0.3.0) (2022-11-19)


### Features

* 优化 webpack dll 逻辑 ([d0dde06](https://github.com/shuoshubao/nbfe/commit/d0dde06))





## [0.2.9](https://github.com/shuoshubao/nbfe/compare/@nbfe/react-cli@0.2.8...@nbfe/react-cli@0.2.9) (2022-11-08)


### Features

* #root => #app ([c76ceea](https://github.com/shuoshubao/nbfe/commit/c76ceea))
* mock 调用 body-parser ([4d3f75a](https://github.com/shuoshubao/nbfe/commit/4d3f75a))





## [0.2.8](https://github.com/shuoshubao/nbfe/compare/@nbfe/react-cli@0.2.7...@nbfe/react-cli@0.2.8) (2022-11-07)


### Bug Fixes

* chalk 版本 ([3a719cf](https://github.com/shuoshubao/nbfe/commit/3a719cf))





## [0.2.7](https://github.com/shuoshubao/nbfe/compare/@nbfe/react-cli@0.2.6...@nbfe/react-cli@0.2.7) (2022-11-07)


### Performance Improvements

* 依赖优化 ([9827c6e](https://github.com/shuoshubao/nbfe/commit/9827c6e))





## [0.2.6](https://github.com/shuoshubao/nbfe/compare/@nbfe/react-cli@0.2.5...@nbfe/react-cli@0.2.6) (2022-11-07)


### Features

* 去掉process.env.NODE_ENV逻辑 ([142e08a](https://github.com/shuoshubao/nbfe/commit/142e08a))
* 升级所有的包 ([e6be5df](https://github.com/shuoshubao/nbfe/commit/e6be5df))
* dll-development 移到node_modules/.cache目录 ([23b1922](https://github.com/shuoshubao/nbfe/commit/23b1922))





## [0.2.5](https://github.com/shuoshubao/nbfe/compare/@nbfe/react-cli@0.2.4...@nbfe/react-cli@0.2.5) (2022-10-30)


### Features

* cdnResource.json 重命名为 manifest.json ([a1b7342](https://github.com/shuoshubao/nbfe/commit/a1b7342))


### Performance Improvements

* 优化代码 ([d4af777](https://github.com/shuoshubao/nbfe/commit/d4af777))





## [0.2.4](https://github.com/shuoshubao/nbfe/compare/@nbfe/react-cli@0.2.3...@nbfe/react-cli@0.2.4) (2022-04-29)


### Bug Fixes

* babel.config.js ([14db1de](https://github.com/shuoshubao/nbfe/commit/14db1de))


### Features

* 过滤空值 ([c8790c9](https://github.com/shuoshubao/nbfe/commit/c8790c9))





## [0.2.3](https://github.com/shuoshubao/nbfe/compare/@nbfe/react-cli@0.2.2...@nbfe/react-cli@0.2.3) (2022-04-27)


### Features

* 升级版本 webpack-dev-server ([5089e13](https://github.com/shuoshubao/nbfe/commit/5089e13))
* babel.config.js ([7714be3](https://github.com/shuoshubao/nbfe/commit/7714be3))





## [0.2.2](https://github.com/shuoshubao/nbfe/compare/@nbfe/react-cli@0.2.1...@nbfe/react-cli@0.2.2) (2022-03-25)


### Features

* dll 缓存依据加上publicPath ([92751e1](https://github.com/shuoshubao/nbfe/commit/92751e1))
* merge 合并配置 ([cc30595](https://github.com/shuoshubao/nbfe/commit/cc30595))





## [0.2.1](https://github.com/shuoshubao/nbfe/compare/@nbfe/react-cli@0.2.0...@nbfe/react-cli@0.2.1) (2022-03-02)


### Features

* dll 支持共享 externals ([e5d5437](https://github.com/shuoshubao/nbfe/commit/e5d5437))





# [0.2.0](https://github.com/shuoshubao/nbfe/compare/@nbfe/react-cli@0.1.10...@nbfe/react-cli@0.2.0) (2022-02-15)


### Bug Fixes

* 去掉冗余代码 ([8a0e8b2](https://github.com/shuoshubao/nbfe/commit/8a0e8b2))





## [0.1.10](https://github.com/shuoshubao/nbfe/compare/@nbfe/react-cli@0.1.9...@nbfe/react-cli@0.1.10) (2022-02-15)


### Bug Fixes

* add-asset-html-webpack-plugin filepath 设置不对 ([d082fa4](https://github.com/shuoshubao/nbfe/commit/d082fa4))





## [0.1.9](https://github.com/shuoshubao/nbfe/compare/@nbfe/react-cli@0.1.8...@nbfe/react-cli@0.1.9) (2022-02-15)


### Bug Fixes

* 模板位置调整 ([65a1cce](https://github.com/shuoshubao/nbfe/commit/65a1cce))
* host 默认为 localhost ([58b8314](https://github.com/shuoshubao/nbfe/commit/58b8314))
* html 模板位置 ([1b80680](https://github.com/shuoshubao/nbfe/commit/1b80680))
* postcss-preset-env 升级 ([971b02a](https://github.com/shuoshubao/nbfe/commit/971b02a))


### Features

* 去掉prettier ([d04fee1](https://github.com/shuoshubao/nbfe/commit/d04fee1))
* 升级依赖包 ([2ce09db](https://github.com/shuoshubao/nbfe/commit/2ce09db))


### Performance Improvements

* 调整目录 ([b7399d7](https://github.com/shuoshubao/nbfe/commit/b7399d7))
* files 字段替换.npmignore ([8919a85](https://github.com/shuoshubao/nbfe/commit/8919a85))





## [0.1.8](https://github.com/shuoshubao/nbfe/compare/@nbfe/react-cli@0.1.7...@nbfe/react-cli@0.1.8) (2021-11-23)


### Features

* devServer.host 默认设置为 ipAddress ([1e767ba](https://github.com/shuoshubao/nbfe/commit/1e767ba))
* maxSize 开发模式设置为0 ([27994bf](https://github.com/shuoshubao/nbfe/commit/27994bf))





## [0.1.7](https://github.com/shuoshubao/nbfe/compare/@nbfe/react-cli@0.1.6...@nbfe/react-cli@0.1.7) (2021-11-15)


### Bug Fixes

* 依赖包 mini-svg-data-uri ([08c9eb2](https://github.com/shuoshubao/nbfe/commit/08c9eb2))


### Features

* 静态资源处理优化 ([d3c2868](https://github.com/shuoshubao/nbfe/commit/d3c2868))
* assets 处理逻辑优化 ([9c69551](https://github.com/shuoshubao/nbfe/commit/9c69551))





## [0.1.6](https://github.com/shuoshubao/nbfe/compare/@nbfe/react-cli@0.1.5...@nbfe/react-cli@0.1.6) (2021-10-29)


### Bug Fixes

* allowedHosts: 'all' ([8122ad4](https://github.com/shuoshubao/nbfe/commit/8122ad4))


### Features

* 配置文件更名 react.config.js ([a16d7cd](https://github.com/shuoshubao/nbfe/commit/a16d7cd))
* mock 支持异步 ([037dd79](https://github.com/shuoshubao/nbfe/commit/037dd79))
* node-polyfill-webpack-plugin ([57af95f](https://github.com/shuoshubao/nbfe/commit/57af95f))





## [0.1.5](https://github.com/shuoshubao/nbfe/compare/@nbfe/react-cli@0.1.4...@nbfe/react-cli@0.1.5) (2021-09-14)


### Bug Fixes

* 升级WebpackDevServer api ([a5b8028](https://github.com/shuoshubao/nbfe/commit/a5b8028))
* babel 配置 ([280c7f2](https://github.com/shuoshubao/nbfe/commit/280c7f2))
* exclude node_modules ([4113a4b](https://github.com/shuoshubao/nbfe/commit/4113a4b))


### Features

* 开发模式也启用 WebpackManifestPlugin ([76ea964](https://github.com/shuoshubao/nbfe/commit/76ea964))
* 升级所有的依赖 ([48668f3](https://github.com/shuoshubao/nbfe/commit/48668f3))





## [0.1.4](https://github.com/shuoshubao/nbfe/compare/@nbfe/react-cli@0.1.3...@nbfe/react-cli@0.1.4) (2021-09-09)


### Features

* pack 更名 react-cli ([5ce0019](https://github.com/shuoshubao/nbfe/commit/5ce0019))





## [0.1.3](https://github.com/shuoshubao/nbfe/compare/@nbfe/react-cli@0.1.2...@nbfe/react-cli@0.1.3) (2021-09-09)


### Features

* dayjs ([e2c4c31](https://github.com/shuoshubao/nbfe/commit/e2c4c31))
* webpack-dev-server 4.1.1 ([c2b93cd](https://github.com/shuoshubao/nbfe/commit/c2b93cd))





## [0.1.2](https://github.com/shuoshubao/nbfe/compare/@nbfe/react-cli@0.1.1...@nbfe/react-cli@0.1.2) (2021-08-12)


### Features

* scripts 更名 assets, 支持传入css和js的cdn资源 ([a314050](https://github.com/shuoshubao/nbfe/commit/a314050))





## 0.1.1 (2021-08-11)


### Features

* @nbfe/react-cli ([f3a0b80](https://github.com/shuoshubao/nbfe/commit/f3a0b80))
