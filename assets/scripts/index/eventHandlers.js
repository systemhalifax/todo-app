import { addTodo, removeTodo, clearCompleted, getTodoById, saveToLocalStorage } from '../data/todoData.js';
import { renderTodos } from './renderTodos.js';

//Handles the addition of a new todo item when Enter key is pressed.
function handleTodoInput(event) {
  const todoInputElement = document.querySelector('.js-todo__input');
  if (event.key === 'Enter') {
    const todoItemName = todoInputElement.value;
    addTodoItem(todoItemName);
    todoInputElement.value = '';
  }
}

//Handles the removal of a todo item.
function handleTodoRemoval(event) {
  const todoItemId = event.target.dataset.itemId;
  removeTodoItem(todoItemId);
}

//Handles the clearing of completed todo items.
function handleClearButton() {
  clearCompletedTodos();
}

//Adds a new todo item and renders the updated list.
function addTodoItem(todoItemName) {
  addTodo(todoItemName);
  renderTodos();
}

//Removes a todo item and renders the updated list.
function removeTodoItem(todoItemId) {
  removeTodo(todoItemId);
  renderTodos();
}

//Clears completed todos and renders the updated list.
function clearCompletedTodos() {
  clearCompleted();
  renderTodos();
}

//Toggles the completion status of a todo item and renders the updated list.
function toggleTodoCompletion(todoItemId) {
  const todo = getTodoById(todoItemId);
  if (todo) {
    todo.completed = !todo.completed;
    saveToLocalStorage();
    renderTodos();
  }
}

export { handleTodoInput, handleTodoRemoval, handleClearButton, toggleTodoCompletion };
