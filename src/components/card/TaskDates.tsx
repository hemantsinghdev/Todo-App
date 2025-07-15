import {
  Alert,
  Box,
  Snackbar,
  Typography,
} from '@mui/material';
import {
  DatePicker,
  LocalizationProvider,
} from '@mui/x-date-pickers';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { format, isSameDay, isAfter } from 'date-fns';
import { useState } from 'react';

type TaskDatesProps = {
  isEditing: boolean;
  startDate: Date | null;
  dueDate: Date | null;
  onStartDateChange: (date: Date | null) => void;
  onDueDateChange: (date: Date | null) => void;
};

const TaskDates = ({
  isEditing,
  startDate,
  dueDate,
  onStartDateChange,
  onDueDateChange,
}: TaskDatesProps) => {
  const [alertOpen, setAlertOpen] = useState(false);
  const [alertMessage, setAlertMessage] = useState('');

  const showAlert = (message: string) => {
    setAlertMessage(message);
    setAlertOpen(true);
  };
  
  const handleStartDateChange = (newDate: Date | null) => {
    if (newDate && dueDate) {
      if (isAfter(newDate, dueDate)) {
        showAlert('Start date cannot be after due date.');
        return;
      }
      if (isSameDay(newDate, dueDate)) {
        onStartDateChange(null);
        return;
      }
    }
    onStartDateChange(newDate);
  };
  
  const handleDueDateChange = (newDate: Date | null) => {
    if (newDate && startDate) {
      if (isAfter(startDate, newDate)) {
        showAlert('Due date cannot be before start date.');
        return;
      }
      if (isSameDay(startDate, newDate)) {
        onStartDateChange(null);
      }
    }
    onDueDateChange(newDate);
  };


  return (
    <LocalizationProvider dateAdapter={AdapterDateFns}>
      {isEditing ? (
        <Box display="flex" gap={1} alignItems="center">
          <DatePicker
            label="Start Date"
            format="dd/MM/yyyy"
            value={startDate}
            onChange={handleStartDateChange}
            slotProps={{
              textField: {
                variant: 'outlined',
                size: 'small',
                sx: {
                  margin: 0,
                  padding: 0,
                  width: 150,
                  borderRadius: 1,
                  fontSize: '0.65rem',
                  backgroundColor: '#fdfaff',
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
            format="dd/MM/yyyy"
            value={dueDate}
            onChange={handleDueDateChange}
            slotProps={{
              textField: {
                variant: 'outlined',
                size: 'small',
                sx: {
                  margin: 0,
                  padding: 0,
                  width: 150,
                  borderRadius: 1,
                  fontSize: '0.65rem',
                  backgroundColor: '#fdfaff',
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
        <Box display="flex" gap={1} alignItems="center">
          {startDate && dueDate ? (
            <>
              <Typography sx={{ fontSize: '0.85rem', color: 'text.secondary' }}>
                {format(startDate, 'MMM d, yyyy')}
              </Typography>
              <Typography sx={{ fontSize: '0.85rem', color: 'text.disabled' }}>
                →
              </Typography>
              <Typography sx={{ fontSize: '0.85rem', color: 'primary.main' }}>
                {format(dueDate, 'MMM d, yyyy')}
              </Typography>
            </>
          ) : startDate ? (
            <>
              <Typography sx={{ fontSize: '0.85rem', color: 'text.disabled' }}>
                Start Date:
              </Typography>
              <Typography sx={{ fontSize: '0.85rem', color: 'text.secondary' }}>
                {format(startDate, 'MMM d, yyyy')}
              </Typography>
            </>
          ) : dueDate ? (
            <>
              <Typography sx={{ fontSize: '0.85rem', color: 'text.disabled' }}>
                Due Date:
              </Typography>
              <Typography sx={{ fontSize: '0.85rem', color: 'primary.main' }}>
                {format(dueDate, 'MMM d, yyyy')}
              </Typography>
            </>
          ) : null}
        </Box>
        )}

        <Snackbar
        open={alertOpen}
        autoHideDuration={3000}
        onClose={() => setAlertOpen(false)}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
      >
        <Alert
          severity="warning"
          onClose={() => setAlertOpen(false)}
          sx={{ width: '100%' }}
        >
          {alertMessage}
        </Alert>
      </Snackbar>

    </LocalizationProvider>
  );
};

export default TaskDates;
