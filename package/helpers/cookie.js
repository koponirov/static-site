export default {

    /*
     * Установка куков в браузере пользователя
     * @param {string} cname - свойство
     * @param {string} cvalue - значение
     * @param {int} exdays - колиество дней действия куки
     */
    set: (cname, cvalue, exdays = 365) => {
        const d = new Date();
        d.setTime(d.getTime() + (exdays * 24 * 60 * 60 * 1000));
        const expires = 'expires=' + d.toUTCString();
        const domain_name = location.hostname;
        document.cookie = cname + '=' + cvalue + '; ' + expires + ';domain=.' + domain_name + ';path=/';
    },

    /*
     * Получения куков браузера пользователя
     * @param {string} cname - свойство
     * @return {string}
     */
    get: cname => {
        const name = cname + '=';
        const ca = document.cookie.split(';');
        for (let i = 0; i < ca.length; i++) {
            let c = ca[i];
            while (c.charAt(0) === ' ') {
                c = c.substring(1);
            }
            if (c.indexOf(name) === 0) {
                return c.substring(name.length, c.length);
            }
        }
        return '';
    },

};
