import { configureStore } from "@reduxjs/toolkit";
import { loadTasks, storeTasks } from "./localStorageHelper";
import { createTasksSlice } from "./tasksSlice";



const tasksFromLocal = loadTasks();

const tasksSlice = createTasksSlice({
  tasks: tasksFromLocal,
})

export const store = configureStore({
  reducer: {
    tasks: tasksSlice.reducer
  }
})

store.subscribe(() => {
  const state = store.getState()
  storeTasks(state.tasks.tasks)
})

export const {
  addTask,
  changeTaskStatus,
  removeTask,
  updateTask
} = tasksSlice.actions

export type RootState = ReturnType<typeof store.getState>