//in charge of tracking and displaying the number of to-do items, as well as the number that are marked complete


export default class TodoCounter {
    constructor(todos, selector) {
        this._element = document.querySelector(selector);
        this._completed = todos.filter(todo => todo.completed).length;
        this._total = todos.length;
        this._updateText();
    }

    updateCompleted(increment) {
        this._completed += increment ? 1 : -1;
        this._completed = Math.max(0, this._completed);
        this._updateText();
    }

    updateTotal(increment) {
        this._total += increment ? 1 : -1;
        this._total = Math.max(0, this._total);
        this._updateText();
    }

    _updateText() {
        this._element.textContent = `Showing ${this._completed} out of ${this._total} completed`;
    }


};