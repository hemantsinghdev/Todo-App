import useTaskStore from "@/store/taskStore";
import getMaxOrderForLabel from "./maxOrderForLabel";
import { updateMultipleTasks } from "@/services/indexedDB/taskServices";

const removeLabelFromTasks = (removedLabelId: string) => {
  const taskState = useTaskStore.getState();
  const allTasks = taskState.tasks;

  const affected = allTasks.filter((t) => t.labelId === removedLabelId);
  if (affected.length === 0) return;

  const base = getMaxOrderForLabel(allTasks, undefined);
  let seq = base;

  const updatedAffected = affected.map((t) => ({
    ...t,
    labelId: undefined,
    orderByLabel: ++seq,
    updatedAt: new Date(),
  }));

  const updatedAll = allTasks.map((t) => {
    const found = updatedAffected.find((ut) => ut.localId === t.localId);
    return found ? found : t;
  });

  taskState.setTasks(updatedAll);

  updateMultipleTasks(updatedAffected);
};

export default removeLabelFromTasks;
