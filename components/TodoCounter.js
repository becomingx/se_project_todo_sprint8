export default class TodoCounter {
    constructor(todos, selector) {
        this._element = document.querySelector(selector);
        this._todos = todos; // Store the entire array
        this._total = todos.length; // Total number of todos
        this._completed = todos.filter(todo => todo.completed).length; // Count completed todos
        this._updateText(); // Update the display text
    }

    updateCompleted(increment) {
        this._completed += increment ? 1 : -1;
        this._completed = Math.max(0, this._completed); // Ensure it doesn't go below 0
        this._updateText(); // Update the display text
    }

    updateTotal(increment) {
        this._total += increment ? 1 : -1;
        this._total = Math.max(0, this._total); // Ensure it doesn't go below 0
        this._updateText(); // Update the display text
    }

    _updateText() {
        this._element.textContent = `Showing ${this._completed} out of ${this._total} completed`;
    }
}