'use strict';

class PopupHasForm extends Popup {
    constructor(popup, buttonLoadHeader) {
        super(popup);
        this.form = popup.querySelector('.popup__form');
        this.formButton = this.form.querySelector('button');
        this.buttonLoadHeader = buttonLoadHeader;
        this.buttonHeaderDefault = this.formButton.textContent;
    }

    setButtonHeader(message) {
        this.formButton.textContent = message;
    }
}