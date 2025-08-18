import TTask from "@/types/task";
import { SortKey, SortDir } from "@/types/filter";

export function applySort(
  tasks: TTask[],
  sort: SortKey,
  dir: SortDir = "asc"
): TTask[] {
  let sorted = [...tasks];

  if (sort === "created") {
    sorted.sort((a, b) =>
      dir === "asc"
        ? new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime()
        : new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
    );
  } else if (sort === "updated") {
    sorted.sort((a, b) =>
      dir === "asc"
        ? new Date(a.updatedAt).getTime() - new Date(b.updatedAt).getTime()
        : new Date(b.updatedAt).getTime() - new Date(a.updatedAt).getTime()
    );
  } else if (sort == "custom") {
    sorted.sort((a, b) => a.orderByLabel - b.orderByLabel);
  }
  return sorted;
}

export function applyLabelFilter(
  tasks: TTask[],
  activeLabels: string[]
): TTask[] {
  if (activeLabels.length === 0) return tasks;
  return tasks.filter((t) => t.labelId && activeLabels.includes(t.labelId));
}
