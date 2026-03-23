import TodoItem from './TodoItem'
import { useTodo } from '../context/TodoContext'

function TodoList() {
  const { todos, handleToggleTodo, handleDeleteTodo } = useTodo()

  return (
    <>
      <div className="todo-header">
        <span>할 일</span>
        <span>완료</span>
        <span>삭제</span>
      </div>

      <ul className="todo-list">
        {todos.map((todo) => (
          <TodoItem
            key={todo.id}
            todo={todo}
            handleToggleTodo={handleToggleTodo}
            handleDeleteTodo={handleDeleteTodo}
          />
        ))}
      </ul>
    </>
  )
}

export default TodoList