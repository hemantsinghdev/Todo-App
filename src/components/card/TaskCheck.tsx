import { Box, Checkbox } from "@mui/material";

type TaskCheckProps = {
  isEditing: boolean;
  status: string;
  onStatusChange: (newStatus: string) => void;
};

const TaskCheck = ({ isEditing, status, onStatusChange }: TaskCheckProps) => {
  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    onStatusChange(event.target.checked ? 'Completed' : 'Pending');
  };

  return (
    <Box>
      <Checkbox
        disabled={isEditing}
        checked={status === 'Completed'}
        onChange={handleChange}
      />
    </Box>
  );
};

export default TaskCheck;
