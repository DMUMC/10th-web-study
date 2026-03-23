import './App.css'
import TodoInput from './component/TodoInput'
import TodoList from './component/TodoList'

function App() {
  return (
    <div className="app-container">
      <h1>Kovo Todo List</h1>
      <TodoInput />
      <TodoList />
    </div>
  )
}

export default App