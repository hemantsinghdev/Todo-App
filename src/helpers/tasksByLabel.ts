import TLabel from "@/types/label";
import TTask from "@/types/task";

const getTasksByLabel = (
  labels: TLabel[],
  tasks: TTask[],
  includeUnlabelled: boolean
) => {
  const labeledTasks: {
    [labelId: string]: { labelName: string; tasks: TTask[] };
  } = {};
  const unlabeledTasks: TTask[] = [];
  const taskIndex: { [labelId: string]: TTask[] } = {};

  for (const task of tasks) {
    if (task.labelId) {
      if (!taskIndex[task.labelId]) {
        taskIndex[task.labelId] = [];
      }
      taskIndex[task.labelId].push(task);
    } else {
      unlabeledTasks.push(task);
    }
  }

  for (const label of labels) {
    if (taskIndex[label.localId] && taskIndex[label.localId].length > 0) {
      labeledTasks[label.localId] = {
        labelName: label.labelName,
        tasks: taskIndex[label.localId],
      };
    }
  }

  if (includeUnlabelled) {
    labeledTasks["unlabelled"] = {
      labelName: "unlabelled",
      tasks: unlabeledTasks,
    };
  }

  return labeledTasks;
};

export default getTasksByLabel;
