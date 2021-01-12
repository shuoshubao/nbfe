// setState => promise
export const setAsyncState = (context, newState) => {
    return new Promise(resolve => {
        context.setState(newState, resolve);
    });
};
