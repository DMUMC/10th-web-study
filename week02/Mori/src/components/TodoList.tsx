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
    <div className={`todo-list ${isCompleted ? 'todo-list--completed' : ''}`}>
      <h2 className="todo-list__title">{title}</h2>
      <ul className="todo-list__items">
        {filteredTodos.length === 0 ? (
          <li className="todo-item todo-item--empty">
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
