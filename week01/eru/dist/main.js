"use strict";
function qs(selector, root = document) {
    const el = root.querySelector(selector);
    if (!el)
        throw new Error(`Element not found: ${selector}`);
    return el;
}
class TodoApp {
    constructor() {
        this.items = [];
        this.input = qs("#todo-input");
        this.btnAdd = qs("#btn-add");
        this.todoList = qs("#todo-list");
        this.doneList = qs("#done-list");
        this.todoEmpty = qs("#todo-empty");
        this.doneEmpty = qs("#done-empty");
        this.bindEvents();
        this.updateEmpty();
    }
    bindEvents() {
        this.input.addEventListener("keydown", (e) => {
            if (e.key === "Enter")
                this.addTodo();
        });
        this.btnAdd.addEventListener("click", () => this.addTodo());
    }
    generateId() {
        return `todo-${Date.now()}-${Math.random().toString(36).slice(2, 7)}`;
    }
    updateEmpty() {
        const todoLen = this.todoList.querySelectorAll(".todo-item").length;
        const doneLen = this.doneList.querySelectorAll(".todo-item").length;
        this.todoEmpty.style.display = todoLen === 0 ? "" : "none";
        this.doneEmpty.style.display = doneLen === 0 ? "" : "none";
    }
    addTodo() {
        const text = this.input.value.trim();
        if (!text) {
            this.input.focus();
            return;
        }
        const item = {
            id: this.generateId(),
            text,
            status: "todo",
        };
        this.items.push(item);
        this.todoList.appendChild(this.createItem(item));
        this.input.value = "";
        this.input.focus();
        this.updateEmpty();
    }
    completeTodo(id) {
        const item = this.items.find((i) => i.id === id);
        if (!item)
            return;
        item.status = "done";
        const liEl = this.todoList.querySelector(`[data-id="${id}"]`);
        if (!liEl)
            return;
        liEl.classList.add("todo-item--removing");
        liEl.addEventListener("animationend", () => {
            liEl.remove();
            this.doneList.appendChild(this.createDoneItem(item));
            this.updateEmpty();
        }, { once: true });
    }
    deleteTodo(id) {
        const liEl = this.doneList.querySelector(`[data-id="${id}"]`);
        if (!liEl)
            return;
        liEl.classList.add("todo-item--removing");
        liEl.addEventListener("animationend", () => {
            liEl.remove();
            this.items = this.items.filter((i) => i.id !== id);
            this.updateEmpty();
        }, { once: true });
    }
    createItem(item) {
        const li = document.createElement("li");
        li.className = "todo-item";
        li.dataset["id"] = item.id;
        const span = document.createElement("span");
        span.className = "todo-item__text";
        span.textContent = item.text;
        const btn = document.createElement("button");
        btn.className = "todo-item__btn todo-item__btn--complete";
        btn.textContent = "완료";
        btn.addEventListener("click", () => this.completeTodo(item.id));
        li.append(span, btn);
        return li;
    }
    createDoneItem(item) {
        const li = document.createElement("li");
        li.className = "todo-item todo-item--done";
        li.dataset["id"] = item.id;
        const span = document.createElement("span");
        span.className = "todo-item__text";
        span.textContent = item.text;
        const btn = document.createElement("button");
        btn.className = "todo-item__btn todo-item__btn--delete";
        btn.textContent = "삭제";
        btn.addEventListener("click", () => this.deleteTodo(item.id));
        li.append(span, btn);
        return li;
    }
}
new TodoApp();