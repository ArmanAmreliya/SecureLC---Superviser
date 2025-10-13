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
  completeRequest,
} from "../services/firestoreService";

export default function Dashboard({ user }) {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedRequest, setSelectedRequest] = useState(null);
  const [requests, setRequests] = useState([]);

  useEffect(() => {
    const unsubscribe = subscribeToRequests((data) => {
      const normalized = data.map((doc) => ({
        ...doc,
        createdAt: doc.createdAt?.toDate
          ? doc.createdAt.toDate()
          : doc.createdAt,
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
            <Typography
              variant="h4"
              sx={{ fontWeight: 700, color: "#000000", lineHeight: 1 }}
            >
              Supervisor Dashboard
            </Typography>
            <Typography
              variant="subtitle1"
              sx={{ color: "#424242", fontWeight: 500 }}
            >
              Government of India • Ministry of Power • Field Operations Center
            </Typography>
          </Box>
        </Stack>
      </Paper>

      {/* Summary Statistics */}
      <SummaryStats requests={requests} />

      {/* Request Management Table */}
      <RequestTable
        requests={requests}
        onRowClick={handleRowClick}
        onApprove={handleApprove}
        onDeny={handleDeny}
        onComplete={handleComplete}
        currentUser={user}
      />

      {/* Request Details Modal */}
      <RequestDetailsModal
        request={isModalOpen ? selectedRequest : null}
        onClose={handleCloseModal}
      />
    </Container>
  );
}
