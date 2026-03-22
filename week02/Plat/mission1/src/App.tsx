import './App.css'
import InputBox from './component/InputBox'
import ListBox from './component/ListBox'
import { TodoProvider } from './context/TodoContext'

function App() {
  

  return (
    <> 
      <div className="todo-container">
        <h1 className="todo-container__header">PLAT TODO</h1>
        <TodoProvider>
          <InputBox />
          <ListBox />
        </TodoProvider>
      </div>
    </>
  )
}

export default App
