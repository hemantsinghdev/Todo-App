"use client";
import React, { useState } from "react";
import TaskContainer from "./TaskContainer.component";
import TTask from "@/types/task";
import { Box } from "@mui/material";
import useTaskStore from "@/store/taskStore";
import {
  DndContext,
  DragEndEvent,
  DragOverlay,
  MeasuringStrategy,
  MouseSensor,
  closestCenter,
  useSensor,
  useSensors,
} from "@dnd-kit/core";
import {
  SortableContext,
  verticalListSortingStrategy,
} from "@dnd-kit/sortable";
import TaskCard from "./TaskCard.component";

type TaskBoardProps = {
  tasksByLabel: {
    [labelName: string]: TTask[];
  };
};

const TaskBoard = ({ tasksByLabel }: TaskBoardProps) => {
  const updateTask = useTaskStore((state) => state.updateTask);
  const updateTaskOrder = useTaskStore((state) => state.updateTaskOrder);
  const deleteTask = useTaskStore((state) => state.deleteTask);
  const [activeId, setActiveId] = useState<string | null>(null);

  const mouseSensor = useSensor(MouseSensor, {
    activationConstraint: {
      delay: 100,
      tolerance: 5,
    },
  });

  const sensors = useSensors(mouseSensor);

  const handleUpdateTask = (updatedTask: TTask) => {
    updateTask(updatedTask);
  };

  const handleDeleteTask = (taskId: string) => {
    deleteTask(taskId);
  };

  const allTasks = Object.values(tasksByLabel).flat();

  const handleDragEnd = (event: DragEndEvent) => {
  const { active, over } = event;
  if (!over || active.id === over.id) return;

  const activeTask = allTasks.find((t) => t.localId === active.id);
  const overTask = allTasks.find((t) => t.localId === over.id);
  if (!activeTask || !overTask) return;

  const activeGroup = activeTask.labelId || "unlabeled";
  const overGroup = overTask.labelId || "unlabeled";

  const newTasks = [...allTasks];
  const oldIndex = newTasks.findIndex((t) => t.localId === active.id);
  newTasks.splice(oldIndex, 1);

  let overIndex = newTasks.findIndex((t) => t.localId === over.id);

  if (activeGroup === overGroup && oldIndex <= overIndex) {
    overIndex += 1;
  }

  const newTask = { ...activeTask };

  if (activeGroup !== overGroup) {
    newTask.labelId = overTask.labelId ?? undefined;
  }

  newTasks.splice(overIndex, 0, newTask);

  const grouped: { [key: string]: TTask[] } = {};
  for (const t of newTasks) {
    const key = t.labelId || "unlabeled";
    grouped[key] = grouped[key] || [];
    grouped[key].push(t);
  }

  const updated: TTask[] = [];
  Object.values(grouped).forEach((group) => {
    group.forEach((task, idx) => {
      updated.push({ ...task, orderByLabel: idx });
    });
  });

  updateTaskOrder(updated);
};


  const hasTasks = Object.values(tasksByLabel).some((arr) => arr.length > 0);

  if (!hasTasks) {
    return (
      <div className="text-center text-gray-500 mt-10">
        No tasks found. Start by adding a task.
      </div>
    );
  }

  return (
    <DndContext 
      sensors={sensors} 
      onDragEnd={handleDragEnd} 
      collisionDetection={closestCenter}
      onDragStart={(event) => setActiveId(event.active.id as string)}
      onDragCancel={() => setActiveId(null)}
    >
        <Box sx={{ mt: 5 }}>
          {Object.entries(tasksByLabel).map(([label, tasks]) => {
            if (tasks.length === 0) return null;
            return (
          <SortableContext
            key={label || "unlabeled"}
            items={tasks.map((t) => t.localId)}
            strategy={verticalListSortingStrategy}
          >
            <TaskContainer
                // key={label || "unlabeled"}
                label={label || "unlabeled"}
                tasks={tasks}
                handleUpdateTask={handleUpdateTask}
                handleDeleteTask={handleDeleteTask}
              />
          </SortableContext>
        );
          })}
        </Box>
      <DragOverlay adjustScale={false}>
    {activeId ? (
      <TaskCard
        task={allTasks.find((t) => t.localId === activeId)!}
        handleUpdateTask={handleUpdateTask}
        handleDelete={handleDeleteTask}
      />
    ) : null}
  </DragOverlay>
    </DndContext>
  );
};

export default TaskBoard;