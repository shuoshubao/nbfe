/**
 * [获取 portal 配置]
 * 主页: http://portm.sankuai.com/page/portm-horn/index.html
 * 示例1: https://portal-portm.meituan.com/horn/v1/modules/vss/test
 * 示例2: https://portal-portm.meituan.com/horn/v1/modules/vss/prod
 * @param  {String} mod [必传; portal源: 例如 'vss', 'base'等]
 * @return {Function(key)}     []
 */

const CachePromise = {};

export const fetchPortal = (mod = '', cache = true) => {
    const isProd = ['staging', 'production'].includes(process.env.NODE_ENV);
    const urlPrefix = 'https://portal-portm.meituan.com/horn/v1/modules';
    const apiName = isProd ? 'prod' : 'test';
    const url = [urlPrefix, mod, apiName].join('/');
    if (cache) {
        if (!CachePromise[mod]) {
            CachePromise[mod] = fetch(url).then(res => res.json());
        }
    } else {
        CachePromise[mod] = fetch(url).then(res => res.json());
    }
    return (key = '') => {
        return CachePromise[mod].then(res => {
            return key ? res[key] : res;
        });
    };
};

/*
示例1:
const collaborators = await fetchPortal('vss')('collaborators');

示例2:
fetchPortal('vss')('collaborators').then(res => {
   // ...
});
 */
