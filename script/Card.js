'use strict';

class Card {
    static _cardTemplate = document.querySelector('#card-template').content.querySelector('.place-card');
    constructor(name, link) {
        this.name = name;
        this.link = link;
    }

    like(evt) {
        evt.target.classList.toggle('place-card__like-icon_liked');
    }

    remove(evt) {
        evt.stopPropagation();
        const card = evt.target.closest('.place-card');

        card.querySelector('.place-card__like-icon').removeEventListener('click', this.like);
        card.querySelector('.place-card__image').removeEventListener('click',  this.openPopup);
        card.querySelector('.place-card__delete-icon').removeEventListener('click', this.removeBind);

        cardsContainer.container.removeChild(card);
    }

    create() {
        this.card = Card._cardTemplate.cloneNode(true);
        this.removeBind = this.remove.bind(this);
        this.openPopup = popupImage.open.bind(popupImage);
        const cardName = this.card.querySelector('.place-card__name');
        const cardImage = this.card.querySelector('.place-card__image');

        cardName.textContent = this.name;
        cardImage.style = `background-image: url(${this.link})`;

        cardImage.dataset.src = this.link;
        
        this.card.querySelector('.place-card__like-icon').addEventListener('click', this.like);
        this.card.querySelector('.place-card__delete-icon').addEventListener('click', this.removeBind);
        this.card.querySelector('.place-card__image').addEventListener('click', this.openPopup);

        return this.card;
    }
}