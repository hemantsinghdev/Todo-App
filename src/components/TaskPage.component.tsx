"use client";
import { useEffect, useState } from "react";
import useTaskStore from "@/store/taskStore";
import useLabelStore from "@/store/labelStore";
import { getAllTasks } from "@/services/indexedDB/taskServices";
import { getAllLabels } from "@/services/indexedDB/labelServices";
import TaskBoard from "@/components/TaskBoard.component";
import getTasksByLabel from "@/helpers/tasksByLabel";
import filterTasks from "@/helpers/filterTasks";

type FeatureOptions = "today" | "upcoming" | "expired" | "completed" | "all";

export default function TaskPage({ filter }: { filter: FeatureOptions }) {
  const tasks = useTaskStore((state) => state.tasks);
  const labels = useLabelStore((state) => state.labels);
  const setTasks = useTaskStore((state) => state.setTasks);
  const setLabels = useLabelStore((state) => state.setlabels);

  const [tasksByLabel, setTasksByLabel] = useState({});
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const hydrateFromIndexedDB = async () => {
      if (tasks.length === 0 || labels.length === 0) {
        setLoading(true);
        if (tasks.length === 0) {
          const storedTasks = await getAllTasks();
          setTasks(storedTasks);
        }
        if (labels.length === 0) {
          const storedLabels = await getAllLabels();
          setLabels(storedLabels);
        }
        setLoading(false);
      }
    };

    hydrateFromIndexedDB();
  }, []);

  useEffect(() => {
    const byLabel = getTasksByLabel(labels, tasks);
    const filtered = filterTasks(filter, byLabel);
    setTasksByLabel(filtered);
  }, [tasks, labels, filter]);

  if (loading) {
    return <div className="text-center mt-10 text-gray-500">Loading your tasks...</div>;
  }

  return <TaskBoard tasksByLabel={tasksByLabel} />;
}