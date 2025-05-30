export default class Popup {
  constructor(popupSelector) {
    this._popupElement = document.querySelector(popupSelector);
    this._handleEscClose = this._handleEscClose.bind(this);
  }

  open() {
    this._popupElement.classList.add("popup_visible");
    document.addEventListener("keydown", this._handleEscClose);
  }

  close() {
    this._popupElement.classList.remove("popup_visible");
    document.removeEventListener("keydown", this._handleEscClose);
  }

  _handleEscClose(event) {
    if (event.key === "Escape") {
      this.close();
    }
  }

  setEventListeners(openButtonSelector) {
    const openButton = document.querySelector(openButtonSelector);
    if (openButton) {
      openButton.addEventListener("click", () => {
        this.open();
      });
    }

    this._popupElement.addEventListener("click", (event) => {
      if (
        event.target === this._popupElement ||
        event.target.classList.contains("popup__close")
      ) {
        this.close();
      }
    });
  }
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