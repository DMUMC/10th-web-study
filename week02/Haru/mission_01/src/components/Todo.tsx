import { useState, type FormEvent, type JSX } from "react"
import TodoList from "./TodoList";
import TodoForm from "./TodoForm";
import { useTodo } from "../context/TodoCotext";

const Todo = () : JSX.Element =>{

   const { todos, doneTodos, completeTodo, deleteTodo }=useTodo();
        

    return (
        <div className="todo-container">
            <h1 className="todo-contaniner__header">To do List</h1>
            <TodoForm/>
            <div className="render-container">
                <TodoList 
                title="할 일" 
                todos={todos} 
                buttonLabel='완료' 
                buttonColor="green" 
                onClick={completeTodo}/>

                <TodoList 
                title="완료" 
                todos={doneTodos}
                buttonLabel='삭제' 
                buttonColor="red" 
                onClick={deleteTodo} />
            </div>
        </div>
    )
}

export default Todo;

function addTodo(text: string) {
    throw new Error("Function not implemented.");
}

