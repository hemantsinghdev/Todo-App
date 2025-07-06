import mongoose, { Document, model, models, Schema } from "mongoose";
import { ILabel } from "./label.model";

export interface ITask extends Document {
  title: string;
  description?: string;
  startDate?: Date;
  dueDate?: Date;
  priority?: "low" | "medium" | "high";
  status: "pending" | "in_progress" | "completed";
  tags?: string[];
  label?: mongoose.Types.ObjectId | ILabel;
  createdAt: Date;
  updatedAt: Date;
}

const TaskSchema = new Schema<ITask>(
  {
    title: {
      type: String,
      required: true,
      trim: true,
    },
    description: {
      type: String,
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
    tags: {
      type: [String],
      required: false,
    },
    label: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Label",
    },
  },
  {
    timestamps: true,
    collection: "tasks",
  }
);

const TaskModel: mongoose.Model<ITask> =
  models.Task || model<ITask>("Task", TaskSchema);

export default TaskModel;
