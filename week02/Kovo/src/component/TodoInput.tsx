import { useTodo } from '../context/TodoContext'

function TodoInput() {
  const { input, setInput, handleAddTodo } = useTodo()

  return (
    <div className="input-box">
      <input
        type="text"
        placeholder="할 일을 입력하세요"
        value={input}
        onChange={(e) => setInput(e.target.value)}
        onKeyDown={(e) => {
          if (e.key === 'Enter') {
            handleAddTodo()
          }
        }}
      />
      <button onClick={handleAddTodo}>할 일 추가</button>
    </div>
  )
}

export default TodoInput