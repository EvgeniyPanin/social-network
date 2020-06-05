'use strict';

class Popup {
  constructor(popup) {
    this.popup = popup;
    // Надо исправить
    // Элемент следует искать в методе установки слушателей.
    this.closeButton = popup.querySelector('.popup__close');
    // Вызовите здесь метод
    // setEventListenerClose
    // и не надо его вне калсса вызывать
    // Да и слушатель можно не удалять при закрытии, окно же на месте, просто не видно
    // А то слушатель вы в одном месте ставите, а тут удаляете
  }

  open() {
    this.popup.classList.add('popup_is-opened');
  }

  close() {
    // Надо исправить
    // Не стоит неявным образом можифицировать экземпляр класса добавляя ему метод
    // на стороне
    // 1. Работа с формой в базовом классе поппапа неуместна
    // 2. Попап с формой пусть получает метод чистки как параметр в конструктор и
    // переопределяет метод открытия
    if (this.cleanForm) this.cleanForm();
    this.closeButton.removeEventListener('click', this.handlerCloseListener);
    this.popup.classList.remove('popup_is-opened');
  }

  handlerCloseListener = (evt) => {
    this.close();
  }

  setEventListenerClose() {
    this.closeButton.addEventListener('click', this.handlerCloseListener)
  }
}
