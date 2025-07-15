import {
  Box,
  Chip,
  MenuItem,
  Select,
  Typography,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  Button,
} from '@mui/material';
import React, { useCallback, useState } from 'react';

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
        return '#ff9800';
      case 'in progress':
        return '#2196f3';
      default:
        return 'grey';
    }
  };

  const [labelOptions, setLabelOptions] = useState<LabelOption[]>([
    { title: 'Work', color: 'red' },
    { title: 'Coding', color: 'blue' },
  ]);

  const currentLabel = labelOptions.find((l) => l.title === label);
  const labelColor = currentLabel?.color ?? 'gray';

  const [openAddDialog, setOpenAddDialog] = useState(false);
  const [newLabelTitle, setNewLabelTitle] = useState('');
  const [newLabelColor, setNewLabelColor] = useState('#6b3d8f');

  const statusOptions = ['Pending', 'In Progress'];

  const handleAddNewLabel = () => {
    const trimmedTitle = newLabelTitle.trim();
    if (!trimmedTitle) return;

    const newLabel: LabelOption = {
      title: trimmedTitle,
      color: newLabelColor,
    };

    setLabelOptions((prev) => [...prev, newLabel]);
    onLabelChange(newLabel.title);
    setNewLabelTitle('');
    setNewLabelColor('#6b3d8f');
    setOpenAddDialog(false);
  };

  const getCompactLabel = useCallback((label: string) => {
    const maxLength = 12;
    if (!label) return '';

    const truncate = (str: string, max: number) =>
    str.length > max ? str.slice(0, max - 1) + '…' : str;

    const words = label.split(' ');
    if (words.length === 1) return truncate(words[0], maxLength);

    const first = words[0];
    const second = words[1];

    const combined = `${first} ${second}`;
    if (combined.length <= maxLength) return combined;

    return truncate(first, maxLength);
  }, [])

  return (
    <>
      <Box sx={{ display: 'flex', alignItems: 'flex-start', gap: label || isEditing ? 1 : 0 }}>
        {/* Status */}
        <Box
          sx={{
            transition: 'transform 0.5s ease',
            transform: active || isEditing ? 'translateX(-75px)' : 'translateX(0)',
            margin: isEditing || !label ? 0 : '3px',
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
              sx={{
                fontWeight: 600,
                fontSize: label ? '14px' : '16px',
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
              value={label || ''}
              onChange={(e) => {
                if (e.target.value === '__add_label__') {
                  setOpenAddDialog(true);
                } else {
                  onLabelChange(e.target.value);
                }
              }}
              variant="standard"
              disableUnderline
              IconComponent={() => null}
              autoWidth
              displayEmpty
              MenuProps={{
                PaperProps: {
                  sx: {
                    mt: 1,
                    borderRadius: 1.5,
                    boxShadow: 3,
                    overflow: 'auto',
                    maxHeight: 168,
                    scrollbarWidth: 'none',
                    '&::-webkit-scrollbar': {
                      display: 'none',
                    },
                  },
                },
                MenuListProps: {
                  dense : true,
                  sx:{
                    paddingBottom: 0,
                  }
                },
              }}
              sx={{
                padding: 0,
                minWidth: 0,
                cursor: 'pointer',
                '& .MuiSelect-select': {
                  padding: '0 !important',
                },
              }}
              renderValue={(selected) => {
                const selectedLabel = labelOptions.find((l) => l.title === selected);
                if (!selectedLabel) {
                  return (
                    <Chip
                      label="Label"
                      sx={{
                        bgcolor: 'gray',
                        color: 'white',
                        fontWeight: 500,
                        borderRadius: 1,
                        fontSize: 14,
                        height: 24,
                      }}
                    />
                  );
                }
                return (
                  <Chip
                    label={getCompactLabel(selectedLabel.title)}
                    sx={{
                      bgcolor: selectedLabel.color,
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
                  <Typography sx={{ fontWeight: 500, fontSize: 14, color: option.color }}>
                    {option.title}
                  </Typography>
                </MenuItem>
              ))}
              <MenuItem
                value="__add_label__"
                sx={{
                  bgcolor: '#8555aa',
                  fontWeight: 500,
                  fontSize: 14,
                  borderRadius: 0.5,
                  color: 'white',
                  justifyContent: 'center',
                  '&:hover':{
                    backgroundColor: '#531f7a',
                  }
                }}
              >
                + Add Label
              </MenuItem>
            </Select>
          ) : (
            label && (
              <Chip
                label={getCompactLabel(label)}
                sx={{
                  bgcolor: labelColor,
                  color: 'white',
                  borderRadius: 1,
                  height: 24,
                  fontSize: 14,
                }}
              />
            )
          )}
        </Box>
      </Box>

      {/* Add Label Dialog */}
      <Dialog open={openAddDialog} onClose={() => setOpenAddDialog(false)}>
        <DialogTitle>Create New Label</DialogTitle>
        <DialogContent
          sx={{
            display: "flex",
            alignItems: "center",
            gap: 1,
          }}
        >
          <TextField
            label="Label Name"
            fullWidth
            value={newLabelTitle}
            onChange={(e) => setNewLabelTitle(e.target.value)}
            slotProps={{
              htmlInput:{
                maxLength: 40,
              }
            }}
            sx={{
               height: 32,
               mt: 1,
               '& .MuiInputBase-input':{
                padding: 0.5,
                paddingLeft: 1,
                height: 32,
               },
               '& .MuiInputLabel-root':{
                top: '-6px',
               },
               '& .MuiInputLabel-shrink':{
                  top: 0,
                }
              }}
          />
          <input
            type="color"
            value={newLabelColor}
            onChange={(e) => setNewLabelColor(e.target.value)}
            style={{
              width: 92,
              height: 46,
              padding: 0,
              cursor: 'pointer',
              marginTop: 16,
              borderRadius: '30%',
            }}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpenAddDialog(false)}>Cancel</Button>
          <Button
            disabled={!newLabelTitle.trim()}
            onClick={handleAddNewLabel}
          >
            Add
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
};

export default TaskInfo;