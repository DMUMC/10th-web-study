const todoInput = document.getElementById('todo-input') as HTMLInputElement;
const todoForm  = document.getElementById('todo-form')  as HTMLFormElement;
const todoList  = document.getElementById('todo-list')  as HTMLUListElement;
const doneList  = document.getElementById('done-list')  as HTMLUListElement;

type Todo = {
  id: number;
  text: string;
};

let todos: Todo[] = [];
let doneTasks: Todo[] = [];

function renderTask(): void {
  todoList.innerHTML = '';
  doneList.innerHTML = '';

  todos.forEach(function (todo): void {
    const li = createTodoElement(todo, false);
    todoList.appendChild(li);
  });

  doneTasks.forEach(function (todo): void {
    const li = createTodoElement(todo, true);
    doneList.appendChild(li);
  });
}

function getTodoText(): string {
  return todoInput.value.trim();
}

function addTodo(text: string): void {
  todos.push({ id: Date.now(), text });
  todoInput.value = '';
  renderTask();
}

function completeTodo(todo: Todo): void {
  todos = todos.filter(function (t): boolean { return t.id !== todo.id; });
  doneTasks.push(todo);
  renderTask();
}

function deleteTodo(todo: Todo): void {
  doneTasks = doneTasks.filter(function (t): boolean { return t.id !== todo.id; });
  renderTask();
}

function createTodoElement(todo: Todo, isDone: boolean): HTMLLIElement {
  const li = document.createElement('li');
  li.classList.add('render-container__item');

  // 리뷰 피드백 반영: p 태그를 생성하여 텍스트를 감싸줌
  const text = document.createElement('p');
  text.classList.add('render-container__item-text');
  text.textContent = todo.text;
  li.appendChild(text);

  const button = document.createElement('button');
  button.classList.add('render-container__item-button');

  if (isDone) {
    button.textContent = '삭제';
    button.style.backgroundColor = '#dc3545';
  } else {
    button.textContent = '완료';
    button.style.backgroundColor = '#28a745';
  }

  button.addEventListener('click', function (): void {
    if (isDone) {
      deleteTodo(todo);
    } else {
      completeTodo(todo);
    }
  });

  li.appendChild(button);
  return li;
}

todoForm.addEventListener('submit', function (event: Event): void {
  event.preventDefault();
  const text = getTodoText();
  if (text) {
    addTodo(text);
  }
});