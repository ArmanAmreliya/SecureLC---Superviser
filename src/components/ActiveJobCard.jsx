import React from "react";
import PropTypes from "prop-types";
import {
  Card,
  CardContent,
  Typography,
  Box,
  Chip,
  Stack,
  LinearProgress,
  Avatar,
  useTheme,
} from "@mui/material";
import {
  Work as WorkIcon,
  Person as PersonIcon,
  LocationOn as LocationIcon,
  Schedule as ScheduleIcon,
  ElectricBolt as ElectricBoltIcon,
} from "@mui/icons-material";

export default function ActiveJobCard({
  title,
  subtitle,
  assignee,
  location,
  startTime,
  estimatedCompletion,
  progress = 0,
  status = "active",
  jobType = "maintenance",
}) {
  const theme = useTheme();

  const getJobTypeIcon = (type) => {
    switch (type) {
      case "emergency":
        return <ElectricBoltIcon sx={{ color: "#f44336" }} />;
      case "maintenance":
        return <WorkIcon sx={{ color: theme.palette.primary.main }} />;
      case "inspection":
        return <WorkIcon sx={{ color: "#2196f3" }} />;
      default:
        return <WorkIcon sx={{ color: theme.palette.primary.main }} />;
    }
  };

  const getStatusColor = (status) => {
    switch (status) {
      case "active":
        return theme.palette.primary.main;
      case "paused":
        return "#ff9800";
      case "urgent":
        return "#f44336";
      default:
        return theme.palette.grey[500];
    }
  };

  const formatTime = (time) => {
    if (!time) return "Not set";
    try {
      const date = time?.toDate ? time.toDate() : new Date(time);
      return date.toLocaleTimeString([], {
        hour: "2-digit",
        minute: "2-digit",
      });
    } catch (e) {
      return "Invalid time";
    }
  };

  const getProgressColor = () => {
    if (progress >= 80) return "#4caf50";
    if (progress >= 50) return theme.palette.primary.main;
    if (progress >= 25) return "#ff9800";
    return "#f44336";
  };

  return (
    <Card
      elevation={4}
      sx={{
        borderRadius: 3,
        background: "linear-gradient(135deg, #ffffff 0%, #f8f9fa 100%)",
        border: `1px solid ${theme.palette.divider}`,
        transition: "all 0.3s ease-in-out",
        "&:hover": {
          elevation: 8,
          transform: "translateY(-2px)",
          boxShadow: "0 8px 25px rgba(0,0,0,0.12)",
        },
      }}
    >
      {/* Status Bar */}
      <Box
        sx={{
          height: 4,
          background: `linear-gradient(90deg, ${getStatusColor(
            status
          )} 0%, ${getStatusColor(status)}80 100%)`,
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
          <Box sx={{ display: "flex", alignItems: "center", gap: 1.5 }}>
            {getJobTypeIcon(jobType)}
            <Box>
              <Typography
                variant="h6"
                sx={{
                  fontWeight: 700,
                  color: "text.primary",
                  fontSize: "1.1rem",
                  lineHeight: 1.2,
                }}
              >
                {title}
              </Typography>
              {subtitle && (
                <Typography
                  variant="body2"
                  sx={{
                    color: "text.secondary",
                    mt: 0.5,
                  }}
                >
                  {subtitle}
                </Typography>
              )}
            </Box>
          </Box>

          <Chip
            label={status?.toUpperCase()}
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

        {/* Progress Bar */}
        <Box sx={{ mb: 3 }}>
          <Stack
            direction="row"
            justifyContent="space-between"
            alignItems="center"
            sx={{ mb: 1 }}
          >
            <Typography
              variant="caption"
              sx={{ fontWeight: 600, color: "text.secondary" }}
            >
              PROGRESS
            </Typography>
            <Typography
              variant="caption"
              sx={{ fontWeight: 700, color: getProgressColor() }}
            >
              {progress}%
            </Typography>
          </Stack>
          <LinearProgress
            variant="determinate"
            value={progress}
            sx={{
              height: 8,
              borderRadius: 4,
              backgroundColor: "rgba(0,0,0,0.1)",
              "& .MuiLinearProgress-bar": {
                backgroundColor: getProgressColor(),
                borderRadius: 4,
              },
            }}
          />
        </Box>

        {/* Job Details */}
        <Stack spacing={1.5}>
          {assignee && (
            <Box sx={{ display: "flex", alignItems: "center", gap: 1.5 }}>
              <Avatar
                sx={{
                  width: 24,
                  height: 24,
                  backgroundColor: theme.palette.primary.main,
                  fontSize: "0.75rem",
                  fontWeight: 700,
                }}
              >
                {assignee?.substring(0, 1).toUpperCase()}
              </Avatar>
              <Box>
                <Typography
                  variant="caption"
                  sx={{ color: "text.secondary", display: "block" }}
                >
                  ASSIGNED TO
                </Typography>
                <Typography variant="body2" sx={{ fontWeight: 600 }}>
                  {assignee}
                </Typography>
              </Box>
            </Box>
          )}

          {location && (
            <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
              <LocationIcon sx={{ color: "text.secondary", fontSize: 18 }} />
              <Box>
                <Typography
                  variant="caption"
                  sx={{ color: "text.secondary", display: "block" }}
                >
                  LOCATION
                </Typography>
                <Typography variant="body2" sx={{ fontWeight: 500 }}>
                  {location}
                </Typography>
              </Box>
            </Box>
          )}

          <Stack direction="row" spacing={3}>
            {startTime && (
              <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                <ScheduleIcon sx={{ color: "text.secondary", fontSize: 18 }} />
                <Box>
                  <Typography
                    variant="caption"
                    sx={{ color: "text.secondary", display: "block" }}
                  >
                    STARTED
                  </Typography>
                  <Typography
                    variant="body2"
                    sx={{ fontWeight: 500, fontFamily: "monospace" }}
                  >
                    {formatTime(startTime)}
                  </Typography>
                </Box>
              </Box>
            )}

            {estimatedCompletion && (
              <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                <ScheduleIcon
                  sx={{ color: theme.palette.primary.main, fontSize: 18 }}
                />
                <Box>
                  <Typography
                    variant="caption"
                    sx={{ color: "text.secondary", display: "block" }}
                  >
                    EST. COMPLETION
                  </Typography>
                  <Typography
                    variant="body2"
                    sx={{
                      fontWeight: 600,
                      fontFamily: "monospace",
                      color: theme.palette.primary.main,
                    }}
                  >
                    {formatTime(estimatedCompletion)}
                  </Typography>
                </Box>
              </Box>
            )}
          </Stack>
        </Stack>

        {/* Job Type Badge */}
        <Box
          sx={{ mt: 2, pt: 2, borderTop: "1px solid", borderColor: "divider" }}
        >
          <Chip
            label={`${jobType?.toUpperCase()} JOB`}
            size="small"
            variant="outlined"
            sx={{
              borderColor: theme.palette.primary.main,
              color: theme.palette.primary.main,
              fontWeight: 600,
              fontSize: "0.65rem",
            }}
          />
        </Box>
      </CardContent>
    </Card>
  );
}

ActiveJobCard.propTypes = {
  title: PropTypes.string.isRequired,
  subtitle: PropTypes.string,
  assignee: PropTypes.string,
  location: PropTypes.string,
  startTime: PropTypes.any,
  estimatedCompletion: PropTypes.any,
  progress: PropTypes.number,
  status: PropTypes.oneOf(["active", "paused", "urgent", "completed"]),
  jobType: PropTypes.oneOf(["emergency", "maintenance", "inspection"]),
};
