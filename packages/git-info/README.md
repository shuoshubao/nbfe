# @nbfe/git-info

获取路径所属的项目 .git 下的信息

## 安装

> npm i -D @nbfe/git-info

## 使用

```javascript
const getGitInfo = require('@nbfe/git-info')
console.log(getGitInfo())
console.log(getGitInfo('.'))
console.log(getGitInfo('src/main.js'))
```

## 返回

```javascript
{
  projectPath: '/Users/your_mac_name/**/demo', // git 项目根目录
  gitFolder: '/Users/your_mac_name/**/demo/.git', // .git 目录的路径
  HEAD: 'test' // 当前分支名
  config: { // .git/config 的数据
    core: {
      repositoryformatversion: '0',
      filemode: true,
      bare: false,
      logallrefupdates: true,
      ignorecase: true,
      precomposeunicode: true
    },
    remote: {
      origin: {
        url: 'git@git.xx.com:applications/grants.git',
        fetch: '+refs/heads/*:refs/remotes/origin/*'
      }
    },
    branch: {
      master: { remote: 'origin', merge: 'refs/heads/master' },
      'test': { remote: 'origin', merge: 'refs/heads/test' }
    }
  }
}
```
