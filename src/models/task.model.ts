import mongoose, { Document, model, models, Schema } from "mongoose";
import TTask from "@/types/task";

export interface ITask extends TTask, Document {}

const TaskSchema = new Schema<ITask>(
  {
    localId: {
      type: String,
      required: true,
      trim: true,
    },
    title: {
      type: String,
      required: true,
      trim: true,
    },
    description: {
      type: String,
      required: false,
    },
    labelId: {
      type: String,
      required: false,
    },
    tags: {
      type: [String],
      required: false,
    },
    startDate: {
      type: Date,
    },
    dueDate: {
      type: Date,
    },
    priority: {
      type: String,
      enum: ["low", "medium", "high"],
    },
    status: {
      type: String,
      enum: ["pending", "in_progress", "completed"],
      default: "pending",
    },
  },
  {
    collection: "tasks",
  }
);

const TaskModel: mongoose.Model<ITask> =
  models.Task || model<ITask>("Task", TaskSchema);

export default TaskModel;
