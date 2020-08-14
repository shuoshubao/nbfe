yarn add @nbfe/flow -D

注意: 业务仓库的 `package.json` 请设置字段: `"private": true`

# init

```
node node_modules/@nbfe/flow/init
```

// package.json

```
{
  "scripts": {
    "commit": "npx git-cz",
    "release:patch": "standard-version --release-as patch",
    "release:minor": "standard-version --release-as minor",
    "release:major": "standard-version --release-as major",
    "release": "npm publish && git push && git push --follow-tags origin",
    "prettier": "npx prettier --write",
    "lint": "npx eslint --ext .ts,.tsx,.js,.jsx,.vue -f html -o ESLintReport.html"
  },
  "husky": {
    "hooks": {
      "commit-msg": "commitlint -e $GIT_PARAMS",
      "pre-commit": ["lint-staged"]
    }
  },
  "lint-staged": {
    "linters": {
        "*.{ts,tsx,js,jsx,vue,less,scss,sass,json,md}": [
            "prettier --write",
            "git add"
        ],
        "*.{ts,tsx,js,jsx,vue}": [
            "eslint -f table",
            "git add"
        ]
    },
    "ignore": [
        "CHANGELOG.md"
    ]
  },
  "config": {
    "commitizen": {
      "path": "./node_modules/cz-conventional-changelog"
    }
  },
  "commitlint": {
    "extends": [
      "@commitlint/config-conventional"
    ]
  }
}
```

# lint

```
npm run lint -- src
npm run lint -- src --fix
```
