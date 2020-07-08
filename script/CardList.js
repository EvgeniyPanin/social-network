'use strict';

export class CardList {
  constructor(container) {
    this.container = container;
  }

  addCard(cardElement) {
    this.container.appendChild(cardElement);
  }

  render(itemsArray) {
    itemsArray.forEach((item) => {
      this.addCard(item);
    })
  }
}