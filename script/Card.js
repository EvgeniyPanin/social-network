'use strict';

class Card {
    static _cardTemplate = document.querySelector('#card-template').content.querySelector('.place-card');

    constructor(obj) {
        this.isLike = null;
        this.elem = obj.elem;
        this.name = obj.elem.name;
        this.link = obj.elem.link;
        this._id = obj.elem._id;
        this.userID = obj.userID;
        this.likesArr = obj.elem.likes;
        this.renderContantPopup = obj.renderContantPopup;
        this.api = obj.requestCreater;
    }

    like = (evt) => {
        this.isLike = !this.isLike;
        const method = (this.isLike) ? 'PUT' : 'DELETE';

        evt.target.classList.toggle('place-card__like-icon_liked');

        this.api.buildRequest({
                                'path': `cards/like/${this._id}`,
                                'method': method,
                                'contentType': 'application/json',
                                })
                                    .then(res => {
                                        if (res.ok) return res.json();
                                        return Promise.reject(`Ошибка: ${res.status} ${res.statusText}`);
                                        })
                                    .then((res) => {
                                        this.likesArr = res.likes;
                                        this.renderLikesCounter();
                                    })
                                    .catch((err) => this.api.showAlert(err))
    };

    remove = (evt) => {
        this.api.buildRequest({
                                path: `cards/${this._id}`,
                                method:'DELETE',
                            })
                                .then(res => {
                                    if (res.ok) return res.json();
                                    return Promise.reject(`Ошибка: ${res.status}`);
                                })
                                .then((res) => {
                                    this.removeEventListeners();
                                    this.card.remove();
                                })
                                .catch((err) => this.api.showAlert(err))
    };

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

        if (this.isMyCard()) this.deleteButton.style.display = 'block';
        if (this.hasMyLike()) this.likeIkon.classList.add('place-card__like-icon_liked');

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

    isMyCard() {
        return this.elem.owner._id === this.userID;
    }

    hasMyLike = () => {
        this.isLike = this.likesArr.some((elem) => elem._id === this.userID);
        return this.isLike;
    }

    handlerDeleteClick = (evt) => {
        evt.stopPropagation();

        const conf = window.confirm('Вы действительно хотите удалить эту карточку?');
        if (conf) this.remove(evt);
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
        this.deleteButton.addEventListener('click', this.handlerDeleteClick);
        this.cardImage.addEventListener('click', this.handlerOpenContant);
    }

    removeEventListeners = () => {
        this.likeIkon.removeEventListener('click', this.like);
        this.deleteButton.removeEventListener('click', this.remove);
        this.cardImage.removeEventListener('click', this.handlerOpenContant);
    }
}