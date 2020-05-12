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
const formAddPlace = document.forms.new;
const inputsAddCard = Array.from(formAddPlace.querySelectorAll('input'));
const buttonSubmitAddForm = formAddPlace.querySelector('button');
const formEditProfile = document.forms.edit;
const inputsEditCard = Array.from(formEditProfile.querySelectorAll('input'));
const buttonSubmitEditForm = formEditProfile.querySelector('button');
const template = document.querySelector('#card-template').content.querySelector('.place-card');
const errorMessage = {
  textErrorLength: 'Должно быть от 2 до 30 символов',
  textErrorEmptyString: 'Это обязательное поле',
  textErrorURL: 'Здесь должна быть ссылка',
}
const errorsObj = {};
inputsAddCard.concat(inputsEditCard).forEach(input => {
  errorsObj[input.id] = document.querySelector(`#${input.id}-error`);
})

// создает пустую карточку места
function createCard() {
  const newCard = template.cloneNode(true);
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
function isFieldValidity(field) {
  const valid = isValidity(field);
  let errorElem = errorsObj[field.id];

  // Надо исправить +
  // Цикл не нужен
  // Обратитесь к  errorItemsArr[`${field.id}-error`] -- нет нужды в его поиске

  // Все еще надо исправить
  // У вас тут так все устроено что это всегода поле на котором событие, это условие всегда истинно
  // У вас загораются на форме карточки два поля сразу потому что они пустые а обработчик на форме
  // Если переделать часть кода и вешать обработчики отдельно на инпуты, то можно этого избежать,
  // но я не думаю что вы сильно хотите сейчас половину работы переписать.
  // Если вешать на инпуты слущатели, то обработчик проверяет валидность инпута, всю вот эту логику шпарит,
  // а потом вызывает отдельный метод который валидирует всю форму и по результатам кнопку вкл/выкл.
  // Такая идея, просто для информации, может в следующем спринте захотите рефакторинг сотворить.

  // Так как сейчас нельзя потому что event глобальный, глобальные переменные трогать не очень хорошо
  // Но про это на 8-й работе.

  // Это лишнее условие    ------   Условие позволяет выставлять ошибку валидации только на поле в котором произошло событие
  // 1. Вы event не пердаете, а получаете глобально
  // 2. Событие и так на поле происходит, вы же target передаете в метод, не currentTarget
  if (field === event.target) {
    errorElem.textContent = field.validationMessage;
  }

  return valid;
}

// Проверяет все ли переданные инпуты валидны
function checkFormValidity(inputs) {
  // Можжно лучше
  // Этот метод можно сделать сильно короче
  // return Array.from(inputs).every((input) => isFieldValidity(input));
  return Array.from(inputs).every((input) => isValidity(input));
  /* let valid = true;
  inputs.forEach(input => {
    if (!isFieldValidity(input)) valid = false;
  })

  return valid; */
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

// выводит на страницу переданный попап
function showPopup(popup) {
  popup.classList.add('popup_is-opened');
}

// коллбек, передаваемый слушателям событий клика по элементам, открывающим попапы
function openedPopup(event) {
  const clickElem = event.currentTarget;
  let valid;

  if (clickElem === addButton) {
    valid = checkFormValidity(inputsAddCard);
    toggleButton(buttonSubmitAddForm, valid);
    showPopup(popupAddPlace);
  }

  if (clickElem === editButton) {
    const { name, about: Job } = formEditProfile.elements;

    name.value = userName.textContent;
    Job.value = userJob.textContent;

    valid = checkFormValidity(inputsEditCard);
    toggleButton(buttonSubmitEditForm, valid);
    showPopup(popupEditProfile);
  }

  if (event.target.classList.contains('place-card__image')) {
    const imageItem = event.target.closest('.place-card__image');
    const src = imageItem.dataset.src;

    const image = popupImage.querySelector('.popup__image');

    image.setAttribute('src', src);

    showPopup(popupImage);
  }
}

// Управляет действиями с контентом карточки в зависимости от того, в каком ее месте кликнули
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
    openedPopup(event);
  }
}

// слушаем событие клика по контейнеру с карточками
cardsContainer.addEventListener('click', contentManagement);


addButton.addEventListener('click', openedPopup);
editButton.addEventListener('click', openedPopup);


// Удаляет все сообщения о ошибках под полями формы
function resetErrorsForm(form) {
  const formErrors = form.querySelectorAll('.error-message');

  form.reset();

  [...formErrors].forEach(errors => errors.textContent = '');
}

// закрывает попапы, у попапов с формами вызывает f() сброса полей перед закрытием
function closedPopup(event) {
  const popup = event.target.closest('.popup');
  const form = popup.querySelector('.popup__form');

  if (popup.id === 'image-popup') {
    popup.classList.remove('popup_is-opened');
    return;
  }
  resetErrorsForm(form);
  popup.classList.remove('popup_is-opened');
}

// Проходим по всем закрывающим кнопкам и вешаем на них слушатель клика
popupCloseButtons.forEach(closeButton => { closeButton.addEventListener('click', closedPopup) });


// Коллбэк обработчика клика по кнопке сабмит формы добавить новое место
function formAddCard(event) {
  event.preventDefault();
  const form = event.currentTarget;
  const { name: formName, link: formLink } = form.elements;

  addCard(formName.value, formLink.value);
  closedPopup(event);
}

formAddPlace.addEventListener('submit', formAddCard);


//Коллбэк обработчика клика по кнопке сабмит формы редактирования профиля
function editUserData(event) {
  event.preventDefault();

  const form = event.currentTarget;
  const { name: Name, about: Job } = form.elements;

  userName.textContent = Name.value;
  userJob.textContent = Job.value;

  closedPopup(event);
}

formEditProfile.addEventListener('submit', editUserData);

// Коллбэк слушателя события ввода на формах,

// Надо исправить
// event не используется, не надо ни передавать ни принимать его
function handlerInputForm(event, inputs, submitButton) {
  // console.dir(errorItemsObj);
  // выводит сообщения под полем в котором идет ввод и записывает в valid валидна ли форма
  const valid = checkFormValidity(inputs);
  if (valid) {
    toggleButton(submitButton, true);
  } else {
    toggleButton(submitButton, false);
  }
}

// проставляет прослушивание событий на формах
function setEventListeners(popup) {
  const form = popup.querySelector('.popup__form');
  const inputs = Array.from(popup.querySelectorAll('input'));
  const submitButton = popup.querySelector('button');
  // event передавать не нужно!!
  // Надо исправить
  form.addEventListener('input', () => handlerInputForm(event, inputs, submitButton));
}

setEventListeners(popupEditProfile);
setEventListeners(popupAddPlace);


// Здравствуйте.

// Есть еще несколько замечаний, но мы почти у цели. Исправляте и присылайте.