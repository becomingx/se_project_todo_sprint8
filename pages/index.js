import { v4 as uuidv4 } from "https://jspm.dev/uuid";
import { initialTodos, validationConfig } from "../utils/constants.js";
import Todo from "../components/Todo.js";
import FormValidator from "../components/FormValidator.js";
import Section from "../utils/Section.js";
import PopupWithForm from "../components/PopupWithForm.js";
import TodoCounter from "../components/TodoCounter.js";

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
//open() method of Popup class should be called in the preexisting event handlers in index.js
//You won’t instantiate your Popup class directly in index.js; 
//instead, you’ll instantiate its child class PopupWithForm

IN PROGRESS--
1. COMPLETE-- 
line 36: Create an instance of the PopupWithForm class 
const addTodoPopupInstance = new PopupWithForm(addTodoForm, todoCallback); 

2. COMPLETE--
for the new to-do form 
addTodoForm

3. COMPLETE--
and call its setEventListeners() method. 
completed on 131: addTodoPopupInstance.setEventListeners();

TBD: You’ll need to call this instance’s open() and close() methods wherever needed in index.js.
addTodoPopupInstance.open()
addTodoPopupInstance.close()
*/

//selecting elements
const addTodoButton = document.querySelector(".button_action_add");
const addTodoForm = document.forms["add-todo-form"];
const todosList = document.querySelector(".todos__list");
const inputElement = document.querySelector(".popup__input");

//todoSubmissionCallback should set up form submission handling via the popup child class
const todoSubmissionCallback = () => {
  ///Creating a new todo:
  const todoItem = generateTodo(inputElement.value);

  //- Adding it to the section: 
  //This method should be called when adding an individual card to the DOM
  //takes a DOM element and adds it to the container
  section.addItem(todoItem);

  //- Closing the popup:
  addTodoPopupInstance.close();
};

//class instances
const todoValidator = new FormValidator(validationConfig, addTodoForm);
const todoCounter = new TodoCounter(todosList, ".counter");
const addTodoPopupInstance = new PopupWithForm(addTodoForm, todoSubmissionCallback);

//generate function, render function, section creation function
const generateTodo = () => {
  const todoElementUUID = uuidv4(); 
  const todo = new Todo(inputElement.value, "#todo-template", todoElementUUID);
  const todoElement = todo.getView();
  return todoElement;
};

//should display(render) a todo item
const renderTodo = (item) => {
  //Call generateTodo() to create a new todo element
  const todoItem = generateTodo(item);
  //Take what generateTodo() returns and append it to todosList
  todosList.append(todoItem);
};

const section = new Section({
  items: initialTodos,
  renderer: (item) => 
    {
      renderTodo(item);
    },
  containerSelector: ".todos__list"}
);

//Interactions Between Class Instances 
const todoCounterListeners = () => {
/*tglobal event listener function; needs to be set up once when your application starts, 
not every time you create a todo.*/
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

//Listener for Opening the Popup
addTodoButton.addEventListener("click", () => {
  addTodoPopupInstance.open();
});
addTodoPopupInstance.setEventListeners();
todoCounterListeners();
section.renderItems();
todoValidator.enableValidation(validationConfig, addTodoForm);


