module.exports = (DefineConfig = {}) => {
    return Object.entries(DefineConfig).reduce((prev, cur) => {
        const [k, v] = cur;
        prev[k] = JSON.stringify(v);
        return prev;
    }, {});
};
