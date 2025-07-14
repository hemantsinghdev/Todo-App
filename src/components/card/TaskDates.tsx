import {
  Box,
  TextField,
  Typography,
} from '@mui/material';
import {
  DatePicker,
  LocalizationProvider,
} from '@mui/x-date-pickers';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { format } from 'date-fns';

type TaskDatesProps = {
  isEditing: boolean;
  startDate: Date | null;
  dueDate: Date | null;
  onStartDateChange: (date: Date | null) => void;
  onDueDateChange: (date: Date| null) => void;
};

const TaskDates = ({
  isEditing,
  startDate,
  dueDate,
  onStartDateChange,
  onDueDateChange,
}: TaskDatesProps) => {
  return (
    <LocalizationProvider dateAdapter={AdapterDateFns}>
      {isEditing ? (
        <Box display="flex" gap={1} alignItems="center">
          <DatePicker
            label="Start Date"
            value={startDate}
            onChange={onStartDateChange}
            slotProps={{
              textField: {
                variant: 'outlined',
                size: 'small',
                sx: {
                  margin: 0,
                  padding: 0,
                  width: 140,
                  borderRadius: 1,
                  fontSize: '0.65rem',
                  backgroundColor: '#fafafa',
                  '& .MuiPickersInputBase-root': {
                    height: 36,
                  },
                  '& .MuiSvgIcon-root': {
                  fontSize: 18,
                  },
                },
              },
            }}
          />

          <DatePicker
            label="Due Date"
            value={dueDate}
            onChange={onDueDateChange}
            slotProps={{
              textField: {
                variant: 'outlined',
                size: 'small',
                sx: {
                  margin: 0,
                  padding: 0,
                  width: 140,
                  borderRadius: 1,
                  fontSize: '0.65rem',
                  backgroundColor: '#fafafa',
                  '& .MuiPickersInputBase-root': {
                    height: 36,
                  },
                  '& .MuiSvgIcon-root': {
                  fontSize: 18,
                  },
                },
              },
            }}
          />
        </Box>
      ) : (
        <Box display="flex" gap={1}>
          <Typography
            sx={{
              fontSize: '0.85rem',
              color: startDate ? 'text.secondary' : 'text.disabled',
            }}
          >
            {startDate ? format(startDate, 'MMM d, yyyy') : ''}
          </Typography>
          {startDate && dueDate && (
            <Typography sx={{ fontSize: '0.85rem', color: 'text.disabled' }}>
              →
            </Typography>
          )}
          <Typography
            sx={{
              fontSize: '0.85rem',
              color: dueDate ? 'primary.main' : 'text.disabled',
            }}
          >
            {dueDate ? format(dueDate, 'MMM d, yyyy') : ''}
          </Typography>
        </Box>
      )}
    </LocalizationProvider>
  );
};

export default TaskDates;
