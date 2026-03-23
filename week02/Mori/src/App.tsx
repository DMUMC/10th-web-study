import './App.css'
import { TodoProvider } from './context/TodoProvider.tsx'
import { TodoForm } from './components/TodoForm.tsx'
import { TodoList } from './components/TodoList.tsx'

function App() {
  return (
    <TodoProvider>
      <main className="todo-app">
        <h1 className="todo-app__title">ToDo List</h1>
        <TodoForm />
        <section className="todo-app__lists" aria-label="ToDo 목록">
          <TodoList title="ToDos" isCompleted={false} />
          <TodoList title="Completed" isCompleted={true} />
        </section>
      </main>
    </TodoProvider>
  )
}

export default App
