/**
 * setState => promise
 * @param  {*} context  this
 * @param  {Object} newState 新的状态
 * @return {*}          无
 * @example
 *
 * this.setState({ a: 1 }, () => {
 *   console.log('do something here');
 * });
 * // 等价于
 * await setAsyncState(this, { a: 1 });
 * console.log('do something here');
 */
export const setAsyncState = (context, newState) => {
    return new Promise(resolve => {
        context.setState(newState, resolve);
    });
};
