import { Alert, Box, Snackbar, TextField, Typography } from '@mui/material';
import { useEffect, useState } from 'react';

type TaskTitleProps = {
  title: string;
  isEditing: boolean;
  onChange: (newTitle: string) => void;
  showEmptyError?: boolean;
};

const TaskTitle = ({ title, isEditing, onChange, showEmptyError = false }: TaskTitleProps) => {
  const [openError, setOpenError] = useState(false);

  useEffect(() => {
    if (showEmptyError) {
      setOpenError(true);
    }
  }, [showEmptyError]);

  const handleClose = () => {
    setOpenError(false);
  };

  return (
    <Box sx={{ width: isEditing ? '42%' : '60%' }}>
      {isEditing ? (
        <TextField
          variant="outlined"
          value={title}
          onChange={(e) => onChange(e.target.value)}
          placeholder="Enter task title"
          fullWidth
          sx={{
            '& .MuiInputBase-input': {
              height: 25,
              p: '0 5px',
              boxSizing: 'border-box',
            },
          }}
        />
      ) : (
        <Typography>{title}</Typography>
      )}

      <Snackbar
        open={openError}
        autoHideDuration={3000}
        onClose={handleClose}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
      >
        <Alert severity="error" onClose={handleClose}>
          Task title cannot be empty.
        </Alert>
      </Snackbar>
    </Box>
  );
};

export default TaskTitle;
