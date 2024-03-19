export default {

    /*
     * Определяем браузер пользователя
     * @return {string|bool}
     */
    get: () => {
        const user_agent = navigator.userAgent.toLocaleLowerCase();

        const iOS = /ipad|iphone|ipod/.test(user_agent) && !window.MSStream;

        if (iOS) {
            return false;
        }

        const is_mobile = !!user_agent.indexOf('mobile');

        let version;

        if (user_agent.indexOf('fb_iab') >= 0 || user_agent.indexOf('; wv') >= 0) { // Facebook Browser и WebView
            return false;
        }

        if (
            user_agent.indexOf('chrome') >= 0
            && user_agent.indexOf('opr/') < 0
            && user_agent.indexOf('ucbrowser/') < 0
            && user_agent.indexOf('edge/') < 0
            && user_agent.indexOf('edg/') < 0
        ) {
            version = user_agent.match(/chrom(e|ium)\/([0-9]+)\./);
            version = version ? parseInt(version[2], 10) : false;
            if (version && version >= 42) {
                return 'chrome';
            }
        } else if (user_agent.indexOf('firefox') >= 0) {
            version = user_agent.match(/firefox\/([0-9]+)\./);
            version = version ? parseInt(version[1], 10) : false;
            if ((version && version >= 44 && !is_mobile) || (version && version >= 48 && is_mobile)) {
                return 'firefox';
            }
        } else if (user_agent.indexOf('opr/') >= 0) {
            version = user_agent.match(/opr\/([0-9]+)\./);
            version = version ? parseInt(version[1], 10) : false;
            if ((version && version >= 42 && !is_mobile) || (version && version >= 37 && is_mobile)) {
                return 'opera';
            }
        } else if (user_agent.indexOf('ucbrowser/') >= 0) {
            version = user_agent.match(/ucbrowser\/([0-9]+)\./);
            version = version ? parseInt(version[1], 10) : false;
            if (version && version >= 12 && is_mobile) {
                return 'ucbrowser';
            }
        } else if (user_agent.indexOf('edge/') >= 0 || user_agent.indexOf('edg/') >= 0) {
            version = user_agent.match(/edge?\/([0-9.]+)/);
            version = parseFloat(version[1]);
            if (version && version >= 17.17134) {
                return 'edge';
            }
        } else if (user_agent.indexOf('safari') >= 0) {
            if (!is_mobile && 'pushNotification' in window.safari) {
                return 'safari';
            }
        }

        return false;
    },


    /*
     * Определяем принадлежность к мобильным устройствам
     * @return {bool}
     */
    is_mobile: () => {
        const user_agent = navigator.userAgent.toLocaleLowerCase();
        const iOS = /ipad|iphone|ipod/.test(user_agent) && !window.MSStream;

        return iOS || user_agent.indexOf('mobile') < 0;
    },

};
