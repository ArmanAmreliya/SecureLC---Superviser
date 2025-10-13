// File: src/components/map/MapControls.jsx
import React from "react";
import { Paper, Typography, Stack, Button, Fab } from "@mui/material";
import {
  ZoomIn as ZoomInIcon,
  ZoomOut as ZoomOutIcon,
  MyLocation as MyLocationIcon,
} from "@mui/icons-material";

const MapControls = ({ mapType, setMapType, mapZoom, setMapZoom }) => {
  return (
    <>
      {/* Map Type Controls */}
      <Paper
        elevation={4}
        sx={{
          position: "absolute",
          top: 20,
          right: 20,
          zIndex: 1000,
          p: 2,
          borderRadius: 2,
          backgroundColor: "#FFFFFF",
          border: "2px solid #000000",
          minWidth: 200,
        }}
      >
        <Typography
          variant="subtitle2"
          sx={{ fontWeight: 700, color: "#FFC107", mb: 2 }}
        >
          MAP VIEW
        </Typography>

        <Stack direction="row" spacing={1} sx={{ flexWrap: "wrap", gap: 1 }}>
          <Button
            variant={mapType === "street" ? "contained" : "outlined"}
            size="small"
            onClick={() => setMapType("street")}
            sx={{
              minWidth: "auto",
              px: 2,
              fontSize: "0.75rem",
              backgroundColor: mapType === "street" ? "#FFC107" : "transparent",
              color: mapType === "street" ? "#000000" : "#FFC107",
              borderColor: "#FFC107",
              "&:hover": {
                backgroundColor:
                  mapType === "street" ? "#FFD54F" : "rgba(255, 193, 7, 0.1)",
              },
            }}
          >
            Street
          </Button>

          <Button
            variant={mapType === "satellite" ? "contained" : "outlined"}
            size="small"
            onClick={() => setMapType("satellite")}
            sx={{
              minWidth: "auto",
              px: 2,
              fontSize: "0.75rem",
              backgroundColor:
                mapType === "satellite" ? "#FFC107" : "transparent",
              color: mapType === "satellite" ? "#000000" : "#FFC107",
              borderColor: "#FFC107",
              "&:hover": {
                backgroundColor:
                  mapType === "satellite"
                    ? "#FFD54F"
                    : "rgba(255, 193, 7, 0.1)",
              },
            }}
          >
            Satellite
          </Button>

          <Button
            variant={mapType === "hybrid" ? "contained" : "outlined"}
            size="small"
            onClick={() => setMapType("hybrid")}
            sx={{
              minWidth: "auto",
              px: 2,
              fontSize: "0.75rem",
              backgroundColor: mapType === "hybrid" ? "#FFC107" : "transparent",
              color: mapType === "hybrid" ? "#000000" : "#FFC107",
              borderColor: "#FFC107",
              "&:hover": {
                backgroundColor:
                  mapType === "hybrid" ? "#FFD54F" : "rgba(255, 193, 7, 0.1)",
              },
            }}
          >
            Hybrid
          </Button>
        </Stack>
      </Paper>

      {/* Zoom Controls */}
      <Stack
        spacing={1}
        sx={{
          position: "absolute",
          bottom: 100,
          right: 20,
          zIndex: 1000,
        }}
      >
        <Fab
          size="small"
          sx={{
            backgroundColor: "#FFC107",
            color: "#000000",
            "&:hover": { backgroundColor: "#FFD54F" },
          }}
          onClick={() => setMapZoom(Math.min(20, mapZoom + 1))}
        >
          <ZoomInIcon />
        </Fab>

        <Fab
          size="small"
          sx={{
            backgroundColor: "#FFC107",
            color: "#000000",
            "&:hover": { backgroundColor: "#FFD54F" },
          }}
          onClick={() => setMapZoom(Math.max(1, mapZoom - 1))}
        >
          <ZoomOutIcon />
        </Fab>

        <Fab
          size="small"
          sx={{
            backgroundColor: "#FFC107",
            color: "#000000",
            "&:hover": { backgroundColor: "#FFD54F" },
          }}
          onClick={() => {
            // Center on Ahmedabad
            setMapZoom(11);
          }}
        >
          <MyLocationIcon />
        </Fab>
      </Stack>
    </>
  );
};

export default MapControls;
