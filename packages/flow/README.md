yarn add @nbfe/flow -D

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
    "eslint": "npx eslint --ext .ts,.tsx,.js,.jsx,.vue -f html -o ESLintReport.html src",
    "eslint:fix": "npx eslint --fix --ext .ts,.tsx,.js,.jsx,.vue -f table src"
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
  }
}
```
