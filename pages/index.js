import { v4 as uuidv4 } from "https://jspm.dev/uuid";
import { initialTodos, validationConfig } from "../utils/constants.js";
import Todo from "../components/Todo.js";
import FormValidator from "../components/FormValidator.js";
import Section from "../utils/Section.js";
import PopupWithForm from "../components/PopupWithForm.js";
import TodoCounter from "../components/TodoCounter.js";

/*
The index.js file should contain only the code for:
selecting elements, 
creating class instances, 
and handling interactions between class instances, 
as well as the listener for opening the popup.
*/

//open() method of Popup class should be called in the preexisting event handlers in index.js
//You won’t instantiate your Popup class directly in index.js; 
//instead, you’ll instantiate its child class PopupWithForm

/*
DONE:In index.js, you’ll need to delete the existing submit and closing listeners 
for the form (but not the listener that opens the form). 

IN PROGRESS: Then create an instance of the PopupWithForm class for the new to-do form and 
call its setEventListeners() method. 

TBD: You’ll need to call this instance’s open() and close() methods wherever needed in index.js.
*/

const addTodoButton = document.querySelector(".button_action_add");
const addTodoPopup = document.querySelector("#add-todo-popup");
const addTodoForm = document.forms["add-todo-form"];
const addTodoCloseBtn = addTodoPopup.querySelector(".popup__close");

const todosList = document.querySelector(".todos__list");
const todoValidator = new FormValidator(validationConfig, addTodoForm);

const todoCounter = new TodoCounter(todosList, ".counter");

const generateTodo = (data) => {
  const todoElementUUID = uuidv4(); 
  const todo = new Todo(data, "#todo-template", todoElementUUID);
  const todoElement = todo.getView();
  
  return todoElement;
};

const renderTodo = (data) => {
  todosList.append(data);
};

const section = new Section({
  items: initialTodos,
  renderer: (item) => {
    const sectionTodo = generateTodo(item);
    renderTodo(sectionTodo);
  },
  containerSelector: ".todos__list"
});

//REFACTOR:
//set up form submission handling via the popup class
const todoPopupForm = new PopupWithForm(addTodoForm, todoCallback);

const addTodoPopupInstance = new PopupWithForm(
  "#add-todo-popup", 
  { callback: (input) => {
    /*
    - Creating a new todo: const todo = new Todo(data: submit form input, "#todo-template", todoElementUUID);
    - Adding it to the section: section.addItem()
    - Closing the popup: addTodoPopupInstance.close();
    */
  } };
  );
const todoCallback = addTodoCloseBtn.addEventListener("click", () => {
  addTodoPopupInstance.close();
});



addTodoPopupInstance.setEventListeners();

addTodoButton.addEventListener("click", () => {
  addTodoPopupInstance.open();});


  const todoCounterListeners = () => {
    /*todoCounterListeners are global event listeners that need to be 
    set up once when your application starts, not every time you create a todo.*/

    // Used event delegation to handle dynamically added todos
    document.addEventListener('change', evt => {
      if (evt.target.matches('.todo__completed')) {
        todoCounter.updateCompleted(evt.target.checked);
      };
    });

    document.addEventListener('click', evt => {
      if (evt.target.matches('.todo__delete-btn')) {
        const todoItem = evt.target.closest('.todo');
        
        if (!todoItem) return;
        
        const checkboxElement = todoItem.querySelector('.todo__completed');
        
        if (checkboxElement && checkboxElement.checked) {
          todoCounter.updateCompleted(false);
        };

        todoCounter.updateTotal(false);
        todoItem.remove();
        };
    });
  };

todoCounterListeners();
section.renderItems();
todoValidator.enableValidation(validationConfig, addTodoForm);


