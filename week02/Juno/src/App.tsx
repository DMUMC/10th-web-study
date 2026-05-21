import './App.css'
import Todo from './components/Todo'
import { TodoProvider } from './components/TodoContext'

function App() {

  return (
    <>
      <TodoProvider>
        <Todo />
      </TodoProvider>
    </>
  )
}

export default App