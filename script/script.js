"use strict";

const cohort = 'cohort11';
const token = '51432599-1180-4874-9f6d-b347abfbe18a';
const apiURL = 'https://praktikum.tk';
const request = new CreateRequest(apiURL, cohort, token);
const buttonLoadHeader = 'Загрузка...'

const container = document.querySelector('.places-list');
const addButton = document.querySelector('.user-info__button');
const editButton = document.querySelector('.user-info__edit');
const userName = document.querySelector('.user-info__name');
const aboutUser = document.querySelector('.user-info__job');
const userAvatar = document.querySelector('.user-info__photo');
const createCardObj = (obj) => new Card(obj).create();

const popupEditProfile = new PopupHasForm(document.querySelector('#edit-popup'), buttonLoadHeader);
const popupAddPlace = new PopupHasForm(document.querySelector('#new-popup'), buttonLoadHeader);
const popupUserAvatar = new PopupHasForm(document.querySelector('#edit-image-popup'), buttonLoadHeader);
const popupImage = new Popup(document.querySelector('#image-popup'), );

const userObj = new UserInfo(userName, aboutUser, userAvatar);
const cardsContainer = new CardList(container, createCardObj);


request.buildRequest({
                      path: 'users/me', 
                      method: 'GET',
                    })
                      .then(res => res.json())
                      .then((res) => {
                        userObj.updateUserInfo(res.name, res.about, res.avatar);
                        userObj.userID = res._id;
                      });

request.buildRequest({path: 'cards', 
                      method: 'GET',
                    })
                      .then(res => res.json())
                      .then((res) => {
                        // console.log(res.forEach((card) => {console.log(card.owner.name)}));
                        res.forEach((elem) => {
                          const card = cardsContainer.buildFunction({'elem': elem, 
                                                                    'renderContantPopup': popupImage,
                                                                    'requestCreater': request,
                                                                    'userID': userObj.userID});
                          cardsContainer.addCard(card);
                          });
                                              
                      });

const editFormManager = new FormValidator(popupEditProfile.form);
const addPlaceFormManager = new FormValidator(popupAddPlace.form);
const editAvatarFormManager = new FormValidator(popupUserAvatar.form);

// записываем в свойства объектов попапов функцию очищающую форму, которую вернет функция устанавливающая слушатели инпутов
popupEditProfile.cleanForm = editFormManager.setEventListeners();
popupAddPlace.cleanForm = addPlaceFormManager.setEventListeners();
popupUserAvatar.cleanForm = editAvatarFormManager.setEventListeners();

editButton.addEventListener('click', (evt) => {
  userObj.setUserInfo(popupEditProfile.form);

  const valid = editFormManager.checkFormValidity(popupEditProfile.form);
  editFormManager.setSubmitButtonState(valid);

  popupEditProfile.setEventListenerClose();

  popupEditProfile.open(evt);
});
addButton.addEventListener('click', (evt) => {
  const valid = addPlaceFormManager.checkFormValidity(popupAddPlace.form);
  addPlaceFormManager.setSubmitButtonState(valid);
  
  popupAddPlace.setEventListenerClose();

  popupAddPlace.open(evt);
});
userAvatar.addEventListener('click', (evt) => {
  const valid = editAvatarFormManager.checkFormValidity(popupUserAvatar.form);
  editAvatarFormManager.setSubmitButtonState(valid);
  
  popupUserAvatar.setEventListenerClose();

  popupUserAvatar.open();
});

popupEditProfile.form.addEventListener('submit', (evt) => {
  evt.preventDefault();

  const {name, about} = popupEditProfile.form.elements;

  request.buildRequest({
                        path: 'users/me', 
                        method:'PATCH',
                        contentType: 'application/json',
                        jsonObj: {
                            name: name.value,
                            about: about.value,
                          }})
                            .then(res => res.json())
                            .then((result) => {
                              userObj.updateUserInfo(result.name, result.about, result.avatar);
                              popupEditProfile.close();
                              popupEditProfile.setButtonHeader(popupEditProfile.buttonHeaderDefault);
                            })
  popupEditProfile.setButtonHeader(popupEditProfile.buttonLoadHeader);
})
popupAddPlace.form.addEventListener('submit', (evt) => {
  evt.preventDefault();

  const {name, link} = popupAddPlace.form.elements;

  request.buildRequest({
                        path: 'cards', 
                        method:'POST',
                        contentType: 'application/json',
                        jsonObj: {
                                  name: name.value,
                                  link: link.value,
                                  },})
                                    .then(res => res.json())
                                    .then((elem) => {
                                      const card = cardsContainer.buildFunction({'elem': elem,
                                                                                  'renderContantPopup': popupImage,
                                                                                  'requestCreater': request,
                                                                                  'userID': userObj.userID});
                                      cardsContainer.addCard(card);
                                      popupAddPlace.close();
                                      popupAddPlace.setButtonHeader(popupAddPlace.buttonHeaderDefault);
                                    })
                                    .catch((err) => console.log(err))
  popupAddPlace.setButtonHeader(popupAddPlace.buttonLoadHeader);
})
popupUserAvatar.form.addEventListener('submit', (evt) => {
  evt.preventDefault();

  const {link,} = popupUserAvatar.form.elements;

  request.buildRequest({
                        path: `users/me/avatar`,
                        method:'PATCH',
                        contentType: 'application/json',
                        jsonObj: {
                            avatar: link.value,
                          }})
                            .then(res => res.json())
                            .then((result) => {
                              userObj.updateUserInfo(result.name, result.about, result.avatar);
                              popupUserAvatar.close();
                              popupUserAvatar.setButtonHeader(popupUserAvatar.buttonHeaderDefault);
                            })
  popupUserAvatar.setButtonHeader(popupUserAvatar.buttonLoadHeader);
})