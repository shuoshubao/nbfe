const fetch = require('node-fetch');
const axios = require('axios');
const Koa = require('koa');
const bodyParser = require('koa-bodyparser');
const { isDevelopment, pathConfig, projectConfig } = require('../config');
const assetProxyMiddleware = require('./middlewares/assetProxyMiddleware');
const mockMiddleware = require('./middlewares/mockMiddleware');
const apiMiddleware = require('./middlewares/apiMiddleware');
const webpackMiddleware = require('../webpack/webpack.middleware');

const app = new Koa();

app.use(bodyParser());

app.use(mockMiddleware());
app.use(apiMiddleware());

if (projectConfig.proxyMiddleware) {
    app.use(projectConfig.proxyMiddleware(fetch, axios));
}

if (isDevelopment) {
    webpackMiddleware(app);
} else {
    app.use(assetProxyMiddleware());
}

app.listen(projectConfig.port);
