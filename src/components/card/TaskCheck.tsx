import { Box, Checkbox } from "@mui/material";

type TaskCheckProps = {
  isEditing: boolean;
  status: string;
  onChange: (newStatus: 'completed' | 'in progress') => void;
};

const TaskCheck = ({ isEditing, status, onChange }: TaskCheckProps) => {
  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    onChange(event.target.checked ? 'completed' : 'in progress');
  };

  return (
    <Box>
      <Checkbox
        disabled={isEditing}
        checked={status === 'completed'}
        onChange={handleChange}
      />
    </Box>
  );
};

export default TaskCheck;
