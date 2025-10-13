// File: src/components/map/WorkerMarker.jsx
import React from "react";
import { RFeature, RStyle } from "rlayers";
import { Point } from "ol/geom";
import { fromLonLat } from "ol/proj";

const WorkerMarker = ({ lineman, onMarkerClick, isSelected }) => {
  const getStatusColor = (status) => {
    switch (status) {
      case "active":
        return "#4CAF50"; // Green
      case "busy":
        return "#FF9800"; // Orange
      default:
        return "#F44336"; // Red
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
      onClick={() => onMarkerClick(lineman)}
    >
      <RStyle.RStyle>
        {/* Background Circle */}
        <RStyle.RCircle radius={isSelected ? 25 : 20}>
          <RStyle.RFill color="#FFC107" />
          <RStyle.RStroke color="#000000" width={isSelected ? 4 : 3} />
        </RStyle.RCircle>

        {/* Person Icon */}
        <RStyle.RText
          text="👤"
          font="bold 16px sans-serif"
          textAlign="center"
          textBaseline="middle"
        >
          <RStyle.RFill color="#000000" />
        </RStyle.RText>

        {/* Status Indicator */}
        <RStyle.RCircle radius={4}>
          <RStyle.RFill color={getStatusColor(lineman.status)} />
          <RStyle.RStroke color="#FFFFFF" width={1} />
        </RStyle.RCircle>
      </RStyle.RStyle>
    </RFeature>
  );
};

export default WorkerMarker;
