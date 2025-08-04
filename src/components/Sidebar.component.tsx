'use client';
import {
  Drawer,
  Box,
  Button,
  Divider,
  List,
  ListItemButton,
  ListItemText,
  Collapse,
  IconButton,
} from '@mui/material';
import { ExpandLess, ExpandMore } from '@mui/icons-material';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useEffect, useState } from 'react';
import useTaskStore from '@/store/taskStore';
import useLabelStore from '@/store/labelStore';

const Sidebar = () => {
  const labels = useLabelStore(state => state.labels);
  const addNewTask = useTaskStore(state => state.newTask);
  const pathname = usePathname();
  const [labelsOpen, setLabelsOpen] = useState(false);

  const featureItems = [
    { label: 'Today', path: '/today' },
    { label: 'Upcoming', path: '/upcoming' },
    { label: 'Expired', path: '/expired'},
    { label: 'All Tasks', path: '/all' },
    { label: 'Completed', path: '/completed' },
  ];

  return (
    <Drawer
      variant='permanent'
      sx={{
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

        <Divider sx={{borderColor: 'black'}}/>

        <List>
          {featureItems.map(item => (
            <Link
              key={item.path}
              href={item.path}
              style={{ textDecoration: 'none', color: 'inherit' }}
            >
              <ListItemButton 
                selected={pathname === item.path} 
                sx={{ 
                  p: '2px', 
                  pl: '16px',
                  my: '4px', 
                  borderRadius: 8 
                }}>
                <ListItemText primary={item.label} />
              </ListItemButton>
            </Link>
          ))}

          <Divider sx={{borderColor: 'black'}} />

          <Box sx={{ display: 'flex', alignItems: 'center' }}>
            <Link
              href="/labels"
              style={{
                textDecoration: 'none',
                color: 'inherit',
                flex: 1,
              }}
            >
              <ListItemButton 
                selected={pathname === '/labels'} 
                sx={{ 
                  flex: 1,  
                  p: '2px', 
                  pl: '16px',
                  my: '4px',
                  mr: '4px',
                  borderRadius: 8  
                }}>
                <ListItemText primary="Labels" />
              </ListItemButton>
            </Link>

            <Divider orientation="vertical" flexItem variant='middle' sx={{borderColor: 'black'}} />

            <IconButton onClick={() => setLabelsOpen(prev => !prev)}>
              {labelsOpen ? <ExpandLess /> : <ExpandMore />}
            </IconButton>
          </Box>

          <Collapse in={labelsOpen} timeout="auto" unmountOnExit>
            <Divider variant='middle'/>
            <List component="div" disablePadding>
              {labels.map(label => (
                <Link
                  key={label.localId}
                  href={`/${label.labelName}`}
                  style={{ textDecoration: 'none', color: 'inherit' }}
                >
                  <ListItemButton
                    selected={pathname === `/${label.labelName}`}
                    sx={{ 
                      p: '2px', 
                      pl: '16px',
                      my: '4px', 
                      borderRadius: 8 }}
                  >
                    <ListItemText primary={label.labelName} />
                  </ListItemButton>
                </Link>
              ))}
            </List>
          </Collapse>
          <Divider sx={{borderColor: 'black'}}/>
        </List>
      </Box>
    </Drawer>
  );
};

export default Sidebar;
