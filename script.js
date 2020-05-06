
const cardsContainer = document.querySelector('.places-list');
const popupAddPlace = document.querySelector('#new-popup');
const popupEditProfile = document.querySelector('#edit-popup');
const popupImage = document.querySelector('#image-popup');
const addButton = document.querySelector('.user-info__button');
const editButton = document.querySelector('.user-info__edit');
const popupClose = document.querySelectorAll('.popup__close');
const userName = document.querySelector('.user-info__name');
const userJob = document.querySelector('.user-info__job');
const formAddPlace = document.forms.new;
const formEditProfile = document.forms.edit;
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

function getSrc(style) {
  src = style.split('"').filter(item => item.includes('http')).reduce((prevVal, item) => prevVal + item, '');
  return src;
}

function openImagePopup(card) {
  const imageItem = card.querySelector('.place-card__image');
  const styleImage = imageItem.getAttribute('style');
  const image = popupImage.querySelector('.popup__image');

  src = getSrc(styleImage);
  
  image.setAttribute('src', src)
  popupImage.classList.add('popup_is-opened');
}


function contentManagement(event) {
  const clickedElem = event.target;
  const card = clickedElem.closest('.place-card');

  if (clickedElem.classList.contains('place-card__like-icon')) {
    clickedElem.classList.toggle('place-card__like-icon_liked');
  }

  if (clickedElem.classList.contains('place-card__delete-icon')) {
    cardsContainer.removeChild(card);
  }

  if (clickedElem.classList.contains('place-card__image')) {

    openImagePopup(card);
  }
}

cardsContainer.addEventListener('click', contentManagement)


function openedPopup(event) {
  const clickElem = event.currentTarget;

  if (clickElem === addButton) {
    popupAddPlace.classList.add('popup_is-opened');
  }

  if (clickElem === addButton) {
    popupAddPlace.classList.add('popup_is-opened');
  }
  
  if (clickElem === editButton) {
    popupEditProfile.classList.add('popup_is-opened');

    const {name : Name, about : Job} = formEditProfile.elements;
    
    Name.value = userName.textContent;
    Job.value = userJob.textContent;
  }
  
}

addButton.addEventListener('click', openedPopup);
editButton.addEventListener('click', openedPopup);

function closedPopup(event) {
  const popup = event.target.closest('.popup');

  popup.classList.remove('popup_is-opened');
}

popupClose.forEach(closeButton => {closeButton.addEventListener('click', closedPopup)});

function formAddCard(event) {
  event.preventDefault();
  const form = event.currentTarget;
  const {name : formName, link : formLink} = form.elements;
  
  addCard(formName.value, formLink.value);
  
  form.reset();
  popupAddPlace.classList.remove('popup_is-opened');
}

formAddPlace.addEventListener('submit', formAddCard);

function editUserData(event) {
  event.preventDefault();

  const form = event.currentTarget;
  const {name : Name, about : Job} = form.elements;

  userName.textContent = Name.value;
  userJob.textContent = Job.value;

  popupEditProfile.classList.remove('popup_is-opened');
}

formEditProfile.addEventListener('submit', editUserData);



