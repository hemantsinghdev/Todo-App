import { NextResponse } from "next/server";
import { getAllTasks } from "@/services/mongoDB/taskServices";

export async function GET() {
  try {
    const tasks = await getAllTasks();
    return NextResponse.json({ success: true, data: tasks });
  } catch (error) {
    return NextResponse.json(
      { success: false, error: "Failed to load tasks." },
      { status: 500 }
    );
  }
}
