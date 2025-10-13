// File: src/components/map/MapContainer.jsx
import React from "react";
import { Box } from "@mui/material";
import { RMap, ROSM, RLayerTile, RLayerVector } from "rlayers";
import { fromLonLat } from "ol/proj";
import XYZ from "ol/source/XYZ";
import WorkerMarker from "./WorkerMarker";

const MapContainer = ({
  mapCenter = fromLonLat([77.209, 28.6139]),
  mapZoom = 10,
  mapType = "satellite",
  linemen = [],
  onWorkerSelect,
  selectedWorker,
}) => {
  const getMapLayers = () => {
    switch (mapType) {
      case "satellite":
        return (
          <RLayerTile
            source={
              new XYZ({
                url: "https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}",
                attributions: "© Esri Satellite",
                maxZoom: 19,
              })
            }
            zIndex={0}
          />
        );
      case "hybrid":
        return (
          <>
            <RLayerTile
              source={
                new XYZ({
                  url: "https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}",
                  attributions: "© Esri Satellite",
                  maxZoom: 19,
                })
              }
              zIndex={0}
            />
            <RLayerTile
              source={
                new XYZ({
                  url: "https://server.arcgisonline.com/ArcGIS/rest/services/Reference/World_Boundaries_and_Places/MapServer/tile/{z}/{y}/{x}",
                  attributions: "© Esri Labels",
                  maxZoom: 19,
                })
              }
              opacity={0.8}
              zIndex={1}
            />
          </>
        );
      case "street":
      default:
        return <ROSM />;
    }
  };

  return (
    <Box
      sx={{
        position: "absolute",
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        width: "100%",
        height: "100vh",
        backgroundColor: "#f5f5f5",
      }}
    >
      <RMap
        initial={{ center: mapCenter, zoom: mapZoom }}
        style={{
          width: "100%",
          height: "100%",
        }}
      >
        {/* Map Base Layer */}
        {getMapLayers()}

        {/* Worker Markers Layer */}
        <RLayerVector zIndex={10}>
          {linemen.map((lineman) => (
            <WorkerMarker
              key={lineman.id}
              lineman={lineman}
              onMarkerClick={onWorkerSelect}
              isSelected={selectedWorker?.id === lineman.id}
            />
          ))}
        </RLayerVector>
      </RMap>
    </Box>
  );
};

export default MapContainer;
