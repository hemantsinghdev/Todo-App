"use client";
import { useEffect, useState } from "react";
import useTaskStore from "@/store/taskStore";
import { getAllTasks } from "@/services/indexedDB/taskServices";
import TaskBoard from "@/components/TaskBoard.component";
import useLabelStore from "@/store/labelStore";
import { getAllLabels } from "@/services/indexedDB/labelServices";

export default function TaskPage() {
  const tasks = useTaskStore(state => state.tasks);
  const labels = useLabelStore(state => state.labels);
  const setTasks = useTaskStore(state => state.setTasks);
  const setLabels = useLabelStore(state => state.setlabels);

  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const hydrateFromIndexedDB = async () => {
      if (tasks.length === 0 || labels.length === 0) {
        setLoading(true);
        if (tasks.length === 0){
          const storedTasks = await getAllTasks();
          setTasks(storedTasks);
        }
        if (labels.length === 0){
          const storedLabels = await getAllLabels();
          setLabels(storedLabels);
        }
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
