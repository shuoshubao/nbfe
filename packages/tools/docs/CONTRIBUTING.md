# 注释

代码注释必须严格遵循 [JSDoc](https://jsdoc.app/) 规范

# 开发

-   执行 `npm run docs:dev` // 启动 `ydoc` 服务, 浏览器打开 `http://127.0.0.1:9999`
-   执行 `docs:gernerate` // 监听 `lib` 目录的修改, 实时解析注释生成文档

# 单测

为保证工具方法的质量, 每个方法必须编写单测. 本项目采用的测试库是 [ava](https://github.com/avajs/ava-docs/blob/main/zh_CN/readme.md)

# 打包

项目采用的构建工具是 [rollup](https://www.npmjs.com/package/rollup)
