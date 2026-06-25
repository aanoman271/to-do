import { model, models, Schema } from "mongoose";
import { ITask } from "../types/task";

const taskSchema = new Schema<ITask>(
  {
    title: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    status: {
      type: String,
      enum: ["todo", "in-progress", "completed"],
      default: "todo",
    },
  },
  {
    timestamps: true,
  },
);
export const Task = models.Task || model("Task", taskSchema);
