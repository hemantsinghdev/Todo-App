import TLabel from "@/types/label";
import { labelDB } from "@/db/indexedDB";

export async function initializeDB(labels: TLabel[]) {
  await labelDB.labels.clear();
  await labelDB.labels.bulkPut(labels);
}

export async function addLabelToDB(label: TLabel): Promise<void> {
  try {
    await labelDB.labels.add(label);
  } catch (error) {
    console.error("Failed to add task to IndexedDB:", error);
  }
}

export async function deleteLabelfromDB(labelLocalId: string): Promise<void> {
  try {
    await labelDB.labels.delete(labelLocalId);
  } catch (error) {
    console.error("Failed to remove task from IndexedDB:", error);
  }
}

export async function getAllLabels(): Promise<TLabel[]> {
  return await labelDB.labels.toArray();
}
