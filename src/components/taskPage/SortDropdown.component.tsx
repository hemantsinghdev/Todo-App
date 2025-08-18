import {
  Box,
  Button,
  Menu,
  MenuItem,
  Divider,
  Typography,
  ListItemIcon,
  ListItemText,
} from "@mui/material";
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';
import CheckIcon from '@mui/icons-material/Check';
import { useState } from "react";

const SORT_KEYS = [
  { value: "custom", label: "Custom Order" },
  { value: "created", label: "Created Date" },
  { value: "updated", label: "Updated Date" },
];

const SORT_DIRS = [
  { value: "asc", label: "Ascending" },
  { value: "desc", label: "Descending" },
];

export default function SortDropdown({ sort, dir, onChange }: {
  sort: string;
  dir: string;
  onChange: (updates: { sort?: string; dir?: string }) => void;
}) {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);

  const handleOpen = (e: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(e.currentTarget);
  };
  const handleClose = () => setAnchorEl(null);

  return (
    <>
      <fieldset
        style={{
          border: "1px solid #ccc",
          borderRadius: 4,
          padding: "4px 8px",
          minWidth: 180,
          position: "relative",
          cursor: "pointer",
        }}
        onClick={handleOpen}
      >
        <legend
          style={{
            fontSize: 12,
            padding: "0 4px",
            color: "#666",
          }}
        >
          Sort
        </legend>
        <Box display="flex" justifyContent="space-between" alignItems="center">
          <Typography fontSize={14}>
            {sort} {(sort !== "custom") && `(${dir})`}
          </Typography>
          <ArrowDropDownIcon fontSize="small" />
        </Box>
      </fieldset>

      <Menu anchorEl={anchorEl} open={open} onClose={handleClose}>
        <Typography px={2} pt={1} variant="caption" color="text.secondary">
          Sort By
        </Typography>
        {SORT_KEYS.map((item) => (
          <MenuItem
            key={item.value}
            selected={sort === item.value}
            onClick={() => {
              onChange({ sort: item.value });
              handleClose();
            }}
          >
            <ListItemText>{item.label}</ListItemText>
          </MenuItem>
        ))}

        <Divider />

        <Typography px={2} pt={1} variant="caption" color="text.secondary">
          Direction
        </Typography>
        {SORT_DIRS.map((item) => (
          <MenuItem
            key={item.value}
            selected={dir === item.value}
            onClick={() => {
              onChange({ dir: item.value });
              handleClose();
            }}
          >
            <ListItemText>{item.label}</ListItemText>
          </MenuItem>
        ))}
      </Menu>
    </>
  );
}
