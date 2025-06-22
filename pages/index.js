import { v4 as uuidv4 } from "https://jspm.dev/uuid";
import { initialTodos, validationConfig } from "../utils/constants.js";
import Todo from "../components/Todo.js";
import Section from "../utils/Section.js";
import PopupWithForm from "../components/PopupWithForm.js";
import TodoCounter from "../components/TodoCounter.js";
import FormValidator from "../components/FormValidator.js";

//selecting elements
const addTodoButton = document.querySelector(".button_action_add");
const addTodoFormElement = document.querySelector(".popup__form");

//class generation
//validation
const todoValidator = new FormValidator(validationConfig, addTodoFormElement);

//generate todo item function
const generateTodo = (inputElementValue) => {
  const todoElementUUID = uuidv4(); 
  const todo = new Todo(inputElementValue, "#todo-template", todoElementUUID);
  const todoElement = todo.getView();
  return todoElement;
};

const addTodoPopupInstance = new PopupWithForm(".popup", { 
  callback: (popupFormValues) => { 
    // Creates a new todo using the values passed to the callback
    const todoItem = generateTodo(popupFormValues);
    
    // Add todoItem to the section 
    section.addItem(todoItem);
    
    // Update todo counter
    todoCounter.updateTotal(true);
  }
});

//should display(render)a todo item and append to todosList array
const renderTodo = (inputElement) => 
  {
    //Create the todo item
    const todoItem = generateTodo(inputElement);
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

//keeps track of todo completed counter
const todoCounter = new TodoCounter(initialTodos, ".counter");

//global event listener function
const todoCounterListeners = () => {
  //event delegation to handle dynamically added todos
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
        if (checkboxElement){
          todoCounter.updateTotal(false);
  
          if (checkboxElement.checked) {
          todoCounter.updateCompleted(false);
          }
        };
        todoItem.remove();
      };
    });
  };

//Listener for Opening the Popup
addTodoButton.addEventListener("click", () => {
  addTodoPopupInstance.open();
});
//function calls
todoValidator.enableValidation();
section.renderItems();
todoCounterListeners();
addTodoPopupInstance.setEventListeners();