

const { writeFileSync } = require('fs');
const { format } = require('prettier');
const { generateTable } = require('./dist');

const data = [
    { name: '硕鼠宝', age: 30 },
    { name: '硕鼠宝1', age: 20 }
];

const columns = [
    {
        prop: 'name',
        label: '姓名',
        visible: false
    },
    {
        prop: 'age',
        label: '年龄',
        width: 100,
        align: 'center'
    }
];

const contentSource = generateTable(columns, data);

const content = format(contentSource, {
    parser: 'html'
});

writeFileSync('1.html', content);
// writeFileSync('1.html', contentSource);
