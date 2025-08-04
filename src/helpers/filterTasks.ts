import TTask from "@/types/task";

type featureOptions = "today" | "upcoming" | "expired" | "completed" | "all";

const featureFilter = (
  filter: featureOptions,
  labeledTasks: { [labelName: string]: TTask[] }
): { [labelName: string]: TTask[] } => {
  const today = new Date();
  today.setHours(0, 0, 0, 0);

  const result: { [labelName: string]: TTask[] } = {};

  for (const [label, tasks] of Object.entries(labeledTasks)) {
    const filtered = tasks.filter((t) => {
      const start = t.startDate ? new Date(t.startDate) : null;
      const end = t.dueDate ? new Date(t.dueDate) : null;

      const isCompleted = t.completed === true;
      const isUpcoming = start && start > today && !isCompleted;
      const isExpired = end && end < today && !isCompleted;
      const isToday =
        (!start || start <= today) && (!end || end >= today) && !isCompleted;

      //   const isMissingDates = !start && !end && !isCompleted;

      switch (filter) {
        case "today":
          return isToday;
        //   return (isToday || isMissingDates) && !isUpcoming && !isExpired;
        case "upcoming":
          return isUpcoming;
        case "expired":
          return isExpired;
        case "completed":
          return isCompleted;
        case "all":
          return true;
        default:
          return false;
      }
    });

    if (filtered.length > 0) {
      result[label] = filtered;
    }
  }

  return result;
};

export default featureFilter;
