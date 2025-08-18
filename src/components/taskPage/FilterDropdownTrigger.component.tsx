import { useRef, useState } from "react";
import {
  Button,
  Popper,
  Paper,
  ClickAwayListener,
} from "@mui/material";
import FilterAltIcon from "@mui/icons-material/FilterAlt";
import FilterDropdownContent from "./FilterDropdownContent.component";

export default function FilterDropdownTrigger({
  labels,
  selectedLabels,
  onChange,
}: {
  labels?: { labelId: string; labelName: string }[];
  selectedLabels: string[];
  onChange: (labels: string[]) => void;
}) {
  const [open, setOpen] = useState(false);
  const anchorRef = useRef<HTMLButtonElement | null>(null);

  const handleClose = () => setOpen(false);
  const handleToggle = () => setOpen((prev) => !prev);

  return (
    <>
      <Button
        ref={anchorRef}
        variant="contained"
        onClick={handleToggle}
        sx={{
          backgroundColor: open ? "#fdd835" : "transparent",
          color: "black",
          fontWeight: 600,
          border: open ? "2px solid #fbc02d" : "none",
          boxShadow: "none",
        }}
        startIcon={<FilterAltIcon />}
      >
        Filter
      </Button>

      <Popper
        open={open}
        anchorEl={anchorRef.current}
        placement="bottom-end"
        style={{ zIndex: 10 }}
      >
        <ClickAwayListener onClickAway={handleClose}>
          <Paper elevation={4} sx={{ p: 2, mt: 1, minWidth: 300 }}>
            {labels && <FilterDropdownContent
              labels={labels}
              selectedLabels={selectedLabels}
              onChange={onChange}
              onClose={handleClose}
            />}
          </Paper>
        </ClickAwayListener>
      </Popper>
    </>
  );
}
