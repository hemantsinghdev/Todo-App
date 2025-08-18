"use client";
import { useEffect, useMemo, useState } from "react";
import useTaskStore from "@/store/taskStore";
import useLabelStore from "@/store/labelStore";
import { getAllTasks } from "@/services/indexedDB/taskServices";
import { getAllLabels } from "@/services/indexedDB/labelServices";
import TaskBoard from "@/components/TaskBoard.component";
import getTasksByLabel from "@/helpers/tasksByLabel";
import filterTasks from "@/helpers/featureFilter";
import { Box } from "@mui/material";
import TaskFilterBar from "./taskPage/TaskPageFilterBar.component";
import { applySort } from "@/helpers/taskFilters";
import { useParams, useRouter, useSearchParams } from "next/navigation";
import { SortDir, SortKey } from "@/types/filter";

type FeatureOptions = "today" | "upcoming" | "expired" | "completed" | "all";

export default function TaskPage() {
  const router = useRouter();
  const params = useParams();
  const searchParams = useSearchParams();

  const tasks = useTaskStore((state) => state.tasks);
  const labels = useLabelStore((state) => state.labels);
  const setTasks = useTaskStore((state) => state.setTasks);
  const setLabels = useLabelStore((state) => state.setlabels);

  const feature = useMemo(() => params.feature as FeatureOptions, [params]);
  const sortKey = useMemo(() => searchParams.get("sort") as SortKey, [searchParams]);
  const sortDir = useMemo(() => searchParams.get("dir") as SortDir, [searchParams]);
  const activeLabelIds = useMemo(() => {
    const labelString = searchParams.get("labels");
    if (labelString==="__all__") return [...labels.map((label) => label.localId), "unlabelled"]
    else return labelString?.split(",").filter(Boolean) || [];
  }, [searchParams, labels]);

  const [tasksByLabel, setTasksByLabel] = useState({});
  const [loading, setLoading] = useState(false);

  useEffect(() => {
  const params = new URLSearchParams(searchParams.toString());

  let changed = false;
  if (!params.get("sort")) {
    params.set("sort", "custom");
    changed = true;
  }
  if (!params.get("dir")) {
    params.set("dir", "asc");
    changed = true;
  }
  if (!params.get("labels")) {
      params.set("labels", "__all__");
      changed=true;
    }

  if (changed) {
    router.replace("?" + params.toString());
  }
}, []);

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
    const activeLabels = labels.filter((l) => activeLabelIds.includes(l.localId));
    const labelledTasks = getTasksByLabel(activeLabels, tasks, activeLabelIds.includes("unlabelled"));
    const featureFiltered = filterTasks(feature, labelledTasks);

    for (const label in featureFiltered) {
      featureFiltered[label] = applySort(featureFiltered[label], sortKey, sortDir);
    }
    setTasksByLabel(featureFiltered);
  }, [tasks, labels, feature, sortKey, sortDir, activeLabelIds]);

  if (loading) {
    return <div className="text-center mt-10 text-gray-500">Loading your tasks...</div>;
  }

  return(
    <Box>
      <TaskFilterBar 
        labels={labels.map(({ localId, labelName }) => ({labelId: localId, labelName}))} 
        feature={feature} 
        sortKey={sortKey} 
        sortDir={sortDir}
        activeLabelsIds={activeLabelIds}
      />
      <TaskBoard tasksByLabel={tasksByLabel} dndEnabled={sortKey==="custom"} />
    </Box>
  );
}