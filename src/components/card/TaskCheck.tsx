import { Box, Checkbox } from "@mui/material"

const TaskCheck = ({isEditing}:{isEditing: boolean}) => {
  return (
    <Box>{/* It contains a checkbox, not hover-sensitive */}
            <Checkbox disabled={isEditing}/>
        </Box>
  )
}

export default TaskCheck