import { create } from "zustand";
import { v4 as uuidv4 } from "uuid";
import TTask from "@/types/task";
import { addTaskToDB, updateTaskInDB } from "@/services/indexedDB/taskServices";

type FilterOptions = {
  labelId?: string;
  day?: "today" | "upcoming" | "expired";
};

type TaskState = {
  tasks: TTask[];
  setTasks: (tasks: TTask[]) => void;
  newTask: () => void;
  addTask: (task: TTask) => void;
  updateTask: (task: TTask) => void;
  getTasks: (filter?: FilterOptions) => TTask[];
};

const useTaskStore = create<TaskState>((set, get) => ({
  tasks: [],

  setTasks: (tasks) => set({ tasks }),

  newTask: () => {
    const tasks = get().tasks;

    // Get next untitled number
    const untitledCount = tasks
      .filter((t) => t.title.startsWith("untitled_"))
      .map((t) => {
        const match = t.title.match(/^untitled_(\d+)$/);
        return match ? parseInt(match[1]) : 0;
      });

    const nextNumber =
      untitledCount.length > 0 ? Math.max(...untitledCount) + 1 : 1;

    const task: TTask = {
      localId: uuidv4(),
      title: `untitled_${nextNumber}`,
      labelId: "unlabeled",
      description: "",
      tags: [],
      startDate: null,
      dueDate: null,
      priority: "low",
      status: "pending",
      synced: false,
    };

    set((state) => ({ tasks: [...state.tasks, task] }));

    addTaskToDB(task);
  },

  addTask: (task: TTask) => {
    const tasks = get().tasks;
    const alreadyExists = tasks.some((t) => t.localId === task.localId);
    if (!alreadyExists) {
      set({ tasks: [...tasks, task] });
    }

    addTaskToDB(task);
  },

  updateTask: (task: TTask) => {
    set((state) => ({
      tasks: state.tasks.map((t) => (t.localId === task.localId ? task : t)),
    }));

    updateTaskInDB(task);
  },

  getTasks: (filter?: FilterOptions) => {
    const tasks = get().tasks;
    const today = new Date();
    today.setHours(0, 0, 0, 0);

    let filtered = [...tasks];

    if (filter?.labelId) {
      filtered = filtered.filter((t) => t.labelId === filter.labelId);
    }

    if (filter?.day) {
      filtered = filtered.filter((t) => {
        const start = t.startDate ? new Date(t.startDate) : null;
        const end = t.dueDate ? new Date(t.dueDate) : null;

        switch (filter.day) {
          case "today":
            return (!start || start <= today) && (!end || end >= today);
          case "upcoming":
            return start && start > today;
          case "expired":
            return end && end < today;
        }
      });
    }

    return filtered;
  },
}));

export default useTaskStore;
