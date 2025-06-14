import { v4 as uuidv4 } from "https://jspm.dev/uuid";
import { initialTodos, validationConfig } from "../utils/constants.js";
import Todo from "../components/Todo.js";
import Section from "../utils/Section.js";
import PopupWithForm from "../components/PopupWithForm.js";
import TodoCounter from "../components/TodoCounter.js";
import FormValidator from "../components/FormValidator.js";

/*
You’ll need to call this instance’s open() and close() methods wherever needed in index.js.
addTodoPopupInstance.open()--open listener
addTodoPopupInstance.close()--todoSubmissionCallback

errors:
Section.js error: "Invalid element provided to addItem method"

PopupWithForm.js error: "Cannot read properties of null (reading 'addEventListener')"
The error suggests that something is null when you're trying to add an event listener to it.
*/

//selecting elements
const addTodoButton = document.querySelector(".button_action_add");
console.log(addTodoButton);
const addTodoFormElement = document.querySelector(".popup");
const inputElement = document.querySelector(".popup__input");


//class instances
const todoValidator = new FormValidator(validationConfig, addTodoFormElement);
const todoCounter = new TodoCounter(initialTodos, ".counter");

//generate todo item function
const generateTodo = (inputElementValue) => {
  const todoElementUUID = uuidv4(); 
  const todo = new Todo(inputElementValue, "#todo-template", todoElementUUID);
  const todoElement = todo.getView();
  return todoElement;
};

/*
When you create a new Popup instance, what exactly are you passing as the popupFormElement parameter? Are you passing:
A string (like "#my-form" or ".form-class")?
Or an actual HTML element that you've already selected?
The error message shows [object HTMLFormElement] 
this tells us something specific about what type of data is being passed. What do you think this means?
Looking at your constructor line document.querySelector(popupFormElement) 
what does querySelector() expect to receive as its parameter?
Think about the difference between these two approaches:

// Approach A: Pass a selector string
const popup = new Popup("#my-form");

// Approach B: Pass an already-selected element
const formElement = document.querySelector("#my-form");
const popup = new Popup(formElement);
Which approach do you think you're currently using, and which one does your constructor code expect?
*/

//todoSubmissionCallback should set up form submission handling via the popup child class
const todoSubmissionCallback = () => {
  ///Creating a new todo:
  const inputElementValue = inputElement.value;
  const todoItem = generateTodo(inputElementValue);
  //Adding todoItem to the section 
  section.addItem(todoItem);
  //closing the todo instance
  addTodoPopupInstance.close();
};

const addTodoPopupInstance = new PopupWithForm(".popup", todoSubmissionCallback);
console.log("Popup form element:", addTodoPopupInstance._popupFormElement);

//should display(render)a todo item and append to todosList array
const renderTodo = (inputElement) => 
  {
    //Create the todo item
    const todoItem = generateTodo(inputElement);
    //Return the todo item (so the Section class can append it)
    return todoItem;
  };

//renders and adds todo item to container
//The Section class expects renderTodo to return a DOM element, 
// which it then passes to the Section constructor as this.addItem(renderedItem)
const section = new Section({
  items: initialTodos,
  renderer: (inputElement) => {
    return renderTodo(inputElement);
  },
  containerSelector: ".todos__list"}
);

//Interactions Between Class Instances 

/*global event listener function; needs to be set up once when your application starts, 
not every time you create a todo.*/
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
      if (checkboxElement && checkboxElement.checked) {
        todoCounter.updateCompleted(false);
      };

      todoCounter.updateTotal(false);
      todoItem.remove();
    };
  });
};

//Listener for Opening the Popup
addTodoButton.addEventListener("click", () => {
  console.log("Button clicked!"); 
  addTodoPopupInstance.open();
});
section.renderItems();
todoCounterListeners();
addTodoPopupInstance.setEventListeners();
todoValidator.enableValidation(validationConfig, addTodoFormElement);



