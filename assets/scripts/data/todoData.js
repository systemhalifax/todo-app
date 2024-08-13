import generateUUID from '../utils/generateUUID.js';

let todos = JSON.parse(localStorage.getItem('todos')) || [];

//Adds a new todo item to the list.
export function addTodo(todoItemName) {
  const trimmedName = todoItemName.trim();

  if (trimmedName) {
    todos.push({
      id: generateUUID(),
      name: trimmedName,
      completed: false
    });
    saveToLocalStorage();
  }
}

//Removes a todo item from the list by its ID.
export function removeTodo(todoItemId) {
  todos = todos.filter(todo => todo.id !== todoItemId);
  saveToLocalStorage();
}

//Clears completed todo items from the list.
export function clearCompleted() {
  todos = todos.filter(todo => !todo.completed);
  saveToLocalStorage();
}

//Retrieves a todo item by its ID.
export function getTodoById(todoItemId) {
  return todos.find(todo => todo.id === todoItemId);
}

//Saves the current state of the todo list to localStorage.
export function saveToLocalStorage() {
  localStorage.setItem('todos', JSON.stringify(todos));
}

export { todos };
