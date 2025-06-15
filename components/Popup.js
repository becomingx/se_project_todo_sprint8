export default class Popup {
  constructor(popupFormSelector) {
    this._popupFormSelector = popupFormSelector;
    this._popupFormElement = document.querySelector(popupFormSelector);
    this._handleEscClose = this._handleEscClose.bind(this);
  };

  open() {
    //opens popup
    this._popupFormElement.classList.add("popup_visible");
    document.addEventListener("keydown", this._handleEscClose);
  };

  close() {
    //closes popup
    this._popupFormElement.classList.remove("popup_visible");
    document.removeEventListener("keydown", this._handleEscClose);
  };

  _handleEscClose(event) {
    //handles escape key closing popup
    if (event.key === "Escape") {
      this.close();
    };
  };

  setEventListeners(openButtonSelector) {
    //sets event listeners for open button
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