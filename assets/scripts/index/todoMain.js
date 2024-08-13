import { handleTodoInput, handleClearButton } from './eventHandlers.js';
import { renderTodos } from './renderTodos.js';

const todoInputElement = document.querySelector('.js-todo__input');
const todoFilterButtons = document.querySelectorAll('.js-todo__filter');
const clearButton = document.querySelector('.js-todo__list-clear-button');

todoInputElement.addEventListener('keypress', handleTodoInput);

todoFilterButtons.forEach(button => {
  button.addEventListener('click', event => {
    setTodoFilter(event);
  });
});

clearButton.addEventListener('click', handleClearButton);

let currentFilter = 'all';

//Sets the filter for the todo list and renders the updated list.
function setTodoFilter(event) {
  todoFilterButtons.forEach(button => button.classList.remove('active'));
  event.target.classList.add('active');
  currentFilter = event.target.id;
  renderTodos();
}

//Toggles the light and dark mode for the application.
function toggleLightAndDarkMode() {
  const toggleImage = document.querySelector('.toggle');
  const mainTodo = document.querySelector('.js-todo');
  const body = document.body;

  toggleImage.addEventListener('click', () => {
    const isLightMode = body.classList.toggle('light-mode');
    toggleImage.setAttribute('aria-pressed', isLightMode);

    if (isLightMode) {
      toggleImage.src = './assets/images/icon-moon.svg';
      mainTodo.classList.add('light');
    } else {
      toggleImage.src = './assets/images/icon-sun.svg';
      mainTodo.classList.remove('light');
    }
  });
}

toggleLightAndDarkMode();

export { renderTodos, currentFilter };
