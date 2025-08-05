import { create } from "zustand";
import TTask from "@/types/task";
import {
  addTaskToDB,
  deleteTaskfromDB,
  updateMultipleTasks,
  updateTaskInDB,
} from "@/services/indexedDB/taskServices";
import { createNewTask } from "@/helpers/createNewTask";
import getMaxOrderForLabel from "@/helpers/maxOrderForLabel";

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
  updateTaskOrder: (updatedTasks: TTask[]) => void;
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

    const newTask: TTask = createNewTask(`untitled_${nextNumber}`);

    newTask.orderByLabel = getMaxOrderForLabel(tasks) + 1;

    set((state) => ({ tasks: [...state.tasks, newTask] }));

    addTaskToDB(newTask);
  },

  updateTask: (task: TTask) => {
    const tasks = get().tasks;
    const currentTime = new Date();

    set((state) => ({
      tasks: state.tasks.map((t) => {
        if (t.localId === task.localId) {
          if (t.labelId != task.labelId) {
            task.orderByLabel = getMaxOrderForLabel(tasks, task.labelId) + 1;
          }
          return { ...task, updatedAt: currentTime };
        }
        return t;
      }),
    }));

    updateTaskInDB(task);
  },

  deleteTask: (taskLocalId: string) => {
    set((state) => ({
      tasks: state.tasks.filter((t) => t.localId !== taskLocalId),
    }));
    deleteTaskfromDB(taskLocalId);
  },

  updateTaskOrder: (updatedTasks: TTask[]) => {
    set((state) => ({
      tasks: state.tasks.map((t) => {
        const updated = updatedTasks.find((ut) => ut.localId === t.localId);
        return updated ? { ...t, ...updated } : t;
      }),
    }));
    updateMultipleTasks(updatedTasks);
  },
}));

export default useTaskStore;
