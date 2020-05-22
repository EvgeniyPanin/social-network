'use strict';

class Popup {
    constructor(popup) {
        this.popup = popup;
        this.closeButton = popup.querySelector('.popup__close');
        this.form = popup.querySelector('.popup__form');
    }

    open() {
        this.popup.classList.add('popup_is-opened');
    }

    close() {
        this.popup.classList.remove('popup_is-opened');
    }
}
