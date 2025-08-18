import { Box, TextField, Typography } from '@mui/material';
import React, { useEffect, useRef, useState } from 'react';

type TaskDescriptionProps = {
  active: boolean;
  isEditing: boolean;
  description?: string;
  onDescriptionChange: (newDescription: string) => void;
};

const TaskDescription = ({
  active,
  isEditing,
  description,
  onDescriptionChange,
}: TaskDescriptionProps) => {
  const contentRef = useRef<HTMLDivElement>(null);
  const [height, setHeight] = useState(0);

  useEffect(() => {
    if (contentRef.current) {
      if (active || isEditing) {
        setHeight(contentRef.current.scrollHeight);
      } else {
        setHeight(0);
      }
    }
  }, [active, description, isEditing]);

  const shouldRender = isEditing || !!description;

  if (!shouldRender) return null;

  return (
    <Box
      sx={{
        height: `${height}px`,
        overflow: 'hidden',
        transition: 'height 0.4s ease, opacity 0.4s ease',
        opacity: active || isEditing ? 1 : 0,
        pointerEvents: active || isEditing ? 'auto' : 'none',
        my: 2,
      }}
    >
      <Box ref={contentRef}>
        {isEditing ? (
          <TextField
            multiline
            fullWidth
            value={description}
            onChange={(e) => onDescriptionChange(e.target.value)}
            variant="outlined"
            placeholder="Add the Description for the Task here..."
            minRows={3}
            sx={{
              backgroundColor: '#f4edfa', // #f5f0fa
              '& .MuiOutlinedInput-root': {
                fontSize: '0.9rem',
                fontWeight: 300,
                lineHeight: 1.6,
                borderRadius: 1,
                padding: '4px 8px',
              },
              '& .MuiOutlinedInput-notchedOutline': {
                borderColor: '#ddd',
              },
              '& .MuiOutlinedInput-root.Mui-focused .MuiOutlinedInput-notchedOutline': {
                borderColor: '#bbb',
              },
            }}
            inputProps={{
              style: {
                whiteSpace: 'pre-wrap',
              },
            }}
          />
        ) : (
          <Typography
            sx={{
              fontSize: '0.9rem',
              fontWeight: 300,
              whiteSpace: 'pre-line',
              lineHeight: 1.6,
              color: '#444',
            }}
          >
            {description}
          </Typography>
        )}
      </Box>
    </Box>
  );
};

export default TaskDescription;
