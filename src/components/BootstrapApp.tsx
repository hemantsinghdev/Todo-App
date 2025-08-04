"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import useTaskStore from "@/store/taskStore";
import Cookies from "js-cookie";
import TTask from "@/types/task";
import { initializeDB as initializeTaskDB } from "@/services/indexedDB/taskServices";
import { initializeDB as initializeLabelDB } from "@/services/indexedDB/labelServices";
import TLabel from "@/types/label";
import useLabelStore from "@/store/labelStore";

export default function BootstrapApp({ tasks, labels }: { tasks: TTask[], labels: TLabel[] }) {
  const router = useRouter();
  const setTasks = useTaskStore((state) => state.setTasks);
  const setLabels = useLabelStore((state) => state.setlabels);

  useEffect(() => {
    const initialize = async () => {
      setTasks(tasks);
      await initializeTaskDB(tasks);

      setLabels(labels);
      await initializeLabelDB(labels);

      Cookies.set("isSynced", Date.now().toString(), { expires: 1 });
      router.replace("/today");
    };
    initialize();
  }, [router, setTasks, tasks]);

  return <div className="text-center p-8">Loading your tasks...</div>;
}
