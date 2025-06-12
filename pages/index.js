import { v4 as uuidv4 } from "https://jspm.dev/uuid";
import { initialTodos, validationConfig } from "../utils/constants.js";
import Todo from "../components/Todo.js";
import Section from "../utils/Section.js";
import PopupWithForm from "../components/PopupWithForm.js";
import TodoCounter from "../components/TodoCounter.js";
import FormValidator from "../components/FormValidator.js";

/*
COMPLETE:
The index.js file should contain only the code for:
selecting elements, LABELED
creating class instances, LABELED
and handling interactions between class instances, LABELED
as well as the listener for opening the popup. LABELED

COMPLETE:
In index.js, you’ll need to delete the existing submit and closing listeners 
for the form (but not the listener that opens the form). 
*/

/*
1. COMPLETE-- 
line 36: Create an instance of the PopupWithForm class 
const addTodoPopupInstance = new PopupWithForm(addTodoForm, todoCallback); 

2. COMPLETE--
for the new to-do form 
addTodoForm

3. COMPLETE--
and call its setEventListeners() method. 
completed on 131: addTodoPopupInstance.setEventListeners();

COMPLETE: You’ll need to call this instance’s open() and close() methods wherever needed in index.js.
addTodoPopupInstance.open()--open listener
addTodoPopupInstance.close()--todoSubmissionCallback
*/

//selecting elements
const addTodoButton = document.querySelector(".button_action_add");
const addTodoForm = document.forms["add-todo-form"];
const todosList = document.querySelector(".todos__list");
const inputElement = document.querySelector(".popup__input");

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

//class instances
const todoValidator = new FormValidator(validationConfig, addTodoForm);
const todoCounter = new TodoCounter(initialTodos, ".counter");
const addTodoPopupInstance = new PopupWithForm("add-todo-form", todoSubmissionCallback);

//generate todo item function
const generateTodo = (inputElementValue) => {
  const todoElementUUID = uuidv4(); 
  const todo = new Todo(inputElementValue, "#todo-template", todoElementUUID);
  const todoElement = todo.getView();
  return todoElement;
};

//should display(render)a todo item and append to todosList array
const renderTodo = (inputElementValue) => 
  {
    const todoItem = generateTodo(inputElementValue);
    todosList.append(todoItem);
  };

//renders and adds todo item to container
const section = new Section({
  items: initialTodos,
  renderer: (item) => {
    //The renderer receives data (from the initialTodos array)
    //It should create a todo element from that data
    //It should append that element to the container
    const todoElement = renderTodo(item);
    section.addItem(todoElement);
    },
  containerSelector: ".todos__list"
  });

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
  addTodoPopupInstance.open();
});
section.renderItems();
todoCounterListeners();
addTodoPopupInstance.setEventListeners();
todoValidator.enableValidation(validationConfig, addTodoForm);



