yarn add @nbfe/flow -D

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
      "pre-commit": ["pretty-quick --staged", "lint-staged"]
    }
  },
  "lint-staged": {
    "linters": {
      "*.{ts,tsx,js,jsx,vue}": [
        "eslint -f table",
        "git add"
      ]
    }
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

# init

```
node node_modules/@nbfe/flow/init
```

# lint

```
npm run lint -- src
npm run lint -- src --fix
```
