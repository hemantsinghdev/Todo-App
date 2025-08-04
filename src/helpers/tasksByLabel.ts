import TLabel from "@/types/label";
import TTask from "@/types/task";

const getTasksByLabel = (labels: TLabel[], tasks: TTask[]) => {
  const labeledTasks: { [labelName: string]: TTask[] } = {};
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
    labeledTasks[label.labelName] = taskIndex[label.localId] || [];
  }

  labeledTasks["unlabeled"] = unlabeledTasks;

  return labeledTasks;
};

export default getTasksByLabel;
