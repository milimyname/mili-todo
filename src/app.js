import './main.scss';
import backImgDeskDark from '../images/bg-desktop-dark.jpg';
import backImgDeskLight from '../images/bg-desktop-light.jpg';
import moonIcon from '../images/icon-moon.svg';
import sunIcon from '../images/icon-sun.svg';
import checkIcon from '../images/icon-check.svg';
import closeIcon from '../images/icon-cross.svg';

const body = document.querySelector('.container');
const headerContainer = document.querySelector('.header__box');
const todosContainer = document.querySelector('.main__todos-box');
let todos = todosContainer.querySelectorAll('.todo');
const inputTodo = document.querySelector('.todo__input');
const btnClear = document.querySelector('.nav__btn');
const todoLeft = document.querySelector('.nav__items-left');
const navs = document.querySelectorAll('.nav');
const navLists = document.querySelectorAll('.nav__list');
let dragSrcEl;

// Set the background image to the body element
body.style.backgroundImage = `url(${backImgDeskDark})`;

// Set a moon icon in the header container and add a class
headerContainer.insertAdjacentHTML('beforeend', moonIcon);
headerContainer.querySelector('svg').setAttribute('class', 'header__icon-moon');

// Toggle the themes

document.addEventListener('click', (e) => {
  const iconMoon = e.target.closest('.header__icon-moon');
  const iconSun = e.target.closest('.header__icon-sun');
  if (iconMoon) {
    iconMoon.remove();
    headerContainer.insertAdjacentHTML('beforeend', sunIcon);
    headerContainer.lastChild.setAttribute('class', 'header__icon-sun');

    // Set the background image to the body element
    body.style.backgroundImage = `url(${backImgDeskLight})`;
    body.style.backgroundColor = 'white';

    document.querySelectorAll('.todo').forEach((todo) => {
      todo.classList.remove('todo--dark');
      todo.classList.add('todo--white');
      todo
        .querySelector('.todo__icon-background')
        .classList.remove('todo__icon-background--black');
      todo
        .querySelector('.todo__icon-background')
        .classList.add('todo__icon-background--white');
    });

    navs.forEach((nav) => {
      nav.classList.remove('nav--dark');
      nav.classList.add('nav--white');
    });

    navLists.forEach((list) => {
      list.querySelectorAll('.nav__link').forEach((link) => {
        link.classList.add('completed');
        link.classList.remove('nav__link--normal');
      });
    });

    btnClear.classList.remove('nav__btn--dark');
    btnClear.classList.add('nav__btn--white');

    document.querySelector('.attribution').style.color = 'hsl(235, 24%, 19%)';
  }

  if (iconSun) {
    iconSun.remove();
    headerContainer.insertAdjacentHTML('beforeend', moonIcon);
    headerContainer.lastChild.setAttribute('class', 'header__icon-moon');

    // Set the background image to the body element
    body.style.backgroundImage = `url(${backImgDeskDark})`;
    body.style.backgroundColor = 'hsl(235, 21%, 11%)';

    document.querySelectorAll('.todo').forEach((todo) => {
      todo.classList.remove('todo--white');
      todo.classList.add('todo--dark');
      todo
        .querySelector('.todo__icon-background')
        .classList.remove('todo__icon-background--white');
      todo
        .querySelector('.todo__icon-background')
        .classList.add('todo__icon-background--black');
    });

    navs.forEach((nav) => {
      nav.classList.remove('nav--white');
      nav.classList.add('nav--dark');
    });

    navLists.forEach((list) => {
      list.querySelectorAll('.nav__link').forEach((link) => {
        link.classList.remove('completed');
        link.classList.add('normal');
      });
    });

    btnClear.classList.remove('nav__btn--white');
    btnClear.classList.add('nav__btn--add');

    document.querySelector('.attribution').style.color = 'white';
  } else {
    return;
  }
});

// Display the amount of todos
todoLeft.textContent = todos.length;

const displayTodosLeft = function (number = 0) {
  todos = todosContainer.querySelectorAll('.todo');

  if (todos.length === 0) todoLeft.textContent = number;

  todos.forEach((todo) => {
    if (todo.style.display === 'none') {
      todoLeft.textContent = todos.length - number;
    } else {
      todoLeft.textContent = todos.length;
    }
  });
};

// Add a close icon in every todo
todosContainer.addEventListener('mouseover', function (e) {
  const todo = e.target.closest('.todo');
  // Guard line
  if (!todo) return;
  const arrOfTodoChildren = Array.from(todo.children);
  if (arrOfTodoChildren.length <= 2) {
    todo.insertAdjacentHTML('beforeend', closeIcon);
    todo.lastChild.setAttribute('class', 'todo__icon-close');
    todo.style.justifyContent = 'space-between';
  }
  const iconBackground = todo.querySelector('.todo__icon-background');
  if (iconBackground.children.length < 1) {
    iconBackground.classList.add('icon-hover');
  }
});

// Remove a close icon when mouse leaves a todo

const removeCloseIcon = function () {
  todos.forEach((todo) => {
    todo.addEventListener('mouseleave', () => {
      const lastChildOfTodo = todo.lastChild;
      const iconBackground = todo.querySelector('.todo__icon-background');
      todo.style.justifyContent = 'start';
      iconBackground.classList.remove('icon-hover');

      if (lastChildOfTodo.classList?.contains('todo__icon-close')) {
        todo.querySelector('.todo__icon-close').remove();
      }
    });
  });
};

removeCloseIcon();

// Delete a todo
todosContainer.addEventListener('click', (e) => {
  const todo = e.target.closest('.todo');
  const btnDelete = e.target.closest('.todo__icon-close');

  if (!btnDelete) return;
  todo.remove();

  // Display the amount of todos
  displayTodosLeft();
});

// Mark a todo as completed
document.addEventListener('click', (e) => {
  const todo = e.target.closest('.todo');
  const check = todo?.querySelector('.todo__icon-background');

  if (
    !check ||
    e.target.classList?.contains('header__todo') ||
    e.target.classList?.contains('todo__input')
  )
    return;
  const todoText = todo.querySelector('.todo__paragraph');

  if (check.children.length < 1) {
    check.insertAdjacentHTML('afterbegin', checkIcon);
    check.firstChild.setAttribute('class', 'todo__icon');
    todo.dataset.checked = true;
    check.classList.add('icon-hovered');
  } else {
    check.firstChild.remove();
    todo.dataset.checked = false;
    check.classList.remove('icon-hovered');
  }
  todoText?.classList.toggle('line-through');
});

// Add a new todo in the todos container
inputTodo.addEventListener('keydown', (e) => {
  const keyEnter = e.key;
  const todoTemplate = `<div class="todo" id="${
    todos[0] ? +todos[0].id + 1 : 1
  }" draggable="true" data-checked="${
    inputTodo.closest('.header__todo').querySelector('.todo__icon-background')
      .children.length === 1
  }">
                          <span class="todo__icon-background"></span>
                          <p class="todo__paragraph">${inputTodo.value}</p>
                        </div>`;
  if (keyEnter !== 'Enter' || inputTodo.value === '') return;
  inputTodo.value = '';

  if (e.target.closest('.todo').firstChild)
    e.target.closest('.todo').children[0].classList.remove('icon-hovered');

  todosContainer.insertAdjacentHTML('afterbegin', todoTemplate);
  // Display the amount of todos
  displayTodosLeft();

  if (
    todos[0].dataset.checked === 'true' &&
    inputTodo.closest('.header__todo').querySelector('.todo__icon-background')
      .firstChild
  ) {
    todos[0]
      .querySelector('.todo__icon-background')
      .insertAdjacentElement(
        'afterbegin',
        inputTodo
          .closest('.header__todo')
          .querySelector('.todo__icon-background').firstChild
      );
    todos[0].querySelector('.todo__paragraph')?.classList.add('line-through');
    todos[0]
      .querySelector('.todo__icon-background')
      .classList.add('icon-hovered');
  }

  removeCloseIcon();
  dragAndDrop();
});

// Clear all completed todos

btnClear.addEventListener('click', () => {
  todos.forEach((todo) => {
    if (todo.dataset.checked === 'true') todo.remove();

    // Display the amount of todos
    displayTodosLeft();
  });
});

// Display active todos or completed todos

const activateLink = (list) => {
  list.querySelectorAll('.nav__link').forEach((link) => {
    link.classList.remove('nav__link--active');
    link.classList.add('completed');
  });
};
navLists.forEach((list) => {
  list.addEventListener('click', (e) => {
    e.preventDefault();
    if (e.target.textContent === 'Active') {
      activateLink(list);
      // Make it active
      e.target.classList.add('nav__link--active');
      e.target.classList.remove('completed');

      let numberOfHiddenTodos = 0;
      todos.forEach((todo) => {
        if (todo.dataset.checked === 'true') {
          todo.style.display = 'none';
          numberOfHiddenTodos = numberOfHiddenTodos + 1;
        }
      });
      // Display the amount of todos
      displayTodosLeft(numberOfHiddenTodos);
    }

    if (e.target.textContent === 'All') {
      activateLink(list);
      // Make it active
      e.target.classList.add('nav__link--active');
      e.target.classList.remove('completed');

      todos.forEach((todo) => {
        if (todo.style.display) todo.style.display = 'flex';
        // Display the amount of todos
        displayTodosLeft();
      });
    }

    if (e.target.textContent === 'Completed') {
      activateLink(list);
      // Make it active
      e.target.classList.remove('completed');

      todos.forEach((todo) => {
        const check = todo.querySelector('.todo__icon-background');
        todo.querySelector('.todo__paragraph').classList.toggle('line-through');

        if (check.children.length < 1) {
          check.insertAdjacentHTML('afterbegin', checkIcon);
          check.firstChild.setAttribute('class', 'todo__icon');
          todo.dataset.checked = true;
          check.classList.add('icon-hovered');
        } else {
          check.firstChild.remove();
          todo.dataset.checked = false;
          check.classList.remove('icon-hovered');
        }
      });
    }
  });
});

// Drag and drop todos

const dragAndDrop = function () {
  function handleDragStart(e) {
    this.style.opacity = '0.6';

    dragSrcEl = this;
    e.dataTransfer.effectAllowed = 'move';
    e.dataTransfer.setData('text/html', this.innerHTML);
  }

  function handleDragEnd(e) {
    this.style.opacity = '1';
    todos.forEach(function (todo) {
      todo.classList.remove('todo--over');
    });
  }

  function handleDragOver(e) {
    if (e.preventDefault) {
      e.preventDefault();
    }
    e.dataTransfer.dropEffect = 'move';
    return false;
  }

  function handleDragEnter(e) {
    this.classList.add('todo--over');
  }

  function handleDragLeave(e) {
    this.classList.remove('todo--over');
  }

  function handleDrop(e) {
    e.stopPropagation(); // stops the browser from redirecting.

    if (dragSrcEl !== this) {
      dragSrcEl.innerHTML = this.innerHTML;
      this.innerHTML = e.dataTransfer.getData('text/html');
    }

    return false;
  }
  todos.forEach(function (todo) {
    todo.addEventListener('dragstart', handleDragStart, false);
    todo.addEventListener('dragover', handleDragOver, false);
    todo.addEventListener('dragenter', handleDragEnter, false);
    todo.addEventListener('dragleave', handleDragLeave, false);
    todo.addEventListener('dragend', handleDragEnd, false);
    todo.addEventListener('drop', handleDrop, false);
  });
};
dragAndDrop();
