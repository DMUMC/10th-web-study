"use strict";
const todoInput = document.getElementById('todo-input');
const todoForm = document.getElementById('todo-form');
const todoList = document.getElementById('todo-list');
const doneList = document.getElementById('done-list');
let todos = [];
let doneTasks = [];
const renderTasks = () => {
    todoList.innerHTML = '';
    doneList.innerHTML = '';
    todos.forEach((todo) => {
        const li = createTodoElement(todo, false);
        todoList.appendChild(li);
    });
    doneTasks.forEach((todo) => {
        const li = createTodoElement(todo, true);
        doneList.appendChild(li);
    });
};
const getTodoText = () => {
    return todoInput.value.trim();
};
const addTodo = (text) => {
    todos.push({ id: Date.now(), text });
    todoInput.value = '';
    renderTasks();
};
const compleTodo = (todo) => {
    todos = todos.filter((t) => t.id !== todo.id);
    doneTasks.push(todo);
    renderTasks();
};
const deleteTodo = (todo) => {
    doneTasks = doneTasks.filter((t) => t.id !== todo.id);
    renderTasks();
};
const createTodoElement = (todo, isDone) => {
    const li = document.createElement('li');
    li.classList.add('redner-container__item');
    const button = document.createElement('button');
    const checkbox = document.createElement('input');
    checkbox.type = 'checkbox';
    button.classList.add('render-container__item-button');
    checkbox.classList.add('render-container__item-checkbox');
    const span = document.createElement('span');
    span.textContent = todo.text;
    if (isDone) {
        checkbox.checked = true;
        span.style.textDecoration = 'line-through';
    }
    checkbox.addEventListener('change', () => {
        if (!isDone && checkbox.checked) {
            compleTodo(todo);
        }
    });
    li.appendChild(checkbox);
    li.appendChild(span);
    if (isDone) {
        const button = document.createElement('button');
        button.textContent = '삭제';
        button.classList.add('render-container__item-button');
        button.style.backgroundColor = '#dfafda';
        button.addEventListener('click', () => {
            deleteTodo(todo);
        });
        li.appendChild(button);
    }
    return li;
};
todoForm.addEventListener('submit', (event) => {
    event.preventDefault();
    const text = getTodoText();
    if (text) {
        addTodo(text);
    }
});
renderTasks();
