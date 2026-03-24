import { useState } from 'react'
import { useTodoContext } from '../context/useTodoContext.ts'

export function TodoForm() {
  const { addTodo } = useTodoContext()
  const [input, setInput] = useState('')

  return (
    <form
      className="mb-5 flex gap-3"
      onSubmit={(event) => {
        event.preventDefault()
        addTodo(input)
        setInput('')
      }}
    >
      <input
        className="flex-1 rounded-xl border border-slate-300 bg-white px-4 py-3 text-base outline-none transition focus:border-blue-500 dark:border-slate-600 dark:bg-slate-800 dark:text-slate-100 dark:focus:border-blue-400"
        type="text"
        placeholder="할 일을 입력하세요"
        maxLength={100}
        value={input}
        onChange={(event) => setInput(event.target.value)}
        required
      />
      <button
        className="rounded-xl bg-blue-600 px-4 py-3 font-bold text-white transition hover:bg-blue-700"
        type="submit"
      >
        추가
      </button>
    </form>
  )
}
