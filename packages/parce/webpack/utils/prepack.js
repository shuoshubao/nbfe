const { writeFileSync } = require('fs');
const { ensureFileSync, ensureDirSync } = require('fs-extra');
const { relative, join } = require('path');
const url = require('url');
const { isDevelopment, pathConfig, projectConfig } = require('../../config');
const { pagesConfig } = require('./routers');
const compileTsConfig = require('./tsconfig');
const { log, getFormatCode } = require('../../utils');

const vueTemplate = AppPath => {
    const commonJsPath = join('__src', relative(pathConfig.src, pathConfig.common));
    return [
        "import Vue from 'vue';",
        `import '${commonJsPath}';`,
        `import App from '${AppPath}';`,
        'new Vue({',
        "    el: '#parce__app_root_vue',",
        '    render: h => h(App)',
        '});'
    ].join('\n');
};

const getCompleteUrl = (pathname = '') => {
    return url.format({
        protocol: 'http',
        hostname: 'localhost',
        port: projectConfig.port,
        pathname
    });
};

const printRouter = () => {
    if (isDevelopment && projectConfig.printRouter) {
        log('路由列表:', 'cyan');
        log('-'.repeat(30), 'cyan');
        pagesConfig.forEach(v => {
            const { outputPath } = v;

            const pathname = `${projectConfig.urlPrefix || ''}/${outputPath}.html`;

            if (outputPath === 'index') {
                log(getCompleteUrl());
            } else {
                log(getCompleteUrl(pathname));
            }
        });
        log('-'.repeat(30), 'cyan');
    }
};

const produceVueTemplateJs = () => {
    ensureDirSync(pathConfig.ViewCacheDirectory);
    pagesConfig.forEach(v => {
        const { vuePath, entryPath } = v;
        ensureFileSync(entryPath);
        let text = '';
        text = vueTemplate(relative(pathConfig.src, vuePath));
        text = getFormatCode(text);
        writeFileSync(entryPath, text);
    });
};

module.exports = () => {
    produceVueTemplateJs();
    compileTsConfig();
    printRouter();
};
