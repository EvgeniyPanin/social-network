'use strict';

class Card {
    static _cardTemplate = document.querySelector('#card-template').content.querySelector('.place-card');

    constructor(name, link, renderContantPopup) {
        this.name = name;
        this.link = link;
        this.renderContantPopup = renderContantPopup;
    }

    like(evt) {
        evt.target.classList.toggle('place-card__like-icon_liked');
    }

    remove(evt) {
        evt.stopPropagation();
        const card = evt.target.closest('.place-card');

        card.querySelector('.place-card__like-icon').removeEventListener('click', this.like);
        card.querySelector('.place-card__image').removeEventListener('click',  this.handlerOpenContant);
        card.querySelector('.place-card__delete-icon').removeEventListener('click', this.handlerRemove);

        card.remove();
    }

    create() {
        this.card = Card._cardTemplate.cloneNode(true);
        const cardName = this.card.querySelector('.place-card__name');
        const cardImage = this.card.querySelector('.place-card__image');

        cardName.textContent = this.name;
        cardImage.style = `background-image: url(${this.link})`;

        cardImage.dataset.src = this.link;
        
        this.card.querySelector('.place-card__like-icon').addEventListener('click', this.like);
        this.card.querySelector('.place-card__delete-icon').addEventListener('click', this.handlerRemove);
        this.card.querySelector('.place-card__image').addEventListener('click', this.handlerOpenContant);

        return this.card;
    }

    handlerRemove = (evt) => this.remove(evt);
    handlerOpenContant = (evt) => {
        const src = this.card.querySelector('.place-card__image').dataset.src;
        const image = this.renderContantPopup.popup.querySelector('.popup__image');
        image.setAttribute('src', src);
        this.renderContantPopup.open();
    };
}