import { createContext, useState, PropsWithChildren } from "react";
import type { TTodo } from "../types/TTodo";

interface ITodoContext {
    todos: TTodo[];
    doneTodos: TTodo[];
    addTodo: (text: string) => void;
    completeTodo: (todo: TTodo) => void;
    deleteTodo: (todo: TTodo) => void;
}

export const TodoContext = createContext<ITodoContext | undefined>(undefined);
export const TodoProvider = ({ children }:
    PropsWithChildren): void => {
    const [todos, setTodos] = useState<TTodo[]>([]);
    const [doneTodos, setDoneTodos] = useState<TTodo[]>([]);
    const addTodo = (text: string) => {
        const newTodo: TTodo = { id: Date.now(), text };
        setTodos((prevTodos): TTodo[] => [...prevTodos,
            newTodo]);
    };
    const completeTodo = (todo: TTodo) => {
        setTodos(prevTodos => prevTodos.filter((t) => t.id !== todo.id));
        setDoneTodos(prevDoneTodos => [...prevDoneTodos, todo]);
    }
    const deleteTodo = (todo: TTodo) => {
        setDoneTodos((prevDoneTodo): TTodo[] =>
            prevDoneTodo.filter((t) => t.id !== todo.id));
    };

    return (
        <TodoContext.Provider value={{ todos, doneTodos, addTodo, completeTodo, deleteTodo }}>
            {children}
        </TodoContext.Provider>
    );
};
