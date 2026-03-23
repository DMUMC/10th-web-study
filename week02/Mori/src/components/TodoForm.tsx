import { useState, type FormEvent } from 'react'
import { useTodoContext } from '../context/useTodoContext.ts'

export function TodoForm() {
  const { addTodo } = useTodoContext()
  const [input, setInput] = useState('')

  const onSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    addTodo(input)
    setInput('')
  }

  return (
    <form className="todo-app__form" onSubmit={onSubmit}>
      <input
        className="todo-app__input"
        type="text"
        placeholder="할 일을 입력하세요"
        maxLength={100}
        value={input}
        onChange={(event) => setInput(event.target.value)}
        required
      />
      <button className="todo-app__add-button" type="submit">
        추가
      </button>
    </form>
  )
}
