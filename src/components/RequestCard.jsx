import React from "react";
import PropTypes from "prop-types";
import {
  Card,
  CardContent,
  Typography,
  Box,
  Chip,
  Stack,
  Divider,
  useTheme,
} from "@mui/material";
import {
  Assignment as AssignmentIcon,
  Schedule as ScheduleIcon,
  LocationOn as LocationIcon,
  Person as PersonIcon,
} from "@mui/icons-material";

export default function RequestCard({
  id,
  title,
  substation,
  faultType,
  status,
  createdAt,
  assignee,
  priority = "normal",
}) {
  const theme = useTheme();

  const getPriorityColor = (priority) => {
    switch (priority) {
      case "high":
        return "#f44336";
      case "medium":
        return "#ff9800";
      case "low":
        return "#4caf50";
      default:
        return theme.palette.primary.main;
    }
  };

  const getStatusColor = (status) => {
    switch (status) {
      case "approved":
        return theme.palette.primary.main;
      case "pending":
        return "#ff9800";
      case "denied":
        return "#757575";
      case "completed":
        return "#4caf50";
      default:
        return theme.palette.grey[500];
    }
  };

  const formatDate = (date) => {
    if (!date) return "Unknown";
    try {
      const d = date?.toDate ? date.toDate() : new Date(date);
      return (
        d.toLocaleDateString() +
        " " +
        d.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })
      );
    } catch (e) {
      return "Invalid Date";
    }
  };

  return (
    <Card
      elevation={3}
      sx={{
        borderRadius: 3,
        border: `2px solid ${getPriorityColor(priority)}`,
        transition: "all 0.3s ease-in-out",
        "&:hover": {
          elevation: 8,
          transform: "translateY(-4px)",
          boxShadow: `0 8px 25px rgba(0,0,0,0.15)`,
        },
        background: "linear-gradient(135deg, #ffffff 0%, #fafafa 100%)",
      }}
    >
      <Box
        sx={{
          height: 6,
          background: `linear-gradient(90deg, ${getPriorityColor(
            priority
          )} 0%, ${getPriorityColor(priority)}80 100%)`,
        }}
      />

      <CardContent sx={{ p: 3 }}>
        {/* Header */}
        <Stack
          direction="row"
          justifyContent="space-between"
          alignItems="flex-start"
          sx={{ mb: 2 }}
        >
          <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
            <AssignmentIcon
              sx={{ color: theme.palette.primary.main, fontSize: 24 }}
            />
            <Typography
              variant="h6"
              sx={{
                fontWeight: 700,
                color: "text.primary",
                fontSize: "1.1rem",
              }}
            >
              {title || `Request ${id?.substring(0, 8)}`}
            </Typography>
          </Box>

          <Chip
            label={status?.toUpperCase() || "PENDING"}
            size="small"
            sx={{
              backgroundColor: getStatusColor(status),
              color: "#fff",
              fontWeight: 600,
              fontSize: "0.7rem",
              height: 24,
            }}
          />
        </Stack>

        {/* Request ID */}
        <Typography
          variant="caption"
          sx={{
            color: "text.secondary",
            fontFamily: "monospace",
            backgroundColor: "rgba(0,0,0,0.05)",
            px: 1,
            py: 0.5,
            borderRadius: 1,
            display: "inline-block",
            mb: 2,
          }}
        >
          ID: {id}
        </Typography>

        <Divider sx={{ my: 2 }} />

        {/* Details */}
        <Stack spacing={1.5}>
          {substation && (
            <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
              <LocationIcon sx={{ color: "text.secondary", fontSize: 18 }} />
              <Typography variant="body2" sx={{ fontWeight: 500 }}>
                <span style={{ color: theme.palette.text.secondary }}>
                  Substation:
                </span>{" "}
                {substation}
              </Typography>
            </Box>
          )}

          {faultType && (
            <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
              <AssignmentIcon sx={{ color: "text.secondary", fontSize: 18 }} />
              <Typography variant="body2" sx={{ fontWeight: 500 }}>
                <span style={{ color: theme.palette.text.secondary }}>
                  Type:
                </span>{" "}
                {faultType}
              </Typography>
            </Box>
          )}

          {assignee && (
            <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
              <PersonIcon sx={{ color: "text.secondary", fontSize: 18 }} />
              <Typography variant="body2" sx={{ fontWeight: 500 }}>
                <span style={{ color: theme.palette.text.secondary }}>
                  Assignee:
                </span>{" "}
                {assignee}
              </Typography>
            </Box>
          )}

          <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
            <ScheduleIcon sx={{ color: "text.secondary", fontSize: 18 }} />
            <Typography variant="body2" sx={{ fontWeight: 500 }}>
              <span style={{ color: theme.palette.text.secondary }}>
                Created:
              </span>{" "}
              {formatDate(createdAt)}
            </Typography>
          </Box>
        </Stack>

        {/* Priority Indicator */}
        <Box
          sx={{ mt: 2, pt: 2, borderTop: "1px solid", borderColor: "divider" }}
        >
          <Stack
            direction="row"
            justifyContent="space-between"
            alignItems="center"
          >
            <Typography
              variant="caption"
              sx={{ color: "text.secondary", fontWeight: 600 }}
            >
              PRIORITY
            </Typography>
            <Chip
              label={priority?.toUpperCase() || "NORMAL"}
              size="small"
              variant="outlined"
              sx={{
                borderColor: getPriorityColor(priority),
                color: getPriorityColor(priority),
                fontWeight: 600,
                fontSize: "0.65rem",
              }}
            />
          </Stack>
        </Box>
      </CardContent>
    </Card>
  );
}

RequestCard.propTypes = {
  id: PropTypes.string.isRequired,
  title: PropTypes.string,
  substation: PropTypes.string,
  faultType: PropTypes.string,
  status: PropTypes.string,
  createdAt: PropTypes.any,
  assignee: PropTypes.string,
  priority: PropTypes.oneOf(["low", "normal", "medium", "high"]),
};
