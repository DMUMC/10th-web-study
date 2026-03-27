import React from "react";
import { type TTodo } from "./types/todo";

interface Todo {
    id: number;
    text: string;
}
interface ListProps {
    todos: Todo[];
    title: string;
    buttonText: string;
    buttonColor: string;
    onBtnClick: (todo: TTodo) => void;
}

function List({ todos, title, buttonText, buttonColor, onBtnClick }: ListProps) {
    return (
        <>
            <div className="render-container__section">
                <h2 className="render-container__title">{title}</h2>
                <ul id="todo-list" className="render-container__list">
                    {todos.map((todo) => (
                        <li key={todo.id} className="render-container__item">
                            <span className="render-container__item-text">{todo.text}</span>
                            <button
                                onClick={() => onBtnClick(todo)}
                                style={{ backgroundColor: buttonColor }}
                                className="render-container__item-button">{buttonText}</button>
                        </li>
                    ))}
                </ul>
            </div>
        </>
    )
};

export default List;