import React, { useState } from "react";
import {
  Box,
  Modal,
  Typography,
  Divider,
  Button,
  Stack,
  Chip,
  Paper,
  Grid,
  Card,
  CardContent,
  IconButton,
  Alert,
  LinearProgress,
  Avatar,
} from "@mui/material";
import {
  Close as CloseIcon,
  LocationOn as LocationIcon,
  Build as BuildIcon,
  Schedule as ScheduleIcon,
  Notes as NotesIcon,
  Mic as MicIcon,
  CheckCircle as ApproveIcon,
  Cancel as DenyIcon,
  Warning as WarningIcon,
  AccountBalance as GovernmentIcon,
} from "@mui/icons-material";

const modalStyle = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: "min(850px, 95vw)",
  maxHeight: "90vh",
  bgcolor: "background.paper",
  borderRadius: 3,
  boxShadow: "0 24px 48px rgba(0,0,0,0.2)",
  overflow: "hidden",
};

export default function RequestDetailsModal({ request, onClose }) {
  const [loading, setLoading] = useState(false);
  const [actionType, setActionType] = useState(null);
  const open = Boolean(request);

  if (!request) return null;

  const {
    id,
    substation,
    faultType,
    createdAt,
    notes,
    audioURL,
    status,
    priority,
    linemanId,
    estimatedTime,
  } = request;

  const getStatusInfo = (status) => {
    switch (status) {
      case "pending":
        return {
          color: "warning",
          icon: <ScheduleIcon />,
          label: "Pending Review",
        };
      case "approved":
        return { color: "success", icon: <ApproveIcon />, label: "Approved" };
      case "denied":
        return { color: "error", icon: <DenyIcon />, label: "Denied" };
      case "completed":
        return { color: "info", icon: <ApproveIcon />, label: "Completed" };
      default:
        return {
          color: "default",
          icon: <WarningIcon />,
          label: status || "Unknown",
        };
    }
  };

  const getPriorityColor = (priority) => {
    switch (priority?.toLowerCase()) {
      case "high":
        return "#D32F2F";
      case "medium":
        return "#F57C00";
      case "low":
        return "#388E3C";
      default:
        return "#1976D2";
    }
  };

  const handleUpdate = async (newStatus) => {
    setActionType(newStatus);
    setLoading(true);
    try {
      const { updateRequestStatus } = await import(
        "../services/firestoreService"
      );
      await updateRequestStatus(id, newStatus);

      // Add slight delay for better UX
      setTimeout(() => {
        onClose();
      }, 500);
    } catch (error) {
      console.error("Failed to update request status", error);
      setActionType(null);
    } finally {
      setLoading(false);
    }
  };

  const statusInfo = getStatusInfo(status);

  return (
    <Modal
      open={open}
      onClose={onClose}
      aria-labelledby="request-details-title"
    >
      <Paper sx={modalStyle}>
        {/* Government Header */}
        <Box
          sx={{
            background: "linear-gradient(135deg, #FFC107 0%, #FF8F00 100%)",
            p: 3,
            color: "#000000",
            position: "relative",
          }}
        >
          <Stack direction="row" alignItems="center" spacing={2}>
            <Avatar
              sx={{
                bgcolor: "#000000",
                color: "#FFC107",
                width: 56,
                height: 56,
              }}
            >
              <GovernmentIcon sx={{ fontSize: 32 }} />
            </Avatar>
            <Box sx={{ flexGrow: 1 }}>
              <Typography variant="h5" sx={{ fontWeight: 700, mb: 0.5 }}>
                Government Line Clearance Request
              </Typography>
              <Typography variant="subtitle1" sx={{ opacity: 0.9 }}>
                Ministry of Power • Field Operations Division
              </Typography>
            </Box>
            <Chip
              icon={statusInfo.icon}
              label={statusInfo.label}
              color={statusInfo.color}
              sx={{
                fontWeight: 600,
                fontSize: "0.875rem",
                height: 36,
              }}
            />
          </Stack>

          <IconButton
            onClick={onClose}
            disabled={loading}
            sx={{
              position: "absolute",
              top: 12,
              right: 12,
              color: "#000000",
              bgcolor: "rgba(0,0,0,0.1)",
              "&:hover": { bgcolor: "rgba(0,0,0,0.2)" },
            }}
          >
            <CloseIcon />
          </IconButton>
        </Box>

        {/* Loading Progress */}
        {loading && (
          <LinearProgress
            sx={{
              height: 3,
              "& .MuiLinearProgress-bar": {
                backgroundColor: "#FFC107",
              },
            }}
          />
        )}

        {/* Content */}
        <Box sx={{ p: 4, maxHeight: "60vh", overflowY: "auto" }}>
          {/* Request Information Cards */}
          <Grid container spacing={3} sx={{ mb: 4 }}>
            {/* Location Information */}
            <Grid item xs={12} md={6}>
              <Card
                elevation={2}
                sx={{
                  border: "2px solid #E0E0E0",
                  borderRadius: 2,
                  transition: "all 0.3s ease",
                  "&:hover": {
                    borderColor: "#FFC107",
                    transform: "translateY(-2px)",
                    boxShadow: "0 8px 24px rgba(255,193,7,0.2)",
                  },
                }}
              >
                <CardContent>
                  <Stack
                    direction="row"
                    alignItems="center"
                    spacing={2}
                    sx={{ mb: 2 }}
                  >
                    <Avatar sx={{ bgcolor: "#FFC107", color: "#000000" }}>
                      <LocationIcon />
                    </Avatar>
                    <Typography variant="h6" sx={{ fontWeight: 600 }}>
                      Location Details
                    </Typography>
                  </Stack>
                  <Typography
                    variant="body2"
                    color="text.secondary"
                    sx={{ mb: 1 }}
                  >
                    Substation & Feeder
                  </Typography>
                  <Typography
                    variant="body1"
                    sx={{ fontWeight: 500, fontSize: "1.1rem" }}
                  >
                    {substation || "Not specified"}
                  </Typography>
                </CardContent>
              </Card>
            </Grid>

            {/* Fault Information */}
            <Grid item xs={12} md={6}>
              <Card
                elevation={2}
                sx={{
                  border: "2px solid #E0E0E0",
                  borderRadius: 2,
                  transition: "all 0.3s ease",
                  "&:hover": {
                    borderColor: "#FFC107",
                    transform: "translateY(-2px)",
                    boxShadow: "0 8px 24px rgba(255,193,7,0.2)",
                  },
                }}
              >
                <CardContent>
                  <Stack
                    direction="row"
                    alignItems="center"
                    spacing={2}
                    sx={{ mb: 2 }}
                  >
                    <Avatar
                      sx={{
                        bgcolor: getPriorityColor(priority),
                        color: "#FFFFFF",
                      }}
                    >
                      <BuildIcon />
                    </Avatar>
                    <Typography variant="h6" sx={{ fontWeight: 600 }}>
                      Fault Information
                    </Typography>
                  </Stack>
                  <Typography
                    variant="body2"
                    color="text.secondary"
                    sx={{ mb: 1 }}
                  >
                    Fault Type
                  </Typography>
                  <Typography
                    variant="body1"
                    sx={{ fontWeight: 500, fontSize: "1.1rem", mb: 2 }}
                  >
                    {faultType || "Not specified"}
                  </Typography>
                  {priority && (
                    <Chip
                      label={`${priority.toUpperCase()} PRIORITY`}
                      size="small"
                      sx={{
                        bgcolor: getPriorityColor(priority),
                        color: "#FFFFFF",
                        fontWeight: 600,
                      }}
                    />
                  )}
                </CardContent>
              </Card>
            </Grid>

            {/* Timing Information */}
            <Grid item xs={12} md={6}>
              <Card
                elevation={2}
                sx={{
                  border: "2px solid #E0E0E0",
                  borderRadius: 2,
                  transition: "all 0.3s ease",
                  "&:hover": {
                    borderColor: "#FFC107",
                    transform: "translateY(-2px)",
                    boxShadow: "0 8px 24px rgba(255,193,7,0.2)",
                  },
                }}
              >
                <CardContent>
                  <Stack
                    direction="row"
                    alignItems="center"
                    spacing={2}
                    sx={{ mb: 2 }}
                  >
                    <Avatar sx={{ bgcolor: "#2196F3", color: "#FFFFFF" }}>
                      <ScheduleIcon />
                    </Avatar>
                    <Typography variant="h6" sx={{ fontWeight: 600 }}>
                      Submission Details
                    </Typography>
                  </Stack>
                  <Typography
                    variant="body2"
                    color="text.secondary"
                    sx={{ mb: 1 }}
                  >
                    Submitted On
                  </Typography>
                  <Typography variant="body1" sx={{ fontWeight: 500 }}>
                    {createdAt
                      ? new Date(
                          createdAt.toDate ? createdAt.toDate() : createdAt
                        ).toLocaleString("en-IN", {
                          dateStyle: "full",
                          timeStyle: "short",
                        })
                      : "Not available"}
                  </Typography>
                  {linemanId && (
                    <>
                      <Typography
                        variant="body2"
                        color="text.secondary"
                        sx={{ mb: 1, mt: 2 }}
                      >
                        Assigned Lineman ID
                      </Typography>
                      <Typography variant="body1" sx={{ fontWeight: 500 }}>
                        {linemanId}
                      </Typography>
                    </>
                  )}
                </CardContent>
              </Card>
            </Grid>

            {/* Notes */}
            <Grid item xs={12} md={6}>
              <Card
                elevation={2}
                sx={{
                  border: "2px solid #E0E0E0",
                  borderRadius: 2,
                  transition: "all 0.3s ease",
                  "&:hover": {
                    borderColor: "#FFC107",
                    transform: "translateY(-2px)",
                    boxShadow: "0 8px 24px rgba(255,193,7,0.2)",
                  },
                }}
              >
                <CardContent>
                  <Stack
                    direction="row"
                    alignItems="center"
                    spacing={2}
                    sx={{ mb: 2 }}
                  >
                    <Avatar sx={{ bgcolor: "#4CAF50", color: "#FFFFFF" }}>
                      <NotesIcon />
                    </Avatar>
                    <Typography variant="h6" sx={{ fontWeight: 600 }}>
                      Additional Notes
                    </Typography>
                  </Stack>
                  <Typography
                    variant="body1"
                    sx={{
                      whiteSpace: "pre-wrap",
                      lineHeight: 1.6,
                      minHeight: "60px",
                      p: 2,
                      bgcolor: "#F5F5F5",
                      borderRadius: 1,
                      border: "1px solid #E0E0E0",
                    }}
                  >
                    {notes || "No additional notes provided."}
                  </Typography>
                </CardContent>
              </Card>
            </Grid>
          </Grid>

          {/* Audio Recording Section */}
          {audioURL && (
            <Card
              elevation={3}
              sx={{
                mb: 4,
                border: "2px solid #E3F2FD",
                borderRadius: 3,
                background: "linear-gradient(135deg, #E3F2FD 0%, #F3E5F5 100%)",
              }}
            >
              <CardContent>
                <Stack
                  direction="row"
                  alignItems="center"
                  spacing={2}
                  sx={{ mb: 3 }}
                >
                  <Avatar
                    sx={{
                      bgcolor: "#2196F3",
                      color: "#FFFFFF",
                      width: 48,
                      height: 48,
                    }}
                  >
                    <MicIcon />
                  </Avatar>
                  <Box>
                    <Typography variant="h6" sx={{ fontWeight: 600 }}>
                      Voice Recording
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      Field worker's audio description
                    </Typography>
                  </Box>
                </Stack>
                <Box
                  sx={{
                    p: 2,
                    bgcolor: "#FFFFFF",
                    borderRadius: 2,
                    border: "1px solid #E0E0E0",
                  }}
                >
                  <audio
                    controls
                    src={audioURL}
                    style={{
                      width: "100%",
                      height: "40px",
                    }}
                  >
                    Your browser does not support the audio element.
                  </audio>
                </Box>
              </CardContent>
            </Card>
          )}

          {/* Action Status Alert */}
          {loading && actionType && (
            <Alert
              severity="info"
              sx={{ mb: 3 }}
              icon={actionType === "approved" ? <ApproveIcon /> : <DenyIcon />}
            >
              {actionType === "approved"
                ? "Approving request and notifying field team..."
                : "Denying request and updating records..."}
            </Alert>
          )}
        </Box>

        {/* Government Action Buttons */}
        <Box
          sx={{
            p: 3,
            bgcolor: "#F5F5F5",
            borderTop: "2px solid #E0E0E0",
          }}
        >
          <Stack direction="row" spacing={2} justifyContent="space-between">
            <Typography
              variant="body2"
              color="text.secondary"
              sx={{ alignSelf: "center" }}
            >
              Request ID: {id}
            </Typography>

            <Stack direction="row" spacing={2}>
              <Button
                variant="contained"
                color="success"
                size="large"
                startIcon={<ApproveIcon />}
                onClick={() => handleUpdate("approved")}
                disabled={loading || status === "approved"}
                sx={{
                  minWidth: 140,
                  fontWeight: 600,
                  py: 1.5,
                  "&:disabled": {
                    bgcolor: "success.main",
                    color: "white",
                    opacity: 0.7,
                  },
                }}
              >
                {loading && actionType === "approved"
                  ? "Approving..."
                  : status === "approved"
                  ? "✓ Approved"
                  : "Approve"}
              </Button>

              <Button
                variant="contained"
                color="error"
                size="large"
                startIcon={<DenyIcon />}
                onClick={() => handleUpdate("denied")}
                disabled={loading || status === "denied"}
                sx={{
                  minWidth: 140,
                  fontWeight: 600,
                  py: 1.5,
                  "&:disabled": {
                    bgcolor: "error.main",
                    color: "white",
                    opacity: 0.7,
                  },
                }}
              >
                {loading && actionType === "denied"
                  ? "Denying..."
                  : status === "denied"
                  ? "✗ Denied"
                  : "Deny"}
              </Button>

              <Button
                variant="outlined"
                size="large"
                onClick={onClose}
                disabled={loading}
                sx={{
                  minWidth: 100,
                  fontWeight: 600,
                  py: 1.5,
                  borderColor: "#000000",
                  color: "#000000",
                  "&:hover": {
                    borderColor: "#FFC107",
                    bgcolor: "rgba(255,193,7,0.1)",
                  },
                }}
              >
                Close
              </Button>
            </Stack>
          </Stack>
        </Box>
      </Paper>
    </Modal>
  );
}
