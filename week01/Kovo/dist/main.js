"use strict";
const todoInput = document.getElementById("todo-input");
const addBtn = document.getElementById("add-btn");
const todoList = document.getElementById("todo-list");
const doneList = document.getElementById("done-list");
let todos = [];

// 해야 할 일 목록 렌더링

function renderTodos() {
    todoList.innerHTML = "";
    doneList.innerHTML = "";
    todos.forEach((todo) => {
        const li = document.createElement("li");
        li.className = "todo__item";
        const span = document.createElement("span");
        span.className = "todo__text";
        span.textContent = todo.text;
        const button = document.createElement("button");
        button.className = "todo__button";
        if (!todo.completed) {
            button.textContent = "완료";
            button.addEventListener("click", () => completeTodo(todo.id));
            li.appendChild(span);
            li.appendChild(button);
            todoList.appendChild(li);
        }
        else {
            button.textContent = "삭제";
            button.classList.add("todo__button--delete");
            button.addEventListener("click", () => deleteTodo(todo.id));
            li.appendChild(span);
            li.appendChild(button);
            doneList.appendChild(li);
        }
    });
}
// 할 일 추가!
function addTodo() {
    const text = todoInput.value.trim();
    if (text === "") {
        alert("할 일을 입력해주세요.");
        todoInput.focus();
        return;
    }
    const newTodo = {
        id: Date.now(),
        text: text,
        completed: false,
    };
    todos.push(newTodo);
    todoInput.value = "";
    renderTodos();
}
// 해당 내용 완료 처리
function completeTodo(id) {
    todos = todos.map((todo) => todo.id === id ? Object.assign(Object.assign({}, todo), { completed: true }) : todo);
    renderTodos();
}
// 해당 내용 삭제 처리
function deleteTodo(id) {
    todos = todos.filter((todo) => todo.id !== id);
    renderTodos();
}
// 이벤트 연결
addBtn.addEventListener("click", addTodo);
todoInput.addEventListener("keydown", (event) => {
    if (event.key === "Enter") {
        addTodo();
    }
});
// 최초 렌더링
renderTodos();
