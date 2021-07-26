const getUa = () => {
    return window.navigator.userAgent;
};

export const isAndroid = () => {
    const ua = getUa();
    ['Android', 'Adr'].some(v => ua.includes(v));
};

export const isIOS = () => {
    const ua = getUa();
    return Boolean(ua.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/));
};

export const isIPhone = () => {
    const ua = getUa();
    return /\biPhone\b|\biPod\b/i.test(ua);
};

export const isIPhoneX = () => {
    const { width, height } = window.screen;
    if (!isIPhone) {
        return false;
    }
    return (height === 812 && width === 375) || (height === 896 && width === 414);
};
