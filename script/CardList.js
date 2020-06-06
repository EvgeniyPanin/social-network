'use strict';

class CardList {
    constructor(container, buildObjFunction, contantDemonstrate) {
        this.container = container;
        this.buildFunction = buildObjFunction;
        this.contantDemonstrate = contantDemonstrate;
    }

    addCard(cardElement) {
        this.container.appendChild(cardElement);
    }

    render(dataArray, api, userID) {
        dataArray.forEach((elem) => {
            const card = this.buildFunction({
                                                'elem': elem, 
                                                'renderContantPopup': this.contantDemonstrate,
                                                'requestCreater': api,
                                                'userID': userID,
                                            });
        this.addCard(card);
        })
    }
}