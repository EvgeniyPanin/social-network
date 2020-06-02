"use strict";

const cohort = 'cohort11';
const token = '51432599-1180-4874-9f6d-b347abfbe18a';
const apiURL = 'https://praktikum.tk';
const request = new CreateRequest(apiURL, cohort, token);

const container = document.querySelector('.places-list');
const addButton = document.querySelector('.user-info__button');
const editButton = document.querySelector('.user-info__edit');
const userName = document.querySelector('.user-info__name');
const aboutUser = document.querySelector('.user-info__job');
const userAvatar = document.querySelector('.user-info__photo');
const createCardObj = (obj) => new Card(obj).create();

const popupEditProfile = new PopupHasForm(document.querySelector('#edit-popup'));
const popupAddPlace = new PopupHasForm(document.querySelector('#new-popup'));
const popupImage = new Popup(document.querySelector('#image-popup'));

const cardsContainer = new CardList(container, createCardObj);
const userObj = new UserInfo(userName, aboutUser, userAvatar);


request.buildRequest({
                      path: 'users/me', 
                      method: 'GET'
                    })
                      .then(res => res.json())
                      .then((res) => {
                        userObj.updateUserInfo(res.name, res.about, res.avatar);
                      });

request.buildRequest({path: 'cards', 
                      method: 'GET'})
                                    .then(res => res.json())
                                    .then((res) => {
                                      // console.log(res.forEach((card) => {console.log(card.owner.name)}));
                                      res.forEach((elem) => {
                                        cardsContainer.render({'elem': elem, 
                                                              'popup': popupImage, 
                                                              'requestCreater': request});
                                                            });
                                    });

const editFormManager = new FormValidator(popupEditProfile.form);
const addPlaceFormManager = new FormValidator(popupAddPlace.form);

// записываем в свойства объектов попапов функцию очищающую форму, которую вернет функция устанавливающая слушатели инпутов
popupEditProfile.cleanForm = editFormManager.setEventListeners();
popupAddPlace.cleanForm = addPlaceFormManager.setEventListeners();

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
                            })
  popupEditProfile.close();
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
                                    .then((res) => {
                                      console.log(res);
                                      const card = cardsContainer.buildFunction(res.name, res.link, popupImage);
                                      cardsContainer.addCard(card);
                                    })
                                    .catch((err) => console.log(err))
  popupAddPlace.close();
})