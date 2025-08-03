'use client'
import React from 'react'
import TaskContainer from './TaskContainer.component'
import TTask from '@/types/task';
import { Box } from '@mui/material';
import useTaskStore from '@/store/taskStore';

type TaskBoardProps = {
  tasksByLabel: {
    [labelName: string]: TTask[];
  };
};

const TaskBoard = ({ tasksByLabel }: TaskBoardProps) => {
  const updateTask = useTaskStore((state) => state.updateTask);
  const deleteTask = useTaskStore((state) => state.deleteTask);
  const hasTasks = Object.values(tasksByLabel).some(arr => arr.length > 0);

  const handleUpdateTask = (updatedTask: TTask) => {
    updateTask(updatedTask);
  };

  const handleDeleteTask = (taskId: string) => {
    deleteTask(taskId);
  };

  if (!hasTasks) {
    return (
      <div className="text-center text-gray-500 mt-10">
        No tasks found. Start by adding a task.
      </div>
    );
  }

  return (
    <Box sx={{mt: 5}}>
      {Object.entries(tasksByLabel).map(([label, tasks]) => (
        <TaskContainer
          key={label || "unlabeled"}
          label={label || "unlabeled"}
          tasks={tasks}
          handleUpdateTask={handleUpdateTask}
          handleDeleteTask={handleDeleteTask}
        />
      ))}
    </Box>
  );
}

export default TaskBoard