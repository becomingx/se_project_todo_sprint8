//This class overrides the setEventListeners() parent method. 

export default class PopupWithForm extends Popup {
    //Constructor accepts two arguments: the popup selector and a callback function, 
    // which PopupWithForm calls when the form’s submit event fires.
    constructor(popupSelector, {callback = () => {}}) {
        super(popupSelector);
        // getting the iputs
        // create the submit button
        this._callback = callback;
      };

    _getInputValues() {
        //collects data from all the input fields and returns it as an object
        const inputObject = {};
        this._form.querySelectorAll("input").forEach(element => {
          const name = element.name;
          inputObject[name] = element.value;
        });

        //This data should then be passed to the submission handler as an argument
        return inputObject;
    };

    setEventListeners() {
      const submitInput = this._popupElement.querySelector("form");
      if (submitInput) {
        submitInput.addEventListener("submit", (evt) => {
          evt.preventDefault();
          this._callback();
        });
      };
      super.setEventListeners();
    };
};