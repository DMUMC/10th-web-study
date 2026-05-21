import './App.css'
import Todo from './components/BeforeTodo'
import { TodoProvieder } from './context/TodoContext';

function App(){
  return(
  <TodoProvieder>
    <Todo />
  </TodoProvieder>
  );
}

export default App;