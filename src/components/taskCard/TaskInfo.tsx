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
import React, { useCallback, useEffect, useState } from 'react';
import TLabel from "@/types/label";
import truncateLabel from '@/helpers/truncateLabel';
import getStatusColor from '@/helpers/statusColor';
import useLabelStore from '@/store/labelStore';
import { createNewLabel } from '@/helpers/createNewLabel';
import { Cancel } from '@mui/icons-material';

type TaskInfoProps = {
  active: boolean;
  isEditing: boolean;
  status: "pending" | "in progress";
  completed: boolean;
  labelId?: string;
  onStatusChange: (newStatus: "pending" | "in progress") => void;
  onLabelChange: (newLabel: string) => void;
  removeLabel: () => void;
};

const TaskInfo = ({
  active,
  isEditing,
  status,
  completed,
  labelId,
  onStatusChange,
  onLabelChange,
  removeLabel,
}: TaskInfoProps) => {
  const getCompactLabel = useCallback(truncateLabel, [])
  
  const labels = useLabelStore((state) => state.labels);
  const addLabel = useLabelStore((state) => state.addLabel);

  const currentLabel = labels.find((l) => l.localId === labelId);
  const labelColor = currentLabel?.color ?? 'gray';

  const [currentStatus, setCurrentStatus] = useState(completed === true ? "completed" : status)
  const [openAddDialog, setOpenAddDialog] = useState(false);
  const [newLabelTitle, setNewLabelTitle] = useState('');
  const [newLabelColor, setNewLabelColor] = useState('#6b3d8f');

  const statusOptions = ['pending', 'in progress'];

  useEffect(() => {
    setCurrentStatus(completed === true ? "completed" : status);
  }, [completed, status])

  const handleAddNewLabel = () => {
    const trimmedTitle = newLabelTitle.trim();
    if (!trimmedTitle) return;

    const newLabel: TLabel = createNewLabel(trimmedTitle, newLabelColor);
    addLabel(newLabel);

    onLabelChange(newLabel.localId);
    setNewLabelTitle('');
    setNewLabelColor('#6b3d8f');
    setOpenAddDialog(false);
  };

  return (
    <>
      <Box sx={{ display: 'flex', alignItems: 'flex-start', gap: labelId || isEditing ? 1 : 0 }}>
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
              value={labelId || ''}
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
                    maxWidth: 140,
                    '&::-webkit-scrollbar': {
                      // display: 'none',
                      width: "4px",
                    },
                    '&::-webkit-scrollbar-thumb':{
                      backgroundColor: "#A60000",
                      borderRadius: "4px"
                    },
                    '&::-webkit-scrollbar-thumb:hover':{
                      backgroundColor: "#8B0404",
                    }
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
                height: 20,
                cursor: 'pointer',
                '& .MuiSelect-select': {
                  padding: '0 !important',
                },
              }}
              renderValue={(selected) => {
                const selectedLabel = labels.find((l) => l.localId === selected);
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
                        height: 20,
                        '.MuiChip-label':{
                          px: '6px'
                        }
                      }}
                    />
                  );
                }
                return (
                  <Chip
                    label={getCompactLabel(selectedLabel.labelName)}
                    sx={{
                      bgcolor: selectedLabel.color,
                      color: 'white',
                      fontWeight: 500,
                      borderRadius: 1,
                      fontSize: 14,
                      height: 20,
                      '.MuiChip-label':{
                        px: '6px'
                      }
                    }}
                  />
                );
              }}
            >
              {labels.map((option) => (
                <MenuItem key={option.localId} value={option.localId}>
                  <Typography noWrap sx={{ fontWeight: 500, fontSize: 14, color: option.color }}>
                    {option.labelName}
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
            currentLabel && (
              <Chip
                label={getCompactLabel(currentLabel.labelName)}
                onDelete={removeLabel}
                deleteIcon={<Cancel/>}
                sx={{
                  bgcolor: labelColor,
                  color: 'white',
                  borderRadius: 1,
                  height: 20,
                  fontSize: 14,
                  '.MuiChip-label':{
                    px: '6px'
                  },
                  '.MuiChip-deleteIcon':{
                    fontSize: '14px',
                    opacity: 1,
                    color: 'white',
                    margin: '0 3px 0 0',
                  }
                }}
              />
            )
          )}
        </Box>

        {/* Status */}
        <Box
          sx={{
            transition: 'transform 0.5s ease',
            transform: active || isEditing ? 'translateX(-75px)' : 'translateX(0)',
            margin: isEditing ? 0 : '3px',
          }}
        >
          {isEditing ? (
            <Select
              size="small"
              value={currentStatus}
              onChange={(e) => onStatusChange(e.target.value as ("pending" | "in progress"))}
              variant="outlined"
              disabled={completed}
              sx={{
                height: 20,
                fontSize: 14,
                fontWeight: 500,
                color: getStatusColor(currentStatus),
                textTransform: 'capitalize',
                '.MuiOutlinedInput-notchedOutline': {
                  borderRadius: 1,
                },
              }}
              renderValue={(value) => {
                return (
                  <Typography
                    sx={{
                      fontWeight: 600,
                      fontSize: labelId ? '14px' : '16px',
                      color: getStatusColor(status),
                      textTransform: 'capitalize',
                    }}
                  >
                    {value}
                  </Typography>
                )
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
                fontSize: '14px',
                color: getStatusColor(currentStatus),
                textTransform: 'capitalize',
                width: '78px',
                textAlign:'right',
              }}
            >
              {currentStatus}
            </Typography>
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