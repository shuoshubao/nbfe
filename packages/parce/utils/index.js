const chalk = require('chalk');
const { formatTime } = require('./time');
const { getFormatCode } = require('./prettier');

// 打印带颜色的信息
const log = (str, color) => {
    // eslint-disable-next-line no-console
    console.log(color ? chalk[color](str) : str);
};

module.exports = {
    formatTime,
    getFormatCode,
    log
};
