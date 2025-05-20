
class Todo {
  constructor(data, selector, uuid) {
    this._data = data;
    this._templateElement = document.querySelector(selector);
    this._todoUUID = uuid;
    this._completed = data.completed;
  };

  _setEventListeners() {
    this._todoCheckboxEl.addEventListener("change", () => {
      this._completed = !this._completed;
    });

    this._todoDeleteBtn.addEventListener("click", () => {
      this._todoElement.remove();
    });
  };

  _generateCheckboxEl() {
    this._todoCheckboxEl = this._todoElement.querySelector(".todo__completed");
    this._todoLabel = this._todoElement.querySelector(".todo__label");
    this._todoElement.id = `${this._todoUUID}`;

    this._todoCheckboxEl.id = `todo-${this._todoElement.id}`;
    this._todoLabel.setAttribute("for", `todo-${this._todoElement.id}`);
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
  
    this._todoNameEl = this._todoElement.querySelector(".todo__name");
    this._todoDate = this._todoElement.querySelector(".todo__date");
    this._todoDeleteBtn = this._todoElement.querySelector(".todo__delete-btn");
    this._todoCheckboxEl = this._todoElement.querySelector(".todo__completed");
    this._todoLabel = this._todoElement.querySelector(".todo__label");
  
    this._todoNameEl.textContent = this._data.name;
  
    this._setEventListeners();
    this._generateCheckboxEl();
    this._generateDueDateEl();
  
    return this._todoElement;
  };
  
};

export default Todo;