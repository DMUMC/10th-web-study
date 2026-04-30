import { useMemo } from 'react'
import { useTodoContext } from '../context/useTodoContext.ts'
import { TodoItem } from './TodoItem.tsx'

type TodoListProps = {
  title: string
  isCompleted: boolean
}

export function TodoList({ title, isCompleted }: TodoListProps) {
  const { todos } = useTodoContext()

  const filteredTodos = useMemo(
    () => todos.filter((todo) => todo.completed === isCompleted),
    [isCompleted, todos],
  )

  return (
    <div
      className={`min-h-60 rounded-2xl border p-4 ${
        isCompleted
          ? 'border-slate-300 bg-slate-100 dark:border-slate-600 dark:bg-slate-800'
          : 'border-blue-200 bg-white dark:border-blue-800 dark:bg-slate-900'
      }`}
    >
      <h2 className="mb-3 text-lg font-semibold">{title}</h2>
      <ul className="flex list-none flex-col gap-2.5 p-0">
        {filteredTodos.length === 0 ? (
          <li className="rounded-xl border border-dashed border-slate-300 px-3 py-2 text-slate-500 dark:border-slate-600 dark:text-slate-400">
            {isCompleted ? '완료된 항목이 없습니다' : '할 일을 추가해보세요'}
          </li>
        ) : (
          filteredTodos.map((todo) => (
            <TodoItem key={todo.id} todo={todo} isCompleted={isCompleted} />
          ))
        )}
      </ul>
    </div>
  )
}
