const { log } = require('../../utils');
const formatStats = require('./formatStats');
const prepack = require('./prepack');
const afterpack = require('./afterpack');
const convertDefine = require('./convertDefine');

const noop = () => {};

module.exports = {
    log,
    noop,
    formatStats,
    prepack,
    afterpack,
    convertDefine
};
