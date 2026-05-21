import React, { useState, type FormEvent } from 'react'
import { useTodo } from '../context/TodoCotext';


const TodoForm = () => {
  
  
      const [input, setInput]  = useState<string>('');
      const {addTodo}=useTodo();

        console.log('Input', input);
    
        const handleSubmit = (e: FormEvent<HTMLFormElement>): void =>{
            e.preventDefault();
            console.log('동작함');
            const text=input.trim();
    
            if(text){
                addTodo(text);
                setInput('');
            }
        }
    
    return (
    <form className="todo-container__form" onSubmit={handleSubmit}>
        <input value={input}
        onChange={(e) : void => setInput(e.target.value)}
        className="todo-container__input" placeholder="할 일 입력" required/>
        <button type="submit" className="todo-container__button">할 일 추가</button>
     </form>

     
  )
}

export default TodoForm