# 简介

- 一款更好的 stylelint 报告格式化工具。
- 官方介绍请参考: [https://stylelint.io/developer-guide/formatters](https://stylelint.io/developer-guide/formatters)
- [demo](https://shuoshubao.github.io/nbfe/packages/stylelint-formatter-html/index.html)
- [github](https://github.com/shuoshubao/nbfe/tree/master/packages/stylelint-formatter-html)

# 安装

```
npm i -D stylelint-formatter-html
```

# 使用

```
stylelint -o StyleLintReport.html --aei --custom-formatter node_modules/stylelint-formatters-html **/*.{css,less,scss,sass}
```
