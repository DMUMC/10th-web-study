import { createContext } from 'react'

export type Todo = {
  id: number
  text: string
  completed: boolean
}

type TodoContextValue = {
  todos: Todo[]
  addTodo: (text: string) => void
  toggleTodo: (id: number) => void
  deleteTodo: (id: number) => void
}

export const TodoContext = createContext<TodoContextValue | null>(null)
