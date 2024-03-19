
// import {T, addByName} from 'modules/helpers/dictionary';

// addByName('v2_push_free');

let url = `https://${window.location.hostname}`;

let key = '';

// const theme = injector.config.themeNumberForPushFree;

const {currentScript} = document;

/*
 * Получение конфигурации
 * @return {object}
 */
const getConfig = () => ({
    url,
    key,
    // dir    : injector.config.is_rtl ? 'rtl' : 'ltr',
    dir    : 'rtl',
    icon   : '/pushfree/icon.png',
    logo   : '/pushfree/logo.png',
    loading: '/pushfree/loading.gif',
    sw     : '/serviceworker',
    box    : {
        // theme              : theme,
        // theme_pos          : THEMES_POS.TOP,
        theme_pos          : 1,
        box_color          : '#fff',
        btn_allow_txt      : "T('lt_allow')",
        btn_allow_color    : '#0e82e5',
        btn_allow_txt_color: '#fff',
        btn_deny_txt       : "T('lt_deny')",
        btn_deny_color     : '#d3d3d3',
        btn_deny_txt_color : '#888',
        title              : "T('lt_title')",
        title_txt_color    : '#333',
        message            : "T('lt_message')",
        message_txt_color  : '#777',
    },
    window: {
        processing           : "T('p_processing')",
        subscribe_title      : "T('p_subscribe_title')",
        subscribe_allow      : "T('p_subscribe_allow')",
        subscribe_description: "T('p_subscribe_description')",
        blocked_title        : "T('p_blocked_title')",
        blocked_description  : "T('p_blocked_description')",
        mobile_blocked       : "T('p_mobile_blocked')",
        chrome_blocked       : "T('p_chrome_blocked')",
        firefox_blocked      : "T('p_firefox_blocked')",
        opera_blocked        : "T('p_opera_blocked')",
        edge_blocked         : "T('p_edge_blocked')",
        safari_blocked       : "T('p_safari_blocked')",
    },
});

const getDomain = async () => {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            resolve({ url: 'example.com' });
        }, 2000);
    });
};

/*
 * Поиск адреса сайта
 * @return {Promise}
 */
const defineUrl = () => getDomain()
    .then((res) => res.json().then((data) => {
        if (!data || !data.url) {
            throw new Error('Failed to load domain url');
        }

        return data.url;
    }))
    .then((value) => url = value);

/*
 * Определение адреса сайта
 * @return {Promise}
 */
const defineKey = () => new Promise((resolve, reject) => {
    const matchKey = currentScript.getAttribute('key').match(/^[a-z0-9_-]+$/i);

    if (matchKey && matchKey[0]) {
        return resolve(matchKey[0]);
    }

    return reject(new Error('Could not determine key'));
})
    .then((value) => key = value);

/*
 * Проверяем запуск в фрейме
 * @return {bool}
 */
const isIframe = () => {
    try {
        return window.self !== window.top;
    } catch (e) {
        return true;
    }
};

/*
 * Проверка поддержки push-уведомлений и сервис-воркера в браузере пользователя
 * @return {bool}
 */
const isCompatible = () => typeof Notification !== 'undefined' && 'serviceWorker' in navigator;

export {
    getConfig,
    defineUrl,
    defineKey,
    isIframe,
    isCompatible,
};
