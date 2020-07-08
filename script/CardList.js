'use strict';

class CardList {
  constructor(container) {
    this.container = container;
  }

  addCard(cardElement) {
    this.container.appendChild(cardElement);
  }

  render(itemsArray) {
    itemsArray.forEach((item) => {
      // Надо исправить +
      // Мне еще с первого раза не понравилась эта штука с buildFunction
      // Посмотрите на addCard -- он когда одну карту принимает -- он получает готовый элемент
      // и вы ему этот элемент в точке сборки собирате, а для render -- почему-то делаете исключение
      // Почему бы не собрать массив элементов вне класса CardList а сюда его просто передать?
      // Зачем посвящать контейнер элементов в тонкости реализации того, что ему и знать не положено?
      // Уберите лишний функционал из класса
      this.addCard(item);
    })
  }
}