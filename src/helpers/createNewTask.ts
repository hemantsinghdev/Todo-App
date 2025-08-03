import { v4 as uuidv4 } from "uuid";
import TTask from "@/types/task";

export function createNewTask(title: string): TTask {
  return {
    localId: uuidv4(),
    title: title,
    status: "pending",
    startDate: null,
    dueDate: null,
    synced: false,
  };
}
