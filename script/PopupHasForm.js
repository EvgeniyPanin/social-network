'use strict';

class PopupHasForm extends Popup {
    constructor(popup, cleanForm, buttonLoadHeader) {
        super(popup);
        this.form = popup.querySelector('.popup__form');
        this.cleanForm = cleanForm;
        this.formButton = this.form.querySelector('button');
        this.buttonLoadHeader = buttonLoadHeader;
        this.buttonHeaderDefault = this.formButton.textContent;
    }


    open() {
        this.cleanForm();
        this.popup.classList.add('popup_is-opened');
      }

    setButtonHeader(message) {
        this.formButton.textContent = message;
    }
}