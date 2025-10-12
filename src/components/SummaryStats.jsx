import React from "react";
import { Grid, Card, CardContent, Typography, Box } from "@mui/material";
import { WatchLater, CheckCircle, HourglassEmpty } from "@mui/icons-material";

const StatCard = ({ title, value, icon, color }) => (
  <Card sx={{ display: "flex", alignItems: "center", p: 2 }}>
    <Box
      sx={{
        p: 1.5,
        borderRadius: "50%",
        backgroundColor: color,
        color: "#fff",
        mr: 2,
      }}
    >
      {icon}
    </Box>
    <Box>
      <Typography variant="h6">{value}</Typography>
      <Typography variant="body2" color="text.secondary">
        {title}
      </Typography>
    </Box>
  </Card>
);

export default function SummaryStats({ requests = [] }) {
  const pendingCount = requests.filter((r) => r.status === "pending").length;
  const activeCount = requests.filter((r) => r.status === "approved").length;
  const completedCount = requests.filter(
    (r) => r.status === "completed"
  ).length;

  return (
    <Grid container spacing={3} sx={{ mb: 4 }}>
      <Grid item xs={12} sm={4}>
        <StatCard
          title="Pending Requests"
          value={pendingCount}
          icon={<HourglassEmpty />}
          color="#FFC107"
        />
      </Grid>
      <Grid item xs={12} sm={4}>
        <StatCard
          title="Active Jobs"
          value={activeCount}
          icon={<CheckCircle />}
          color="#4CAF50"
        />
      </Grid>
      <Grid item xs={12} sm={4}>
        <StatCard
          title="Completed Today"
          value={completedCount}
          icon={<WatchLater />}
          color="#616161"
        />
      </Grid>
    </Grid>
  );
}
