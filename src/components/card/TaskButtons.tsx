import { Delete, Edit, Save } from '@mui/icons-material';
import { Box, IconButton } from '@mui/material';
import React from 'react';

type TaskButtonsProps = {
  active: boolean;
  isEditing: boolean;
  handleEdit: () => void;
  handleDelete: () => void;
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
  handleDelete,
  handleSave,
}: TaskButtonsProps) => {
  return (
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
        onClick={handleDelete}
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
  );
};

export default TaskButtons;
