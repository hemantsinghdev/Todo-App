"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import useTaskStore from "@/store/taskStore";
import Cookies from "js-cookie";
import TTask from "@/types/task";
import { initializeDB } from "@/services/indexedDB/taskServices";

export default function BootstrapApp({ tasks }: { tasks: TTask[] }) {
  const router = useRouter();
  const setTasks = useTaskStore((state) => state.setTasks);

  useEffect(() => {
    const initialize = async () => {
      setTasks(tasks);
      await initializeDB(tasks);
      Cookies.set("isSynced", Date.now().toString(), { expires: 1 });
      router.replace("/tasks");
    };
    initialize();
  }, [router, setTasks, tasks]);

  return <div className="text-center p-8">Loading your tasks...</div>;
}
