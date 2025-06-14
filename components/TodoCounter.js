//keeps track of amount of todo objects in text at the top of the todos app
export default class TodoCounter {
    constructor(todos, selector) {
        this._element = document.querySelector(selector);
        // Store the entire array
        this._todos = todos; 
        // Total number of todos
        this._total = todos.length;
        // Count completed todos
        this._completed = todos.filter(todo => todo.completed).length;
        // Update the display text
        this._updateText(); 
    }

    updateCompleted(increment) {
        this._completed += increment ? 1 : -1;
        // Ensure it doesn't go below 0
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
}