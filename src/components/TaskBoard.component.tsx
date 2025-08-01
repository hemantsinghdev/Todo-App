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

const TaskBoard = () => {
    const handleUpdateTask = (updatedTask: TTask) => {
    console.log('Task updated:', updatedTask);
  };

  const handleDeleteTask = (taskId: string) => {
    console.log('Delete task:', taskId);
  };

  return (
    <TaskContainer
      label="Work"
      tasks={mockTasks}
      handleUpdateTask={handleUpdateTask}
      handleDeleteTask={handleDeleteTask}
    />
  );
}

export default TaskBoard