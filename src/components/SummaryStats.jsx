import React from "react";
import {
  Grid,
  Card,
  CardContent,
  Typography,
  Box,
  Stack,
  Divider,
  LinearProgress,
  useTheme,
  Paper,
  Chip,
} from "@mui/material";
import {
  HourglassTop as HourglassTopIcon,
  NotificationsActive as NotificationsActiveIcon,
  FactCheck as FactCheckIcon,
  TrendingUp as TrendingUpIcon,
  Assessment as AssessmentIcon,
  AccountBalance as AccountBalanceIcon,
  Security as SecurityIcon,
  Engineering as EngineeringIcon,
  Assignment as AssignmentIcon,
} from "@mui/icons-material";

const StatCard = ({
  title,
  value,
  icon,
  color,
  subtitle,
  trend,
  trendValue,
  progress,
}) => {
  const theme = useTheme();

  return (
    <Paper
      elevation={2}
      sx={{
        borderRadius: 1,
        backgroundColor: "#FFFFFF",
        border: "2px solid #E0E0E0",
        transition: "all 0.3s ease",
        "&:hover": {
          borderColor: "#FFC107",
          boxShadow: "0px 4px 12px rgba(255, 193, 7, 0.2)",
        },
      }}
    >
      {/* Government accent bar */}
      <Box
        sx={{
          height: 4,
          backgroundColor: "#FFC107",
        }}
      />

      <CardContent sx={{ p: 3 }}>
        {/* Header with icon and trend */}
        <Stack
          direction="row"
          justifyContent="space-between"
          alignItems="flex-start"
          sx={{ mb: 2 }}
        >
          <Box
            sx={{
              width: 50,
              height: 50,
              borderRadius: 1,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              backgroundColor: "#FFC107",
              border: "2px solid #000000",
            }}
          >
            <Box sx={{ color: "#000000", fontSize: 24 }}>{icon}</Box>
          </Box>

          {trend && (
            <Box sx={{ textAlign: "right" }}>
              <Stack direction="row" alignItems="center" spacing={0.5}>
                <TrendingUpIcon
                  sx={{
                    color: trendValue > 0 ? "#000000" : "#424242",
                    fontSize: 16,
                  }}
                />
                <Typography
                  variant="caption"
                  sx={{
                    color: trendValue > 0 ? "#000000" : "#424242",
                    fontWeight: 700,
                  }}
                >
                  {trendValue > 0 ? "+" : ""}
                  {trendValue}%
                </Typography>
              </Stack>
              <Typography variant="caption" sx={{ color: "#424242" }}>
                vs last week
              </Typography>
            </Box>
          )}
        </Stack>

        {/* Main value */}
        <Typography
          variant="h3"
          sx={{
            fontWeight: 700,
            color: "#000000",
            lineHeight: 1,
            mb: 0.5,
            fontFeatureSettings: '"tnum"',
          }}
        >
          {value}
        </Typography>

        {/* Title and subtitle */}
        <Typography
          variant="h6"
          sx={{
            fontWeight: 600,
            color: "#000000",
            mb: subtitle ? 0.5 : 0,
          }}
        >
          {title}
        </Typography>

        {subtitle && (
          <Typography
            variant="body2"
            sx={{
              color: "#424242",
              fontSize: "0.85rem",
            }}
          >
            {subtitle}
          </Typography>
        )}

        {/* Progress bar if provided */}
        {progress !== undefined && (
          <>
            <Divider sx={{ my: 2, borderColor: "#E0E0E0" }} />
            <Box>
              <Stack
                direction="row"
                justifyContent="space-between"
                alignItems="center"
                sx={{ mb: 1 }}
              >
                <Typography
                  variant="caption"
                  sx={{ fontWeight: 600, color: "#424242" }}
                >
                  COMPLETION
                </Typography>
                <Typography
                  variant="caption"
                  sx={{ fontWeight: 700, color: "#000000" }}
                >
                  {progress}%
                </Typography>
              </Stack>
              <LinearProgress
                variant="determinate"
                value={progress}
                sx={{
                  height: 6,
                  borderRadius: 3,
                  backgroundColor: "#E0E0E0",
                  "& .MuiLinearProgress-bar": {
                    backgroundColor: "#FFC107",
                    borderRadius: 3,
                  },
                }}
              />
            </Box>
          </>
        )}
      </CardContent>
    </Paper>
  );
};

export default function SummaryStats({ requests = [] }) {
  const theme = useTheme();

  const pendingCount = requests.filter((r) => r.status === "pending").length;
  const activeCount = requests.filter((r) => r.status === "approved").length;
  const completedCount = requests.filter(
    (r) => r.status === "completed"
  ).length;
  const deniedCount = requests.filter((r) => r.status === "denied").length;

  const totalRequests = requests.length;
  const completionRate =
    totalRequests > 0 ? Math.round((completedCount / totalRequests) * 100) : 0;
  const approvalRate =
    totalRequests > 0
      ? Math.round(((completedCount + activeCount) / totalRequests) * 100)
      : 0;

  return (
    <>
      {/* Government Header */}
      <Paper
        elevation={2}
        sx={{
          p: 3,
          mb: 3,
          backgroundColor: "#FFFFFF",
          border: "2px solid #000000",
          borderRadius: 1,
        }}
      >
        <Stack direction="row" alignItems="center" spacing={2} sx={{ mb: 2 }}>
          <Box
            sx={{
              width: 50,
              height: 50,
              backgroundColor: "#FFC107",
              borderRadius: 1,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              border: "2px solid #000000",
            }}
          >
            <AssessmentIcon sx={{ fontSize: 28, color: "#000000" }} />
          </Box>
          <Box>
            <Typography variant="h5" sx={{ fontWeight: 700, color: "#000000", lineHeight: 1 }}>
              Operations Statistics
            </Typography>
            <Typography variant="subtitle1" sx={{ color: "#424242", fontWeight: 500 }}>
              Government of India • Ministry of Power • Field Operations Data
            </Typography>
          </Box>
        </Stack>

        <Divider sx={{ borderColor: "#E0E0E0" }} />
      </Paper>

      {/* Main Stats Grid */}
      <Grid container spacing={3} sx={{ mb: 4 }}>
        <Grid item xs={12} sm={6} md={3}>
          <StatCard
            title="Pending Requests"
            value={pendingCount}
            icon={<HourglassTopIcon />}
            color="#FFC107"
            subtitle="Awaiting supervisor approval"
            trend={true}
            trendValue={12}
          />
        </Grid>

        <Grid item xs={12} sm={6} md={3}>
          <StatCard
            title="Active Operations"
            value={activeCount}
            icon={<EngineeringIcon />}
            color="#FFC107"
            subtitle="Currently in progress"
            trend={true}
            trendValue={-3}
            progress={activeCount > 0 ? 75 : 0}
          />
        </Grid>

        <Grid item xs={12} sm={6} md={3}>
          <StatCard
            title="Completed Today"
            value={completedCount}
            icon={<FactCheckIcon />}
            color="#FFC107"
            subtitle="Successfully finished"
            trend={true}
            trendValue={8}
            progress={completionRate}
          />
        </Grid>

        <Grid item xs={12} sm={6} md={3}>
          <StatCard
            title="Total Requests"
            value={totalRequests}
            icon={<AssignmentIcon />}
            color="#FFC107"
            subtitle="All time submissions"
            progress={approvalRate}
          />
        </Grid>
      </Grid>

      {/* Government Overview Panel */}
      <Paper
        elevation={2}
        sx={{
          backgroundColor: "#FFFFFF",
          border: "2px solid #E0E0E0",
          borderRadius: 1,
          mb: 4,
        }}
      >
        <Box sx={{ p: 3, borderBottom: "2px solid #E0E0E0" }}>
          <Stack direction="row" alignItems="center" spacing={2}>
            <Box
              sx={{
                width: 40,
                height: 40,
                backgroundColor: "#FFC107",
                borderRadius: 1,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                border: "2px solid #000000",
              }}
            >
              <SecurityIcon sx={{ fontSize: 24, color: "#000000" }} />
            </Box>
            <Box>
              <Typography
                variant="h6"
                sx={{ fontWeight: 700, color: "#000000" }}
              >
                Government Operations Overview
              </Typography>
              <Typography variant="body2" sx={{ color: "#424242" }}>
                Real-time performance metrics and compliance status
              </Typography>
            </Box>
          </Stack>
        </Box>

        <CardContent sx={{ p: 3 }}>
          <Grid container spacing={3}>
            <Grid item xs={12} sm={6} md={3}>
              <Box sx={{ textAlign: "center" }}>
                <Typography
                  variant="h4"
                  sx={{ fontWeight: 700, color: "#000000" }}
                >
                  {approvalRate}%
                </Typography>
                <Typography
                  variant="caption"
                  sx={{ color: "#424242", fontWeight: 600 }}
                >
                  APPROVAL RATE
                </Typography>
                <Chip
                  label="COMPLIANT"
                  size="small"
                  sx={{
                    mt: 1,
                    backgroundColor: "#FFC107",
                    color: "#000000",
                    fontWeight: 600,
                    fontSize: "0.7rem",
                  }}
                />
              </Box>
            </Grid>

            <Grid item xs={12} sm={6} md={3}>
              <Box sx={{ textAlign: "center" }}>
                <Typography
                  variant="h4"
                  sx={{ fontWeight: 700, color: "#000000" }}
                >
                  {completionRate}%
                </Typography>
                <Typography
                  variant="caption"
                  sx={{ color: "#424242", fontWeight: 600 }}
                >
                  COMPLETION RATE
                </Typography>
                <Chip
                  label="ON TRACK"
                  size="small"
                  sx={{
                    mt: 1,
                    backgroundColor: "#FFC107",
                    color: "#000000",
                    fontWeight: 600,
                    fontSize: "0.7rem",
                  }}
                />
              </Box>
            </Grid>

            <Grid item xs={12} sm={6} md={3}>
              <Box sx={{ textAlign: "center" }}>
                <Typography
                  variant="h4"
                  sx={{ fontWeight: 700, color: "#000000" }}
                >
                  {deniedCount}
                </Typography>
                <Typography
                  variant="caption"
                  sx={{ color: "#424242", fontWeight: 600 }}
                >
                  DENIED REQUESTS
                </Typography>
                <Chip
                  label="REVIEWED"
                  size="small"
                  sx={{
                    mt: 1,
                    backgroundColor: "#000000",
                    color: "#FFFFFF",
                    fontWeight: 600,
                    fontSize: "0.7rem",
                  }}
                />
              </Box>
            </Grid>

            <Grid item xs={12} sm={6} md={3}>
              <Box sx={{ textAlign: "center" }}>
                <Typography
                  variant="h4"
                  sx={{ fontWeight: 700, color: "#000000" }}
                >
                  {activeCount + pendingCount}
                </Typography>
                <Typography
                  variant="caption"
                  sx={{ color: "#424242", fontWeight: 600 }}
                >
                  ACTIVE ITEMS
                </Typography>
                <Chip
                  label="MONITORING"
                  size="small"
                  sx={{
                    mt: 1,
                    backgroundColor: "#FFC107",
                    color: "#000000",
                    fontWeight: 600,
                    fontSize: "0.7rem",
                  }}
                />
              </Box>
            </Grid>
          </Grid>
        </CardContent>
      </Paper>
    </>
  );
}
