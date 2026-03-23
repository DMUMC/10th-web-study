import { createContext, useContext, useState, type ReactNode } from 'react'

type Todo = {
  id: number
  text: string
  completed: boolean
}

type TodoContextType = {
  input: string
  setInput: React.Dispatch<React.SetStateAction<string>>
  todos: Todo[]
  handleAddTodo: () => void
  handleToggleTodo: (id: number) => void
  handleDeleteTodo: (id: number) => void
}

const TodoContext = createContext<TodoContextType | undefined>(undefined)

export function TodoProvider({ children }: { children: ReactNode }) {
  const [input, setInput] = useState('')
  const [todos, setTodos] = useState<Todo[]>([])

  const handleAddTodo = () => {
    if (input.trim() === '') return

    const newTodo: Todo = {
      id: Date.now(),
      text: input,
      completed: false,
    }

    setTodos([...todos, newTodo])
    setInput('')
  }

  const handleToggleTodo = (id: number) => {
    setTodos(
      todos.map((todo) =>
        todo.id === id ? { ...todo, completed: !todo.completed } : todo
      )
    )
  }

  const handleDeleteTodo = (id: number) => {
    setTodos(todos.filter((todo) => todo.id !== id))
  }

  return (
    <TodoContext.Provider
      value={{
        input,
        setInput,
        todos,
        handleAddTodo,
        handleToggleTodo,
        handleDeleteTodo,
      }}
    >
      {children}
    </TodoContext.Provider>
  )
}

export function useTodo() {
  const context = useContext(TodoContext)

  if (!context) {
    throw new Error('useTodo must be used within a TodoProvider')
  }

  return context
}