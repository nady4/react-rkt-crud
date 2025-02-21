import { Link } from "react-router";
import { useSelector, useDispatch } from "react-redux";
import { deleteTask } from "../features/tasks/taskSlice";
import { Task, TasksState } from "../types";

function TaskList() {
  const tasksState = useSelector((state: TasksState) => state.tasks);
  const dispatch = useDispatch();

  const handleDelete = (taskId: string) => {
    dispatch(deleteTask(taskId));
  };

  return (
    <div className="max-w-2xl mx-auto p-6 bg-white shadow-lg rounded-xl">
      <h1 className="text-4xl font-bold mb-8">
        Tasks List ({tasksState.length})
      </h1>
      <Link
        to="/add"
        className="mr-2 bg-green-500 active:bg-green-700 hover:bg-green-600 text-white font-bold py-2 px-4 rounded"
      >
        ➕ Add Task
      </Link>
      <ul className="mt-6 space-y-4">
        {tasksState.map((task: Task) => (
          <li
            key={task.id}
            className="p-5 bg-gray-100 rounded-lg shadow-sm border-l-4 border-blue-500"
          >
            <h2 className="text-2xl font-bold">{task.title}</h2>
            <p className="mt-2">{task.description}</p>
            <p
              className={`mt-2 font-medium ${
                task.completed ? "text-green-600" : "text-red-500"
              }`}
            >
              {task.completed ? "✅ Completed" : "✖️ Not completed"}
            </p>
            <button
              onClick={() => handleDelete(task.id)}
              className="mr-2 mt-4 bg-red-500 active:bg-red-700 hover:bg-red-600 text-white font-bold py-2 px-4 rounded"
            >
              🗑 Delete
            </button>
            <Link
              to={`/update/${task.id}`}
              className="mr-2 mt-4 bg-blue-500 active:bg-blue-700 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded"
            >
              ✏️ Update
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default TaskList;
