# @nbfe/git-analytics

git log 统计信息

## 安装

> npm i -D @nbfe/git-analytics

## 使用

### getCodeLines

获取项目的行数变化

-   后缀: js jsx ts tsx vue
-   ignore 目录: mock test tests

```js
const { getCodeLines } = require('@nbfe/git-analytics');

const lines = getCodeLines({
    since: '2020-08-16', // 自从
    until: '2021-04-23' // 直到
});

console.log(lines);

/**
 * {
 *     commits: 48, // 提交次数
 *     insertions: 1543, // 新增行数
 *     deletions: 307, // 删除行数
 *     total: 1236, // 总变化数
 *     allFilesInsertions: 11792, // 删除行数(所有文件)
 *     allFilesDeletions: 1459, // 新增行数(所有文件)
 *     allFilesTotal: 10333 // 总变化数(所有文件)
 * }
 */
```
