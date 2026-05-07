import React, { FormEvent, useContext, useState } from "react"
import TodoList from "./TodoList"
import TodoForm from "./TodoForm"
import { useTodo } from "./context/TodoContext"

const Todo = () => {
    const { todos, completeTodo, addTodo, deleteTodo, doneTodos } = useTodo();




    return (
        <div className="todo-container">
            <h1 className="todo-container__header">YONG TODO</h1>
            <TodoForm />
            <div className="render-container">
                <TodoList
                    title='할 일'
                    todos={todos} //'?'를 붙이는 이유는 TodoContext에서는 값이 무조건 있다 처리를 했지만 값이 없을 수도 있기 때문
                    //  따라서 TodoContext에 있는 todos에도 '?' 처리가 필요함
                    buttonLabel='완료'
                    buttonColor='#28a745'
                    onClick={completeTodo}
                />
                <TodoList
                    title='완료'
                    todos={doneTodos}
                    buttonLabel='삭제'
                    buttonColor='#dc3545'
                    onClick={deleteTodo}
                />
            </div>
        </div>
    )
}

export default Todo;