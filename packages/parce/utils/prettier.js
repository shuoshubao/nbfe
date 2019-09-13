const prettier = require('prettier');

const prettierOptions = {
    printWidth: 120,
    useTabs: false,
    tabWidth: 4,
    semi: true, // 分号
    singleQuote: true, // 单引号
    trailingComma: 'none', // 不要尾逗号
    proseWrap: 'never' // markdown 换行
};

const defaultParser = 'babel';

const getFormatCode = (code = '', parser = defaultParser) => {
    return prettier.format(code, { ...prettierOptions, parser });
};

module.exports = {
    getFormatCode
};
