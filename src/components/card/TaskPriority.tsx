import { Box, MenuItem, Select, Typography } from '@mui/material';

type TaskPriorityProps = {
  priority?: string;
  isEditing: boolean;
  onPriorityChange: (priority: string) => void;
};

const priorityColors: Record<string, string> = {
  high: '#e53935',   // red
  medium: '#fb8c00', // orange
  low: '#43a047',    // green
};

const priorities = ['High', 'Medium', 'Low'];

const TaskPriority = ({ priority, isEditing, onPriorityChange }: TaskPriorityProps) => {
  const color = priority && priorityColors[priority.toLowerCase()] || 'gray';

  return (
    <Box display="flex" alignItems="center">
      {isEditing ? (
        <Select
          value={priority}
          onChange={(e) => onPriorityChange(e.target.value)}
          variant="standard"
          disableUnderline
          IconComponent={() => null} // removes dropdown arrow
          sx={{
            fontSize: 14,
            fontWeight: 500,
            color,
            px: 1,
            height: 28,
            borderRadius: 1,
            bgcolor: 'transparent',
            '& .MuiSelect-select': {
              padding: '4px 8px',
              display: 'flex',
              alignItems: 'center',
            },
          }}
          renderValue={(selected) => (
            <Box display="flex" alignItems="center" gap={0.35}>
              <Typography sx={{ color }}>●</Typography>
              <Typography sx={{ color, fontSize: '0.9rem' }}>
                {selected}
              </Typography>
            </Box>
          )}
          MenuProps={{
            PaperProps: {
              sx: {
                padding: 0,
                margin: 0,
                mt: 1,
                borderRadius: 1,
              },
            },
          }}
        >
          {priorities.map((option) => (
            <MenuItem key={option} value={option}>
                <Typography sx={{ fontWeight: 500, color: priorityColors[option.toLowerCase()]}}>{option}</Typography>
            </MenuItem>
          ))}
        </Select>
      ) : (
        <Box display="flex" alignItems="center" gap={0.35}>
          <Typography sx={{ color, marginTop:'-4px'}}>●</Typography>
          <Typography
            sx={{
              fontSize: '0.9rem',
              color,
              textTransform: 'capitalize',
            }}
          >
            {priority}
          </Typography>
        </Box>
      )}
    </Box>
  );
};

export default TaskPriority;
