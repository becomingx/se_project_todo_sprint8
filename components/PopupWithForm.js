import Popup from "../components/Popup.js";

export default class PopupWithForm extends Popup {
  constructor(popupFormSelector, {callback = () => {}}) {
      super(popupFormSelector);
      this._callback = callback;
      this._formElement = this._popupElement.querySelector("form");
  };

  _getInputValues() {
      const inputObject = {};
      const popupForm = this._formElement;

      popupForm.querySelectorAll("input").forEach(element => {
        const name = element.name;
        inputObject[name] = element.value;
      });

      return inputObject;
  };

  _submitHandler() {
      const inputValues = this._getInputValues();
      this._callback(inputValues);
      super.close();
  };
  
  getForm() {
      return this._formElement;
  };

  setEventListeners() {
      super.setEventListeners();
      
      this._formElement.addEventListener('submit', (evt) => {
          evt.preventDefault();
          this._submitHandler();
      });
  };
};