import {
    defineUrl, getConfig, isIframe, isCompatible,
} from '../config';
import Browser from '../helpers/browser';
import Cookie from '../helpers/cookie';

export default class Integrate {
    /**
     * Запуск приложения
     * @return {Promise}
     */
    static run() {
        return new Promise((resolve, reject) => {
            if (isIframe()) {
                return reject(new Error('The application does not support work in the iframe'));
            }
            if (!isCompatible()) {
                return reject(new Error('Notifications not supported by browser'));
            }
            resolve();
        })
            .then(() => defineUrl())
            .then(() => {
                // проверяем состояние
                if (document.readyState === 'complete') {
                    Integrate.check();
                } else {
                    // откладываем проверку подписки до загрузки всех ресурсов страницы
                    window.addEventListener('load', () => {
                        Integrate.check();
                    });
                }
            });
    }

    /*
     * Проверка подписки
     */
    static check() {
        // получаем информацию браузере
        const browser = Browser.get();
        // разрешаем проверку подписки только для поддерживаемых браузеров

        if (
            (browser === 'chrome' || browser === 'firefox' || browser === 'opera')
            || ('serviceWorker' in navigator && browser)
        ) {
            // проверяем статус подписки
            // любой установленный статус отменяет инициализацию подписки
            if (!Cookie.get('web_push_status')) {
                //  показываем всплывашку предлагающую подписаться на уведомления
                Integrate.box(getConfig());
            }
        }
    }

    /*
     * Отображаем сообщение о подписке
     * @param {object} config - конфигурация
     */
    static box(config) {
        //  в зависимости от браузера открываем новое окно для подписки
        // если safari то встроенный iframe

        const question = 'Подписаться на пуш-уведомления?'

        // Create container element
        const container = document.createElement('div');
        container.style.position = 'absolute';
        container.style.top = '0';
        container.style.left = '0';
        container.style.padding = '10px';
        container.style.backgroundColor = '#ffffff';
        container.style.border = '1px solid #ccc';
        container.style.zIndex = '9999';

        // Create question element
        const questionElement = document.createElement('p');
        questionElement.textContent = question;

        // Create "Yes" button
        const yesButton = document.createElement('button');
        yesButton.textContent = 'Yes';
        yesButton.addEventListener('click', handleYesButtonClick);

        // Create "No" button
        const noButton = document.createElement('button');
        noButton.textContent = 'No';
        noButton.addEventListener('click', handleNoButtonClick);

        // Append elements to container
        container.appendChild(questionElement);
        container.appendChild(yesButton);
        container.appendChild(noButton);

        // Append container to the document body
        document.body.appendChild(container);

        // Function to handle "Yes" button click
        function handleYesButtonClick() {
            console.log('Yes button clicked');
            // Open new window
            window.open('https://example.com', '_blank');
            // Remove the question block
            removeQuestionBlock();
        }

        // Function to handle "No" button click
        function handleNoButtonClick() {
            console.log('No button clicked');
            // Remove the question block
            removeQuestionBlock();
        }

        // Function to remove the question block and event listeners
        function removeQuestionBlock() {
            // Remove event listeners
            yesButton.removeEventListener('click', handleYesButtonClick);
            noButton.removeEventListener('click', handleNoButtonClick);
            // Remove the container from the DOM
            container.remove();
        }
    }
}
