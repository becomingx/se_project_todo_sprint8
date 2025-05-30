//This class overrides the setEventListeners() parent method. 
//The setEventListeners() method of the PopupWithForm class should add a 
//submit event listener to the form and call the setEventListeners() method of the parent class.

class PopupWithForm extends Popup {
    //Constructor accepts two arguments: the popup selector and a callback function, 
    // which PopupWithForm calls when the form’s submit event fires.
    constructor(popupSelector, callback) {
        super();
    }

    _getInputValues() {
        //collects data from all the input fields and returns it as an object
        //This data should then be passed to the submission handler as an argument
    }
}

/*

import Card from "./Card.js";

export default class HorizontalCard extends Card {
  constructor(data, cardSelector) {
    super(cardSelector);
    this._title = data.title;
    this._description = data.description;
    this._price = data.price;
    this._image = data.image;
  }

  generateCard() {
    this._element = super._getTemplate();
    super._setEventListeners();

    this._element.querySelector(".card__image").style.backgroundImage = `url(${this._image})`;
    this._element.querySelector(".card__title").textContent = this._title;
    this._element.querySelector(".card__info").textContent = this._description;
    this._element.querySelector(".card__price-property").textContent = this._price;

    return this._element;
  }
}
*/

/*
import { popupCaption } from "../utils/constants.js";
import Card from "./Card.js";

export default class DefaultCard extends Card {
  constructor(data, cardSelector) {
    super(cardSelector);
    this._title = data.title;
    this._description = data.description;
    this._image = data.image;
  }

  generateCard() {
    this._element = super._getTemplate();
    super._setEventListeners();

    this._element.querySelector(".card__image").style.backgroundImage = `url(${this._image})`;
    this._element.querySelector(".card__title").textContent = this._title;

    return this._element;
  }

  _handleOpenPopup() {
    popupCaption.textContent = this._description;
    super._handleOpenPopup();
  }

  _handleClosePopup() {
    popupCaption.textContent = "";
    super._handleClosePopup();
  }
}
*/