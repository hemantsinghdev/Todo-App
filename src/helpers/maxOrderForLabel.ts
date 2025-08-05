import TTask from "@/types/task";

const getMaxOrderForLabel = (
  tasks: TTask[],
  labelId: string | undefined = undefined
) => {
  const group = tasks.filter(
    (t) => (t.labelId || "unlabeled") === (labelId || "unlabeled")
  );
  return Math.max(...group.map((t) => t.orderByLabel ?? 0), 0);
};

export default getMaxOrderForLabel;
