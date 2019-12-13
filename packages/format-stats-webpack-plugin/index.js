const { extname } = require('path');
const chalk = require('chalk');
const cliui = require('cliui');

// 打印带颜色的信息
const log = (str = '', color = '') => {
    // eslint-disable-next-line no-console
    console.log(color ? chalk[color](str) : str);
};

// 求和
const sum = (arr, init = 0) => arr.reduce((prev, cur) => prev + cur, init);

// 去重
const uniq = arr => Array.from(new Set(arr));

// 给文件大小加单位 B KB
const filesize = size => {
    if (size < 2 ** 10) {
        return `${size} B`;
    }
    return `${(size / 2 ** 10).toFixed(2)} KB`;
};

const formatStats = stats => {
    const {
        startTime,
        endTime,
        compilation: { assets }
    } = stats;
    const ui = cliui({ width: 50 });
    ui.div({
        text: `${chalk.green('统计:')} 耗时 ${chalk.cyan(endTime - startTime)} ms`,
        padding: [1, 0, 1, 0]
    });
    const renderTable = arr => ui.div(...arr.map(v => ({ text: v })));
    const data = Object.keys(assets).reduce((prev, cur) => {
        prev.push({
            name: cur,
            type: extname(cur),
            size: assets[cur].size()
        });
        return prev;
    }, []);
    const tableThead = ['类型', '数量', '文件大小'].map(v => chalk.cyan(v));
    renderTable(tableThead);
    uniq(data.map(v => v.type))
        .map(type => {
            const files = data.filter(v2 => v2.type === type);
            const { length: len } = files;
            const size = sum(files.map(v => v.size));
            return { type, len, size };
        })
        .sort((a, b) => a.len - b.len)
        .forEach(({ type, len, size }) => renderTable([type, len, filesize(size)]));
    const tableFoot = ['总计', data.length, filesize(sum(data.map(v => v.size)))].map(v => chalk.green(v));
    renderTable(tableFoot);
    log(ui.toString());
};

class FormatStatsWebpackPlugin {
    apply(compiler) {
        compiler.hooks.done.tap('FormatStatsWebpackPlugin', stats => {
            formatStats(stats);
        });
    }
}

module.exports = FormatStatsWebpackPlugin;
