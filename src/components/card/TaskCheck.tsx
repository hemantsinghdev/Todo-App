import { Box, Checkbox } from "@mui/material";

type TaskCheckProps = {
  isEditing: boolean;
  status: string;
  completed: boolean;
  toggleCheck: (checked: boolean) => void;
};

const TaskCheck = ({ isEditing, status, completed, toggleCheck }: TaskCheckProps) => {
  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    // console.log(event.target.checked);
    toggleCheck(event.target.checked);
  };

  return (
    <Box>
      <Checkbox
        disabled={isEditing}
        checked={completed}
        onChange={handleChange}
      />
    </Box>
  );
};

export default TaskCheck;
