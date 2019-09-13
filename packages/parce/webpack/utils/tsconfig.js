const { writeJsonSync } = require('fs-extra');
const { projectConfig, pathConfig } = require('../../config');

const defaultConfig = {
    include: [`${pathConfig.root}/src/**/*`],
    exclude: ['node_modules', '**/*.spec.ts']
};

module.exports = () => {
    const config = projectConfig.injectTsConfig(defaultConfig) || defaultConfig;
    writeJsonSync(pathConfig.TsConfigFilePath, config, { spaces: 2 });
};
