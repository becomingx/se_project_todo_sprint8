export default class Popup {
  constructor(popupFormElement) {
    this._popupFormElement = document.querySelector(popupFormElement);
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