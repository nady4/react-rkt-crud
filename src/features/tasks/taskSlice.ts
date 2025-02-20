import { createSlice } from "@reduxjs/toolkit";
import { Task } from "../../types";

export const taskSlice = createSlice({
  name: "tasks",
  initialState: [
    {
      id: 1,
      title: "Task 1",
      description: "Description 1",
    },
    {
      id: 2,
      title: "Task 2",
      description: "Description 2",
    },
  ] as Task[],
  reducers: {
    addTask: (state, action) => {
      state.push(action.payload);
    },
    removeTask: (state, action) => {
      state = state.filter((task) => task.id !== action.payload);
    },
    updateTask: (state, action) => {
      const { id, title, description } = action.payload;
      const taskToUpdate = state.find((task) => task.id === id);
      if (taskToUpdate) {
        taskToUpdate.title = title;
        taskToUpdate.description = description;
      }
    },
  },
});
