"use strict";
function getRequiredElement(id) {
    const element = document.getElementById(id);
    if (!element) {
        throw new Error(`필수 요소를 찾지 못했습니다: ${id}`);
    }
    return element;
}
function createEmptyListItem(mode) {
    const li = document.createElement("li");
    li.className = "todo-item todo-item--empty";
    li.textContent =
        mode === "active" ? "할 일이 없습니다." : "완료된 할 일이 없습니다.";
    return li;
}
function createTodoListItem(todo, mode) {
    const li = document.createElement("li");
    li.className = "todo-item";
    const text = document.createElement("span");
    text.className = "todo-item__text";
    text.textContent = todo.text;
    const actions = document.createElement("div");
    actions.className = "todo-item__actions";
    const button = document.createElement("button");
    button.type = "button";
    button.dataset.id = String(todo.id);
    if (mode === "active") {
        button.className = "todo-item__complete-button";
        button.textContent = "완료";
        button.setAttribute("aria-label", "할 일을 완료로 이동");
    }
    else {
        button.className = "todo-item__delete-button";
        button.textContent = "삭제";
        button.setAttribute("aria-label", "완료 항목 삭제");
    }
    actions.appendChild(button);
    li.appendChild(text);
    li.appendChild(actions);
    return li;
}
const todoForm = getRequiredElement("todoForm");
const todoInput = getRequiredElement("todoInput");
const todoListItems = getRequiredElement("todoListItems");
const completedListItems = getRequiredElement("completedListItems");
let nextId = 1;
const activeTodos = [];
const completedTodos = [];
function renderList(ul, todos, mode) {
    ul.innerHTML = "";
    if (todos.length === 0) {
        ul.appendChild(createEmptyListItem(mode));
        return;
    }
    const fragment = document.createDocumentFragment();
    for (const todo of todos) {
        fragment.appendChild(createTodoListItem(todo, mode));
    }
    ul.appendChild(fragment);
}
function render() {
    renderList(todoListItems, activeTodos, "active");
    renderList(completedListItems, completedTodos, "completed");
}
function addTodo(text) {
    const todo = { id: nextId++, text };
    activeTodos.push(todo);
    render();
}
function completeTodo(id) {
    const index = activeTodos.findIndex((t) => t.id === id);
    if (index === -1)
        return;
    const todo = activeTodos.splice(index, 1)[0];
    if (!todo)
        return;
    completedTodos.push(todo);
    render();
}
function deleteCompletedTodo(id) {
    const index = completedTodos.findIndex((t) => t.id === id);
    if (index === -1)
        return;
    completedTodos.splice(index, 1);
    render();
}
todoForm.addEventListener("submit", (event) => {
    event.preventDefault();
    const text = todoInput.value.trim();
    if (!text)
        return;
    addTodo(text);
    todoInput.value = "";
    todoInput.focus();
});
todoListItems.addEventListener("click", (event) => {
    const target = event.target;
    if (!target)
        return;
    const button = target.closest("button.todo-item__complete-button");
    if (!button)
        return;
    const idStr = button.dataset.id;
    if (!idStr)
        return;
    completeTodo(Number(idStr));
});
completedListItems.addEventListener("click", (event) => {
    const target = event.target;
    if (!target)
        return;
    const button = target.closest("button.todo-item__delete-button");
    if (!button)
        return;
    const idStr = button.dataset.id;
    if (!idStr)
        return;
    deleteCompletedTodo(Number(idStr));
});
render();
