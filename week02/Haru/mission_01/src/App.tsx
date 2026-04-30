import './App.css'
import TodoBefore from './components/TodoBefore'
import Todo from './components/Todo'
import { TodoProvider } from './context/TodoCotext'


function App() {
  return (
  <TodoProvider>
     <Todo />
  </TodoProvider>
) 
}

export default App
