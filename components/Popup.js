export default class Popup {
  constructor(popupSelector) {
    this._popupSelector = popupSelector;
    this._popupElement = document.querySelector(popupSelector);
    this._handleEscClose = this._handleEscClose.bind(this);
  };

  open() {
    //opens popup
    this._popupElement.classList.add("popup_visible");
    document.addEventListener("keydown", this._handleEscClose);
  };

  close() {
    //closes popup
    this._popupElement.classList.remove("popup_visible");
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

    this._popupElement.addEventListener("click", (event) => {
      if (
        event.target === this._popupElement ||
        event.target.classList.contains("popup__close")
      ) {
        this.close();
      };
    });
  };
};