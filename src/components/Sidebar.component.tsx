'use client';

import { Drawer, Toolbar, Box, Button, Divider } from '@mui/material';
import useTaskStore from '@/store/taskStore';

const Sidebar = () => {
  const addNewTask = useTaskStore(state => state.newTask);

  return (
    <Drawer
      variant='permanent'
      sx={{
        // width: drawerWidth,
        // flexShrink: 0,
        [`& .MuiDrawer-paper`]: {
          width: 240,
          boxSizing: 'border-box',
        },
      }}
    >
      <Box sx={{ mt: 5, p: 2, display: 'flex', flexDirection: 'column', gap: 2 }}>
        <Button
          variant="contained"
          color="primary"
          onClick={addNewTask}
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
