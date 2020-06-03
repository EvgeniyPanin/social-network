'use strict';

class CardList {
    constructor(container, buildObjFunction) {
        this.container = container;
        this.buildFunction = buildObjFunction;
    }

    addCard(cardElement) {
        this.container.appendChild(cardElement);
    }
}