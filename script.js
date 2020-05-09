// Можно лучше
// Используйте строгий режим -- позволит найти все невено объявленные переменные
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
const formEditProfile = document.forms.edit;
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
  newCard.querySelector('.place-card__image').style = `background-image: url(${imageLink})`;
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

// выводит на страницу переданный попап
function showPopup(popup) {
  popup.classList.add('popup_is-opened');
}


// проверяет все ли поля формы валидны, и в зависимости от результата выставлет состояние кнопки
function toggleButton(InputsArray, submitButton) {
  if (InputsArray.every(isValidity)) {
    setSubmitButton(submitButton, true);
  } else {
    setSubmitButton(submitButton, false);
  }
}

// коллбек, передаваемый слушателям событий клика по элементам, открывающим попапы
function openedPopup(event) {
  const clickElem = event.currentTarget;

  if (clickElem === addButton) {
    const submitButton = formAddPlace.querySelector('.popup__button');

    // переключаем состояние кнопки, в зависимости от того валидна ли форма в момент открытия попапа
    toggleButton([...formAddPlace], submitButton); 
    showPopup(popupAddPlace);
  }

  if (clickElem === editButton) {
    const submitButton = formEditProfile.querySelector('.popup__button');
    const { name, about: Job } = formEditProfile.elements;
    
    name.value = userName.textContent;
    Job.value = userJob.textContent;

    toggleButton([...formEditProfile], submitButton);
    showPopup(popupEditProfile);
  }

  if (event.target.classList.contains('place-card__image')) {
    const imageItem = event.target.closest('.place-card__image');
    const src = imageItem.style.backgroundImage.replace('url(','').replace(')','').replace(/\"/gi, "");
    const image = popupImage.querySelector('.popup__image');

    image.setAttribute('src', src);

    showPopup(popupImage);
  }
}

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
  } else {
    resetErrorsForm(form);
    popup.classList.remove('popup_is-opened');
  }
  
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
  const errorElem = field.parentNode.querySelector(`#${field.id}-error`);
  const valid = isValidity(field)
  if (field === event.target) {
    errorElem.textContent = field.validationMessage;
  }
  
  return valid;
}

// выставляет кнопку в Enbld/Dsbld в зависимости от того true или false принятое значение state
function setSubmitButton(submitButton, state) {
  if (state) {
    submitButton.removeAttribute('disabled');
    submitButton.classList.remove('popup__button_disabled');
  } else {
    submitButton.setAttribute('disabled', true);
    submitButton.classList.add('popup__button_disabled');
  }
}

// Коллбэк слушателя события ввода на формах,
function handlerInputForm(event) {
  const submitButton = event.currentTarget.querySelector('.button');
  const inputs = Array.from(event.currentTarget.elements);

  // выводит сообщения под полем в котором идет ввод
  isFieldValidity(event.target);

  //переключает кнопку Submit
  toggleButton(inputs, submitButton);
} 

// проставляет прослушивание событий на формах
function setEventListeners(popup) {
  const form = popup.querySelector('.popup__form')

  form.addEventListener('input', handlerInputForm);
}

setEventListeners(popupEditProfile);
setEventListeners(popupAddPlace);


// Здравствуйте.

// Работа отклонена от проверки -- окно попапа с увеличенным изображением не закрывается, а значит не работает обязательный функционал +
// Также обращу ваше внимание, что метод поиска URL картинки у вас неоптимальный и ненужный +
// При создании карточки добавьте атрибут с url элементу карточки, а когда будет необходимо
// -- прочитаете его. Как это сделать https://developer.mozilla.org/ru/docs/Web/HTML/Global_attributes/data-*
// Так как реализовано у вас -- принято не будет.

// За исключением исходного массива код следует объединить в один файл. +
//  if ((input1.value.length === 0) || (input2.value.length === 0)) -- не валидация, а имена с числительными -- нельзя +


// Вы явно читали этот материал: https://developer.mozilla.org/ru/docs/Learn/HTML/Forms/%D0%92%D0%B0%D0%BB%D0%B8%D0%B4%D0%B0%D1%86%D0%B8%D1%8F_%D1%84%D0%BE%D1%80%D0%BC%D1%8B

// У вас очень сложно все и много лишних условий, постарайтесь проще подойти и не усложнять