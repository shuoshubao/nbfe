# 安装

```sh
npm i -D @nbfe/standard
```

注意: 业务仓库的 `package.json` 请设置字段: `"private": true`

# init

```shell
npx standard init
```

// package.json

```json
{
  "scripts": {
    "commit": "npx git-cz",
    "release:patch": "standard-version --release-as patch",
    "release:minor": "standard-version --release-as minor",
    "release:major": "standard-version --release-as major",
    "release": "npm publish && git push && git push --follow-tags origin",
    "prettier": "npx prettier --write",
    "lint": "npx eslint --ext .ts,.tsx,.js,.jsx,.vue -f html -o ESLintReport.html",
    "lint:style": "stylelint -o StyleLintReport.html --custom-formatter node_modules/stylelint-formatters-html **/*.{css,scss,sass,less}"
  },
  "husky": {
    "hooks": {
      "commit-msg": "commitlint -e $GIT_PARAMS",
      "pre-commit": ["lint-staged"]
    }
  },
  "lint-staged": {
    "linters": {
      "*.{ts,tsx,js,jsx,vue,css,less,scss,sass,json,md}": ["prettier --write", "git add"],
      "*.{ts,tsx,js,jsx,vue}": ["eslint -f table", "git add"]
    },
    "ignore": ["CHANGELOG.md"]
  },
  "config": {
    "commitizen": {
      "path": "./node_modules/cz-conventional-changelog"
    }
  },
  "commitlint": {
    "extends": ["@commitlint/config-conventional"]
  }
}
```

# lint

```shell
npm run lint -- src
npm run lint -- src --fix
```

# Eslint

```js
// .eslintrc.js

const { getESLintConfig } = require('@nbfe/standard')

module.exports = getESLintConfig()
// module.exports = getESLintConfig(['react'], {})
// module.exports = getESLintConfig(['react', 'ts'], {})
// module.exports = getESLintConfig(['vue'], {})
// module.exports = getESLintConfig(['vue', 'ts'], {})
```

# prettier

// prettier.config.js

```js
const { PrettierConfig } = require('@nbfe/standard')

module.exports = PrettierConfig
```

# stylelint

// stylelint.config.js

```js
const { StylelintConfig } = require('@nbfe/standard')

module.exports = StylelintConfig
```

# 规则

理想状态当然是没有自定义规则, 奈何现实总要向老代码低头

规则设置为 1 (warning) 并不代表 Airbnb 的规则不合理, 只是一种无奈的妥协!
