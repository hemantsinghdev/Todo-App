import Dexie, { Table } from "dexie";
import TTask from "@/types/task";

class TaskDatabase extends Dexie {
  tasks!: Table<TTask, string>;

  constructor() {
    super("TaskDB");
    this.version(1).stores({
      tasks: "localId",
    });
  }
}

export const db = new TaskDatabase();
