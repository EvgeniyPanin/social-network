'use strict';

class Card {
    static _cardTemplate = document.querySelector('#card-template').content.querySelector('.place-card');

    constructor(obj) {
        this.name = obj.name;
        this.link = obj.link;
        this.renderContantPopup = obj.renderContantPopup;
        this.likesArr = obj.likesArr;
        this.requestCreater = obj.requestCreater;
    }

    like(evt) {
        evt.target.classList.toggle('place-card__like-icon_liked');
    }

    remove = (evt) => {
        evt.stopPropagation();

        this.removeEventListeners();

        this.card.remove();
    }

    create() {
        this.card = Card._cardTemplate.cloneNode(true);
        const cardName = this.card.querySelector('.place-card__name');
        const cardImage = this.card.querySelector('.place-card__image');

        cardName.textContent = this.name;
        cardImage.style = `background-image: url(${this.link})`;

        cardImage.dataset.src = this.link;
        
        this.likeIkon = this.card.querySelector('.place-card__like-icon');
        this.deleteButton = this.card.querySelector('.place-card__delete-icon');
        this.cardImage = this.card.querySelector('.place-card__image');
        this.likesCounterElem = this.card.querySelector('.place-card__like-counter');

        this.setEventListeners();
        this.renderLikesCounter();

        return this.card;
    }

    renderLikesCounter() {
        if (this.likesArr.length > 0) {
            this.likesCounterElem.textContent = this.likesArr.length;
            return;
        }
        this.likesCounterElem.textContent = '';
    }


    handlerOpenContant = (evt) => {
        const src = this.card.querySelector('.place-card__image').dataset.src;
        const image = this.renderContantPopup.popup.querySelector('.popup__image');

        image.setAttribute('src', src);

        this.renderContantPopup.setEventListenerClose();

        this.renderContantPopup.open();
    };

    setEventListeners = () => {
        this.likeIkon.addEventListener('click', this.like);
        this.deleteButton.addEventListener('click', this.remove);
        this.cardImage.addEventListener('click', this.handlerOpenContant);
    }

    removeEventListeners = () => {
        this.likeIkon.removeEventListener('click', this.like);
        this.deleteButton.removeEventListener('click', this.remove);
        this.cardImage.removeEventListener('click', this.handlerOpenContant);
    }
}