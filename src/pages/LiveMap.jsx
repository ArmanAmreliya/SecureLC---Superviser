// File: src/pages/LiveMap.jsx
import React, { useState, useEffect } from "react";
import {
  Box,
  Typography,
  Paper,
  Chip,
  Avatar,
  IconButton,
  Stack,
  Divider,
  Card,
  CardContent,
  useTheme,
  Alert,
  Badge,
  Button,
  Tooltip,
  CircularProgress,
  Grid,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  ListItemSecondaryAction,
  Fab,
  Zoom,
  Fade,
} from "@mui/material";
import {
  Close as CloseIcon,
  LocationOn as LocationOnIcon,
  Build as BuildIcon,
  Engineering as EngineeringIcon,
  Timeline as TimelineIcon,
  Security as SecurityIcon,
  Person as PersonIcon,
  Phone as PhoneIcon,
  RadioButtonChecked as RadioIcon,
  Schedule as ScheduleIcon,
  Work as WorkIcon,
  Group as GroupIcon,
  ElectricBolt as ElectricBoltIcon,
  Refresh as RefreshIcon,
  MyLocation as MyLocationIcon,
  ZoomIn as ZoomInIcon,
  ZoomOut as ZoomOutIcon,
  FilterList as FilterListIcon,
  NotificationsActive as NotificationsActiveIcon,
  CheckCircle as CheckCircleIcon,
  Warning as WarningIcon,
  Info as InfoIcon,
  AccountBalance as AccountBalanceIcon,
  Assessment as AssessmentIcon,
} from "@mui/icons-material";
import { RMap, ROSM, RLayerVector, RFeature, ROverlay, RStyle } from "rlayers";
import { Point } from "ol/geom";
import { fromLonLat } from "ol/proj";
import { subscribeToActiveLinemen, addSampleLinemenData } from "../services/firestoreService";

// --- Main Component ---
export default function LiveMap() {
  const theme = useTheme();
  const [activeLinemen, setActiveLinemen] = useState([]);
  const [selectedLineman, setSelectedLineman] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [lastUpdate, setLastUpdate] = useState(new Date());
  const [showLinemanList, setShowLinemanList] = useState(false);
  const [mapZoom, setMapZoom] = useState(11);

  // Center of the map (Ahmedabad, Gujarat, India)
  const mapCenter = fromLonLat([72.5714, 23.0225]);

  useEffect(() => {
    setIsLoading(true);
    const unsubscribe = subscribeToActiveLinemen((linemen) => {
      console.log("Active linemen received:", linemen);
      // Filter out linemen that don't have valid location data
      const validLinemen = linemen.filter(
        (lineman) =>
          lineman.currentLocation &&
          typeof lineman.currentLocation.latitude === "number" &&
          typeof lineman.currentLocation.longitude === "number"
      );
      setActiveLinemen(validLinemen);
      setLastUpdate(new Date());
      setIsLoading(false);
    });

    return () => unsubscribe();
  }, []);

  const handleMarkerClick = (lineman) => {
    setSelectedLineman(lineman);
    setShowLinemanList(false);
  };

  const handleCloseOverlay = () => {
    setSelectedLineman(null);
  };

  const handleAddSampleData = async () => {
    setIsLoading(true);
    try {
      await addSampleLinemenData();
      // Data will be updated via the subscription
    } catch (error) {
      console.error("Failed to add sample data:", error);
    }
  };

  const formatTimestamp = (timestamp) => {
    if (!timestamp) return "N/A";
    const date = timestamp.toDate ? timestamp.toDate() : new Date(timestamp);
    return date.toLocaleString();
  };

  const formatTimeRemaining = (estimatedCompletion) => {
    if (!estimatedCompletion) return "N/A";
    const completion = estimatedCompletion.toDate ? estimatedCompletion.toDate() : new Date(estimatedCompletion);
    const now = new Date();
    const diff = completion - now;
    
    if (diff <= 0) return "Overdue";
    
    const hours = Math.floor(diff / (1000 * 60 * 60));
    const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
    
    if (hours > 0) {
      return `${hours}h ${minutes}m`;
    }
    return `${minutes}m`;
  };

  const getPriorityColor = (priority) => {
    switch (priority?.toLowerCase()) {
      case "high": return "#f44336";
      case "medium": return "#ff9800";
      case "low": return "#4caf50";
      default: return "#2196f3";
    }
  };

  const getSpecializationIcon = (specialization) => {
    switch (specialization?.toLowerCase()) {
      case "high voltage": return <ElectricBoltIcon />;
      case "distribution lines": return <BuildIcon />;
      case "transformer maintenance": return <EngineeringIcon />;
      case "power line installation": return <WorkIcon />;
      default: return <PersonIcon />;
    }
  };

  return (
    <Box sx={{ display: "flex", height: "calc(100vh - 64px)" }}>
      {/* Main Map Area */}
      <Box sx={{ flexGrow: 1, position: "relative" }}>
        {/* Government Header */}
        <Paper
          elevation={4}
          sx={{
            position: "absolute",
            top: 16,
            left: 16,
            right: 16,
            zIndex: 1000,
            p: 2,
            borderRadius: 1,
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
                <Typography variant="h5" sx={{ fontWeight: 700, mb: 0.5, color: "#000000" }}>
                  Government Field Operations Map
        </Typography>
                <Typography variant="body2" sx={{ color: "#424242" }}>
                  Real-time tracking of {activeLinemen.length} active field workers • Ministry of Power
        </Typography>
      </Box>
            </Stack>
            <Stack direction="row" spacing={1}>
              <Button
                variant="outlined"
                size="small"
                startIcon={<RefreshIcon />}
                onClick={() => window.location.reload()}
                disabled={isLoading}
                sx={{
                  borderColor: "#000000",
                  color: "#000000",
                  "&:hover": {
                    backgroundColor: "#F5F5F5",
                    borderColor: "#000000",
                  },
                }}
              >
                Refresh
              </Button>
              {activeLinemen.length === 0 && (
                <Button
                  variant="contained"
                  size="small"
                  onClick={handleAddSampleData}
                  disabled={isLoading}
                  sx={{
                    backgroundColor: "#FFC107",
                    color: "#000000",
                    "&:hover": {
                      backgroundColor: "#F57F17",
                    },
                  }}
                >
                  Add Sample Data
                </Button>
              )}
            </Stack>
          </Stack>
        </Paper>

        {/* Map Container */}
        <RMap
          initial={{ center: mapCenter, zoom: mapZoom }}
          style={{ width: "100%", height: "100%" }}
        >
          <ROSM />
          <RLayerVector zIndex={10}>
            {/* Linemen Markers */}
            {activeLinemen.map((lineman) => (
              <RFeature
                key={lineman.id}
                geometry={
                  new Point(
                    fromLonLat([
                      lineman.currentLocation.longitude,
                      lineman.currentLocation.latitude,
                    ])
                  )
                }
                onClick={() => handleMarkerClick(lineman)}
              >
                <RStyle.RStyle>
                  {/* Outer ring with government yellow */}
                  <RStyle.RCircle radius={20}>
                    <RStyle.RFill color="#FFC10740" />
                    <RStyle.RStroke color="#FFC107" width={3} />
                  </RStyle.RCircle>
                  {/* Inner circle with black border */}
                  <RStyle.RCircle radius={15}>
                    <RStyle.RFill color="#FFC107" />
                    <RStyle.RStroke color="#000000" width={2} />
                  </RStyle.RCircle>
                  {/* Center dot */}
                  <RStyle.RCircle radius={8}>
                    <RStyle.RFill color="#000000" />
                  </RStyle.RCircle>
                </RStyle.RStyle>
              </RFeature>
            ))}
          </RLayerVector>

          {/* Lineman Details Overlay */}
          {selectedLineman && (
            <ROverlay
              position={fromLonLat([
                selectedLineman.currentLocation.longitude,
                selectedLineman.currentLocation.latitude,
              ])}
              positioning="bottom-center"
              offset={[0, -30]}
            >
              <Card 
                elevation={16} 
                sx={{ 
                  minWidth: 380, 
                  maxWidth: 420,
                  borderRadius: 1,
                  backgroundColor: "#FFFFFF",
                  border: "2px solid #000000",
                }}
              >
                <CardContent sx={{ p: 3 }}>
                  {/* Header */}
                  <Stack direction="row" justifyContent="space-between" alignItems="center" sx={{ mb: 2 }}>
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
                        {selectedLineman.name?.split(' ').map(n => n[0]).join('').toUpperCase()}
                      </Avatar>
                      <Box>
                        <Typography variant="h6" sx={{ fontWeight: 700, mb: 0.5, color: "#000000" }}>
                          {selectedLineman.name}
                        </Typography>
                        <Typography variant="body2" sx={{ color: "#424242" }}>
                          {selectedLineman.employeeId} • {selectedLineman.team}
                    </Typography>
                      </Box>
                    </Stack>
                    <IconButton size="small" onClick={handleCloseOverlay}>
                      <CloseIcon />
                    </IconButton>
                  </Stack>

                  <Divider sx={{ my: 2, borderColor: "#E0E0E0" }} />

                  {/* Assignment Details */}
                  <Stack spacing={2}>
                    <Box>
                      <Typography variant="subtitle2" sx={{ fontWeight: 600, mb: 1, color: "#FFC107" }}>
                        CURRENT ASSIGNMENT
                      </Typography>
                      <Typography variant="h6" sx={{ fontWeight: 700, mb: 1, color: "#000000" }}>
                        {selectedLineman.assignment?.substation || "No Assignment"}
                      </Typography>
                      <Stack direction="row" spacing={1} sx={{ mb: 1 }}>
                    <Chip
                          icon={getSpecializationIcon(selectedLineman.specialization)}
                          label={selectedLineman.specialization}
                      size="small"
                          sx={{ backgroundColor: "#FFC107", color: "#000000" }}
                    />
                    <Chip
                          label={selectedLineman.assignment?.workType || "General Work"}
                          size="small"
                          variant="outlined"
                          sx={{ borderColor: "#000000", color: "#000000" }}
                        />
                      </Stack>
                      <Chip
                        label={selectedLineman.assignment?.priority?.toUpperCase() || "MEDIUM"}
                      size="small"
                        sx={{
                          backgroundColor: "#FFC107",
                          color: "#000000",
                          fontWeight: 700,
                        }}
                      />
                    </Box>

                    {/* Status & Timeline */}
                    <Box>
                      <Typography variant="subtitle2" sx={{ fontWeight: 600, mb: 1, color: "#FFC107" }}>
                        STATUS & TIMELINE
                      </Typography>
                      <Grid container spacing={2}>
                        <Grid item xs={6}>
                          <Stack direction="row" alignItems="center" spacing={1}>
                            <NotificationsActiveIcon sx={{ color: "#FFC107", fontSize: 20 }} />
                            <Box>
                              <Typography variant="caption" sx={{ color: "#424242" }}>
                                Status
                              </Typography>
                              <Typography variant="body2" sx={{ fontWeight: 600, color: "#000000" }}>
                                Active
                              </Typography>
                            </Box>
                          </Stack>
                        </Grid>
                        <Grid item xs={6}>
                          <Stack direction="row" alignItems="center" spacing={1}>
                            <ScheduleIcon sx={{ color: "#FFC107", fontSize: 20 }} />
                            <Box>
                              <Typography variant="caption" sx={{ color: "#424242" }}>
                                Time Remaining
                              </Typography>
                              <Typography variant="body2" sx={{ fontWeight: 600, color: "#000000" }}>
                                {formatTimeRemaining(selectedLineman.assignment?.estimatedCompletion)}
                              </Typography>
                            </Box>
                          </Stack>
                        </Grid>
                      </Grid>
                    </Box>

                    {/* Contact Information */}
                    <Box>
                      <Typography variant="subtitle2" sx={{ fontWeight: 600, mb: 1, color: "#FFC107" }}>
                        CONTACT INFORMATION
                      </Typography>
                      <Stack spacing={1}>
                        <Stack direction="row" alignItems="center" spacing={1}>
                          <PhoneIcon sx={{ color: "#FFC107", fontSize: 18 }} />
                          <Typography variant="body2" sx={{ color: "#000000" }}>
                            {selectedLineman.contact?.phone || "N/A"}
                          </Typography>
                        </Stack>
                        <Stack direction="row" alignItems="center" spacing={1}>
                          <RadioIcon sx={{ color: "#FFC107", fontSize: 18 }} />
                          <Typography variant="body2" sx={{ color: "#000000" }}>
                            Radio: {selectedLineman.contact?.radio || "N/A"}
                          </Typography>
                        </Stack>
                        <Stack direction="row" alignItems="center" spacing={1}>
                          <LocationOnIcon sx={{ color: "#FFC107", fontSize: 18 }} />
                          <Typography variant="body2" sx={{ fontFamily: "monospace", color: "#000000" }}>
                            {selectedLineman.currentLocation.latitude.toFixed(4)}, {selectedLineman.currentLocation.longitude.toFixed(4)}
                          </Typography>
                        </Stack>
                      </Stack>
                    </Box>

                    {/* Equipment */}
                    {selectedLineman.equipment && selectedLineman.equipment.length > 0 && (
                      <Box>
                        <Typography variant="subtitle2" sx={{ fontWeight: 600, mb: 1, color: "#FFC107" }}>
                          EQUIPMENT
                        </Typography>
                        <Stack direction="row" spacing={1} flexWrap="wrap" useFlexGap>
                          {selectedLineman.equipment.map((item, index) => (
                    <Chip
                              key={index}
                              label={item}
                      size="small"
                              variant="outlined"
                              sx={{ fontSize: "0.7rem", borderColor: "#000000", color: "#000000" }}
                            />
                          ))}
                        </Stack>
                      </Box>
                    )}

                    {/* Last Update */}
                    <Box>
                      <Typography variant="caption" sx={{ color: "#424242" }}>
                        Last updated: {formatTimestamp(selectedLineman.lastUpdate)}
                      </Typography>
                    </Box>
                  </Stack>
                </CardContent>
              </Card>
            </ROverlay>
          )}
        </RMap>

        {/* Government Lineman List Panel */}
        <Fade in={showLinemanList}>
          <Paper
            elevation={8}
            sx={{
              position: "absolute",
              bottom: 16,
              left: 16,
              width: 400,
              maxHeight: "60vh",
              borderRadius: 1,
              backgroundColor: "#FFFFFF",
              border: "2px solid #000000",
              display: showLinemanList ? "block" : "none",
            }}
          >
            <Box sx={{ p: 2, borderBottom: "2px solid #E0E0E0" }}>
              <Stack direction="row" justifyContent="space-between" alignItems="center">
                <Typography variant="h6" sx={{ fontWeight: 700, color: "#000000" }}>
                  Government Field Workers
                </Typography>
                <IconButton size="small" onClick={() => setShowLinemanList(false)}>
                  <CloseIcon />
                </IconButton>
              </Stack>
            </Box>
            <Box sx={{ maxHeight: "50vh", overflow: "auto" }}>
              <List>
                {activeLinemen.map((lineman) => (
                  <ListItem
                    key={lineman.id}
                    button
                    onClick={() => handleMarkerClick(lineman)}
                    sx={{
                      borderBottom: "1px solid #E0E0E0",
                      "&:hover": { backgroundColor: "#F5F5F5" },
                    }}
                  >
                    <ListItemIcon>
                      <Avatar
                        sx={{
                          backgroundColor: "#FFC107",
                          color: "#000000",
                          fontWeight: 700,
                          width: 40,
                          height: 40,
                          border: "2px solid #000000",
                        }}
                      >
                        {lineman.name?.split(' ').map(n => n[0]).join('').toUpperCase()}
                      </Avatar>
                    </ListItemIcon>
                    <ListItemText
                      primary={
                        <Typography variant="subtitle1" sx={{ fontWeight: 600, color: "#000000" }}>
                          {lineman.name}
                        </Typography>
                      }
                      secondary={
                        <Stack spacing={0.5}>
                          <Typography variant="body2" sx={{ color: "#424242" }}>
                            {lineman.assignment?.substation || "No Assignment"}
                          </Typography>
                          <Stack direction="row" spacing={1}>
                            <Chip
                              label={lineman.specialization}
                              size="small"
                              sx={{ fontSize: "0.7rem", height: 20, backgroundColor: "#FFC107", color: "#000000" }}
                            />
                            <Chip
                              label={lineman.assignment?.priority || "MEDIUM"}
                              size="small"
                              sx={{
                                fontSize: "0.7rem",
                                height: 20,
                                backgroundColor: "#000000",
                                color: "#FFFFFF",
                              }}
                            />
                          </Stack>
                        </Stack>
                      }
                    />
                    <ListItemSecondaryAction>
                      <Stack alignItems="center" spacing={0.5}>
                        <Typography variant="caption" sx={{ color: "#424242" }}>
                          {formatTimeRemaining(lineman.assignment?.estimatedCompletion)}
                        </Typography>
                        <NotificationsActiveIcon sx={{ color: "#FFC107", fontSize: 16 }} />
                      </Stack>
                    </ListItemSecondaryAction>
                  </ListItem>
                ))}
              </List>
            </Box>
          </Paper>
        </Fade>

        {/* Government Control Panel */}
        <Paper
          elevation={8}
          sx={{
            position: "absolute",
            top: 120,
            right: 16,
            p: 2,
            borderRadius: 1,
            backgroundColor: "#FFFFFF",
            border: "2px solid #000000",
          }}
        >
          <Stack spacing={2}>
            <Typography variant="subtitle2" sx={{ fontWeight: 700, color: "#FFC107" }}>
              GOVERNMENT OPERATIONS STATUS
            </Typography>
            
            <Stack direction="row" alignItems="center" spacing={1}>
              <Badge badgeContent={activeLinemen.length} sx={{ "& .MuiBadge-badge": { backgroundColor: "#FFC107", color: "#000000" } }}>
                <PersonIcon sx={{ color: "#FFC107" }} />
            </Badge>
              <Typography variant="body2" sx={{ fontWeight: 600, color: "#000000" }}>
                Active Field Workers
          </Typography>
            </Stack>

            <Divider sx={{ borderColor: "#E0E0E0" }} />

          <Stack spacing={1}>
              <Button
                variant="outlined"
                size="small"
                startIcon={<GroupIcon />}
                onClick={() => setShowLinemanList(!showLinemanList)}
                fullWidth
                sx={{
                  borderColor: "#000000",
                  color: "#000000",
                  "&:hover": {
                    backgroundColor: "#F5F5F5",
                    borderColor: "#000000",
                  },
                }}
              >
                {showLinemanList ? "Hide" : "Show"} Worker List
              </Button>
              
              <Typography variant="caption" sx={{ color: "#424242", textAlign: "center" }}>
              Last updated: {lastUpdate.toLocaleTimeString()}
            </Typography>
            </Stack>
          </Stack>
        </Paper>

        {/* Government Loading State */}
        {isLoading && (
          <Box
            sx={{
              position: "absolute",
              top: "50%",
              left: "50%",
              transform: "translate(-50%, -50%)",
              zIndex: 1000,
            }}
          >
            <Paper
              elevation={8}
              sx={{
                p: 4,
                borderRadius: 1,
                textAlign: "center",
                backgroundColor: "#FFFFFF",
                border: "2px solid #000000",
              }}
            >
              <CircularProgress sx={{ mb: 2, color: "#FFC107" }} />
              <Typography variant="h6" sx={{ fontWeight: 600, color: "#000000" }}>
                Loading Government Operations...
              </Typography>
              <Typography variant="body2" sx={{ color: "#424242" }}>
                Connecting to Ministry of Power systems
              </Typography>
            </Paper>
          </Box>
        )}

        {/* Government No Data State */}
        {!isLoading && activeLinemen.length === 0 && (
          <Box
            sx={{
              position: "absolute",
              top: "50%",
              left: "50%",
              transform: "translate(-50%, -50%)",
              zIndex: 1000,
            }}
          >
            <Paper
              elevation={8}
              sx={{
                p: 4,
                borderRadius: 1,
                textAlign: "center",
                backgroundColor: "#FFFFFF",
                border: "2px solid #000000",
                maxWidth: 400,
              }}
            >
              <InfoIcon sx={{ fontSize: 48, color: "#FFC107", mb: 2 }} />
              <Typography variant="h6" sx={{ fontWeight: 600, mb: 1, color: "#000000" }}>
                No Active Field Workers
              </Typography>
              <Typography variant="body2" sx={{ color: "#424242", mb: 3 }}>
                No government field workers are currently active. Add sample data to test the system or wait for field operations to begin.
              </Typography>
              <Button
                variant="contained"
                onClick={handleAddSampleData}
                startIcon={<PersonIcon />}
                sx={{
                  backgroundColor: "#FFC107",
                  color: "#000000",
                  "&:hover": { backgroundColor: "#F57F17" },
                }}
              >
                Add Sample Data
              </Button>
            </Paper>
          </Box>
        )}

        {/* Government Floating Action Button */}
        <Fab
          sx={{
            position: "absolute",
            bottom: 16,
            right: 16,
            backgroundColor: "#FFC107",
            color: "#000000",
            "&:hover": { backgroundColor: "#F57F17" },
          }}
          onClick={() => setShowLinemanList(!showLinemanList)}
        >
          <GroupIcon />
        </Fab>
      </Box>
    </Box>
  );
}
