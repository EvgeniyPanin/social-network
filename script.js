const cardsContainer = document.querySelector('.places-list');
const formAddPlace = document.querySelector('.popup');
const addButton = document.querySelector('.user-info__button');
const popupClose = document.querySelector('.popup__close');
const form = document.forms.new;
const template = document.querySelector('#card-template').content.querySelector('.place-card');

function createCard(cardName, imageLink) {
  // Можно лучше
  // Воспользуйтесь `<template>` -- https://developer.mozilla.org/ru/docs/Web/HTML/Element/template
  // И `cloneNode` -- https://developer.mozilla.org/ru/docs/Web/API/Node/cloneNode
  // Для удобного тиражирования одинаковых объектов
  const newCard = template.cloneNode(true);
  newCard.querySelector('.place-card__image').style = `background-image: url(${imageLink})`;
  newCard.querySelector('.place-card__name').textContent = cardName;
  return newCard;
}

function addCard(name, link) {
  const cardItem = createCard(name, link);
  cardsContainer.appendChild(cardItem);
}

function formAddCard(event) {
  event.preventDefault();
  const form = document.forms.new;
  // Можно лучше через деструктуризацию
  // const {name, link} = form.elements;
  const formName = form.elements.name;
  const formLink = form.elements.link;

  addCard(formName.value, formLink.value);
  form.reset();
  formAddPlace.classList.remove('popup_is-opened');
}

// Можно лучше
// Вынести загрузку исходных карточек в отдельный метод
// Это будет хорошая организация кода
initialCards.forEach(function (item) {
  addCard(item.name, item.link);
})

// Можно лучше
// Код обработчика вынести в отдельный метод
cardsContainer.addEventListener('click', function (event) {
  if (event.target.classList.contains('place-card__like-icon')) {
    event.target.classList.toggle('place-card__like-icon_liked');
  }
  if (event.target.classList.contains('place-card__delete-icon')) {
    let card = event.target.closest('.place-card');
    cardsContainer.removeChild(card);
  }
})

// Можно лучше
// Код обработчика вынести в отдельный метод
addButton.addEventListener('click', function () {
  formAddPlace.classList.add('popup_is-opened');
});

// Можно лучше
// Код обработчика вынести в отдельный метод
popupClose.addEventListener('click', function () {
  formAddPlace.classList.remove('popup_is-opened');
});

form.addEventListener('submit', formAddCard);

// Добрый день!

// ## Итог

// - код работает, нет синтаксических и других ошибок
// - функционал, перечисленный в задании, работает (при перезагрузке на страницу добавляются 10 карточек,
//   форма открывается и закрывается, можно добавить, удалить и лайкнуть карточку)
// - функционал работает без ошибок
// - карточку можно добавить нажав Enter, находясь в одном из текстовых полей
// - верное использование `let` и `const`
// - функции, декларированные как `function functionName() {}` не вызываются до того, как были объявлены

// Работа принята