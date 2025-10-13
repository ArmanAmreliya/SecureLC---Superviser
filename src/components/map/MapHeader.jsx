// File: src/components/map/MapHeader.jsx
import React from "react";
import { Paper, Typography, Stack, Box, Button } from "@mui/material";
import {
  AccountBalance as AccountBalanceIcon,
  Refresh as RefreshIcon,
} from "@mui/icons-material";

const MapHeader = ({
  workerCount = 0,
  onRefresh,
  onAddSampleData,
  isLoading,
}) => {
  return (
    <Paper
      elevation={4}
      sx={{
        position: "absolute",
        top: 20,
        left: 20,
        right: 280,
        zIndex: 1000,
        p: 2,
        borderRadius: 2,
        backgroundColor: "#FFFFFF",
        border: "2px solid #000000",
      }}
    >
      <Stack direction="row" justifyContent="space-between" alignItems="center">
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
            <AccountBalanceIcon sx={{ fontSize: 24, color: "#000000" }} />
          </Box>
          <Box>
            <Typography
              variant="h5"
              sx={{ fontWeight: 700, mb: 0.5, color: "#000000" }}
            >
              Government Field Operations Map
            </Typography>
            <Typography variant="body2" sx={{ color: "#424242" }}>
              Real-time tracking of {workerCount} active field workers •
              Ministry of Power
            </Typography>
          </Box>
        </Stack>

        <Stack direction="row" spacing={1}>
          <Button
            variant="outlined"
            size="small"
            startIcon={<RefreshIcon />}
            onClick={onRefresh}
            disabled={isLoading}
            sx={{
              borderColor: "#FFC107",
              color: "#FFC107",
              "&:hover": {
                borderColor: "#F57F17",
                backgroundColor: "rgba(255, 193, 7, 0.1)",
              },
            }}
          >
            Refresh
          </Button>

          {activeLinemen.length === 0 && (
            <Button
              variant="contained"
              size="small"
              onClick={onAddSampleData}
              disabled={isLoading}
              sx={{
                backgroundColor: "#FFC107",
                color: "#000000",
                "&:hover": { backgroundColor: "#F57F17" },
              }}
            >
              Add Sample Data
            </Button>
          )}
        </Stack>
      </Stack>
    </Paper>
  );
};

export default MapHeader;
