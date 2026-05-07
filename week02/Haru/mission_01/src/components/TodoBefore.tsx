import type { JSX } from "react"
import { useState } from 'react'
import type{ FormEvent } from 'react'
import type { TTodo } from '../types/todo'

const TodoBefore= () : JSX.Element => {
  
    const [todos, setTodos] = useState<TTodo[]>([
      
    ]);
    const [doneTodos, setDoneTodos] = useState<TTodo[]>([
    
    ]);
    const [input, setInput]  = useState<string>('');
    console.log('Input', input);

    const handleSubmit = (e: FormEvent<HTMLFormElement>): void =>{
        e.preventDefault();
        console.log('동작함');
        const text=input.trim();

        if(text){
            const newTodo: TTodo = {id:Date.now(), text};
            setTodos((prveTodos) : TTodo[] => [...prveTodos,newTodo]);
            setInput('');
        }
    }

    const completeTodo = (todo:TTodo) : void => {
        setTodos(prveTodos => prveTodos.filter((t) : boolean => t.id !== todo.id));
        setDoneTodos((prveDoneTodos) : TTodo[] => [...prveDoneTodos, todo]);
    };

    const deleteTodo = (todo:TTodo) : void =>{
        setDoneTodos(prveDoneTodos => prveDoneTodos.filter((t) : boolean =>t.id !== todo.id ));
        
    }


    return(
   <div className='todo-container'>
     <h1 className='todo-container__header'>To do List</h1>
     <form className="todo-container__form" onSubmit={handleSubmit}>
        <input value={input}
        onChange={(e) : void => setInput(e.target.value)}
        className="todo-container__input" placeholder="할 일 입력" required/>
        <button type="submit" className="todo-container__button">할 일 추가</button>
     </form>

     <div className="render-container">
        <div className="render-container__section">
            <h2 className="render-container__title">할 일</h2>
            <ul id='todo-list' className="render-container__list">
                {todos.map((todo) : any => {
                    return(
                    <li key={todo.id} className="render-container__item">
                        <span className="render-container__item">{todo.text}</span>
                        <button
                        onClick={() : void => completeTodo(todo)}
                        className="render-container__item-button"
                        style={
                            {
                                backgroundColor : "green",
                            }
                        }
                    >
                        완료
                    </button>
                </li>);
                } )}
            </ul>
        </div>
        <div className="render-container__section">
            <h2 className="render-container__title">완료</h2>
            <ul id='done-list' className="render-container__list">
                {doneTodos.map((doneTodo) : any => {
                    return(
                    <li key={doneTodo.id}className="render-container__item">
                        <span className="render-container__item">{doneTodo.text}</span>
                        <button className="render-container__item-button"
                          onClick={() : void => deleteTodo(doneTodo)}
                        style={
                            {
                                backgroundColor : "red",
                            }
                        }
                    >
                        삭제
                    </button>
                </li>);
                } )}
            </ul>
        </div>
     </div>
   </div>
   );
  
}

export default TodoBefore