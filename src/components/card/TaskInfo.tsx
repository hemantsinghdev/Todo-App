import { Box, Chip, Typography } from '@mui/material'
import React from 'react'

const TaskInfo = ({active, status, label}: {active: boolean, status: string, label: string}) => {
  return (
    <Box
          sx={{
            display: 'flex',
            alignItems: 'center',
            gap: 1,
          }}
        >
        <Box
          sx={{
            transition: 'transform 0.5s ease',
            transform: active ? 'translateX(-75px)' : 'translateX(0)'
          }}
        >
            <Typography>
                {status}
            </Typography>
        </Box>
        <Box
          sx={{
            transition: 'transform 0.6s ease',
            transform: active ? 'translateX(-75px)' : 'translateX(0)'
          }}
        >
            <Chip
              label={label}
              sx={{color: 'white', bgcolor:'', borderRadius: 1}}
            />
        </Box>
    </Box>
  )
}

export default TaskInfo