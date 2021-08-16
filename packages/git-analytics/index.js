const { spawnSync } = require('child_process');

const dataToArgv = (data = {}) => {
    return Object.entries(data).reduce((prev, [k, v]) => {
        if (v === true) {
            prev.push(`--${k}`);
        } else if (k === 'pretty') {
            prev.push(`--${k}=${v}`);
        } else {
            prev.push(`--${k}`, v);
        }
        return prev;
    }, []);
};

const execGitLog = (gitLogConfig, config) => {
    const { silent = true, cwd = process.cwd() } = config || {};
    if (!silent) {
        console.log('执行命令:', ['git', 'log', ...dataToArgv(gitLogConfig)].join(' '));
    }
    const { stdout } = spawnSync('git', ['log', ...dataToArgv(gitLogConfig)], { cwd });
    return stdout.toString();
};

const getCodeLines = (gitLogConfig = {}, config) => {
    const gitLogText = execGitLog(
        {
            oneline: true,
            shortstat: true,
            'no-merges': true,
            ...gitLogConfig
        },
        config
    );
    const gitLogArray = gitLogText.trim().split('\n');
    const commits = Math.floor(gitLogArray.length / 2);
    const lines = {
        commits,
        insertions: 0,
        deletions: 0,
        total: 0
    };
    Array.from({ length: commits }).forEach((v, i) => {
        const diff = gitLogArray[i * 2 + 1].trim();
        const diffCount = diff.match(/\d+/g);
        // 新增+删除
        if (diff.includes('insertion') && diff.includes('deletion')) {
            const [files, insertions, deletions] = diffCount;
            lines.insertions += Number(insertions);
            lines.deletions += Number(deletions);
        } else {
            // 只有新增
            if (diff.includes('insertion') && !diff.includes('deletion')) {
                const [files, insertions] = diffCount;
                lines.insertions += Number(insertions);
            }
            // 只有删除
            if (!diff.includes('insertion') && diff.includes('deletion')) {
                const [files, deletions] = diffCount;
                lines.deletions += Number(deletions);
            }
        }
    });

    lines.total = lines.insertions - lines.deletions;

    return lines;
};

exports.getCodeLines = getCodeLines;
