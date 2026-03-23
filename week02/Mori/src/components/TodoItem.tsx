import { type Todo } from '../context/TodoContext.tsx'
import { useTodoContext } from '../context/useTodoContext.ts'

type TodoItemProps = {
  todo: Todo
  isCompleted: boolean
}

export function TodoItem({ todo, isCompleted }: TodoItemProps) {
  const { toggleTodo, deleteTodo } = useTodoContext()

  return (
    <li className="todo-item">
      <span className="todo-item__text">{todo.text}</span>
      <div className="todo-item__actions">
        {!isCompleted && (
          <button
            className="todo-item__complete-button"
            type="button"
            onClick={() => toggleTodo(todo.id)}
          >
            완료
          </button>
        )}
        {isCompleted && (
          <button
            className="todo-item__complete-button"
            type="button"
            onClick={() => toggleTodo(todo.id)}
          >
            취소
          </button>
        )}
        <button
          className="todo-item__delete-button"
          type="button"
          onClick={() => deleteTodo(todo.id)}
        >
          삭제
        </button>
      </div>
    </li>
  )
}
