type TTask = {
  localId: string;
  title: string;
  description?: string;
  label?: string;
  tags?: string[];
  startDate: Date | null;
  dueDate: Date | null;
  priority?: "low" | "medium" | "high";
  status: "pending" | "in progress" | "completed";
  synced: boolean;
};

export default TTask;
