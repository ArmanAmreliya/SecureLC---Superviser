import React, { useState } from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  Button,
  Typography,
  Box,
  Chip,
  Stack,
  Alert,
  CircularProgress,
} from "@mui/material";
import {
  CheckCircle as CheckCircleIcon,
  Cancel as CancelIcon,
  Assignment as AssignmentIcon,
} from "@mui/icons-material";

export default function ActionDialog({
  open,
  onClose,
  request,
  action,
  onConfirm,
  loading = false,
}) {
  const [notes, setNotes] = useState("");
  const [error, setError] = useState("");

  const handleConfirm = async () => {
    if (!request) return;
    
    try {
      setError("");
      await onConfirm(request.id, notes.trim() || null);
      setNotes("");
      onClose();
    } catch (err) {
      setError(err.message || "Failed to update request");
    }
  };

  const handleClose = () => {
    setNotes("");
    setError("");
    onClose();
  };

  const getActionConfig = () => {
    switch (action) {
      case "approve":
        return {
          title: "Approve Request",
          icon: <CheckCircleIcon sx={{ color: "#4CAF50" }} />,
          color: "#4CAF50",
          confirmText: "Approve Request",
          description: "This will approve the line clearance request and notify the field team.",
        };
      case "deny":
        return {
          title: "Deny Request",
          icon: <CancelIcon sx={{ color: "#f44336" }} />,
          color: "#f44336",
          confirmText: "Deny Request",
          description: "This will deny the line clearance request. Please provide a reason.",
        };
      case "complete":
        return {
          title: "Mark as Complete",
          icon: <CheckCircleIcon sx={{ color: "#2196F3" }} />,
          color: "#2196F3",
          confirmText: "Mark Complete",
          description: "This will mark the request as completed.",
        };
      default:
        return {
          title: "Update Request",
          icon: <AssignmentIcon />,
          color: "#666",
          confirmText: "Update",
          description: "Update the request status.",
        };
    }
  };

  const config = getActionConfig();

  if (!request) return null;

  return (
    <Dialog
      open={open}
      onClose={handleClose}
      maxWidth="sm"
      fullWidth
      PaperProps={{
        sx: {
          borderRadius: 3,
          boxShadow: "0 8px 32px rgba(0,0,0,0.12)",
        },
      }}
    >
      <DialogTitle>
        <Stack direction="row" alignItems="center" spacing={2}>
          {config.icon}
          <Box>
            <Typography variant="h6" sx={{ fontWeight: 700 }}>
              {config.title}
            </Typography>
            <Typography variant="body2" color="text.secondary">
              Request #{request.id?.substring(0, 8)}
            </Typography>
          </Box>
        </Stack>
      </DialogTitle>

      <DialogContent>
        <Typography variant="body2" color="text.secondary" sx={{ mb: 3 }}>
          {config.description}
        </Typography>

        {/* Request Details */}
        <Box
          sx={{
            p: 2,
            bgcolor: "grey.50",
            borderRadius: 2,
            mb: 3,
            border: "1px solid",
            borderColor: "grey.200",
          }}
        >
          <Typography variant="subtitle2" sx={{ fontWeight: 600, mb: 1 }}>
            Request Details
          </Typography>
          <Stack spacing={1}>
            <Box>
              <Typography variant="body2" color="text.secondary">
                Substation
              </Typography>
              <Typography variant="body2" sx={{ fontWeight: 500 }}>
                {request.substation}
              </Typography>
            </Box>
            <Box>
              <Typography variant="body2" color="text.secondary">
                Fault Type
              </Typography>
              <Chip
                label={request.faultType}
                size="small"
                variant="outlined"
                sx={{ mt: 0.5 }}
              />
            </Box>
            {request.feeder && (
              <Box>
                <Typography variant="body2" color="text.secondary">
                  Feeder
                </Typography>
                <Typography variant="body2" sx={{ fontWeight: 500 }}>
                  {request.feeder}
                </Typography>
              </Box>
            )}
          </Stack>
        </Box>

        {/* Notes Input */}
        <TextField
          fullWidth
          multiline
          rows={4}
          label="Supervisor Notes (Optional)"
          placeholder={
            action === "deny"
              ? "Please provide a reason for denying this request..."
              : "Add any additional notes or instructions..."
          }
          value={notes}
          onChange={(e) => setNotes(e.target.value)}
          variant="outlined"
          sx={{
            "& .MuiOutlinedInput-root": {
              borderRadius: 2,
            },
          }}
        />

        {action === "deny" && (
          <Alert severity="warning" sx={{ mt: 2 }}>
            <Typography variant="body2">
              <strong>Important:</strong> Denying a request will prevent field work from proceeding. 
              Please ensure this decision is appropriate and consider providing detailed reasoning.
            </Typography>
          </Alert>
        )}

        {error && (
          <Alert severity="error" sx={{ mt: 2 }}>
            {error}
          </Alert>
        )}
      </DialogContent>

      <DialogActions sx={{ p: 3, pt: 0 }}>
        <Button
          onClick={handleClose}
          disabled={loading}
          sx={{ mr: 1 }}
        >
          Cancel
        </Button>
        <Button
          onClick={handleConfirm}
          variant="contained"
          disabled={loading}
          sx={{
            backgroundColor: config.color,
            "&:hover": {
              backgroundColor: config.color,
              filter: "brightness(0.9)",
            },
            minWidth: 120,
          }}
          startIcon={loading ? <CircularProgress size={16} /> : null}
        >
          {loading ? "Processing..." : config.confirmText}
        </Button>
      </DialogActions>
    </Dialog>
  );
}
