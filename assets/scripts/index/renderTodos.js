import { todos } from '../data/todoData.js';
import { updateRemainingTodos } from './countTodos.js';
import { handleDragAndTouchEvents } from './dragAndDrop.js';
import { handleClearButton, handleTodoRemoval, toggleTodoCompletion } from './eventHandlers.js';
import { currentFilter } from './todoMain.js';

//Renders the todo items based on the current filter.
function renderTodos() {
  updateRemainingTodos();

  const todoListElement = document.querySelector('.js-todo__list');
  todoListElement.innerHTML = '';

  const filteredTodos = todos.filter(todo => {
    if (currentFilter === 'active') return !todo.completed;
    if (currentFilter === 'completed') return todo.completed;
    return true;
  });

  const todoItemsHTML = filteredTodos.map((todo, index) => generateTodoListHTML(todo, index)).join('');
  todoListElement.innerHTML = todoItemsHTML;

  addTodoEventListeners();
}

//Generates the HTML for a todo item.
function generateTodoListHTML(todo, index) {
  const completedClass = todo.completed ? 'completed' : '';
  const checkedAttr = todo.completed ? 'checked' : '';

  return `
    <li class="todo__item-wrapper js-todo__item-wrapper" data-original-index="${todos.indexOf(todo)}" data-index="${index}" draggable="true">
      <input class="js-todo__item-checkbox todo__item-checkbox" ${checkedAttr} type="checkbox" id="todo-${todo.id}" name="todo-${todo.id}" data-item-id="${todo.id}">
      <label for="todo-${todo.id}" class="js-todo__item-custom-checkbox todo__item-custom-checkbox"></label>
      <label class="todo__name js-todo__name-${todo.id} ${completedClass}" for="todo-${todo.id}">${todo.name}</label>
      <button class="todo__remove-item-button js-todo__remove-item-button" type="button" data-item-id="${todo.id}">&#x2715;</button>
    </li>
  `;
}

//Adds event listeners to the todo items.
function addTodoEventListeners() {
  handleDragAndTouchEvents();

  //handle todo removal
  const removeButtons = document.querySelectorAll('.js-todo__remove-item-button');
  removeButtons.forEach(button => {
    button.addEventListener('click', handleTodoRemoval);
  });

  //clear completed todos
  const clearButton = document.querySelector('.js-todo__list-clear-button');
  clearButton.addEventListener('click', handleClearButton);

  //todo completion
  const todoCheckboxes = document.querySelectorAll('.js-todo__item-checkbox');
  todoCheckboxes.forEach(checkbox => {
    checkbox.addEventListener('click', () => {
      const todoItemId = checkbox.dataset.itemId;
      toggleTodoCompletion(todoItemId);
    });
  });
}

export { renderTodos };
