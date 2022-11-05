module.exports = ({ isDevelopment }) => {
    return {
        entry: { index: 'src/index.js' },
        dllEntry: {
            react: ['react', 'react-dom'],
            tools: ['lodash']
        },
        devServer: {
            port: 3000
        }
    };
};
