import { v4 as uuidv4 } from "https://jspm.dev/uuid";
import { initialTodos, validationConfig } from "../utils/constants.js";
import Todo from "../components/Todo.js";
import Section from "../utils/Section.js";
import PopupWithForm from "../components/PopupWithForm.js";
import TodoCounter from "../components/TodoCounter.js";
import FormValidator from "../components/FormValidator.js";

//selecting elements
const addTodoButton = document.querySelector(".button_action_add");

//keeps track of todo completed counter
const todoCounter = new TodoCounter(initialTodos, ".counter");

const onDelete = () => {
  todoCounter.updateTotal(false);
  todoCounter.updateCompleted(false); // decrement total count
  const todoDeleteBtn = document.querySelector(".todo__delete-btn");
};

const onToggle = (isCompleted) => {
  todoCounter.updateCompleted(isCompleted); // update completed count
};

//generate todo item function
const generateTodo = (inputElementValue, onDelete, onToggle) => {
  const todoElementUUID = uuidv4(); 
  const todo = new Todo(inputElementValue, "#todo-template", todoElementUUID, onDelete, onToggle);
  const todoElement = todo.getView();
  return todoElement;
};

const addTodoPopupInstance = new PopupWithForm(".popup", { 
  callback: (popupFormValues) => { 
    const todoItem = generateTodo(popupFormValues, onDelete, onToggle);
    section.addItem(todoItem);
    todoCounter.updateTotal(true);
  }
});

//validation
const todoValidator = new FormValidator(validationConfig, addTodoPopupInstance.getForm());

//should display(render)a todo item and append to todosList array
const renderTodo = (inputElement) => 
  {
    //Create the todo item
    const todoItem = generateTodo(inputElement, onDelete, onToggle);
    //Return the todo item (so the Section class can append it)
    return todoItem;
  };

const section = new Section({
  //The Section class expects renderTodo to return a DOM element, 
  items: initialTodos,
  //renders and adds todo item to container
  renderer: (inputElement) => {
    return renderTodo(inputElement);
  },
  containerSelector: ".todos__list"}
);

//Listener for Opening the Popup
addTodoButton.addEventListener("click", () => {
  addTodoPopupInstance.open();
});

//function calls
todoValidator.enableValidation();
section.renderItems();
addTodoPopupInstance.setEventListeners();