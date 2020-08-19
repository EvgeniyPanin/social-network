"use strict";
import "./pages/index.css";
import {Api} from "./script/Api";
import {Card} from "./script/Card";
import {CardList} from "./script/CardList";
import {FormValidator} from "./script/FormValidator";
import {Popup} from "./script/Popup";
import {PopupHasForm} from "./script/PopupHasForm";
import {UserInfo} from "./script/UserInfo";

const url = NODE_ENV === 'development' ? 'https://nomoreparties.co' : 'https://nomoreparties.co';
const apiConfig = {
  cohort: 'cohort11',
  token: '51432599-1180-4874-9f6d-b347abfbe18a',
  apiURL: url,
  pathUser: 'users/me',
  pathCards: 'cards',
  pathAvatar: 'users/me/avatar',
  pathLike: 'cards/like',
};
const errorMessages = {
  textErrorLength: 'Должно быть от 2 до 30 символов',
  textErrorEmptyString: 'Это обязательное поле',
  textErrorURL: 'Здесь должна быть ссылка',
};
const cardTemplate = document.querySelector('#card-template').content.querySelector('.place-card');

const buttonLoadHeader = 'Загрузка...'
const container = document.querySelector('.places-list');
const addButton = document.querySelector('.user-info__button');
const editButton = document.querySelector('.user-info__edit');
const userName = document.querySelector('.user-info__name');
const aboutUser = document.querySelector('.user-info__job');
const userAvatar = document.querySelector('.user-info__photo');


const createCardObj = (obj) => new Card(obj).create();

const api = new Api(apiConfig);

const editFormManager = new FormValidator(document.querySelector('#edit-form'), errorMessages);
const addPlaceFormManager = new FormValidator(document.querySelector('#add-form'), errorMessages);
const editAvatarFormManager = new FormValidator(document.querySelector('#avatar-form'), errorMessages);

// получаем очищающие формы функции которые вернут установщики слушателей
const cleanEditForm = editFormManager.setEventListeners();
const cleanAddForm = addPlaceFormManager.setEventListeners();
const cleanAvatarForm = editAvatarFormManager.setEventListeners();

const popupEditProfile = new PopupHasForm(document.querySelector('#edit-popup'), cleanEditForm, buttonLoadHeader);
const popupAddPlace = new PopupHasForm(document.querySelector('#new-popup'), cleanAddForm, buttonLoadHeader);
const popupUserAvatar = new PopupHasForm(document.querySelector('#edit-image-popup'), cleanAvatarForm, buttonLoadHeader);
const popupImage = new Popup(document.querySelector('#image-popup'));
const userObj = new UserInfo(userName, aboutUser, userAvatar);
const cardsContainer = new CardList(container);

api.getUserInfo()
  .then((res) => {
    userObj.setUserInfo(res);
    userObj.updateUserInfo();
    userObj.userID = res._id;
  })
  .catch((err) => api.showAlert(err.message));

api.getCards()
  .then((res) => {
    const itemsArr = [];
    res.forEach(elem => {
      const card = createCardObj({
        'elem': elem,
        'renderContantPopup': popupImage,
        'requestCreater': api,
        'userID': userObj.userID,
        'cardTemplate': cardTemplate,
      });
      itemsArr.push(card);
    })
    cardsContainer.render(itemsArr);
  })
  .catch((err) => api.showAlert(err.message));

editButton.addEventListener('click', (evt) => {
  popupEditProfile.open();

  const userData = userObj.getUserInfo();
  const { name, about } = popupEditProfile.form.elements;
  name.value = userData.name;
  about.value = userData.about;

  const valid = editFormManager.checkFormValidity(popupEditProfile.form);
  editFormManager.setSubmitButtonState(valid);
});
addButton.addEventListener('click', (evt) => {
  popupAddPlace.open(evt);

  const valid = addPlaceFormManager.checkFormValidity(popupAddPlace.form);
  addPlaceFormManager.setSubmitButtonState(valid);
});
userAvatar.addEventListener('click', (evt) => {
  popupUserAvatar.open();

  const valid = editAvatarFormManager.checkFormValidity(popupUserAvatar.form);
  editAvatarFormManager.setSubmitButtonState(valid);
});

popupEditProfile.form.addEventListener('submit', (evt) => {
  evt.preventDefault();

  const { name, about } = popupEditProfile.form.elements;

  api.updateUserInfo({ name: name.value, about: about.value })
    .then((res) => {
      userObj.setUserInfo(res);
      userObj.updateUserInfo();
      popupEditProfile.close();
      popupEditProfile.setButtonHeader(popupEditProfile.buttonHeaderDefault);
    })
    .catch((err) => api.showAlert(err.message));

  popupEditProfile.setButtonHeader(popupEditProfile.buttonLoadHeader);
})
popupAddPlace.form.addEventListener('submit', (evt) => {
  evt.preventDefault();

  const { name, link } = popupAddPlace.form.elements;

  api.postNewCard({ link: link.value, name: name.value, })
    .then((elem) => {
      const card = createCardObj({
        'elem': elem,
        'renderContantPopup': popupImage,
        'requestCreater': api,
        'userID': userObj.userID,
        'cardTemplate': cardTemplate,
      });
      cardsContainer.addCard(card);
      popupAddPlace.close();
      popupAddPlace.formButton.style.fontSize = '36px';
      popupAddPlace.setButtonHeader(popupAddPlace.buttonHeaderDefault);
    })
    .catch((err) => api.showAlert(err.message));

  popupAddPlace.formButton.style.fontSize = '18px';
  popupAddPlace.setButtonHeader(popupAddPlace.buttonLoadHeader);
})
popupUserAvatar.form.addEventListener('submit', (evt) => {
  evt.preventDefault();

  const { link, } = popupUserAvatar.form.elements;

  api.updateUserAvatar({ avatar: link.value })
    .then((res) => {
      userObj.setUserInfo(res);
      userObj.updateUserInfo();
      popupUserAvatar.close();
      popupUserAvatar.setButtonHeader(popupUserAvatar.buttonHeaderDefault);
    })
    .catch((err) => api.showAlert(err.message));

  popupUserAvatar.setButtonHeader(popupUserAvatar.buttonLoadHeader);
})

