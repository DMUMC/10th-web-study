import { createContext, useContext, useState } from "react";
import type { ReactNode } from "react";

export type Todo = {
  id: number;
  content: string;
  done: boolean;
};

type TodoContextType = {
  todos: Todo[];
  addTodo: (content: string) => void;
  completeTodo: (id: number) => void;
  removeTodo: (id: number) => void;
};

const TodoContext = createContext<TodoContextType | null>(null);

export function TodoProvider({ children }: { children: ReactNode }) {
  const [todos, setTodos] = useState<Todo[]>([]);

  const addTodo = (content: string) => {
    const newTodo: Todo = {
      id: Date.now(),
      content,
      done: false,
    };

    setTodos((prev) => [...prev, newTodo]);
  };

  const completeTodo = (id: number) => {
    setTodos((prev) =>
      prev.map((todo) =>
        todo.id === id ? { ...todo, done: !todo.done } : todo
      )
    );
  };

  const removeTodo = (id: number) => {
    setTodos((prev) => prev.filter((todo) => todo.id !== id));
  };

  return (
    <TodoContext.Provider value={{ todos, addTodo, completeTodo, removeTodo }}>
      {children}
    </TodoContext.Provider>
  );
}

export function useTodoContext() {
  const context = useContext(TodoContext);

  if (!context) {
    throw new Error("useTodoContext must be used within TodoProvider");
  }

  return context;
}