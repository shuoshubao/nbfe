# @nbfe/git-analytics

git log 统计信息

## 安装

> npm i -D @nbfe/git-analytics

## 使用

```js
const { getCodeLines } = require('@nbfe/git-analytics');

const lines = getCodeLines({
    since: '2020-08-16', // 自从
    until: '2021-04-23' // 直到
});

/**
 * {
 *     commits: 48, // 提交次数
 *     insertions: 11792, // 新增行数
 *     deletions: 1459, // 删除行数
 *     total: 10333 // 总变化数
 * }
 */

```
