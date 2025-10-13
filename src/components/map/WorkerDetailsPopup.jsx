// File: src/components/map/WorkerDetailsPopup.jsx
import React from "react";
import {
  Card,
  CardContent,
  Typography,
  Stack,
  Avatar,
  IconButton,
  Chip,
  Divider,
  Box,
} from "@mui/material";
import {
  Close as CloseIcon,
  LocationOn as LocationOnIcon,
  Phone as PhoneIcon,
  Work as WorkIcon,
  Schedule as ScheduleIcon,
} from "@mui/icons-material";
import { RFeature, ROverlay } from "rlayers";
import { Point } from "ol/geom";
import { fromLonLat } from "ol/proj";

const WorkerDetailsPopup = ({ lineman, onClose }) => {
  if (!lineman) return null;

  const getStatusColor = (status) => {
    switch (status) {
      case "active":
        return "#4CAF50";
      case "busy":
        return "#FF9800";
      default:
        return "#F44336";
    }
  };

  const getPriorityColor = (priority) => {
    switch (priority?.toLowerCase()) {
      case "high":
        return "#F44336";
      case "medium":
        return "#FF9800";
      case "low":
        return "#4CAF50";
      default:
        return "#757575";
    }
  };

  return (
    <RFeature
      geometry={
        new Point(
          fromLonLat([
            lineman.currentLocation.longitude,
            lineman.currentLocation.latitude,
          ])
        )
      }
    >
      <ROverlay
        position={fromLonLat([
          lineman.currentLocation.longitude,
          lineman.currentLocation.latitude,
        ])}
        positioning="bottom-center"
        offset={[0, -30]}
      >
        <Card
          elevation={16}
          sx={{
            minWidth: 350,
            maxWidth: 400,
            borderRadius: 2,
            backgroundColor: "#FFFFFF",
            border: "2px solid #000000",
          }}
        >
          <CardContent sx={{ p: 3 }}>
            {/* Header */}
            <Stack
              direction="row"
              justifyContent="space-between"
              alignItems="center"
              sx={{ mb: 2 }}
            >
              <Stack direction="row" alignItems="center" spacing={2}>
                <Avatar
                  sx={{
                    bgcolor: "#FFC107",
                    color: "#000000",
                    fontWeight: 700,
                    width: 48,
                    height: 48,
                    border: "2px solid #000000",
                  }}
                >
                  {lineman.name
                    .split(" ")
                    .map((n) => n[0])
                    .join("")}
                </Avatar>
                <Box>
                  <Typography
                    variant="h6"
                    sx={{ fontWeight: 700, color: "#000000" }}
                  >
                    {lineman.name}
                  </Typography>
                  <Typography variant="body2" sx={{ color: "#424242" }}>
                    ID: {lineman.id}
                  </Typography>
                </Box>
              </Stack>
              <IconButton
                onClick={onClose}
                sx={{
                  color: "#000000",
                  "&:hover": { backgroundColor: "#F5F5F5" },
                }}
              >
                <CloseIcon />
              </IconButton>
            </Stack>

            {/* Status and Priority */}
            <Stack direction="row" spacing={1} sx={{ mb: 2 }}>
              <Chip
                label={lineman.status || "Unknown"}
                size="small"
                sx={{
                  backgroundColor: getStatusColor(lineman.status),
                  color: "#FFFFFF",
                  fontWeight: 600,
                }}
              />
              <Chip
                label={`${lineman.priority || "Medium"} Priority`}
                size="small"
                variant="outlined"
                sx={{
                  borderColor: getPriorityColor(lineman.priority),
                  color: getPriorityColor(lineman.priority),
                }}
              />
            </Stack>

            <Divider sx={{ my: 2 }} />

            {/* Details */}
            <Stack spacing={2}>
              <Stack direction="row" alignItems="center" spacing={1}>
                <LocationOnIcon sx={{ fontSize: 18, color: "#FFC107" }} />
                <Typography variant="body2">
                  <strong>Location:</strong> {lineman.location || "Unknown"}
                </Typography>
              </Stack>

              <Stack direction="row" alignItems="center" spacing={1}>
                <WorkIcon sx={{ fontSize: 18, color: "#FFC107" }} />
                <Typography variant="body2">
                  <strong>Task:</strong>{" "}
                  {lineman.currentTask || "No current task"}
                </Typography>
              </Stack>

              <Stack direction="row" alignItems="center" spacing={1}>
                <PhoneIcon sx={{ fontSize: 18, color: "#FFC107" }} />
                <Typography variant="body2">
                  <strong>Contact:</strong> {lineman.phone || "N/A"}
                </Typography>
              </Stack>

              <Stack direction="row" alignItems="center" spacing={1}>
                <ScheduleIcon sx={{ fontSize: 18, color: "#FFC107" }} />
                <Typography variant="body2">
                  <strong>Last Update:</strong>{" "}
                  {lineman.lastUpdate
                    ? new Date(lineman.lastUpdate.toDate()).toLocaleString()
                    : "N/A"}
                </Typography>
              </Stack>
            </Stack>
          </CardContent>
        </Card>
      </ROverlay>
    </RFeature>
  );
};

export default WorkerDetailsPopup;
