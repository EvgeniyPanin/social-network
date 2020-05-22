"use strict";

const container = document.querySelector('.places-list');
const addButton = document.querySelector('.user-info__button');
const editButton = document.querySelector('.user-info__edit');

const popupEditProfile = new Popup(document.querySelector('#edit-popup'));
const popupAddPlace = new Popup(document.querySelector('#new-popup'));
const popupImage = new Popup(document.querySelector('#image-popup'));
const userObj = new UserInfo();
const errorMessage = {
  textErrorLength: 'Должно быть от 2 до 30 символов',
  textErrorEmptyString: 'Это обязательное поле',
  textErrorURL: 'Здесь должна быть ссылка',
};

function createCardObj(cardName, cardLink) {
  const card = new Card(cardName, cardLink);
  return card;
}

const cardsContainer = new CardList(container, initialCards);
cardsContainer.render();

const editFormManager = new FormValidator(popupEditProfile.form);
const addPlaceFormManager = new FormValidator(popupAddPlace.form);

const cleanEditForm = editFormManager.setEventListeners();
const cleanAddForm = addPlaceFormManager.setEventListeners();

editButton.addEventListener('click', (evt) => {
  userObj.setUserInfo(popupEditProfile.form);
  // editFormManager.setSubmitButtonState(popupEditProfile.form.checkValidity());
  popupEditProfile.open(evt);
});
addButton.addEventListener('click', (evt) => {
  addPlaceFormManager.setSubmitButtonState(popupAddPlace.form.checkValidity());
  popupAddPlace.open(evt);
});

popupEditProfile.form.addEventListener('submit', (evt) => {
  evt.preventDefault();

  const {name, about} = popupEditProfile.form.elements;

  userObj.updateUserInfo(name.value, about.value);
  popupEditProfile.close();
  cleanEditForm();
})

popupAddPlace.form.addEventListener('submit', (evt) => {
  evt.preventDefault();

  const {name, link} = popupAddPlace.form.elements;
  const card = createCardObj(name, link);

  cardsContainer.addCard(card.create());

  popupAddPlace.close();
  cleanAddForm();
})
