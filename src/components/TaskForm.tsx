import { useState, useEffect } from "react";
import { useNavigate, useParams, Link } from "react-router";
import { useDispatch, useSelector } from "react-redux";
import { addTask, updateTask } from "../features/tasks/taskSlice";
import { TasksState } from "../types";
import { v4 as uuidv4 } from "uuid";

function TaskForm() {
  const [task, setTask] = useState({
    title: "",
    description: "",
    completed: false,
  });
  const tasks = useSelector((state: TasksState) => state.tasks);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const params = useParams();
  const isEdit = params.id ? true : false;

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, type } = e.target;

    const value =
      type === "checkbox"
        ? (e.target as HTMLInputElement).checked
        : e.target.value;

    setTask((prevTask) => ({
      ...prevTask,
      [name]: value,
    }));
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (isEdit) {
      dispatch(updateTask({ id: params.id, ...task }));
    } else {
      const newTask = {
        ...task,
        id: uuidv4(),
      };
      dispatch(addTask(newTask));
    }
    navigate("/");
  };

  useEffect(() => {
    if (params.id) {
      const task = tasks.find((task) => task.id === params.id);
      if (task) {
        setTask(task);
      }
    }
  }, [tasks, params.id]);

  return (
    <>
      <form
        onSubmit={handleSubmit}
        className="max-w-md mx-auto bg-white p-6 rounded-2xl space-y-4 flex flex-col items-center"
      >
        <h1 className="text-4xl font-bold mb-4">
          {isEdit ? "Update" : "Add"} Task
        </h1>
        <input
          type="text"
          name="title"
          placeholder="Title"
          value={task.title}
          onChange={handleChange}
          className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        <textarea
          name="description"
          placeholder="Description"
          value={task.description}
          onChange={handleChange}
          className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
        ></textarea>
        <div className="flex items-center space-x-2">
          <input
            type="checkbox"
            name="completed"
            onChange={handleChange}
            className="w-5 h-5 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
            checked={task.completed}
          />
          <label htmlFor="completed" className="text-gray-700">
            Completed
          </label>
        </div>
        <button
          type="submit"
          className="w-full font-bold bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-700 transition duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
          disabled={!task.title || !task.description}
        >
          {isEdit ? "Update" : "Add"}
        </button>
      </form>
      <Link
        to="/"
        className="mt-4 font-bold inline-block bg-gray-600 text-white py-2 px-4 rounded-lg hover:bg-gray-700 active:bg-gray-800 transition duration-300"
      >
        Go Back
      </Link>
    </>
  );
}

export default TaskForm;
