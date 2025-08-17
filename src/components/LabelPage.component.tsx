"use client";
import { useEffect, useState } from "react";
import { Alert, Box, Button, Dialog, DialogActions, DialogContent, DialogTitle, Snackbar, TextField, Typography } from "@mui/material";
import Grid from "@mui/material/Grid";
import AddIcon from "@mui/icons-material/Add";
import LabelCard from "./LabelCard.component";
import useLabelStore from "@/store/labelStore";
import TLabel from "@/types/label";
import { getAllLabels } from "@/services/indexedDB/labelServices";

const LabelPage = () => {
  const labels = useLabelStore((s) => s.labels);
  const setLabels = useLabelStore((s) => s.setlabels);
  const addLabel = useLabelStore((s) => s.addLabel);
  const updateLabel = useLabelStore((s) => s.updateLabel);
  const deleteLabel = useLabelStore((s) => s.deleteLabel);

  const [loading, setLoading] = useState(false);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [editMode, setEditMode] = useState(false);
  const [labelData, setLabelData] = useState<TLabel>({ localId: "", labelName: "", color: "#1976d2" });
  const [snackbar, setSnackbar] = useState<{ open: boolean; message: string; severity: 'error' |  'info' | 'success' | 'warning' }>({
    open: false,
    message: "",
    severity: "error",
  });

  useEffect(() => {
    const hydrateFromIndexedDB = async () => {
        if (labels.length === 0) {
          setLoading(true);
          const storedLabels = await getAllLabels();
          setLabels(storedLabels);
        }
        setLoading(false);
    };

    hydrateFromIndexedDB();
  }, []);

  const handleOpenAdd = () => {
    setEditMode(false);
    setLabelData({ localId: "", labelName: "", color: "#6b3d8f" });
    setDialogOpen(true);
  };

  const handleOpenEdit = (label: TLabel) => {
    setEditMode(true);
    setLabelData(label);
    setDialogOpen(true);
  };

  const handleSave = () => {
    if (!labelData.labelName.trim()) return;

    if (editMode) {
      const nameExists = labels.some(
        (l) => l.labelName.toLowerCase() === labelData.labelName.toLowerCase() && l.localId !== labelData.localId
      );

      if (nameExists) {
        setSnackbar({ open: true, message: "Label name already exists!", severity: "error" });
        return;
      }
      updateLabel(labelData);
      setEditMode(false);
    } else {
      addLabel({ ...labelData, localId: crypto.randomUUID() });
    }
    setDialogOpen(false);
  };

  const handleDelete = (label: TLabel) => {
      deleteLabel(label.localId);
  };

  return (
    <Box sx={{ p: 3, width: '100%' }}>
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          mb: 3,
        }}
      >
        <Typography variant="h5" fontWeight={600}>
          Labels
        </Typography>
        <Button
          variant="contained"
          startIcon={<AddIcon />}
          onClick={handleOpenAdd}
          disabled={loading}
        >
          Add Label
        </Button>
      </Box>

      {loading 
      ? (<div className="text-center mt-10 text-gray-500">Loading your tasks...</div>)
      : (
        <Box sx={{mt: 8}}>
          <Grid
            container
            spacing={5}
            sx={{
              alignItems: "stretch",
            }}
          >
            {labels.map((label) => (
              <Grid size={{ xs: 12, md: 4, sm: 6, lg: 3 }} key={label.localId}>
                <LabelCard
                  label={label}
                  onEdit={handleOpenEdit}
                  onDelete={handleDelete}
                />
              </Grid>
            ))}
          </Grid>
        </Box>
        )
      }

      <Dialog open={dialogOpen} onClose={() => setDialogOpen(false)}>
        <DialogTitle>{editMode ? "Edit Label" : "Add Label"}</DialogTitle>
        <DialogContent
          sx={{
            display: "flex",
            alignItems: "center",
            gap: 1,
          }}
        >
          <TextField
            label="Label Name"
            fullWidth
            value={labelData.labelName}
            onChange={(e) => setLabelData({ ...labelData, labelName: e.target.value })}
            autoFocus
            slotProps={{
                htmlInput:{
                  maxLength: 40,
                }
              }}
            sx={{
               height: 32,
               mt: 1,
               '& .MuiInputBase-input':{
                padding: 0.5,
                paddingLeft: 1,
                height: 32,
               },
               '& .MuiInputLabel-root':{
                top: '-6px',
               },
               '& .MuiInputLabel-shrink':{
                  top: 0,
                }
              }}
          />
          <input
            type="color"
            value={labelData.color}
            onChange={(e) => setLabelData({ ...labelData, color: e.target.value })}
            style={{
              width: 92,
              height: 46,
              padding: 0,
              cursor: 'pointer',
              marginTop: 16,
              borderRadius: '30%',
            }}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setDialogOpen(false)}>Cancel</Button>
          <Button onClick={handleSave} variant="contained">
            Save
          </Button>
        </DialogActions>
      </Dialog>

      <Snackbar
        open={snackbar.open}
        autoHideDuration={4000}
        onClose={() => setSnackbar(prev => ({ ...prev, open: false }))}
        anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
      >
        <Alert severity={snackbar.severity} onClose={() => setSnackbar(prev => ({ ...prev, open: false }))}>
          {snackbar.message}
        </Alert>
      </Snackbar>
    </Box>
  );
};

export default LabelPage;
