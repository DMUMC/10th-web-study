// ── 타입 정의 ──────────────────────────────────────────────
interface TodoItem {
    id: string;
    text: string;
    status: "todo" | "done";
  }
  
  // ── DOM 헬퍼 ───────────────────────────────────────────────
  function qs<T extends Element>(
    selector: string,
    root: Document | Element = document
  ): T {
    const el = root.querySelector<T>(selector);
    if (!el) throw new Error(`Element not found: ${selector}`);
    return el;
  }
  
  // ── TodoApp 클래스 ─────────────────────────────────────────
  class TodoApp {
    private items: TodoItem[] = [];
  
    private readonly input: HTMLInputElement;
    private readonly btnAdd: HTMLButtonElement;
    private readonly todoList: HTMLUListElement;
    private readonly doneList: HTMLUListElement;
    private readonly todoEmpty: HTMLLIElement;
    private readonly doneEmpty: HTMLLIElement;
  
    constructor() {
      this.input     = qs<HTMLInputElement>("#todo-input");
      this.btnAdd    = qs<HTMLButtonElement>("#btn-add");
      this.todoList  = qs<HTMLUListElement>("#todo-list");
      this.doneList  = qs<HTMLUListElement>("#done-list");
      this.todoEmpty = qs<HTMLLIElement>("#todo-empty");
      this.doneEmpty = qs<HTMLLIElement>("#done-empty");
  
      this.bindEvents();
      this.updateEmpty();
    }
  
    // ── 이벤트 바인딩 ──────────────────────────────────────
    private bindEvents(): void {
      this.input.addEventListener("keydown", (e: KeyboardEvent) => {
        if (e.key === "Enter") this.addTodo();
      });
      this.btnAdd.addEventListener("click", () => this.addTodo());
    }
  
    // ── ID 생성 ────────────────────────────────────────────
    private generateId(): string {
      return `todo-${Date.now()}-${Math.random().toString(36).slice(2, 7)}`;
    }
  
    // ── 빈 상태 갱신 ───────────────────────────────────────
    private updateEmpty(): void {
      const todoLen = this.todoList.querySelectorAll(".todo-item").length;
      const doneLen = this.doneList.querySelectorAll(".todo-item").length;
      this.todoEmpty.style.display = todoLen === 0 ? "" : "none";
      this.doneEmpty.style.display = doneLen === 0 ? "" : "none";
    }
  
    // ── 할 일 추가 ─────────────────────────────────────────
    private addTodo(): void {
      const text = this.input.value.trim();
      if (!text) {
        this.input.focus();
        return;
      }
  
      const item: TodoItem = {
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
  
    // ── 완료 처리 ──────────────────────────────────────────
    private completeTodo(id: string): void {
      const item = this.items.find((i) => i.id === id);
      if (!item) return;
      item.status = "done";
  
      const liEl = this.todoList.querySelector<HTMLLIElement>(
        `[data-id="${id}"]`
      );
      if (!liEl) return;
  
      liEl.classList.add("todo-item--removing");
      liEl.addEventListener(
        "animationend",
        () => {
          liEl.remove();
          this.doneList.appendChild(this.createDoneItem(item));
          this.updateEmpty();
        },
        { once: true }
      );
    }
  
    // ── 삭제 처리 ──────────────────────────────────────────
    private deleteTodo(id: string): void {
      const liEl = this.doneList.querySelector<HTMLLIElement>(
        `[data-id="${id}"]`
      );
      if (!liEl) return;
  
      liEl.classList.add("todo-item--removing");
      liEl.addEventListener(
        "animationend",
        () => {
          liEl.remove();
          this.items = this.items.filter((i) => i.id !== id);
          this.updateEmpty();
        },
        { once: true }
      );
    }
  
    // ── 할 일 아이템 생성 ──────────────────────────────────
    private createItem(item: TodoItem): HTMLLIElement {
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
  
    // ── 완료 아이템 생성 ───────────────────────────────────
    private createDoneItem(item: TodoItem): HTMLLIElement {
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
  
  // ── 앱 시작 ───────────────────────────────────────────────
  new TodoApp();