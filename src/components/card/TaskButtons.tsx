import { Delete, Edit } from '@mui/icons-material'
import { Box, IconButton } from '@mui/material'
import React from 'react'

const TaskButtons = ({active}:{active: boolean}) => {
  return (
    <Box
      sx={{
        display: 'flex',
        alignItems: 'center',
        position: 'absolute',
        right: 0,
        opacity: active ? 1 : 0,
        transition: 'opacity 0.3s ease 0.1s, transform 0.4s ease 0.1s',
        gap: 1,
      }}
    >
      <IconButton>
         <Edit fontSize="small" />
      </IconButton>
      <IconButton size="small">
        <Delete fontSize="small" />
      </IconButton>
    </Box>
  )
}

export default TaskButtons