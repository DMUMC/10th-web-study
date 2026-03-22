import { useTodoContext } from "../context/TodoContext"

export default function ListBox() {
    const { todos, completeTodo, removeTodo } = useTodoContext();

    return (
        <div className="render-container">
            <div className="render-container__section">
              <h2 className="render-container__title">할 일</h2>
              <ul id="todo-list" className="render-container__list">
                {todos.map((todo) => (
                  <li 
                    key={todo.id} 
                    className="render-container__item"
                    style={{
                        display: todo.done ? "none" : "flex",
                    }}>
                    <span className="render-container__item-text">
                        {todo.content}
                    </span>
                    <button className="render-container__item-button" onClick={() => completeTodo(todo.id)}>완료</button>
                  </li>
                ))}
              </ul>
            </div>
            <div className="render-container__section">
              <h2 className="render-container__title">완료</h2>
              <ul id="done-list" className="render-container__list">
                {todos.map((todo) => (
                  <li 
                    key={todo.id}
                    className="render-container__item"
                    style={{
                        display: todo.done ? "flex" : "none",
                    }}>
                    <span className="render-container__item-text">
                        {todo.content}
                    </span>
                    <button className="render-container__done-item-button" onClick={() => removeTodo(todo.id)}>삭제</button>
                  </li>
                ))}
              </ul>
            </div>
        </div>
    )
}

