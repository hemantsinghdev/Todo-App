import { connectToDB } from "@/db/mongoDB";
import Task from "@/models/task.model";

export async function getAllTasks() {
  try {
    await connectToDB();
    const tasks = await Task.find().lean();
    return tasks;
  } catch (error) {
    console.error("Error fetching tasks from MongoDB:", error);
    throw new Error("Failed to fetch tasks");
  }
}
