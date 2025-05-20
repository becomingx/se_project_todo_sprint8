class Popup {
    constructor(popupSelector) {
        this._popupSelector = popupSelector;
    }

    open() {
        //opens popop
        //should be called in the preexisting event handlers in index.js
    }

    close() {
        //closes popup

    }

    setEventListeners() {
        // adds a click event listener to the close icon of the 
        //The modal window should also close when users click on the shaded area around the form
    }

    _handleEscapeClose() {
        //stores the logic for closing the popup by pressing the Escape key
    }

    //You won’t instantiate your Popup class directly in index.js; 
    // instead, you’ll instantiate its child class PopupWithForm
}

/*
Some functionality the Popup class will handle has already been implemented 
using vanilla JS. 

Specifically, opening and closing the modal via buttons. In these cases, you’ll need to 
recreate the functionality in your Popup class. 

However, the starting code hasn’t implemented the escape key handler or modal 
window click listener. 

You can refer back to how you implemented these features in Project 6 to help 
guide you when implementing these features.
*/