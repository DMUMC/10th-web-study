import { useMemo, useState, type ReactNode } from 'react'
import { TodoContext, type Todo } from './TodoContext.tsx'

type TodoProviderProps = {
  children: ReactNode
}

export function TodoProvider({ children }: TodoProviderProps) {
  const [todos, setTodos] = useState<Todo[]>([])

  const addTodo = (text: string) => {
    const nextText = text.trim()
    if (!nextText) return

    setTodos((prev) => [
      ...prev,
      {
        id: Date.now(),
        text: nextText,
        completed: false,
      },
    ])
  }

  const toggleTodo = (id: number) => {
    setTodos((prev) =>
      prev.map((todo) =>
        todo.id === id ? { ...todo, completed: !todo.completed } : todo,
      ),
    )
  }

  const deleteTodo = (id: number) => {
    setTodos((prev) => prev.filter((todo) => todo.id !== id))
  }

  const value = useMemo(
    () => ({ todos, addTodo, toggleTodo, deleteTodo }),
    [todos],
  )

  return <TodoContext.Provider value={value}>{children}</TodoContext.Provider>
}
