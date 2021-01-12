const ua = window.navigator.userAgent;

export const isAndroid = ['Android', 'Adr'].some(v => ua.includes(v));

export const isIOS = Boolean(ua.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/));

export const isIPhone = /\biPhone\b|\biPod\b/i.test(ua);

export const isIPhoneX = (() => {
    const { width, height } = window.screen;
    if (!isIPhone) {
        return false;
    }
    return (height === 812 && width === 375) || (height === 896 && width === 414);
})();
