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