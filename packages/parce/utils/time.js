const formatTime = (date, format = 'YYYY-MM-DD HH:mm:ss') => {
    const pad = s => `0${s}`.slice(-2);
    const dt = new Date(+date);
    const parse = {
        MM: dt.getMonth() + 1,
        DD: dt.getDate(),
        HH: dt.getHours(),
        mm: dt.getMinutes(),
        ss: dt.getSeconds()
    };
    Object.keys(parse).forEach(v => {
        parse[v] = pad(parse[v]);
    });
    parse.YYYY = dt.getFullYear();
    return Object.entries(parse).reduce((prev, [k, v]) => {
        return prev.replace(k, v);
    }, format);
};

module.exports = { formatTime };
