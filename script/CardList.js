'use strict';

class CardList {
    constructor(container, cardsArr, buildObjFunction) {
        this.container = container;
        this.cardsArr = cardsArr;
        this.buildFunction = buildObjFunction;
    }

    addCard(cardElement) {
        this.container.appendChild(cardElement);
    }

    render(renderContantPopup) {
        this.cardsArr.forEach(place => {
            const cardName = place.name;
            const cardLink = place.link;
            const card = this.buildFunction(cardName, cardLink, renderContantPopup);

            this.addCard(card.create());
        })
    }
}