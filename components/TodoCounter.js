//in charge of tracking and displaying the number of to-do items, as well as the number that are marked complete
export default class TodoCounter {
    constructor(todos, selector) {
      this._element = document.querySelector(selector);
      // initial counts
      this._completed = todos.filter(todo => todo.completed).length;
      this._total     = todos.length;
  
      // paint initial text
      this._updateText();
  
      // wire up all your listeners
      this._initListeners();
    }
  
    // increment===true => +1, otherwise -1
    updateCompleted(increment) {
      this._completed += increment ? 1 : -1;
      // never go negative
      this._completed = Math.max(0, this._completed);
      this._updateText();
    }
  
    // increment===true => +1, otherwise -1
    updateTotal(increment) {
      this._total += increment ? 1 : -1;
      // never go negative
      this._total = Math.max(0, this._total);
      this._updateText();
    }
  
    // update the UI string
    _updateText() {
      this._element.textContent =
        `Showing ${this._completed} out of ${this._total} completed`;
    }
  
    // attach all your event handlers
    _initListeners() {
      // A) when any existing checkbox is toggled
      document
        .querySelectorAll('.todo__completed')
        .forEach(checkbox => {
          checkbox.addEventListener('change', evt => {
            // evt.target.checked is true if box was just checked
            this.updateCompleted(evt.target.checked);
          });
        });
  
      // B) when any delete button is clicked
      document
        .querySelectorAll('.todo__delete-btn')
        .forEach(btn => {
          btn.addEventListener('click', evt => {
            // find the .todo container
            const todoItem = evt.target.closest('.todo');
            if (!todoItem) return;
  
            // if its checkbox was checked, remove 1 from completed
            const cb = todoItem.querySelector('.todo__completed');
            if (cb && cb.checked) {
              this.updateCompleted(false);
            }
  
            // always remove 1 from total
            this.updateTotal(false);
  
            // remove it from the DOM
            todoItem.remove();
          });
        });
    }
  }

/*
export default class TodoCounter {
    constructor(todos, selector) {
        this._element = document.querySelector(selector);//select appropriate element
        this._completed = todos.filter(todo => todo.completed === true);//# completed todos
        this._total = todos.length;//total# of todos
    }

    
    // Call updateCompleted when a checkbox is clicked, 
    // and when a completed to-do is deleted.

    updateCompleted = (increment) => {
        // if increment is true, add 1 to this._completed. Otherwise,  
        // subtract 1. In either case, call the method to update   
        // the text content.
        const checkboxChecked = document.querySelector(".todo__completed:checked");
        const deleteTodo = document.querySelector("todo__delete-btn");
        const increment = 0;

        while (increment; i++;) {
            if checkboxChecked.addEventListener("click", (evt) => {
                evt.target.updateCompleted();
                counter + i++;
            });
        
          } else if (increment; i--;) {
            deleteTodo.addEventListener("click", (evt) => {
              evt.target.updateCompleted();
              counter + i--;
            });
          };

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
*/