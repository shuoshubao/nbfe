const UglifyJS = require('uglify-js');
const getDocText = require('@nbfe/js2html');
const { NODE_ENV, isDevelopment, pathConfig, projectConfig } = require('../../config');

// 注入静态资源前缀
const injectStaticPrefix = (assets = {}) => {
    Object.entries(assets).forEach(([k, v]) => {
        Object.entries(v).forEach(([k2, v2]) => {
            assets[k][k2] = [projectConfig.staticPrefix, v2].join('');
        });
    });
};

module.exports = (outputPath, templateParams) => {
    const documentConfig = {
        title: projectConfig.title,
        meta: [
            {
                charset: 'utf-8'
            },
            {
                name: 'viewport',
                content: 'width=device-width, initial-scale=1'
            }
        ],
        link: {
            'shortcut icon': projectConfig.favicon
        },
        bodyAttrs: {
            class: `body-${NODE_ENV}`
        },
        bodyHtml: ['<div id="parce__app_root_vue"></div>'],
        headScript: [],
        style: [],
        script: []
    };

    if (projectConfig.unpkgConfigList) {
        const { script, style } = projectConfig.unpkgConfigList;
        documentConfig.style.push(...style);
        documentConfig.script.push(...script);
    }

    if (projectConfig.convertDocumentConfig && typeof projectConfig.convertDocumentConfig === 'function') {
        projectConfig.convertDocumentConfig(documentConfig);
    }

    if (isDevelopment) {
        const { css, js } = templateParams.htmlWebpackPlugin.files;
        documentConfig.style.push(...css);
        documentConfig.script.push(...js);
    } else {
        delete require.cache[`${pathConfig.webpackAssets}/index.json`];
        const assetEntry = require(`${pathConfig.webpackAssets}/index.json`);

        injectStaticPrefix(assetEntry);

        // parce__common
        if (assetEntry.parce__common) {
            documentConfig.style.push(assetEntry.parce__common.css);
            documentConfig.script.push(assetEntry.parce__common.js);
        }

        // page
        documentConfig.style.push(assetEntry[outputPath].css);
        documentConfig.script.push(assetEntry[outputPath].js);
    }

    // UglifyJS
    if (!isDevelopment) {
        documentConfig.headScript
            .filter(v => v)
            .forEach((v, i) => {
                if (v.__text) {
                    documentConfig.headScript[i].__text = UglifyJS.minify(v.__text).code;
                }
            });
        documentConfig.script
            .filter(v => v)
            .forEach((v, i) => {
                if (v.__text) {
                    documentConfig.script[i].__text = UglifyJS.minify(v.__text).code;
                }
            });
    }

    return getDocText(() => documentConfig);
};
