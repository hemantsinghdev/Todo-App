import { Box, TextField, Typography } from '@mui/material';

type TaskTitleProps = {
  title: string;
  isEditing: boolean;
  onChange: (newTitle: string) => void;
};

const TaskTitle = ({ title, isEditing, onChange }: TaskTitleProps) => {
  return (
    <Box sx={{ width: isEditing? '45%' : '60%' }}>
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
            }
          }}
        />
      ) : (
        <Typography>
          {title}
        </Typography>
      )}
    </Box>
  );
};

export default TaskTitle;
