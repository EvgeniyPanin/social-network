'use strict';

class Popup {
    constructor(popup) {
        this.popup = popup;
        this.closeButton = popup.querySelector('.popup__close');
    }

    open() {
        this.popup.classList.add('popup_is-opened');
    }

    close() {
        this.popup.classList.remove('popup_is-opened');
    }

    setEventListenerClose(cleanFunction) {
        this.closeButton.addEventListener('click', (evt) => {
            if (cleanFunction) cleanFunction();
            this.close();
        })
    }
}
