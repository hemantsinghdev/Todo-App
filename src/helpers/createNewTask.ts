import { v4 as uuidv4 } from "uuid";
import TTask from "@/types/task";

export function createNewTask(): TTask {
  return {
    localId: uuidv4(),
    title: "untitled",
    status: "pending",
    startDate: null,
    dueDate: null,
    synced: false,
  };
}
