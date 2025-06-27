
class Todo {
  constructor(data, selector, uuid, onDelete, onToggle) {
    this._data = data;
    this._templateElement = document.querySelector(selector);
    this._todoUUID = uuid;
    this._completed = data.completed;
    this._onToggle = onToggle;
    this._onDelete = onDelete;
  };

  _generateCheckboxEl() {
    this._todoCheckboxEl = this._todoElement.querySelector(".todo__completed");
    this._todoCheckboxEl.id = `${this._todoUUID}`;
    this._todoLabel.setAttribute("for", `${this._todoUUID}`);

  };

  _generateDueDateEl() {
    const dueDate = new Date(this._data.date);
    if (!isNaN(dueDate)) {
      this._todoDate.textContent = `Due: ${dueDate.toLocaleString("en-US", {
        year: "numeric",
        month: "short",
        day: "numeric",
      })}`;
    };
  };

  getView() {
    this._todoElement = this._templateElement.content
      .querySelector(".todo")
      .cloneNode(true);
    
    this._todoDate = this._todoElement.querySelector(".todo__date");
    this._todoLabel = this._todoElement.querySelector(".todo__label");
    this._generateCheckboxEl();
    this._generateDueDateEl();

    this._todoDeleteBtn = this._todoElement.querySelector('.todo__delete-btn');
    this._todoNameEl = this._todoElement.querySelector(".todo__name");
    this._todoNameEl.textContent = this._data.name;
  
    this._setEventListeners();
    return this._todoElement;
  };

  _setEventListeners() {
    this._todoCheckboxEl.addEventListener("change", (evt) => {
        if (evt.target.matches('.todo__completed')) {
            // Call the onToggle callback with the checkbox state
            this._onToggle(evt.target.checked);
            // Update the local completed state
            this._completed = evt.target.checked;
          }
    });

    this._todoDeleteBtn.addEventListener("click", (evt) => {
        if (evt.target.matches('.todo__delete-btn')) {
            if (this._todoCheckboxEl) {
                // Call the onDelete callback
                this._onDelete();
                this._todoElement.remove();
            };
        };
    });
  };
};

export default Todo;