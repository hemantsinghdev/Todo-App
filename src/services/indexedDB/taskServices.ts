import TTask from "@/types/task";
import { taskDB } from "@/db/indexedDB";

export async function initializeDB(tasks: TTask[]) {
  await taskDB.tasks.clear();
  await taskDB.tasks.bulkPut(tasks);
}

export async function addTaskToDB(task: TTask): Promise<void> {
  await taskDB.tasks.put(task);
}

export async function updateTaskInDB(task: TTask): Promise<void> {
  await taskDB.tasks.put(task);
}

export async function getTasksFromDB(): Promise<TTask[]> {
  return await taskDB.tasks.toArray();
}
