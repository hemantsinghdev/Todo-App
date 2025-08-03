import { Delete, Edit, Save } from '@mui/icons-material';
import { Box, IconButton, Dialog, DialogTitle, DialogContent, DialogActions, Button } from '@mui/material';
import React, { useState } from 'react';

type TaskButtonsProps = {
  active: boolean;
  isEditing: boolean;
  handleEdit: () => void;
  deleteTask: () => void;
  handleSave: () => void;
};

const iconStyles = {
  width: 18,
  height: 18,
  color: 'white',
};

const TaskButtons = ({
  active,
  isEditing,
  handleEdit,
  deleteTask,
  handleSave,
}: TaskButtonsProps) => {
  const [openConfirmDialog, setOpenConfirmDialog] = useState(false);

  const onDeleteClick = () => {
    setOpenConfirmDialog(true);
  };

  const onConfirmDelete = () => {
    setOpenConfirmDialog(false);
    deleteTask();
  };

  const onCancelDelete = () => {
    setOpenConfirmDialog(false);
  };

  return (
    <>
      <Box
        sx={{
          display: 'flex',
          alignItems: 'center',
          position: 'absolute',
          right: 0,
          opacity: active || isEditing ? 1 : 0,
          transition: 'opacity 0.3s ease 0.1s, transform 0.4s ease 0.1s',
          gap: 1,
        }}
      >
        <IconButton
          onClick={isEditing ? handleSave : handleEdit}
          sx={{
            bgcolor: isEditing ? '#4caf50' : '#2196f3',
            p: 0.5,
            borderRadius: 1,
            '&:hover': {
              bgcolor: isEditing ? '#43a047' : '#1976d2',
            },
          }}
        >
          {isEditing ? <Save sx={iconStyles} /> : <Edit sx={iconStyles} />}
        </IconButton>

        <IconButton
          onClick={onDeleteClick}
          sx={{
            bgcolor: '#f44336',
            p: 0.5,
            borderRadius: 1,
            '&:hover': {
              bgcolor: '#d32f2f',
            },
          }}
        >
          <Delete sx={iconStyles} />
        </IconButton>
      </Box>

      {/* Delete Confirmation Dialog */}
      <Dialog open={openConfirmDialog} onClose={onCancelDelete}>
        <DialogTitle>Confirm Delete</DialogTitle>
        <DialogContent>Are you sure you want to delete this task?</DialogContent>
        <DialogActions>
          <Button onClick={onCancelDelete} color="primary">
            Cancel
          </Button>
          <Button onClick={onConfirmDelete} color="error">
            Delete
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
};

export default TaskButtons;
