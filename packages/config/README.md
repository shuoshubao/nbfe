## 使用

> yarn add @nbfe/config -D

### Eslint

```
// .eslintrc.js

// vue
const EslintConfig = require('@nbfe/config/eslint-vue');

// react
const EslintConfig = require('@nbfe/config/eslint-vue');

module.exports = EslintConfig;
```

### prettier

// prettier.config.js

```
const PrettierConfig = require('@nbfe/config/prettier.config');

module.exports = {
    ...PrettierConfig
};
```
