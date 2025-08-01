'use client';
import { Drawer, Toolbar, Box, List, ListItemText, ListItemButton } from '@mui/material';
const drawerWidth = 240;

const Sidebar = () => {
  const labels = ['Work', 'Personal', 'Shopping', 'Ideas'];

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
      <Box sx={{ overflow: 'auto' }}>
        <List>
          {labels.map((text) => (
            <ListItemButton key={text}>
              <ListItemText primary={text} />
            </ListItemButton>
          ))}
        </List>
      </Box>
    </Drawer>
  );
};

export default Sidebar;
