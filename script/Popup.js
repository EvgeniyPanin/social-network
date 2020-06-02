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
        if (this.cleanForm) this.cleanForm();
        this.closeButton.removeEventListener('click', this.handlerCloseListener);
        this.popup.classList.remove('popup_is-opened');
    }

    handlerCloseListener = (evt) => {
        this.close();
    }

    setEventListenerClose() {
        this.closeButton.addEventListener('click', this.handlerCloseListener)
    }
}
