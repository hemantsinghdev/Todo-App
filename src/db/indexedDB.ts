import Dexie, { Table } from "dexie";
import TTask from "@/types/task";
import TLabel from "@/types/label";

class TaskDatabase extends Dexie {
  tasks!: Table<TTask, string>;

  constructor() {
    super("TaskDB");
    this.version(1).stores({
      tasks: "localId",
    });
  }
}

class LabelDatabase extends Dexie {
  labels!: Table<TLabel, string>;

  constructor() {
    super("LabelDB");
    this.version(1).stores({
      labels: "localId",
    });
  }
}

export const taskDB = new TaskDatabase();
export const labelDB = new LabelDatabase();
