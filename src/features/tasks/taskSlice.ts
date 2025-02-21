import { createSlice } from "@reduxjs/toolkit";
import { Task } from "../../types";
import { v4 as uuidv4 } from "uuid";

const initialState: Task[] = [
  {
    id: uuidv4(),
    title: "Write a Blog Post",
    description:
      "Draft a 1000-word blog post on the latest trends in AI and machine learning.",
    completed: false,
  },
  {
    id: uuidv4(),
    title: "Workout Session",
    description:
      "Complete a 45-minute workout including cardio and strength training.",
    completed: true,
  },
  {
    id: uuidv4(),
    title: "Grocery Shopping",
    description: "Buy vegetables, fruits, and dairy products for the week.",
    completed: false,
  },
  {
    id: uuidv4(),
    title: "Code Review",
    description:
      "Review the latest pull request and provide feedback by end of the day.",
    completed: true,
  },
  {
    id: uuidv4(),
    title: "Read a Book",
    description: "Read 30 pages of a self-improvement or fiction book.",
    completed: false,
  },
];

export const taskSlice = createSlice({
  name: "tasks",
  initialState,
  reducers: {
    addTask: (state, action) => {
      state.push(action.payload);
    },
    deleteTask: (state, action) => {
      return state.filter((task) => task.id !== action.payload);
    },
    updateTask: (state, action) => {
      const { id, title, description, completed } = action.payload;
      const task = state.find((task) => task.id === id);
      if (task) {
        task.title = title;
        task.description = description;
        task.completed = completed;
      }
    },
  },
});

export const { addTask, deleteTask, updateTask } = taskSlice.actions;
