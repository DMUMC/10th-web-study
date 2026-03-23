type Todo = {
  id: number
  text: string
  completed: boolean
}

type TodoItemProps = {
  todo: Todo
  handleToggleTodo: (id: number) => void
  handleDeleteTodo: (id: number) => void
}

function TodoItem({
  todo,
  handleToggleTodo,
  handleDeleteTodo,
}: TodoItemProps) {
  return (
    <li className="todo-item">
      <span className={todo.completed ? 'completed' : ''}>
        {todo.text}
      </span>

      <button onClick={() => handleToggleTodo(todo.id)}>
        {todo.completed ? '취소' : '완료'}
      </button>

      <button onClick={() => handleDeleteTodo(todo.id)}>삭제</button>
    </li>
  )
}

export default TodoItem