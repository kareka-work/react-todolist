import './App.css';
import './components/main.css';
import TaskList from './components/TaskList.js';
import Completed from './components/Completed.js';
import AddTodo from './components/AddTodo.js';
import { AppProvider } from './context/AppContext';

function App() {
  return (
    <AppProvider>
      <div className="container">
        <div className="top row bg-info-subtle border">
          <h1 className="display-2 text-info text-center">Simple Todo List</h1>
        </div>
        <div className="row">
          <TaskList />
          <Completed />
        </div>
          <AddTodo />
      </div>
    </AppProvider>
  );
}

export default App;
