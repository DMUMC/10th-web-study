import { createContext, PropsWithChildren, ReactNode, useContext } from "react";
import { useState } from "react";
import TTodo from "../types/todo";


interface ITodoContext {
    todos: TTodo[];
    doneTodos: TTodo[];
    addTodo: (text: string) => void;
    completeTodo: (todo: TTodo) => void;
    deleteTodo: (todo: TTodo) => void;
}

export const TodoContext = createContext<ITodoContext | undefined>(undefined);

export const TodoProvider = ({ children }: PropsWithChildren) => {
    const [todos, setTodos] = useState<TTodo[]>([]);
    const [doneTodos, setDoneTodos] = useState<TTodo[]>([]);
    const addTodo = (text: string) => {
        const newTodo: TTodo = { id: Date.now(), text };
        setTodos((prevTodos) => [...prevTodos, newTodo]);
    }
    const completeTodo = (todo: TTodo) => {
        setTodos((prevTodos) => prevTodos.filter((t) => t.id !== todo.id));
        setDoneTodos((prevDoneTodos) => [...prevDoneTodos, todo]);
    }
    const deleteTodo = (todo: TTodo) => {
        setDoneTodos((prevDoneTodo) =>
            prevDoneTodo.filter((t) => t.id !== todo.id));
    };

    return (
        <TodoContext.Provider
            value={{ todos, doneTodos, addTodo, completeTodo, deleteTodo }}>
            {children}
        </TodoContext.Provider>
    );
};


//이렇게 에러 처리를 해줌으로써
//useTodo를 사용하는 곳에서는 무조건 우산을 씌워줘야 하는구나 라는 것을 알 수 있음
export const useTodo = () => {
    const context = useContext(TodoContext);

    //컨테스트가 없는 경우
    if (!context) {
        throw new Error('useTodo를 사용하기 위해서는, 무조건 TodoProvider로 감싸야 합니다.');
        //context가 없는 경우에 대한 에러 처리를 했기 때문에 context 아니라면 여기서 걸러지므로
        //if문을 벗어난 곳이면 context가 있는 경우
    }
    //컨테스트가 있는 경우
    //따라서 useContext(TodoProvider)이 아니라 useTodo()를 불러오면
    //context가 무조건 있는 경우가 됨
    //따라서 '?'를 쓸 필요가 없어짐

    return context;
}

//컴파운드컴포넌트에서 context API 많이 쓰임 +  조금 더 어드벤서하는곳에서 + 다크모드/라이트모드 로그인 상태 유지 등등에서...
//쥬스탕, 조타이?를 많이 활용할 수 있음
//contextAPI 꼭 알아두는게 좋음!!
//다양한 방법으로 많은 어플리케이션을 만들어봤으면 좋겠다고 하심!!