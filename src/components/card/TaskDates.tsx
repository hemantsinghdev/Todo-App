import { Box, Typography } from '@mui/material'
import React from 'react'

const TaskDates = ({startDate, dueDate}: {startDate?: string, dueDate?: string}) => {
  return (
    <Box display="flex" gap={1}>
            <Typography>
                {(startDate && dueDate) 
                    ? `${startDate} → ${dueDate}` 
                    : (dueDate) ? `Due Date : ${startDate}`
                    : (startDate) ? `Start Date : ${startDate}`
                    : ``
                }
            </Typography>
        </Box>
  )
}

export default TaskDates