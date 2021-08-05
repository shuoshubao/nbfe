const { isDevelopment, packConfig, MiniCssExtractPlugin } = require('./config');

const { requireModuleExtension, loaderOptions } = packConfig.css;

const moduleCssLoaderOptions = {
    import: true,
    importLoaders: 2,
    modules: {
        localIdentName: isDevelopment ? '[name]_[local]_[hash:base64:5]' : '[path]_[name]_[local]_[hash:base64:5]'
    }
};

const cssLoaderOptions = {
    less: {
        lessOptions: {
            javascriptEnabled: true
        }
    },
    postcss: {
        postcssOptions: {
            plugins: ['postcss-preset-env']
        }
    }
};

const getLoaderOptions = lang => {
    return {
        ...(cssLoaderOptions[lang] || {}),
        ...(loaderOptions[lang] || {})
    };
};

const cssLoaderName = {
    styl: 'stylus'
};

const cssLangList = ['css', 'less', 'scss', 'styl'];

const applyLoaders = (chainableConfig, lang, isCssModule) => {
    const testRegText = isCssModule ? `\\.module\\.${lang}$` : `\\.${lang}$`;
    const testReg = new RegExp(testRegText);
    const ruleName = [lang, isCssModule ? 'module' : ''].filter(Boolean).join('-');
    const rule = chainableConfig.module.rule(ruleName).test(testReg);
    if (!isCssModule) {
        rule.exclude.add(new RegExp(`\\.module\\.${lang}`));
    }
    if (isDevelopment) {
        rule.use('style-loader').loader('style-loader');
    } else {
        rule.use('MiniCssExtractPlugin').loader(MiniCssExtractPlugin.loader).options({
            esModule: false
        });
    }
    rule.use('css-loader')
        .loader('css-loader')
        .options(isCssModule ? moduleCssLoaderOptions : {});
    rule.use('postcss-loader').loader('postcss-loader').options(getLoaderOptions('postcss'));
    const loaderName = [cssLoaderName[lang] || lang, 'loader'].join('-');
    rule.use(loaderName).loader(loaderName).options(getLoaderOptions(lang));
};

module.exports = chainableConfig => {
    cssLangList.forEach(v => {
        applyLoaders(chainableConfig, v, false);
        applyLoaders(chainableConfig, v, true);
    });
};
