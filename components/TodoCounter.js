//in charge of tracking and displaying the number of to-do items, as well as the number that are marked complete

class TodoCounter {
    constructor(todos, selector) {
        this._element = //select appropriate element
        this._completed = //# completed todos
        this._total = //total# of todos
    }


    // Call updateCompleted when a checkbox is clicked, and when a completed
    // to-do is deleted.
    updateCompleted = (increment) => {
        // if increment is true, add 1 to this._completed. Otherwise,  
        // subtract 1. In either case, call the method to update   
        // the text content.
    };

    // Call this when a to-do is deleted, or when a to-do is   
    // created via the form. 
    updateTotal = (increment) => {
        // if increment is true, add 1 to this._total. Otherwise, 
        // subtract 1. In either case, call the method to update the  
        // text content.  
    };

    // Call the method to update the text content
    _updateText() {
        // Sets the text content of corresponding text element.  
        // Call this in the constructor, and whenever the counts get updated.
        this._element.textContent = `Showing ${this._completed} out of ${this._total} completed`;
    }
}

export default TodoCounter;