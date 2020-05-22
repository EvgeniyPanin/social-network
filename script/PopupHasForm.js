'use strict';

class PopupHasForm extends Popup {
    constructor(popup) {
        super(popup);
        this.form = popup.querySelector('.popup__form');
    }
}