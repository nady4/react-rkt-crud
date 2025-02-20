import "./App.css";
import { useSelector } from "react-redux";
import { Task, TasksState } from "./types";

function App() {
  const tasksState = useSelector((state: TasksState) => state.tasks);

  return (
    <div className="App">
      <h1>Tasks</h1>
      <ul>
        {tasksState.map((task: Task) => (
          <li key={task.id}>
            <h2>{task.title}</h2>
            <p>{task.description}</p>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default App;
