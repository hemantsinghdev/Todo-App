import TTask from "@/types/task";
import { taskDB } from "@/db/indexedDB";

export async function initializeDB(tasks: TTask[]) {
  await taskDB.tasks.clear();
  await taskDB.tasks.bulkPut(tasks);
}

export async function addTaskToDB(task: TTask): Promise<void> {
  try {
    await taskDB.tasks.add(task);
  } catch (error) {
    console.error("Failed to add task to IndexedDB:", error);
  }
}

export async function deleteTaskfromDB(taskLocalId: string): Promise<void> {
  try {
    await taskDB.tasks.delete(taskLocalId);
  } catch (error) {
    console.error("Failed to remove task from IndexedDB:", error);
  }
}

export async function updateTaskInDB(task: TTask): Promise<void> {
  await taskDB.tasks.put(task);
}

export async function getAllTasks(): Promise<TTask[]> {
  return await taskDB.tasks.toArray();
}

export async function updateMultipleTasks(tasks: TTask[]): Promise<void> {
  try {
    await taskDB.tasks.bulkPut(tasks);
  } catch (err) {
    console.error("Bulk update failed:", err);
  }
}
