/* eslint-disable no-console */
import Vue from 'vue';
import {
    getConfig, defineKey, isCompatible,
} from '../config';
import AppContent from '../components/PushNotificationsWindow.vue';
import {store} from '../store';
import * as types from '../types';
import Subscription from './subscription';
import MessageListener from './message_listener';

export default class Site {
    /**
     * Запуск приложения
     * @return {Promise}
     */
    static run() {
        // уведомляем родительское окно о закрытии
        window.onbeforeunload = () => {
            MessageListener.post('closed');
        };

        return new Promise((resolve, reject) => {
            if (!isCompatible()) {
                return reject(new Error('Notifications not supported by browser'));
            }
            resolve();
        })
            .then(() => defineKey())
            .then(() => Site.window(getConfig(), Site.getAction()))
            .then(() => {
                if (Site.getAction() === 'subscribe') {
                    return Promise.all([Subscription.register(), Subscription.check()]);
                }
            });
    }

    static getAction() {
        return Notification.permission === 'denied' ? 'blocked' : 'subscribe';
    }

    /*
     * Отображаем страницу с сообщением текущего действия
     * @param {object} config - конфигурация
     * @param {string} action - действие на форме, определяющее её поведение
     */
    static window(config, action) {
        store.commit(types.SET_CONFIG, config);
        store.commit(types.SET_SITE_ACTION, action);

        Vue.component('pushfree', AppContent);
        new Vue({
            el: '#pushfree',
            store,
        });
    }
}
