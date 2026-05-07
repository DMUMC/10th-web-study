interface TodoItem {
  id: number;
  text: string;
  completed: boolean;
}

const todoInput = document.getElementById("todo-input") as HTMLInputElement;
const addBtn = document.getElementById("add-btn") as HTMLButtonElement;
const todoList = document.getElementById("todo-list") as HTMLUListElement;
const doneList = document.getElementById("done-list") as HTMLUListElement;

let todos: TodoItem[] = [];

// 해야 할 일 목록 렌더링
function renderTodos(): void {
  todoList.innerHTML = "";
  doneList.innerHTML = "";

  todos.forEach((todo: TodoItem) => {
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
    } else {
      button.textContent = "삭제";
      button.classList.add("todo__button--delete");
      button.addEventListener("click", () => deleteTodo(todo.id));
      li.appendChild(span);
      li.appendChild(button);
      doneList.appendChild(li);
    }
  });
}

// 해야 할 일 추가
function addTodo(): void {
  const text: string = todoInput.value.trim();

  if (text === "") {
    alert("할 일을 입력해주세요.");
    todoInput.focus();
    return;
  }

  const newTodo: TodoItem = {
    id: Date.now(),
    text: text,
    completed: false,
  };

  todos.push(newTodo);
  todoInput.value = "";
  renderTodos();
}

// 해야 할 일 완료 처리
function completeTodo(id: number): void {
  todos = todos.map((todo: TodoItem) =>
    todo.id === id ? { ...todo, completed: true } : todo
  );
  renderTodos();
}

// 해야 할 일 삭제 처리
function deleteTodo(id: number): void {
  todos = todos.filter((todo: TodoItem) => todo.id !== id);
  renderTodos();
}

// 이벤트 연결
addBtn.addEventListener("click", addTodo);

todoInput.addEventListener("keydown", (event: KeyboardEvent) => {
  if (event.key === "Enter") {
    addTodo();
  }
});

// 최초 렌더링
renderTodos();