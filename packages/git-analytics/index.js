const { spawnSync } = require('child_process')

// 求和
const sum = arr => arr.reduce((prev, cur) => prev + cur, 0)

const dataToArgv = (data = {}) => {
  return Object.entries(data).reduce((prev, [k, v]) => {
    if (v === true) {
      prev.push(`--${k}`)
    } else if (k === 'pretty') {
      prev.push(`--${k}=${v}`)
    } else {
      prev.push(`--${k}`, v)
    }
    return prev
  }, [])
}

const execGitLog = (gitLogConfig, config) => {
  const { silent = true, cwd = process.cwd() } = config || {}
  if (!silent) {
    // eslint-disable-next-line no-console
    console.log('执行命令:', ['git', 'log', ...dataToArgv(gitLogConfig)].join(' '))
  }
  const { stdout } = spawnSync('git', ['log', ...dataToArgv(gitLogConfig)], { cwd })
  return stdout.toString()
}

// 后缀: js jsx ts tsx vue
// ignore 目录: mock test tests
const getCodeLines = (gitLogConfig = {}, config = {}) => {
  const extensions = ['.js', '.jsx', '.ts', '.tsx', '.vue']
  const lines = {
    commits: 0,
    insertions: 0,
    deletions: 0,
    total: 0,
    allFilesInsertions: 0,
    allFilesDeletions: 0,
    allFilesTotal: 0
  }
  const gitLogText = execGitLog(
    {
      oneline: true,
      shortstat: true,
      'no-merges': true,
      'format=': true,
      numstat: true,
      ...gitLogConfig
    },
    config
  )
  const gitLogArray = gitLogText.trim().split('\n')
  const commitsArray = gitLogArray.filter(v => {
    return v.startsWith(' ')
  })
  lines.commits = commitsArray.length
  const diffArray = gitLogArray
    .filter(v => {
      return !v.startsWith(' ')
    })
    .map(v => {
      const [insertions, deletions, filePath] = v.split(/\s+/)
      return {
        insertions: +insertions,
        deletions: +deletions,
        filePath
      }
    })
    .filter(v => !!v.filePath)
  const jsDiffArray = diffArray.filter(v => {
    const { filePath } = v
    // 后缀
    if (
      extensions.every(v2 => {
        return !filePath.endsWith(v2)
      })
    ) {
      return false
    }
    // 过滤路径
    if (
      ['test', 'mock', 'docs'].some(v2 => {
        return filePath.includes(v2)
      })
    ) {
      return false
    }
    return true
  })
  lines.insertions = sum(jsDiffArray.map(v => v.insertions))
  lines.deletions = sum(jsDiffArray.map(v => v.deletions))
  lines.total = lines.insertions - lines.deletions

  lines.allFilesInsertions = sum(diffArray.map(v => v.insertions))
  lines.allFilesDeletions = sum(diffArray.map(v => v.deletions))
  lines.allFilesTotal = lines.allFilesInsertions - lines.allFilesDeletions
  return lines
}

exports.getCodeLines = getCodeLines
