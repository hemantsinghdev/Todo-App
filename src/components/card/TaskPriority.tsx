import { Box, Typography } from '@mui/material'
import React from 'react'

const TaskPriority = ({priority}: {priority: string}) => {
  return (
    <Box display="flex" alignItems="center" gap={1}>
    <Typography
    >
      ●
    </Typography>
    <Typography
    >
      {priority}
    </Typography>
  </Box>
  )
}

export default TaskPriority