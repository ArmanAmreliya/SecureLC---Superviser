import React, { useEffect, useState } from "react";
import {
  Box,
  Container,
  Typography,
  Paper,
  Grid,
  Card,
  CardContent,
  Chip,
  Alert,
  CircularProgress,
  Stack,
  Divider,
  Avatar,
  List,
  ListItem,
  ListItemText,
  ListItemIcon,
  Button,
  IconButton,
  Tooltip,
} from "@mui/material";
import {
  Warning as WarningIcon,
  CheckCircle as CheckCircleIcon,
  Schedule as ScheduleIcon,
  Assignment as AssignmentIcon,
  TrendingUp as TrendingUpIcon,
  Refresh as RefreshIcon,
  FilterList as FilterListIcon,
  Download as DownloadIcon,
  Assessment as AssessmentIcon,
  Security as SecurityIcon,
  Timeline as TimelineIcon,
  Group as GroupIcon,
  AccountBalance as AccountBalanceIcon,
  Engineering as EngineeringIcon,
  Build as BuildIcon,
  Public as PublicIcon,
} from "@mui/icons-material";
import RequestTable from "../components/RequestTable";
import RequestDetailsModal from "../components/RequestDetailsModal";
import SummaryStats from "../components/SummaryStats";
import { 
  subscribeToRequests, 
  approveRequest, 
  denyRequest, 
  completeRequest 
} from "../services/firestoreService";

export default function Dashboard({ user }) {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedRequest, setSelectedRequest] = useState(null);
  const [requests, setRequests] = useState([]);

  useEffect(() => {
    const unsubscribe = subscribeToRequests((data) => {
      const normalized = data.map((doc) => ({
        ...doc,
        createdAt: doc.createdAt?.toDate ? doc.createdAt.toDate() : doc.createdAt,
      }));
      setRequests(normalized);
    });
    return () => {
      if (typeof unsubscribe === "function") unsubscribe();
    };
  }, []);

  const handleRowClick = (request) => {
    setSelectedRequest(request);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setSelectedRequest(null);
  };

  // Action handlers
  const handleApprove = async (requestId, supervisorId, notes) => {
    await approveRequest(requestId, supervisorId, notes);
  };

  const handleDeny = async (requestId, supervisorId, notes) => {
    await denyRequest(requestId, supervisorId, notes);
  };

  const handleComplete = async (requestId, supervisorId, notes) => {
    await completeRequest(requestId, supervisorId, notes);
  };

  return (
    <Container maxWidth="xl" sx={{ py: 3 }}>
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
            <AccountBalanceIcon sx={{ fontSize: 28, color: "#000000" }} />
          </Box>
    <Box>
            <Typography variant="h4" sx={{ fontWeight: 700, color: "#000000", lineHeight: 1 }}>
              Supervisor Dashboard
            </Typography>
            <Typography variant="subtitle1" sx={{ color: "#424242", fontWeight: 500 }}>
              Government of India • Ministry of Power • Field Operations Center
            </Typography>
          </Box>
        </Stack>

        <Divider sx={{ borderColor: "#E0E0E0", mb: 2 }} />

        <Grid container spacing={2}>
          <Grid item xs={12} md={8}>
            <Typography variant="h6" sx={{ fontWeight: 600, color: "#000000", mb: 1 }}>
              System Status
            </Typography>
            <Stack direction="row" spacing={2}>
              <Chip
                icon={<SecurityIcon />}
                label="System Active"
                sx={{
                  backgroundColor: "#FFC107",
                  color: "#000000",
                  fontWeight: 600,
                }}
              />
              <Chip
                icon={<CheckCircleIcon />}
                label="All Systems Operational"
                sx={{
                  backgroundColor: "#000000",
                  color: "#FFFFFF",
                  fontWeight: 600,
                }}
              />
            </Stack>
          </Grid>
          <Grid item xs={12} md={4}>
            <Typography variant="h6" sx={{ fontWeight: 600, color: "#000000", mb: 1 }}>
              Current Time
            </Typography>
            <Typography variant="body1" sx={{ fontFamily: "monospace", fontWeight: 600 }}>
              {new Date().toLocaleString("en-IN", {
                weekday: "long",
                year: "numeric",
                month: "long",
                day: "numeric",
                hour: "2-digit",
                minute: "2-digit",
                second: "2-digit",
                hour12: true,
              })}
            </Typography>
          </Grid>
        </Grid>
      </Paper>

      {/* Summary Statistics */}
      <SummaryStats requests={requests} />

      {/* Operations Overview */}
      <Grid container spacing={3} sx={{ mb: 3 }}>
        <Grid item xs={12} md={6}>
          <Paper
            elevation={2}
            sx={{
              p: 3,
              backgroundColor: "#FFFFFF",
              border: "2px solid #E0E0E0",
              borderRadius: 1,
            }}
          >
            <Typography variant="h6" sx={{ fontWeight: 600, color: "#000000", mb: 2 }}>
              Field Operations Overview
            </Typography>
            <List dense>
              <ListItem sx={{ px: 0 }}>
                <ListItemIcon>
                  <EngineeringIcon sx={{ color: "#FFC107", fontSize: 20 }} />
                </ListItemIcon>
                <ListItemText
                  primary="Active Field Teams"
                  secondary="Real-time monitoring of lineman operations"
                  primaryTypographyProps={{ fontWeight: 600, fontSize: "0.9rem" }}
                  secondaryTypographyProps={{ fontSize: "0.8rem" }}
                />
              </ListItem>
              <ListItem sx={{ px: 0 }}>
                <ListItemIcon>
                  <BuildIcon sx={{ color: "#FFC107", fontSize: 20 }} />
                </ListItemIcon>
                <ListItemText
                  primary="Equipment Status"
                  secondary="All safety equipment operational"
                  primaryTypographyProps={{ fontWeight: 600, fontSize: "0.9rem" }}
                  secondaryTypographyProps={{ fontSize: "0.8rem" }}
                />
              </ListItem>
              <ListItem sx={{ px: 0 }}>
                <ListItemIcon>
                  <PublicIcon sx={{ color: "#FFC107", fontSize: 20 }} />
                </ListItemIcon>
                <ListItemText
                  primary="Coverage Area"
                  secondary="National electrical grid monitoring"
                  primaryTypographyProps={{ fontWeight: 600, fontSize: "0.9rem" }}
                  secondaryTypographyProps={{ fontSize: "0.8rem" }}
                />
              </ListItem>
            </List>
          </Paper>
        </Grid>

        <Grid item xs={12} md={6}>
          <Paper
            elevation={2}
            sx={{
              p: 3,
              backgroundColor: "#FFFFFF",
              border: "2px solid #E0E0E0",
              borderRadius: 1,
            }}
          >
            <Typography variant="h6" sx={{ fontWeight: 600, color: "#000000", mb: 2 }}>
              Compliance Status
            </Typography>
            <Stack spacing={2}>
              <Box sx={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
                <Typography variant="body2" sx={{ fontWeight: 500 }}>
                  Safety Protocols
                </Typography>
                <Chip
                  label="COMPLIANT"
                  size="small"
                  sx={{
                    backgroundColor: "#FFC107",
                    color: "#000000",
                    fontWeight: 600,
                    fontSize: "0.7rem",
                  }}
                />
              </Box>
              <Box sx={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
                <Typography variant="body2" sx={{ fontWeight: 500 }}>
                  Documentation
                </Typography>
                <Chip
                  label="UP TO DATE"
                  size="small"
                  sx={{
                    backgroundColor: "#FFC107",
                    color: "#000000",
                    fontWeight: 600,
                    fontSize: "0.7rem",
                  }}
                />
              </Box>
              <Box sx={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
                <Typography variant="body2" sx={{ fontWeight: 500 }}>
                  Audit Trail
                </Typography>
                <Chip
                  label="COMPLETE"
                  size="small"
                  sx={{
                    backgroundColor: "#FFC107",
                    color: "#000000",
                    fontWeight: 600,
                    fontSize: "0.7rem",
                  }}
                />
              </Box>
            </Stack>
          </Paper>
        </Grid>
      </Grid>

      {/* Request Management Table */}
      <Paper
        elevation={2}
        sx={{
          backgroundColor: "#FFFFFF",
          border: "2px solid #E0E0E0",
          borderRadius: 1,
        }}
      >
        <Box sx={{ p: 3, borderBottom: "2px solid #E0E0E0" }}>
          <Typography variant="h6" sx={{ fontWeight: 600, color: "#000000" }}>
            Line Clearance Request Management
          </Typography>
          <Typography variant="body2" sx={{ color: "#424242", mt: 1 }}>
            Review and manage electrical line clearance requests from field teams
          </Typography>
        </Box>
        
        <RequestTable 
          requests={requests} 
          onRowClick={handleRowClick}
          onApprove={handleApprove}
          onDeny={handleDeny}
          onComplete={handleComplete}
          currentUser={user}
        />
      </Paper>

      {/* Request Details Modal */}
      <RequestDetailsModal
        request={isModalOpen ? selectedRequest : null}
        onClose={handleCloseModal}
      />
    </Container>
  );
}
