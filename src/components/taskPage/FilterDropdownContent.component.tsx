import {
  Box,
  Typography,
  Checkbox,
  FormControlLabel,
  Chip,
} from "@mui/material";
import { useEffect, useState } from "react";

export default function FilterDropdownContent({
  labels,
  selectedLabels,
  onChange,
  onClose,
}: {
  labels: { labelId: string; labelName: string }[];
  selectedLabels: string[];
  onChange: (labels: string[]) => void;
  onClose: () => void;
}) {
  const [selected, setSelected] = useState<string[]>(selectedLabels);

  useEffect(() => {
    setSelected(selectedLabels)
  }, [selectedLabels]);

  const allSelected = selected.length === labels.length + 1; //Added 1 for unlabelled

  const toggleLabel = (id: string) => {
    setSelected((prev) =>
      prev.includes(id) ? prev.filter((l) => l !== id) : [...prev, id]
    );
  };

  const handleSelectAll = (checked: boolean) => {
    setSelected(checked ? [...labels.map((l) => l.labelId), "unlabelled"] : []);
  };

  useEffect(() => {
    if(allSelected){
      onChange(["__all__"])
    }else{
    onChange(selected);
    }
  }, [selected]);

  return (
    <Box>
      <Box display="flex" justifyContent="space-between" alignItems="center" mb={1}>
        <Typography fontWeight="bold">Labels</Typography>
        <FormControlLabel
          control={
            <Checkbox
              checked={allSelected}
              onChange={(e) => handleSelectAll(e.target.checked)}
            />
          }
          label="Select All"
        />
      </Box>

      <Box display="flex" gap={1} flexWrap="wrap">
        <Chip
            label="unlabelled"
            clickable
            variant={selected.includes("unlabelled") ? "filled" : "outlined"}
            color={selected.includes("unlabelled") ? "primary" : "default"}
            onClick={() => toggleLabel("unlabelled")}
          />
        {labels.map((label) => (
          <Chip
            key={label.labelId}
            label={label.labelName}
            clickable
            variant={selected.includes(label.labelId) ? "filled" : "outlined"}
            color={selected.includes(label.labelId) ? "primary" : "default"}
            onClick={() => toggleLabel(label.labelId)}
          />
        ))}
      </Box>
    </Box>
  );
}
