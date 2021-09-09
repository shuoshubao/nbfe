const { packConfig } = require('./config');
const mock = require('./mock');

module.exports = {
    host: 'localhost',
    port: 8080,
    hot: true,
    liveReload: true,
    historyApiFallback: true,
    static: {
        directory: packConfig.outputDir,
        staticOptions: undefined,
        watch: {
            poll: 3000
        }
    },
    onBeforeSetupMiddleware: devServer => {
        const { app } = devServer;
        if (packConfig.enableMock) {
            mock(app);
            app.use('*', (req, res, next) => {
                res.header('Access-Control-Allow-Credentials', 'true');
                res.header('Access-Control-Allow-Origin', '*');
                res.header('Access-Control-Allow-Methods', 'GET,POST');
                res.header(
                    'Access-Control-Allow-Headers',
                    'Origin,Accept,Content-Type,Content-Length, Authorization, Accept,X-Requested-With'
                );
                next();
            });
        }
    },
    ...packConfig.devServer
};
