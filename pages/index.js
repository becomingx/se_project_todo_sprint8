import { v4 as uuidv4 } from "https://jspm.dev/uuid";
import { initialTodos, validationConfig } from "../utils/constants.js";
import Todo from "../components/Todo.js";
import FormValidator from "../components/FormValidator.js";
import Section from "../utils/Section.js";
import Popup from "../components/Popup.js";

const addTodoButton = document.querySelector(".button_action_add");
const addTodoPopup = document.querySelector("#add-todo-popup");
const addTodoForm = document.forms["add-todo-form"];
const addTodoCloseBtn = addTodoPopup.querySelector(".popup__close");
const todosList = document.querySelector(".todos__list");
const TodoValidator = new FormValidator(validationConfig, addTodoForm);

const renderTodo = (data) => {
  const todo = generateTodo(data);
  todosList.append(todo);
};

const generateTodo = (data) => {
  const todoElementUUID = uuidv4(); 
  const todo = new Todo(data, "#todo-template", todoElementUUID);
  const todoElement = todo.getView();
  
  return todoElement;
};


const addTodoPopupInstance = new PopupWithForm("#add-todo-popup");

addTodoButton.addEventListener("click", () => {
  addTodoPopupInstance.open();
});

addTodoCloseBtn.addEventListener("click", () => {
  addTodoPopupInstance.close();
});

addTodoForm.addEventListener("submit", (evt) => {
  evt.preventDefault();
  const name = evt.target.name.value;
  const dateInput = evt.target.date.value;

  const date = new Date(dateInput);
  date.setMinutes(date.getMinutes() + date.getTimezoneOffset());

  const values = { name, date };
  renderTodo(values);
  closeModal(addTodoPopup);
  TodoValidator.resetValidation(validationConfig, addTodoForm);
});

initialTodos.forEach(renderTodo);

TodoValidator.enableValidation(validationConfig, addTodoForm);

/*
The index.js file should contain only the code for:
selecting elements, 
creating class instances, 
and handling interactions between class instances, 
as well as the listener for opening the popup.
*/

//If classes need to interact with one another, use loose coupling.

//open() method of Popup class should be called in the preexisting event handlers in index.js
//You won’t instantiate your Popup class directly in index.js; 
//instead, you’ll instantiate its child class PopupWithForm

/*
In index.js, you’ll need to delete the existing submit and closing listeners 
for the form (but not the listener that opens the form). 

Then create an instance of the PopupWithForm class for the new to-do form and 
call its setEventListeners() method. 

You’ll need to call this instance’s open() and close() methods wherever needed in index.js.
*/

