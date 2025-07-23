import TLabel from "@/types/label";
import { labelDB } from "@/db/indexedDB";

export async function initializeDB(labels: TLabel[]) {
  await labelDB.labels.clear();
  await labelDB.labels.bulkPut(labels);
}

export async function addTaskToDB(label: TLabel): Promise<void> {
  await labelDB.labels.put(label);
}
