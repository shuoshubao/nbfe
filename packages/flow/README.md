yarn add @lsfe/flow -D

// package.json

```
{
  "scripts": {
    "commit": "npx git-cz",
    "release:patch": "standard-version --release-as patch",
    "release:minor": "standard-version --release-as minor",
    "release:major": "standard-version --release-as major",
    "online": "mnpm publish && git push && git push --follow-tags origin",
    "prettier": "npx prettier --write '**/*.js'",
    "eslint": "npx eslint src --ext .ts,.vue.js --ignore-path .gitignore -f html -o ESLintReport.html",
    "eslint:fix": "npx eslint --fix src --ext .ts,.vue.js --ignore-path .gitignore -f table"
  },
  "husky": {
    "hooks": {
      "commit-msg": "commitlint -e $GIT_PARAMS",
      "pre-commit": "lint-staged"
    }
  },
  "lint-staged": {
    "linters": {
      "*.js": [
        "eslint -f table",
        "git add"
      ]
    },
    "ignore": [
      "package.json"
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
  },
  "standard-version": {
    "scripts": {
      "postchangelog": "echo postchangelog"
    }
  }
}
```
