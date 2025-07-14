import { Box, Chip, MenuItem, Select, Typography } from '@mui/material';

type LabelOption = {
  title: string;
  color: string;
};

type TaskInfoProps = {
  active: boolean;
  isEditing: boolean;
  status: string;
  label?: string;
  onStatusChange: (newStatus: string) => void;
  onLabelChange: (newLabel: string) => void;
};

const TaskInfo = ({
  active,
  isEditing,
  status,
  label,
  onStatusChange,
  onLabelChange,
}: TaskInfoProps) => {
  const getStatusColor = (status: string) => {
    switch (status.toLowerCase()) {
      case 'pending':
        return '#ff9800'; // orange
      case 'in progress':
        return '#2196f3'; // blue
      default:
        return 'grey';
    }
  };

  const statusOptions = ['Pending', 'In Progress'];
  
  const labelOptions: LabelOption[] = [
    { title: 'Work', color: 'red' },
    { title: 'Coding', color: 'blue' },
  ];

  const currentLabel = labelOptions.find((l) => l.title === label);

  return (
    <Box sx={{ display: 'flex', alignItems: 'flex-start', gap: 1 }}>
      {/* Status */}
      <Box
        sx={{
          transition: 'transform 0.5s ease',
          transform: active || isEditing ? 'translateX(-75px)' : 'translateX(0)',
          margin: isEditing? 0 : '3px',
        }}
      >
        {isEditing ? (
          <Select
            size="small"
            value={status}
            onChange={(e) => onStatusChange(e.target.value)}
            variant="outlined"
            sx={{
              height: 25,
              fontSize: 14,
              fontWeight: 500,
              color: getStatusColor(status),
              textTransform: 'capitalize',
              '.MuiOutlinedInput-notchedOutline': {
                borderRadius: 1,
              },
            }}
          >
            {statusOptions.map((option) => (
              <MenuItem key={option} value={option}>
                <Typography
                  sx={{
                    fontWeight: 500,
                    fontSize: 14,
                    textTransform: 'capitalize',
                    color: getStatusColor(option),
                  }}
                >
                  {option}
                </Typography>
              </MenuItem>
            ))}
          </Select>
        ) : (
          <Typography
            fontSize={14}
            sx={{
              fontWeight: 600,
              fontSize: '0.85rem',
              color: getStatusColor(status),
              textTransform: 'capitalize',
            }}
          >
            {status}
          </Typography>
        )}
      </Box>

      {/* Label */}
      <Box
        sx={{
          transition: 'transform 0.6s ease',
          transform: active || isEditing ? 'translateX(-75px)' : 'translateX(0)',
        }}
      >
        {isEditing ? (
          <Select
            size="small"
            value={label}
            onChange={(e) => onLabelChange(e.target.value)}
            variant="standard"
            disableUnderline
            IconComponent={() => null}
            autoWidth
            MenuProps={{
              PaperProps: {
                sx: {
                  mt: 1,
                  borderRadius: 1.5,
                  boxShadow: 3,
                  overflow: 'hidden',
                },
              },
            }}
            sx={{
              padding: 0,
              minWidth: 0,
              cursor: 'pointer',
              '& .MuiSelect-select': {
                padding: '0 !important',
              },
              '&:hover': {
                backgroundColor: 'transparent',
              },
            }}
            renderValue={(selected) => {
              const selectedLabel = labelOptions.find((l) => l.title === selected);
              return (
                <Chip
                  label={selectedLabel?.title}
                  sx={{
                    bgcolor: selectedLabel?.color,
                    color: 'white',
                    fontWeight: 500,
                    borderRadius: 1,
                    fontSize: 14,
                    height: 24,
                  }}
                />
              );
            }}
          >
            {labelOptions.map((option) => (
              <MenuItem key={option.title} value={option.title}>
                <Typography
                  sx={{
                    fontWeight: 500,
                    fontSize: 14,
                    color: option.color,
                  }}
                >
                  {option.title}
                </Typography>
              </MenuItem>
            ))}
          </Select>

        ) : (
          <Chip
            label={label}
            sx={{
              bgcolor: currentLabel?.color || 'default',
              color: 'white',
              borderRadius: 1,
              height: 24,
              fontSize: 14,
            }}
          />
        )}
      </Box>
    </Box>
  );
};

export default TaskInfo;
