//This class overrides the setEventListeners() parent method. 
import Popup from "../components/Popup.js";
import FormValidator from "../components/FormValidator.js";
import { validationConfig } from "../utils/constants.js";

export default class PopupWithForm extends Popup {
    constructor(popupFormSelector, {callback = () => {}}) {
        super(popupFormSelector);
        this._callback = callback;
      };

    _getInputValues() {
        //collects data from all the input fields and returns it as an object
        const inputObject = {};
        const date = this._popupFormElement.querySelector(".popup__input_type_date");
        const dateObject = new Date(date.value);

        this._popupFormElement.querySelectorAll("input").forEach(element => {
          const name = element.name;

          if (element.name === date.name) {
            return;
          };
          
          inputObject[name] = element.value;
        });
        
        dateObject.setMinutes(dateObject.getMinutes() + dateObject.getTimezoneOffset());
        inputObject[date.name] = dateObject;

        return inputObject;
      };

    _submitDateHandler() {
      //should contain the actual logic that runs when the form is submitted
        const inputDateValues = this._getInputValues();
        this._callback(inputDateValues);
        FormValidator.resetValidation(validationConfig, this._popupFormElement);
        super.close();
    };

    setEventListeners() {
      //error:The error "Cannot read properties of null (reading 'addEventListener')" 
      // tells us that this._popupFormElement is null when you're trying to add the event listener to it. 
      // This means the form element isn't being found or assigned properly. 
      
      this._popupFormElement.addEventListener("submit", (evt) => {
        evt.preventDefault();
        this._submitDateHandler();
      });

      super.setEventListeners();
    };
   
};