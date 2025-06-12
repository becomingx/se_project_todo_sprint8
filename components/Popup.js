/*
When you create a new Popup instance, what exactly are you passing as the popupFormElement parameter? Are you passing:
A string (like "#my-form" or ".form-class")?
Or an actual HTML element that you've already selected?
The error message shows [object HTMLFormElement] 
this tells us something specific about what type of data is being passed. What do you think this means?
Looking at your constructor line document.querySelector(popupFormElement) 
what does querySelector() expect to receive as its parameter?
Think about the difference between these two approaches:

// Approach A: Pass a selector string
const popup = new Popup("#my-form");

// Approach B: Pass an already-selected element
const formElement = document.querySelector("#my-form");
const popup = new Popup(formElement);
Which approach do you think you're currently using, and which one does your constructor code expect?
*/

export default class Popup {
  constructor(popupFormSelector) {
    this._popupFormElement = document.querySelector(popupFormSelector);
    this._handleEscClose = this._handleEscClose.bind(this);
  };

  open() {
    this._popupFormElement.classList.add("popup_visible");
    document.addEventListener("keydown", this._handleEscClose);
  };

  close() {
    this._popupFormElement.classList.remove("popup_visible");
    document.removeEventListener("keydown", this._handleEscClose);
  };

  _handleEscClose(event) {
    if (event.key === "Escape") {
      this.close();
    };
  };

  setEventListeners(openButtonSelector) {
    const openButton = document.querySelector(openButtonSelector);
    if (openButton) {
      openButton.addEventListener("click", () => {
        this.open();
      });
    }

    this._popupFormElement.addEventListener("click", (event) => {
      if (
        event.target === this._popupFormElement ||
        event.target.classList.contains("popup__close")
      ) {
        this.close();
      };
    });
  };
};