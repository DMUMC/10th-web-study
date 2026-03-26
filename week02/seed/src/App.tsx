import "./App.css";
import { TodoProvider } from "./context/TodoContext";
import Todo from './Todo'

function App() {
  return (
    <TodoProvider>
      <Todo />
    </TodoProvider>
  )
}

export default App;
