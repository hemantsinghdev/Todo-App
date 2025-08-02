'use client';

import { Drawer, Toolbar, Box, Button, Divider } from '@mui/material';
import useTaskStore from '@/store/taskStore';
import { createNewTask } from '@/helpers/createNewTask';
import { addTaskToDB } from '@/services/indexedDB/taskServices';

const drawerWidth = 240;

const Sidebar = () => {
  const addTask = useTaskStore(state => state.addTask);

  const handleAddTask = async () => {
    const newTask = createNewTask();
    addTask(newTask);
    await addTaskToDB(newTask);
  };

  return (
    <Drawer
      variant="permanent"
      sx={{
        width: drawerWidth,
        flexShrink: 0,
        [`& .MuiDrawer-paper`]: {
          width: drawerWidth,
          boxSizing: 'border-box',
        },
      }}
    >
      <Toolbar />
      <Box sx={{ p: 2, display: 'flex', flexDirection: 'column', gap: 2 }}>
        <Button
          variant="contained"
          color="primary"
          onClick={handleAddTask}
          fullWidth
        >
          ➕ Add Task
        </Button>

        <Divider />
      </Box>
    </Drawer>
  );
};

export default Sidebar;
