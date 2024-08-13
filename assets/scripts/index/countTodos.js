import { todos } from "../data/todoData.js";

//Updates the count of remaining todos in the UI.
function updateRemainingTodos() {
  const itemsLeftElement = document.querySelector('.js-todo__items-left');
  const remainingCount = todos.filter(todo => !todo.completed).length;

  itemsLeftElement.innerHTML = `${remainingCount || 0} items left`;
}

export { updateRemainingTodos };
