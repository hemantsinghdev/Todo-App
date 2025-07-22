import TTask from "@/types/task";
import { db } from ".";

export async function initializeDB(tasks: TTask[]) {
  await db.tasks.clear();
  await db.tasks.bulkPut(tasks);
}

export async function addTaskToDB(task: TTask): Promise<void> {
  await db.tasks.put(task);
}

export async function updateTaskInDB(task: TTask): Promise<void> {
  await db.tasks.put(task);
}

export async function getTasksFromDB(): Promise<TTask[]> {
  return await db.tasks.toArray();
}
