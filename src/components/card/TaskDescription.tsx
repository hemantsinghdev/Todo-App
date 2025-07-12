import { Box, Typography } from '@mui/material'
import React, { useEffect, useRef, useState } from 'react'

const TaskDescription = ({ active, description }: { active: boolean, description: string }) => {
  const contentRef = useRef<HTMLDivElement>(null);
  const [height, setHeight] = useState(0);

  useEffect(() => {
    if (contentRef.current) {
      if (active) {
        setHeight(contentRef.current.scrollHeight);
      } else {
        setHeight(0);
      }
    }
  }, [active, description]);

  return (
    <Box
      sx={{
        height: `${height}px`,
        overflow: 'hidden',
        transition: 'height 0.4s ease, opacity 0.4s ease',
        opacity: active ? 1 : 0,
        pointerEvents: active ? 'auto' : 'none',
        my: 1,
      }}
    >
      <Box ref={contentRef}>
        <Typography>
          {description}
        </Typography>
      </Box>
    </Box>
  );
};

export default TaskDescription;
