import { userMok } from "./userMok.js";

const qS = el => document.querySelector(el);
const cE = el => document.createElement(el);

const createEl = (type, cls = null, textContent = null, parent = null, ...attrs) => {
  const element = cE(type);
  element.className = cls
  element.textContent = textContent;
  attrs.length > 0 ? attrs.forEach(attr => element.setAttribute(attr?.name, attr?.value)) : '';
  element
  parent?.appendChild(element);
  return element;
};

const getTodoListFromUserId = async (userId) => {
  const res = await fetch(`https://dummyjson.com/todos/user/${userId}`);
  const data = await res.json();
  return data
};

const postTodo = async (todo) => {
  const res = await fetch(`https://dummyjson.com/todos/add`, {
    method: 'POST',
    headers: { 'content-type': 'application/json' },
    body: JSON.stringify(todo)
  }
  );
};

const deleteTodo = async (todoId) => {
  const res = await fetch(`https://dummyjson.com/todos/${todoId}`, { method: 'DELETE' });
  const data = await res.json();
  return data;
};

const createTodoList = (todos, userName) => {
  const todoWrap = createEl('div', 'wrapTodo', null, mainEl);
  const todoUser = createEl('h1', 'titleTodo', `todo di ${userName}`, todoWrap);
  const addTodoForm = createEl('form', 'addTodoForm', null, todoWrap);
  const addTodo = createEl('input', 'addTodo', null, addTodoForm, { name: 'type', value: 'text' }, { name: 'placeholder', value: 'Inserisci una todo' }, { name: 'autocomplete', value: 'off' });
  const submitForm = createEl('input', 'submitTodo', 'aggiungi todo', addTodoForm, { name: 'type', value: 'submit' });
  const todoList = createEl('div', 'wrapTodoList', null, todoWrap);

  todos.forEach((obj) => {
    todoList.appendChild(createTodoEl(obj, todoList))
  });

  addTodoForm.addEventListener('submit', (e) => {
    e.preventDefault();
    if (e.target[0].value === '') {
      console.log(e.target[0].value);
      alert('non puoi inserire una todo vuota.')
    } else {
      const todo = {
        todo: e.target[0].value,
        completed: false,
        userId: 1
      }
      postTodo(todo);
      todoList.appendChild(createTodoEl(todo, todoList))
      e.target[0].value = '';
    }
  })


  return todoWrap;
}

const createTodoEl = (obj, parent) => {
  const todoEl = createEl('div', 'todoEl', null, null);
  const checkTodoEl = createEl('i', obj.completed ? 'fa-solid fa-check-double' : 'fa-solid fa-clipboard-list', null, todoEl);
  const todoDescriptionEl = createEl('p', 'todoDescription', obj.todo, todoEl);
  const deleteTodoEl = createEl('i', 'fa-solid fa-trash', null, todoEl);

  checkTodoEl.addEventListener('click', () => {
    obj.completed = !obj.completed
    if (obj.completed) {
      checkTodoEl.className = 'fa-solid fa-check-double';
    } else {
      checkTodoEl.className = 'fa-solid fa-clipboard-list';
    }
  });

  deleteTodoEl.addEventListener('click', () => {
    deleteTodo(obj.id)
    parent.removeChild(todoEl);
  })

  return todoEl;
}

const createLoginForm = () => {
  const formEl = createEl('form', 'card', null, mainEl);
  const titleForm = createEl('a', 'login', 'logIn', formEl);
  const wrapUserName = createEl('div', 'inputBox', null, formEl);
  const userNameInput = createEl('input', null, null, wrapUserName, { name: 'required', value: 'required' }, { name: 'type', value: 'text' }, { name: 'autocomplete', value: 'off' });
  const spanUserName = createEl('span', 'user', 'userName', wrapUserName);
  const wrapPassword = createEl('div', 'inputBox', null, formEl);
  const passwordInput = createEl('input', null, null, wrapPassword, { name: 'required', value: 'required' }, { name: 'type', value: 'password' }, { name: 'autocomplete', value: 'off' });
  const spanPassword = createEl('span', null, 'password', wrapPassword);
  const enterButton = createEl('input', 'enter', 'enter', formEl, { name: 'type', value: 'submit' });

  formEl.addEventListener('submit', (e) => {
    e.preventDefault();
    const userLog = userMok.find(({ username, password }) =>
      username.toLowerCase() === e.target[0].value.toLowerCase() &&
      password.toLowerCase() === e.target[1].value.toLowerCase()
    );
    if (userLog) {
      console.log(userLog);
      mainEl.textContent = '';
      getTodoListFromUserId(userLog.id).then(({ todos }) => createTodoList(todos, e.target[0].value));
      console.log(userLog.id)
    }
  })

  return formEl;
}

const mainEl = qS('.main');

createLoginForm()