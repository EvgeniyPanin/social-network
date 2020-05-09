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
const popupClose = document.querySelectorAll('.popup__close');
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

function openImagePopup(event) {
  const imageItem = event.target.closest('.place-card__image');
  const src = imageItem.style.backgroundImage.replace('url(','').replace(')','').replace(/\"/gi, "");

  console.log(src);



  
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
    openedPopup(event);
  }
}

cardsContainer.addEventListener('click', contentManagement);

function showPopup(popup) {
  popup.classList.add('popup_is-opened');
}

function openedPopup(event) {
  const clickElem = event.currentTarget;

  if (clickElem === addButton) {
    showPopup(popupAddPlace);
  }

  if (clickElem === editButton) {
    const submitButton = formEditProfile.querySelector('.popup__button');
    const { name, about: Job } = formEditProfile.elements;
    popupEditProfile.classList.add('popup_is-opened');
    
    showPopup(popupEditProfile);

    name.value = userName.textContent;
    Job.value = userJob.textContent;
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

function closedPopup(event) {
  const popup = event.target.closest('.popup');

  if (popup.id === 'image-popup') {
    popup.classList.remove('popup_is-opened');
    return;
  }

  const form = popup.querySelector('.popup__form');
  const formErrors = form.querySelectorAll('.error-message');

  form.reset();

  [...formErrors].forEach(errors => errors.textContent = '');

  popup.classList.remove('popup_is-opened');
}

popupClose.forEach(closeButton => { closeButton.addEventListener('click', closedPopup) });

function formAddCard(event) {
  event.preventDefault();
  const form = event.currentTarget;
  const { name: formName, link: formLink } = form.elements;
  const buttonForm = form.querySelector('.popup__button');

  addCard(formName.value, formLink.value);
  closedPopup(event);
}

formAddPlace.addEventListener('submit', formAddCard);

function editUserData(event) {
  event.preventDefault();

  const form = event.currentTarget;
  const { name: Name, about: Job } = form.elements;

  userName.textContent = Name.value;
  userJob.textContent = Job.value;

  closedPopup(event);
}

formEditProfile.addEventListener('submit', editUserData);


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

function isFieldValidity(field) {
  
  const errorElem = field.parentNode.querySelector(`#${field.id}-error`);
  const valid = isValidity(field)
  if (field === event.target) {
    errorElem.textContent = field.validationMessage;
  }
  
 
  return valid;
}

function checkFormValidity(event) {
  
  const currentForm = event.currentTarget;
  const inputs = Array.from(currentForm.elements);
  let valid = true;
  
  inputs.forEach(field => {
    if (field.type !== 'submit') {
      if (!isFieldValidity(field)) {valid = false};
    }
  })
}

function setEventListeners(popup) {
  const form = popup.querySelector('.popup__form')

  form.addEventListener('input', checkFormValidity);
}

setEventListeners(popupEditProfile);
setEventListeners(popupAddPlace);


// Здравствуйте.

// Работа отклонена от проверки -- окно попапа с увеличенным изображением не закрывается, а значит не работает обязательный функционал
// Также обращу ваше внимание, что метод поиска URL картинки у вас неоптимальный и ненужный
// При создании карточки добавьте атрибут с url элементу карточки, а когда будет необходимо
// -- прочитаете его. Как это сделать https://developer.mozilla.org/ru/docs/Web/HTML/Global_attributes/data-*
// Так как реализовано у вас -- принято не будет.

// За исключением исходного массива код следует объединить в один файл.
//  if ((input1.value.length === 0) || (input2.value.length === 0)) -- не валидация, а имена с числительными -- нельзя


// Вы явно читали этот материал: https://developer.mozilla.org/ru/docs/Learn/HTML/Forms/%D0%92%D0%B0%D0%BB%D0%B8%D0%B4%D0%B0%D1%86%D0%B8%D1%8F_%D1%84%D0%BE%D1%80%D0%BC%D1%8B

// У вас очень сложно все и много лишних условий, постарайтесь проще подойти и не усложнять