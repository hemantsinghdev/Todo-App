'use client'
import TaskCard from "@/components/TaskCard.component";
import { useState } from "react";

const date: Date = new Date();

const task={
    title: 'Design UI',
    description: 'Finish \n login \n screen',
    label: 'Work',
    tags: ['UI', 'Figma'],
    startDate: date,
    endDate: null,
    priority: 'High',
    status: 'Pending',
}

export default function Home() {
  const [newTask, setNewTask] = useState(task);

  const handleUpdateTask = (updatedTask: any) => {
      console.log("\n\nNew Task received : ", updatedTask)
      setNewTask(updatedTask);
  };

  return (
    <div className="flex justify-center items-center h-full">
    <TaskCard task={newTask} handleUpdateTask={handleUpdateTask}/>

    </div>
  );
}
