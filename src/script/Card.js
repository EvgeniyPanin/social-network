'use strict';

export class Card {
  constructor(obj) {
    this.isLike = null;
    this.template = obj.cardTemplate;
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
    this.api.toggleLike(this.isLike, this._id)
      .then((res) => {
        this.likesArr = res.likes;
        evt.target.classList.toggle('place-card__like-icon_liked');
        this.renderLikesCounter();
      })
      .catch((err) => this.api.showAlert(err.message))
  };

  remove = (evt) => {
    this.api.deleteCard(this._id)
      .then((res) => {
        this.removeEventListeners();
        this.card.remove();
      })
      .catch((err) => this.api.showAlert(err.message))
  };

  create() {
    this.card = this.template.cloneNode(true);
    const cardName = this.card.querySelector('.place-card__name');
    const cardImage = this.card.querySelector('.place-card__image');

    cardName.textContent = this.name;
    cardImage.style = `background-image: url(${this.link})`;

    cardImage.dataset.src = this.link;

    this.likeIkon = this.card.querySelector('.place-card__like-icon');
    this.deleteButton = this.card.querySelector('.place-card__delete-icon');
    this.cardImage = this.card.querySelector('.place-card__image');
    this.likesCounterElem = this.card.querySelector('.place-card__like-counter');
    if (this.isMyCard()) this.deleteButton.classList.add('place-card__delete-icon_active');
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