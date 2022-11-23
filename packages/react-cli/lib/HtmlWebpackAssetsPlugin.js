const HtmlWebpackPlugin = require('html-webpack-plugin');
const prettier = require('prettier');
const { memoize } = require('@nbfe/tools');
const { convertManifest } = require('./utils');

const formatHtml = memoize(html => {
    return prettier.format(html, {
        parser: 'html',
        printWidth: 120
    });
});

const convertManifestToHtmlPlugin = memoize(assets => {
    const { css, js } = convertManifest(assets);

    return {
        css: css.map(v => {
            return {
                tagName: 'link',
                voidTag: true,
                attributes: {
                    rel: 'stylesheet',
                    href: v
                }
            };
        }),
        js: js.map(v => {
            return {
                tagName: 'script',
                voidTag: false,
                attributes: {
                    src: v
                }
            };
        })
    };
});

const PluginName = 'HtmlWebpackAssetsPlugin';

module.exports = class {
    constructor(options) {
        this.options = options;
    }

    apply(compiler) {
        compiler.hooks.compilation.tap(PluginName, compilation => {
            const hooks = HtmlWebpackPlugin.getHooks(compilation);

            hooks.alterAssetTagGroups.tapAsync(PluginName, (data, callback) => {
                const { css, js } = convertManifestToHtmlPlugin(this.options.assets);

                data.headTags.unshift(...css);

                data.bodyTags.unshift(...js);

                return callback(null, data);
            });

            hooks.beforeEmit.tapAsync(PluginName, (data, callback) => {
                data.html = formatHtml(data.html);
                return callback(null, data);
            });
        });
    }
};
