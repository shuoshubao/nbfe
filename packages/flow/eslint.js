const { isVue } = require('./env');

module.exports = require(`./eslint-${isVue ? 'vue' : 'react'}`);
