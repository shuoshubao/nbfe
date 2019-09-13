const fs = require('fs');
const { resolve } = require('path');
const mkdirp = require('mkdirp');
const { pagesConfig } = require('./routers');
const { pathConfig } = require('../../config');
const getSingleHtml = require('./getSingleHtml');

module.exports = () => {
    pagesConfig.forEach(v => {
        const { outputPath } = v;
        const dirname = outputPath.split('/');
        if (dirname.length !== 1) {
            mkdirp.sync(resolve(pathConfig.build, dirname.slice(0, -1).join('/')));
        }
        const docText = getSingleHtml(outputPath);
        fs.writeFileSync(resolve(pathConfig.build, `${v.outputPath}.html`), docText);
    });
};
