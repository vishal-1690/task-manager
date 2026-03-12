import { createSlice, nanoid, type PayloadAction } from "@reduxjs/toolkit";
import type { Task, TaskStatus } from "../types/task";

interface TasksState {
  tasks: Task[]
}

const defaultState: TasksState = {
  tasks: []
}

export const createTasksSlice = (initialState = defaultState) => createSlice({
  name: "tasks",
  initialState,
  reducers: {
    addTask: (state, action: PayloadAction<{ title: string; description: string }>) => {

      const now = Date.now();

      state.tasks.unshift({
        id: nanoid(),
        ...action.payload,
        status: 'pending',
        createdAt: now,
        modifiedAt: now
      })
    },

    changeTaskStatus: (state, action: PayloadAction<{ id: string; status: TaskStatus }>) => {

      const task = state.tasks.find(t => t.id === action.payload.id);

      if (task) {
        task.status = action.payload.status
      }
    },

    removeTask: (state, action: PayloadAction<string>) => {

      const task = state.tasks.findIndex(t => t.id == action.payload);

      if (task > -1) {
        state.tasks.splice(task, 1)
      }
    },

    updateTask: (state, action: PayloadAction<{ id: string; title: string; description: string; status: TaskStatus }>) => {

      const task = state.tasks.find(t => t.id === action.payload.id);
      const now = Date.now();
      if (task) {
        task.title = action.payload.title;
        task.description = action.payload.description;
        task.status = action.payload.status;
        task.modifiedAt = Date.now();
      } else {

        state.tasks.unshift({
          id: action.payload.id,
          title: action.payload.title,
          description: action.payload.description,
          status: 'pending',
          createdAt: now,
          modifiedAt: now
        })
      }
    }
  }
})

