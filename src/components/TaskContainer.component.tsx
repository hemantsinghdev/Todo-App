'use client';
import { Box, Stack } from '@mui/material';
import TaskCard from './TaskCard.component';
import TTask from '@/types/task';

type TaskContainerProps = {
  label: string;
  tasks: TTask[];
  handleUpdateTask: (task: TTask) => void;
  handleDeleteTask: (taskId: string) => void;
};

export default function TaskContainer({
  label,
  tasks,
  handleUpdateTask,
  handleDeleteTask,
}: TaskContainerProps) {
  return (
    <Box
      component="fieldset"
      sx={{
        border: '2px solid #000',
        borderRadius: 2,
        p: 2,
        mb: 6,
        position: 'relative',
        pl: 2,
      }}
    >
      <Box
        component="legend"
        sx={{
          px: 1.5,
          fontWeight: 600,
          fontSize: '1rem',
          fontFamily: 'Comic Sans MS, cursive',
        }}
      >
        {label}
      </Box>

      <Stack spacing={2}>
        {tasks.map((task) => (
          <TaskCard
            key={task.localId}
            task={task}
            handleUpdateTask={(updatedTask) => handleUpdateTask(updatedTask)}
            handleDelete={() => handleDeleteTask(task.localId)}
          />
        ))}
      </Stack>
    </Box>
  );
}
