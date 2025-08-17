"use client";

import { useCallback, useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import {
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  IconButton,
  Paper,
  Tooltip,
  Typography,
} from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import TLabel from "@/types/label";

type Props = {
  label: TLabel;
  onEdit: (label: TLabel) => void;
  onDelete: (label: TLabel) => void;
};

export default function LabelCard({ label, onEdit, onDelete }: Props) {
  const router = useRouter();
  const [hovered, setHovered] = useState(false);
  const [confirmDialog, setConfirmDialog] = useState(false);

  const color = useMemo(() => label.color || "#cccccc", [label.color]);

  const goToLabel = useCallback(() => {
    const slug = encodeURIComponent(label.labelName.trim());
    router.push(`/labels/${slug}`);
  }, [label.labelName, router]);

  const onConfirmDelete = () => {
    setConfirmDialog(false);
    onDelete(label);
  }

  return (
    <>
    <Paper
      elevation={hovered ? 4 : 2}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      onClick={goToLabel}
      sx={{
        position: "relative",
        cursor: "pointer",
        borderRadius: "6px",
        overflow: "hidden",
        px: 1,
        py: 0.5,
        minHeight: 56,
        // pr: hovered ? 10 : 2,
        pr: 2,
        transition:
          "pr 220ms ease, padding-right 220ms ease, box-shadow 180ms ease, transform 180ms ease",
        "&:hover": { transform: "translateY(-2px)" },
        display: "flex",
        alignItems: "center",
      }}
    >
      {/* TOP COLOR BAR */}
      <Box
        sx={{
          position: "absolute",
          top: 0,
          left: 0,
          width: "100%",
          height: 6,
          bgcolor: color,
        }}
      />

      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          gap: 1.5,
          flex: 1,
          minWidth: 0,
        }}
      >
        {/* color dot */}
        <Box
          aria-hidden
          sx={{
            width: 14,
            height: 14,
            borderRadius: "50%",
            bgcolor: color,
            border: "1px solid rgba(0,0,0,0.12)",
            flexShrink: 0,
          }}
        />
        <Typography
          variant="subtitle1"
          noWrap
          sx={{
            fontWeight: 600
          }}
          title={label.labelName}
        >
          {label.labelName}
        </Typography>
      </Box>

      <Box
        onClick={(e) => e.stopPropagation()}
        sx={{
          display: "flex",
          gap: 0.5,
          opacity: hovered ? 1 : 0,
          transform: hovered ? "translateX(0)" : "translateX(16px)",
          transition: "opacity 220ms ease, transform 220ms ease",
          flexShrink: 0,
        }}
      >
        <Tooltip title="Edit label">
          <IconButton size="small" onClick={() => onEdit(label)}>
            <EditIcon fontSize="small" />
          </IconButton>
        </Tooltip>
        <Tooltip title="Delete label">
          <IconButton size="small" onClick={() => setConfirmDialog(true)}>
            <DeleteIcon fontSize="small" />
          </IconButton>
        </Tooltip>
      </Box>
    </Paper>

    <Dialog open={confirmDialog} onClose={() => {setConfirmDialog(false)}}>
                  <DialogTitle>Confirm Delete</DialogTitle>
                  <DialogContent>Are you sure you want to delete this task?</DialogContent>
                  <DialogActions>
                    <Button onClick={() => {setConfirmDialog(false)}} color="primary">
                      Cancel
                    </Button>
                    <Button onClick={onConfirmDelete} color="error">
                      Delete
                    </Button>
                  </DialogActions>
                </Dialog>
    </>
  );
}
