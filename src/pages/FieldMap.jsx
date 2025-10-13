import React from "react";
import { RMap, ROSM } from "rlayers";
import { fromLonLat } from "ol/proj";
import { Box, Paper, Typography, Chip, Stack } from "@mui/material";

const FieldMap = () => {
  // Sample active linemen data with Indian names
  const activeLinemen = [
    {
      id: 1,
      name: "Rajesh Kumar",
      status: "Active",
      location: "Connaught Place",
    },
    { id: 2, name: "Amit Sharma", status: "On Route", location: "Karol Bagh" },
    { id: 3, name: "Priya Singh", status: "Active", location: "Lajpat Nagar" },
    {
      id: 4,
      name: "Vikash Gupta",
      status: "Break",
      location: "Rohini Sector 7",
    },
  ];

  const getStatusColor = (status) => {
    switch (status) {
      case "Active":
        return "#FFC107"; // theme success color
      case "On Route":
        return "#FFC107"; // theme primary color
      case "Break":
        return "#FFC107"; // theme text secondary color
      default:
        return "#FFC107"; // theme text primary color
    }
  };

  return (
    <Box sx={{ height: "100vh", width: "100%", position: "relative" }}>
      {/* Map Container */}
      <Box sx={{ width: "100%", height: "100%" }}>
        <RMap
          initial={{ center: fromLonLat([77.209, 28.6139]), zoom: 12 }}
          style={{ width: "100%", height: "100%" }}
        >
          <ROSM />
        </RMap>
      </Box>

      {/* Active Linemen Details Panel */}
      <Paper
        elevation={4}
        sx={{
          position: "absolute",
          top: 20,
          right: 20,
          width: 320,
          maxHeight: "80vh",
          overflow: "auto",
          backgroundColor: "background.paper",
          borderRadius: 2,
          border: "2px solid",
          borderColor: "primary.main",
        }}
      >
        <Box sx={{ p: 2 }}>
          <Typography
            variant="h6"
            sx={{
              fontWeight: 700,
              color: "text.primary",
              mb: 2,
              textAlign: "center",
            }}
          >
            🏛️ Active Linemen Details
          </Typography>

          <Stack spacing={2}>
            {activeLinemen.map((lineman) => (
              <Paper
                key={lineman.id}
                elevation={2}
                sx={{
                  p: 2,
                  border: "1px solid",
                  borderColor: "primary.main",
                  borderRadius: 1,
                  backgroundColor: "background.default",
                }}
              >
                <Typography
                  variant="subtitle1"
                  sx={{ fontWeight: 600, color: "text.primary", mb: 1 }}
                >
                  {lineman.name}
                </Typography>

                <Stack direction="row" spacing={1} sx={{ mb: 1 }}>
                  <Chip
                    label={lineman.status}
                    size="small"
                    sx={{
                      backgroundColor: getStatusColor(lineman.status),
                      color: "primary.contrastText",
                      fontWeight: 600,
                    }}
                  />
                </Stack>

                <Typography variant="body2" sx={{ color: "text.secondary" }}>
                  📍 Location: {lineman.location}
                </Typography>
              </Paper>
            ))}
          </Stack>

          <Box
            sx={{
              mt: 2,
              p: 1,
              backgroundColor: "primary.main",
              borderRadius: 1,
            }}
          >
            <Typography
              variant="body2"
              sx={{
                textAlign: "center",
                fontWeight: 600,
                color: "primary.contrastText",
              }}
            >
              Total Active: {activeLinemen.length} Linemen
            </Typography>
          </Box>
        </Box>
      </Paper>
    </Box>
  );
};

export default FieldMap;
