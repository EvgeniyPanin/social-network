'use strict';

class CardList {
    constructor(container, buildObjFunction) {
        this.container = container;
        this.buildFunction = buildObjFunction;
    }

    addCard(cardElement) {
        this.container.appendChild(cardElement);
    }

    render(obj) {
        console.log(obj);
        const card = this.buildFunction({'name': obj.elem.name, 
                                        'link': obj.elem.link, 
                                        'likesArr': obj.elem.likes, 
                                        'renderContantPopup': obj.renderContantPopup, 
                                        'requestCreater': obj.requestCreater});
        this.addCard(card);
    }
}