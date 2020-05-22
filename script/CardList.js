'use strict';

class CardList {
    constructor(container, cardsArr) {
        this.container = container;
        this.cardsArr = cardsArr;
    }

    addCard(cardElement) {
        this.container.appendChild(cardElement);
    }

    render() {
        this.cardsArr.forEach(place => {
            const cardName = place.name;
            const cardLink = place.link;
            const card = createCardObj(cardName, cardLink);

            this.addCard(card.create());
        })
    }
}