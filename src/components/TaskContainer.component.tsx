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
        border: '1px solid #000',
        borderRadius: 2,
        display: 'flex',
        justifyContent: 'center',
        p: 2.5,
        mb: 6,
        position: 'relative',
        pl: 2,
        width: 660,
      }}
    >
      <Box
        component="legend"
        sx={{
          px: 1.5,
          fontWeight: 600,
          fontSize: '1rem',
          fontFamily: 'Comic Sans MS, cursive',
          textTransform: 'capitalize',
        }}
      >
        {label}
      </Box>

      <Stack spacing={2}>
        {tasks.map((task) => (
          <TaskCard
            key={task.localId}
            task={task}
            handleUpdateTask={handleUpdateTask}
            handleDelete={handleDeleteTask}
          />
        ))}
      </Stack>
    </Box>
  );
}
