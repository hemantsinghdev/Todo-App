import { Box, MenuItem, Select, Typography } from '@mui/material';

type TaskPriorityProps = {
  priority?: string;
  isEditing: boolean;
  onPriorityChange: (priority: string) => void;
};

const priorityColors: Record<string, string> = {
  high: '#e53935',
  medium: '#fb8c00',
  low: '#43a047',
};

const priorities = ['High', 'Medium', 'Low'];

const TaskPriority = ({ priority, isEditing, onPriorityChange }: TaskPriorityProps) => {
  const color = priority ? priorityColors[priority.toLowerCase()] : 'gray';
  if (!isEditing && !priority) return null;

  return (
    <Box display="flex" alignItems="center">
      {isEditing ? (
        <Select
          value={priority || ''}
          onChange={(e) => onPriorityChange(e.target.value)}
          variant="standard"
          disableUnderline
          IconComponent={() => null}
          displayEmpty
          sx={{
            fontSize: 14,
            fontWeight: 500,
            color,
            px: 1,
            height: 28,
            borderRadius: 1,
            bgcolor: 'transparent',
            '& .MuiSelect-select': {
              padding: '4px 0',
              display: 'flex',
              alignItems: 'center',
              paddingRight: '0 !important',
            },
            padding: 0,
            minWidth: 0,
            cursor: 'pointer',
          }}
          renderValue={(selected) => {
            if (!selected) {
              return (
                <Box display="flex" alignItems="center" gap={0.5}>
                  <Typography sx={{ color: 'gray', marginTop: '-4px' }}>●</Typography>
                  <Typography sx={{ color: 'gray', fontSize: '0.9rem' }}>
                    Priority
                  </Typography>
                </Box>
              );
            }

            return (
              <Box display="flex" alignItems="center" gap={0.5}>
                <Typography sx={{ color, marginTop: '-4px' }}>●</Typography>
                <Typography sx={{ color, fontSize: '0.9rem' }}>
                  {selected}
                </Typography>
              </Box>
            );
          }}
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
              <Typography
                sx={{
                  fontWeight: 500,
                  color: priorityColors[option.toLowerCase()],
                }}
              >
                {option}
              </Typography>
            </MenuItem>
          ))}
        </Select>
      ) : (
        <Box display="flex" alignItems="center" gap={0.35}>
          <Typography sx={{ color, marginTop: '-4px' }}>●</Typography>
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
