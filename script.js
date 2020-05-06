
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
    const submitButton = formEditProfile.querySelector('.popup__button');
    const {name, about : Job} = formEditProfile.elements;

    toggleEnabledDisabled(name, Job, submitButton, 'popup__button_disabled');
    popupEditProfile.classList.add('popup_is-opened');

    name.value = userName.textContent;
    Job.value = userJob.textContent;

    toggleEnabledDisabled(name, Job, submitButton, 'popup__button_disabled');
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
  const buttonForm = form.querySelector('.popup__button');
  
  addCard(formName.value, formLink.value);
  
  form.reset();
  buttonForm.setAttribute('disabled', true);
  buttonForm.classList.add('popup__button_disabled');

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

function elemDisabled(elem, toggleClass) {
  elem.setAttribute('disabled', true);
  elem.classList.add(toggleClass);
}

function elemEnabled(elem, toggleClass) {
  elem.removeAttribute('disabled');
  elem.classList.remove(toggleClass);
}

function toggleEnabledDisabled(input1, input2, toggleElem, toggleClass) {
  if ((input1.value.length === 0) || (input2.value.length === 0)) {
    elemDisabled(toggleElem, toggleClass);
  } else {
    elemEnabled(toggleElem, toggleClass);
  }
}

function submitButtonToggle(event) {
  const form = event.currentTarget;
  const submitButton = form.querySelector('.popup__button');

  switch (form) {
    case formAddPlace:
      const {name : nameMesto, link} = form.elements;
      
      toggleEnabledDisabled(nameMesto, link, submitButton, 'popup__button_disabled');
      break;

    case formEditProfile:
      const {name : nameUser, about} = form.elements;

      toggleEnabledDisabled(nameUser, about, submitButton, 'popup__button_disabled');
      break;
  }
}

formAddPlace.addEventListener('input', submitButtonToggle);
formEditProfile.addEventListener('input', submitButtonToggle);


