"use strict";

const cardsContainer = document.querySelector('.places-list');
const popupAddPlace = document.querySelector('#new-popup');
const popupEditProfile = document.querySelector('#edit-popup');
const popupImage = document.querySelector('#image-popup');
const addButton = document.querySelector('.user-info__button');
const editButton = document.querySelector('.user-info__edit');
const popupCloseButtons = document.querySelectorAll('.popup__close');
const userName = document.querySelector('.user-info__name');
const userJob = document.querySelector('.user-info__job');
const formEditProfile = document.forms.edit;
const formAddPlace = document.forms.new;
const inputsAddCard = Array.from(formAddPlace.querySelectorAll('input'));
const buttonSubmitAddForm = formAddPlace.querySelector('button');
const inputsEditCard = Array.from(formEditProfile.querySelectorAll('input'));
const buttonSubmitEditForm = formEditProfile.querySelector('button');
const cardTemplate = document.querySelector('#card-template').content.querySelector('.place-card');
const errorMessage = {
  textErrorLength: 'Должно быть от 2 до 30 символов',
  textErrorEmptyString: 'Это обязательное поле',
  textErrorURL: 'Здесь должна быть ссылка',
}

// создает пустую карточку места
function createCard() {
  const newCard = cardTemplate.cloneNode(true);
  return newCard;
}

// добавляет данные в карточку
function addDataCard(newCard, cardName, imageLink) {
  const image = newCard.querySelector('.place-card__image');
  image.style = `background-image: url(${imageLink})`;
  image.dataset.src = imageLink;
  newCard.querySelector('.place-card__name').textContent = cardName;
  return newCard;
}

// добавляет готовую карточку с данными в разметку
function addCard(name, link) {
  const cardItem = createCard();
  const doneCard = addDataCard(cardItem, name, link);
  cardsContainer.appendChild(doneCard);
}

// рендерим исходные карточки из массива данных
initialCards.forEach(place => {
  addCard(place.name, place.link)
});

// выводит на страницу переданный попап
function showPopup(popup) {
  popup.classList.add('popup_is-opened');
}

// переключает состояние кнопки и открывает попап
function openedPopup(popup) {
  const submitButton = popup.querySelector('button');
  const form = popup.querySelector('.popup__form');
  const valid = checkFormValidity(form);

  toggleButton(submitButton, valid);
  showPopup(popup);
}

// Управляет действиями с контентом карточки в зависимости от того, в каком ее месте кликнули
function contentManagement(evt) {
  const clickedElem = evt.target;
  const card = clickedElem.closest('.place-card');

  switch (clickedElem.id) {
    case 'card-like':
      clickedElem.classList.toggle('place-card__like-icon_liked');
      break;

    case 'card-delete':
      cardsContainer.removeChild(card);
      break;

    case 'card-image':
      const imageItem = evt.target.closest('.place-card__image');
      const src = imageItem.dataset.src;
      const image = popupImage.querySelector('.popup__image');

      image.setAttribute('src', src);

      showPopup(popupImage);
      break;
  }
}

// Функция валидирующая поле, и устанавливающая кастомную ошибку валидации
function isValidity(field) {
  field.setCustomValidity("");

  if (field.validity.valueMissing) {
    field.setCustomValidity(errorMessage.textErrorEmptyString);
    return false
  }

  if (field.validity.tooShort || field.validity.tooLong) {
    field.setCustomValidity(errorMessage.textErrorLength);
    return false
  }

  if (field.validity.typeMismatch && field.type === 'url') {
    field.setCustomValidity(errorMessage.textErrorURL);
    return false
  }

  return field.checkValidity();
}

// Добавляет текст ошибки под полем, в котором происходит событие ввода, если оно не валидно
function toggleInputError(field, errorsObj) {
  const errorElem = errorsObj[field.id];

  // Обновляем кастомную ошибку валидации поля
  isValidity(field);

  errorElem.textContent = field.validationMessage;
}

// Проверяет все ли переданные инпуты валидны
function checkFormValidity(form) {
  const inputs = Array.from(form.querySelectorAll('input'));

  return inputs.every((input) => isValidity(input));
}

// выставляет кнопку в Enbld/Dsbld в зависимости от того true или false принятое значение state
function toggleButton(submitButton, state) {
  if (state) {
    submitButton.removeAttribute('disabled');
    submitButton.classList.remove('popup__button_disabled');
  } else {
    submitButton.setAttribute('disabled', true);
    submitButton.classList.add('popup__button_disabled');
  }
}

// Коллбэк слушателя события ввода на инпутах форм
function handlerInputForm(evt, form, submitButton, errorsObj) {
  const valid = checkFormValidity(form);
  toggleInputError(evt.target, errorsObj);

  if (valid) {
    toggleButton(submitButton, true);
  } else {
    toggleButton(submitButton, false);
  }
}

// проставляет прослушивание событий на инпутах попапа
function setEventListeners(popup) {
  const form = popup.querySelector('.popup__form');
  const inputs = Array.from(popup.querySelectorAll('input'));
  const submitButton = popup.querySelector('button');
  const errorsObj = {};
  inputs.forEach(input => {
    errorsObj[input.id] = document.querySelector(`#${input.id}-error`);
  })

  inputs.forEach(input => {
    input.addEventListener('input', (evt) => handlerInputForm(evt, form, submitButton, errorsObj));
  })

  const cleanErrors = () => {
    for (let key in errorsObj) {
      form.reset();
      errorsObj[key].textContent = '';
    }
  }
  return cleanErrors;
}

const cleanEditForm = setEventListeners(popupEditProfile);
const cleanAddForm = setEventListeners(popupAddPlace);

// закрывает попапы, у попапов с формами вызывает f() сброса полей перед закрытием
function closedPopup(evt) {
  const popup = event.target.closest('.popup');

  switch (popup.id) {
    case 'new-popup':
      cleanAddForm();
      break;

    case 'edit-popup':
      cleanEditForm();
      break;
  }
  popup.classList.remove('popup_is-opened');
}

// Проходим по всем закрывающим кнопкам и вешаем на них слушатель клика
popupCloseButtons.forEach(closeButton => { closeButton.addEventListener('click', closedPopup) });

// слушаем событие клика по контейнеру с карточками
cardsContainer.addEventListener('click', contentManagement);

// проставляем слушатели на кнопки открытия попапов
addButton.addEventListener('click', (evt) => {
  openedPopup(popupAddPlace);
});
editButton.addEventListener('click', (evt) => {
  const { name, about: Job } = formEditProfile.elements;

  name.value = userName.textContent;
  Job.value = userJob.textContent;

  openedPopup(popupEditProfile);
});

// слушатель события сабмит формы добавления карточки
formAddPlace.addEventListener('submit', (evt) => {
  evt.preventDefault();
  const form = evt.currentTarget;
  const { name: formName, link: formLink } = form.elements;

  addCard(formName.value, formLink.value);
  closedPopup(evt);
});

// слушатель события сабмит формы редактирования профиля
formEditProfile.addEventListener('submit', (evt) => {
  evt.preventDefault();

  const form = evt.currentTarget;
  const { name: Name, about: Job } = form.elements;

  userName.textContent = Name.value;
  userJob.textContent = Job.value;

  closedPopup(evt);
});

