"use client";
import { useEffect, useState } from "react";
import useTaskStore from "@/store/taskStore";
import { getAllTasks } from "@/services/indexedDB/taskServices";
import TaskBoard from "@/components/TaskBoard.component";

export default function TaskPage() {
  const tasks = useTaskStore(state => state.tasks);
  const setTasks = useTaskStore(state => state.setTasks);

  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const hydrateFromIndexedDB = async () => {
      if (tasks.length === 0) {
        setLoading(true);
        const storedTasks = await getAllTasks();
        setTasks(storedTasks);
        setLoading(false);
      }
    };

    hydrateFromIndexedDB();
  }, []);

  if (loading) {
    return <div className="text-center mt-10 text-gray-500">Loading your tasks...</div>;
  }

  return <TaskBoard tasksByLabel={{"all": tasks}}/>;
}
