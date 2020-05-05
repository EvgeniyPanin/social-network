const cardsContainer = document.querySelector('.places-list');
const formAddPlace = document.querySelector('.popup');
const addButton = document.querySelector('.user-info__button');
const popupClose = document.querySelector('.popup__close');
const form = document.forms.new;
const template = document.querySelector('#card-template').content.querySelector('.place-card');

function createCard() {
  const newCard = template.cloneNode(true);
  return newCard;
}

function addDataCard(newCard, cardName, imageLink) {
  newCard.querySelector('.place-card__image').style = `background-image: url(${imageLink})`;
  newCard.querySelector('.place-card__name').textContent = cardName;
  return newCard;
}

function addCard(name, link) {
  const cardItem = createCard();
  const doneCard = addDataCard(cardItem, name, link);
  cardsContainer.appendChild(doneCard);
}

function renderCard(item) {
  addCard(item.name, item.link);
}

initialCards.forEach(renderCard);


function contentManagement(event) {
  if (event.target.classList.contains('place-card__like-icon')) {
    event.target.classList.toggle('place-card__like-icon_liked');
  }
  if (event.target.classList.contains('place-card__delete-icon')) {
    let card = event.target.closest('.place-card');
    cardsContainer.removeChild(card);
  }
}

cardsContainer.addEventListener('click', contentManagement)


function openedPopup() {
  formAddPlace.classList.add('popup_is-opened');
}

addButton.addEventListener('click', openedPopup);

function clsedPopup() {
  formAddPlace.classList.remove('popup_is-opened');
}

popupClose.addEventListener('click', clsedPopup);

function formAddCard(event) {
  event.preventDefault();
  const form = document.forms.new;
  const {name : formName, link : formLink} = form.elements;
  
  addCard(formName.value, formLink.value);
  
  form.reset();
  formAddPlace.classList.remove('popup_is-opened');
}

form.addEventListener('submit', formAddCard);

