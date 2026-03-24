import { type Todo } from '../context/TodoContext.tsx'
import { useTodoContext } from '../context/useTodoContext.ts'
import { TodoActionButton } from './TodoActionButton.tsx'

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
          <TodoActionButton
            label="완료"
            onClick={() => toggleTodo(todo.id)}
            variant="green"
          />
        )}
        {isCompleted && (
          <TodoActionButton
            label="취소"
            onClick={() => toggleTodo(todo.id)}
            variant="green"
          />
        )}
        <TodoActionButton
          label="삭제"
          onClick={() => deleteTodo(todo.id)}
          variant="red"
        />
      </div>
    </li>
  )
}
