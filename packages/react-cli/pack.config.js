module.exports = ({ mode }) => {
    return {
        entry: { index: 'src/index.js' },
        dllEntry: {
            react: ['react', 'react-dom']
        },
        devServer: {
            port: 3000
        }
    };
};
