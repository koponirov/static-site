/* eslint-disable no-console */
import {getConfig} from '../config';
import Cookie from '../helpers/cookie';
// import injector from 'injector';
// import {successAlert} from 'root/js/modules/helpers/alerts';
// import T from 'modules/helpers/dictionary';

export default class Message_listener {

    // системная переменная,
    // хранящая флаг слушателя сообщений от других окон
    static is_listening = false;

    /*
     * Регистрируем слушателя сообщений
     */
    static register() {
        if (Message_listener.is_listening) {
            return;
        }
        Message_listener.is_listening = true;

        if (window.addEventListener) {
            window.addEventListener('message', Message_listener.listener, false);
        } else {
            window.attachEvent('onmessage', Message_listener.listener);
        }
    }

    /*
     * Отправляем сообщение родительскому окну
     * @param {string} message - сообщение
     */
    static post(message) {
        if (window && window.opener) {
            try {
                window.opener.postMessage(message, '*');
            } catch (e) {
                console.error('Error sending message:', e);
            }
        } else {
            console.error('Missing window.opener. Message: ', message);
        }
    }

    /*
     * Получение сообщений от других окон браузера
     * @param {object} event - объект события
     */
    static listener(event) {
        const config = getConfig();
        // разрешаем получение сообщений,
        // только от сайта пуш-уведомлений текущего партера

        if (event.origin !== config.url) {
            return;
        }
        let data_sent = event.data.split('|');
        Cookie.set(data_sent[0], data_sent[1], 9999);

        // if (injector.config.isShowPushFreePopup && event.data === 'pushfree_status|subscribed') {
        //     successAlert(T('lt_popup_success_message'));
        // }

        if (event.data === 'web_push_status|subscribed') {
            alert('lt_popup_success_message');
        }

    }
}
