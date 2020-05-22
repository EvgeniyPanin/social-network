'use strict';

class Popup {
    constructor(popup) {
        this.popup = popup;
        this.closeButton = popup.querySelector('.popup__close');
        this.form = popup.querySelector('.popup__form');
        this.closeButton.addEventListener('click', this.close.bind(this));
    }

    open(evt) {
        const clickedElem = evt.target;

        switch (clickedElem.id) {
            case 'card-image':
                const src = clickedElem.dataset.src;
                const image = this.popup.querySelector('.popup__image');
                image.setAttribute('src', src);
        }

        this.popup.classList.add('popup_is-opened');
    }

    close() {
        this.popup.classList.remove('popup_is-opened');
    }
}
