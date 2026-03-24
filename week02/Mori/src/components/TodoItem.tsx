import { type Todo } from '../context/TodoContext.tsx'
import { useTodoContext } from '../context/useTodoContext.ts'

type TodoItemProps = {
  todo: Todo
  isCompleted: boolean
}

export function TodoItem({ todo, isCompleted }: TodoItemProps) {
  const { toggleTodo, deleteTodo } = useTodoContext()

  return (
    <li className="flex items-center justify-between gap-3 rounded-xl border border-blue-200 bg-blue-50 px-3 py-2 dark:border-blue-900 dark:bg-slate-700">
      <span className="overflow-hidden text-ellipsis whitespace-nowrap">
        {todo.text}
      </span>
      <div className="flex gap-2">
        {!isCompleted && (
          <button
            className="rounded-lg bg-green-500 px-3 py-2 font-bold text-white transition hover:bg-green-600"
            type="button"
            onClick={() => toggleTodo(todo.id)}
          >
            완료
          </button>
        )}
        {isCompleted && (
          <button
            className="rounded-lg bg-green-500 px-3 py-2 font-bold text-white transition hover:bg-green-600"
            type="button"
            onClick={() => toggleTodo(todo.id)}
          >
            취소
          </button>
        )}
        <button
          className="rounded-lg bg-red-500 px-3 py-2 font-bold text-white transition hover:bg-red-600"
          type="button"
          onClick={() => deleteTodo(todo.id)}
        >
          삭제
        </button>
      </div>
    </li>
  )
}
