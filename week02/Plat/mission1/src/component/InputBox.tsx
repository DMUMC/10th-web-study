import { useState } from "react"
import { useTodoContext } from "../context/TodoContext";

export default function InputBox() {
    const [inputValue, setInputValue] = useState("");
    const { addTodo } = useTodoContext();

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setInputValue(e.target.value);
    };

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        if (!inputValue.trim()) return;
        
        addTodo(inputValue);
        setInputValue("");
    };


    return (
        <form 
            id="todo-form" 
            className="todo-container__form"
            onSubmit={handleSubmit}
        >
            <input
                type="text"
                id="todo-input"
                className="todo-container__input"
                placeholder="할 일 입력"
                required
                value={inputValue}
                onChange={handleInputChange}
            />
            <button type="submit" className="todo-container__button">할 일 추가</button> 
        </form>
    )
}