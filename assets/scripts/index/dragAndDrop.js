import { todos, saveToLocalStorage } from '../data/todoData.js';
import { renderTodos } from './renderTodos.js';

let draggedElement;
let touchStartX, touchStartY;
let cloneElement;

//Handles the drag start event.
function handleDragStart(event) {
  draggedElement = event.target;
  event.dataTransfer.effectAllowed = 'move';
}

//Handles the drag over event.
function handleDragOver(event) {
  event.preventDefault();
}

//Handles the drag enter event.
function handleDragEnter(event) {
  event.target.classList.add('dragenter');
}

//Handles the drag leave event.
function handleDragLeave(event) {
  event.target.classList.remove('dragenter');
}

//Handles the drop event.
function handleDrop(event) {
  event.preventDefault();
  const targetElement = event.target.closest('.js-todo__item-wrapper');
  if (targetElement && targetElement !== draggedElement) {
    const draggedIndex = parseInt(draggedElement.dataset.originalIndex, 10);
    const droppedIndex = parseInt(targetElement.dataset.originalIndex, 10);
    if (!isNaN(draggedIndex) && !isNaN(droppedIndex)) {
      const movedTodo = todos.splice(draggedIndex, 1)[0];
      todos.splice(droppedIndex, 0, movedTodo);
      saveToLocalStorage();
      renderTodos();
    }
  }
  event.target.classList.remove('dragenter');
}

//Handles the drag end event.
function handleDragEnd() {
  draggedElement = null;
}

//Handles the touch start event.
function handleTouchStart(event) {
  if (event.target.classList.contains('js-todo__item-custom-checkbox')) {
    return;
  }

  draggedElement = event.target.closest('.js-todo__item-wrapper');
  touchStartX = event.touches[0].clientX;
  touchStartY = event.touches[0].clientY;

  cloneElement = draggedElement.cloneNode(true);
  cloneElement.classList.add('is_dragging');
  cloneElement.style.position = 'absolute';
  cloneElement.style.pointerEvents = 'none';
  document.body.appendChild(cloneElement);

  moveElement(cloneElement, touchStartX, touchStartY);
}

//Handles the touch move event.
function handleTouchMove(event) {
  event.preventDefault();
  const touchX = event.touches[0].clientX;
  const touchY = event.touches[0].clientY;
  moveElement(cloneElement, touchX, touchY);
}

//Handles the touch end event.
function handleTouchEnd(event) {
  if (!draggedElement) return;

  const touchEndX = event.changedTouches[0].clientX;
  const touchEndY = event.changedTouches[0].clientY;
  const targetElement = document.elementFromPoint(touchEndX, touchEndY).closest('.js-todo__item-wrapper');
  if (targetElement && targetElement !== draggedElement) {
    const draggedIndex = parseInt(draggedElement.dataset.originalIndex, 10);
    const droppedIndex = parseInt(targetElement.dataset.originalIndex, 10);
    if (!isNaN(draggedIndex) && !isNaN(droppedIndex)) {
      todos.splice(droppedIndex, 0, todos.splice(draggedIndex, 1)[0]);
      saveToLocalStorage();
      renderTodos();
    }
  }
  document.body.removeChild(cloneElement);
  draggedElement = null;
  cloneElement = null;
}

//Moves the element to the specified coordinates.
function moveElement(element, x, y) {
  if (!draggedElement) return;

  element.style.left = `${x - element.offsetWidth / 2}px`;
  element.style.top = `${y - element.offsetHeight / 2}px`;
}

//Handles drag and touch events for todo items.
function handleDragAndTouchEvents() {
  const todoItems = document.querySelectorAll('.js-todo__item-wrapper');

  todoItems.forEach(item => {
    item.addEventListener('dragstart', handleDragStart);
    item.addEventListener('dragover', handleDragOver);
    item.addEventListener('dragenter', handleDragEnter);
    item.addEventListener('dragleave', handleDragLeave);
    item.addEventListener('drop', handleDrop);
    item.addEventListener('dragend', handleDragEnd);

    item.addEventListener('touchstart', handleTouchStart);
    item.addEventListener('touchmove', handleTouchMove);
    item.addEventListener('touchend', handleTouchEnd);
  });
}

export { handleDragAndTouchEvents };
