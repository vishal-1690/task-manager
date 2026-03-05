import type { Task } from "../types/task";

const STORAGE_KEY = 'tasks'
// storing each by id will be messy, dump and load
export function loadTasks(): Task[] {
  try {
    const rawString = localStorage.getItem(STORAGE_KEY)

    if (!rawString) return [];

    return JSON.parse(rawString)
  } catch {
    return []
  }
}

export function storeTasks(tasks: Task[]) {
  try {
    localStorage.setItem(
      STORAGE_KEY,
      JSON.stringify(tasks)
    )
  } catch {
    // maybe show a message? event->toast
  }
}