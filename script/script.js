"use strict";

const container = document.querySelector('.places-list');
const addButton = document.querySelector('.user-info__button');
const editButton = document.querySelector('.user-info__edit');
const createCardObj = (...args) => new Card(...args);

const popupEditProfile = new PopupHasForm(document.querySelector('#edit-popup'));
const popupAddPlace = new PopupHasForm(document.querySelector('#new-popup'));
const popupImage = new Popup(document.querySelector('#image-popup'));

const userObj = new UserInfo();

const cardsContainer = new CardList(container, initialCards, createCardObj);
cardsContainer.render(popupImage);

const editFormManager = new FormValidator(popupEditProfile.form);
const addPlaceFormManager = new FormValidator(popupAddPlace.form);

const cleanEditForm = editFormManager.setEventListeners();
const cleanAddForm = addPlaceFormManager.setEventListeners();

editButton.addEventListener('click', (evt) => {
  userObj.setUserInfo(popupEditProfile.form);

  const valid = editFormManager.checkFormValidity(popupEditProfile.form);
  editFormManager.setSubmitButtonState(valid);

  popupEditProfile.open(evt);
});
addButton.addEventListener('click', (evt) => {
  const valid = addPlaceFormManager.checkFormValidity(popupAddPlace.form);
  addPlaceFormManager.setSubmitButtonState(valid);

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
  const card = createCardObj(name.value, link.value, popupImage);

  cardsContainer.addCard(card.create());

  popupAddPlace.close();
  cleanAddForm();
})

popupEditProfile.setEventListenerClose(cleanEditForm);
popupAddPlace.setEventListenerClose(cleanAddForm);
popupImage.setEventListenerClose();