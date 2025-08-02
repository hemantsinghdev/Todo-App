'use client'
import React from 'react'
import TaskContainer from './TaskContainer.component'
import TTask from '@/types/task';

const mockTasks: TTask[] = [
  {
    localId: '1',
    title: 'Finish UI Design',
    description: 'Design the header and sidebar layout.',
    labelId: 'work',
    tags: ['ui', 'priority'],
    startDate: new Date(),
    dueDate: new Date(Date.now() + 86400000),
    priority: 'high',
    status: 'in progress',
    synced: false,
  },
  {
    localId: '2',
    title: 'Write Documentation',
    description: 'Add usage section in README.md',
    labelId: 'work',
    tags: ['docs'],
    startDate: null,
    dueDate: null,
    priority: 'medium',
    status: 'pending',
    synced: true,
  },
];

type TaskBoardProps = {
  tasksByLabel: {
    [labelName: string]: TTask[];
  };
};

const TaskBoard = ({ tasksByLabel }: TaskBoardProps) => {
  const hasTasks = Object.values(tasksByLabel).some(arr => arr.length > 0);

  const handleUpdateTask = (updatedTask: TTask) => {
    console.log('Task updated:', updatedTask);
  };

  const handleDeleteTask = (taskId: string) => {
    console.log('Delete task:', taskId);
  };

  if (!hasTasks) {
    return (
      <div className="text-center text-gray-500 mt-10">
        No tasks found. Start by adding a task.
      </div>
    );
  }

  return (
    <div className="flex gap-4 px-4 overflow-x-auto">
      {Object.entries(tasksByLabel).map(([label, tasks]) => (
        <TaskContainer
          label={label || "unlabeled"}
          tasks={tasks}
          handleUpdateTask={handleUpdateTask}
          handleDeleteTask={handleDeleteTask}
        />
      ))}
    </div>
  );
}

export default TaskBoard