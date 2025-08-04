import { create } from "zustand";
import TTask from "@/types/task";
import {
  addTaskToDB,
  deleteTaskfromDB,
  updateTaskInDB,
} from "@/services/indexedDB/taskServices";
import { createNewTask } from "@/helpers/createNewTask";

type FilterOptions = {
  labelId?: string;
  day?: "today" | "upcoming" | "expired";
};

type TaskState = {
  tasks: TTask[];
  setTasks: (tasks: TTask[]) => void;
  newTask: () => void;
  updateTask: (task: TTask) => void;
  deleteTask: (taskLocalId: string) => void;
};

const useTaskStore = create<TaskState>((set, get) => ({
  tasks: [],

  setTasks: (tasks) => set({ tasks }),

  newTask: () => {
    const tasks = get().tasks;

    const untitledCount = tasks
      .filter((t) => t.title.startsWith("untitled_"))
      .map((t) => {
        const match = t.title.match(/^untitled_(\d+)$/);
        return match ? parseInt(match[1]) : 0;
      });

    const nextNumber =
      untitledCount.length > 0 ? Math.max(...untitledCount) + 1 : 1;

    const task: TTask = createNewTask(`untitled_${nextNumber}`);

    set((state) => ({ tasks: [...state.tasks, task] }));

    addTaskToDB(task);
  },

  updateTask: (task: TTask) => {
    const currentTime = new Date();
    set((state) => ({
      tasks: state.tasks.map((t) =>
        t.localId === task.localId ? { ...task, updatedAt: currentTime } : t
      ),
    }));

    updateTaskInDB(task);
  },

  deleteTask: (taskLocalId: string) => {
    set((state) => ({
      tasks: state.tasks.filter((t) => t.localId !== taskLocalId),
    }));
    deleteTaskfromDB(taskLocalId);
  },
}));

export default useTaskStore;
