import { Box, Typography } from '@mui/material'
import React from 'react'

const TaskTitle = ({title}: {title: string}) => {
  return (
    <Box sx={{width:'65%'}}>{/* Card Title */}
                    <Typography>
                        {title}
                    </Typography>
                </Box>
  )
}

export default TaskTitle