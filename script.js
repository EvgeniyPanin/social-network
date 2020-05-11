// Можно лучше
// Используйте строгий режим -- позволит найти все невено объявленные переменные +
// https://learn.javascript.ru/strict-mode
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
const inputsAddCard = formAddPlace.querySelectorAll('input');
const buttonSubmitAddForm = formAddPlace.querySelector('button');
const formEditProfile = document.forms.edit;
const inputsEditCard = formEditProfile.querySelectorAll('input');
const buttonSubmitEditForm = formEditProfile.querySelector('button');
const template = document.querySelector('#card-template').content.querySelector('.place-card');
const errorMessage = {
  textErrorLength: 'Должно быть от 2 до 30 символов',
  textErrorEmptyString: 'Это обязательное поле',
  textErrorURL: 'Здесь должна быть ссылка',
}


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
  // Это лишнее условие    ------   Условие позволяет выставлять ошибку валидации только на поле в котором произошло событие
  // 1. Вы event не пердаете, а получаете глобально
  // 2. Событие и так на поле происходит, вы же target передаете в метод, не currentTarget
  if (field === event.target) {
    const errorElem = field.parentNode.querySelector(`#${field.id}-error`);
    errorElem.textContent = field.validationMessage;
  }

  return valid;
}

// Проверяет все ли переданные инпуты валидны
function checkFormValidity(inputs) {
  let valid = true;

  inputs.forEach(input => {
    if (!isFieldValidity(input)) valid = false;
  })

  return valid;
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
    // Посоветую так -- лучше если кнопка будет при открытии всегда заблокирована +
    // При таком подходе исключено случайное нажатие и повторная отправка неизмененных данных на сервер (лишняя операция)
    // Надо исправить +
    // Вы передаете все элементы, по которым потом прогоняете валидацию
    // А надо только инпуты
    // Соответственно, логично заранее (не в этом методе) выбрать инпуты обеих форм в разные массивы,
    // как и кнопки сабмита, и тут уже просто скармливать их методу.
    // Исправьте для обоих форм
    // Возможно тут вообще не потребуются исправления а метод будет изменен вами,
    // прочитайте все ревью до конца, особенно комментарий в методе установки слушателей валидации
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
    // Надо исправить +
    // Не надо вырезать URL картинки сложным парсингом
    // Добавьте data-атрибут, сылку я давал
    // Завтра дизайнер кавычки лишние поставит или пробел не там и сломается ваш парсинг
    
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
    // После return не нужен else +
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
function handlerInputForm(event, inputs, submitButton) {

  // выводит сообщения под полем в котором идет ввод и записывает в valid валидна ли форма
  const valid = checkFormValidity(inputs);

  // У функции должно быть одно назначение. toggleButton должна получить true/false как флаг +
  // включения-отключения и элемент кнопки
  // Проверку валидности из toggleButton лучше сюда перенести, это логичнее, тем самым +
  // вы сможете включать-выключать кнопку когда захотите не перебирая инпуты и прочее и не делая
  // массу ненужных запросов в DOM

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

  // Надо исправить
  // Здесь получите массив инпутов формы, кнопку сабмита, +
  // можно даже создать объект с элементами ошибок, где ключом будет id элемента
  // И все эти данне передайте в handlerInputForm + 
  // Тем самым вам не придется многократно получать эти элементы в последствии и нагружать DOM

  form.addEventListener('input', () => handlerInputForm(event, inputs, submitButton));
}

setEventListeners(popupEditProfile);
setEventListeners(popupAddPlace);


// Здравствуйте.

// Нужен рефакторинг, рекомендации в коде. Стало лучше чем было в прошлый раз, но можно сделать еще проще и чище.

// При создании карточки добавьте атрибут с url элементу карточки, а когда будет необходимо +
// -- прочитаете его. Как это сделать https://developer.mozilla.org/ru/docs/Web/HTML/Global_attributes/data-*
// Надо исправить






