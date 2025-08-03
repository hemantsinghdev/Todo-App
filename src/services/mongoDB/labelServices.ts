import { connectToDB } from "@/db/mongoDB";
import Label from "@/models/label.model";

export async function getAllLabels() {
  try {
    await connectToDB();
    const tasks = await Label.find().lean();
    return tasks;
  } catch (error) {
    console.error("Error fetching tasks from MongoDB:", error);
    throw new Error("Failed to fetch tasks");
  }
}
