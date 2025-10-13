// File: src/pages/AuditLog.jsx
import React, { useEffect, useState, useMemo } from "react";
import {
  Box,
  Container,
  Typography,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TablePagination,
  CircularProgress,
  Chip,
  Stack,
  Divider,
  useTheme,
  TextField,
  InputAdornment,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Button,
  Card,
  CardContent,
  Grid,
  Tooltip,
  IconButton,
  Menu,
  MenuList,
  ListItemIcon,
  ListItemText,
} from "@mui/material";
import {
  History as HistoryIcon,
  CheckCircle as CheckCircleIcon,
  Cancel as CancelIcon,
  Search as SearchIcon,
  FilterList as FilterIcon,
  GetApp as ExportIcon,
  Assessment as AnalyticsIcon,
  CalendarToday as CalendarIcon,
  Person as PersonIcon,
  Build as BuildIcon,
  MoreVert as MoreVertIcon,
  Refresh as RefreshIcon,
  AccountBalance as AccountBalanceIcon,
  Security as SecurityIcon,
  Engineering as EngineeringIcon,
} from "@mui/icons-material";
import { getHistoricalRequests } from "../services/firestoreService";

const sampleRecords = [
  {
    id: 1,
    substation: "Connaught Place",
    feeder: "Feeder A",
    faultType: "Transformer Failure",
    dateCompleted: "2025-10-12",
    finalStatus: "Completed",
    linemanId: "LC1001",
    supervisor: "Rajesh Kumar",
  },
  {
    id: 2,
    substation: "Karol Bagh",
    feeder: "Feeder B",
    faultType: "Line Fault",
    dateCompleted: "2025-10-11",
    finalStatus: "Denied",
    linemanId: "LC1002",
    supervisor: "Amit Sharma",
  },
  {
    id: 3,
    substation: "Lajpat Nagar",
    feeder: "Feeder C",
    faultType: "Voltage Issue",
    dateCompleted: "2025-10-10",
    finalStatus: "Completed",
    linemanId: "LC1003",
    supervisor: "Priya Singh",
  },
  {
    id: 4,
    substation: "Dwarka",
    feeder: "Feeder D",
    faultType: "Cable Cut",
    dateCompleted: "2025-10-09",
    finalStatus: "Completed",
    linemanId: "LC1004",
    supervisor: "Vikash Gupta",
  },
  {
    id: 5,
    substation: "Saket",
    feeder: "Feeder E",
    faultType: "Meter Fault",
    dateCompleted: "2025-10-08",
    finalStatus: "Denied",
    linemanId: "LC1005",
    supervisor: "Rajesh Kumar",
  },
  {
    id: 6,
    substation: "Rohini",
    feeder: "Feeder F",
    faultType: "Transformer Overload",
    dateCompleted: "2025-10-07",
    finalStatus: "Completed",
    linemanId: "LC1006",
    supervisor: "Priya Singh",
  },
  {
    id: 7,
    substation: "Janakpuri",
    feeder: "Feeder G",
    faultType: "Breaker Trip",
    dateCompleted: "2025-10-06",
    finalStatus: "Completed",
    linemanId: "LC1007",
    supervisor: "Amit Sharma",
  },
  {
    id: 8,
    substation: "Preet Vihar",
    feeder: "Feeder H",
    faultType: "Earth Fault",
    dateCompleted: "2025-10-05",
    finalStatus: "Denied",
    linemanId: "LC1008",
    supervisor: "Vikash Gupta",
  },
  {
    id: 9,
    substation: "Nehru Place",
    feeder: "Feeder I",
    faultType: "Insulator Damage",
    dateCompleted: "2025-10-04",
    finalStatus: "Completed",
    linemanId: "LC1009",
    supervisor: "Priya Singh",
  },
  {
    id: 10,
    substation: "Rajouri Garden",
    feeder: "Feeder J",
    faultType: "Switch Malfunction",
    dateCompleted: "2025-10-03",
    finalStatus: "Denied",
    linemanId: "LC1010",
    supervisor: "Rajesh Kumar",
  },
  {
    id: 11,
    substation: "Pitampura",
    feeder: "Feeder K",
    faultType: "Fuse Blown",
    dateCompleted: "2025-10-02",
    finalStatus: "Completed",
    linemanId: "LC1011",
    supervisor: "Amit Sharma",
  },
  {
    id: 12,
    substation: "Vasant Kunj",
    feeder: "Feeder L",
    faultType: "Overcurrent",
    dateCompleted: "2025-10-01",
    finalStatus: "Completed",
    linemanId: "LC1012",
    supervisor: "Vikash Gupta",
  },
  {
    id: 13,
    substation: "Greater Kailash",
    feeder: "Feeder M",
    faultType: "Relay Fault",
    dateCompleted: "2025-09-30",
    finalStatus: "Denied",
    linemanId: "LC1013",
    supervisor: "Priya Singh",
  },
  {
    id: 14,
    substation: "Malviya Nagar",
    feeder: "Feeder N",
    faultType: "Breaker Jam",
    dateCompleted: "2025-09-29",
    finalStatus: "Completed",
    linemanId: "LC1014",
    supervisor: "Rajesh Kumar",
  },
  {
    id: 15,
    substation: "Azadpur",
    feeder: "Feeder O",
    faultType: "Short Circuit",
    dateCompleted: "2025-09-28",
    finalStatus: "Denied",
    linemanId: "LC1015",
    supervisor: "Amit Sharma",
  },
];

export default function AuditLogPage() {
  const theme = useTheme();
  const [logs, setLogs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [dateFilter, setDateFilter] = useState("all");
  const [anchorEl, setAnchorEl] = useState(null);

  useEffect(() => {
    fetchLogs();
  }, []);

  const fetchLogs = async () => {
    setLoading(true);
    try {
      const historicalData = await getHistoricalRequests();
      if (historicalData && historicalData.length > 0) {
        setLogs(historicalData);
      } else {
        setLogs(sampleRecords);
      }
    } catch (error) {
      console.error("Failed to fetch audit logs:", error);
      setLogs(sampleRecords);
    } finally {
      setLoading(false);
    }
  };

  // Enhanced filtering logic
  const filteredLogs = useMemo(() => {
    return logs.filter((log) => {
      // Search filter
      const matchesSearch =
        log.substation?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        log.faultType?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        log.linemanId?.toLowerCase().includes(searchTerm.toLowerCase());

      // Status filter
      const matchesStatus =
        statusFilter === "all" || log.status === statusFilter;

      // Date filter
      let matchesDate = true;
      if (dateFilter !== "all") {
        const logDate = log.updatedAt?.toDate
          ? log.updatedAt.toDate()
          : new Date(log.updatedAt);
        const now = new Date();
        switch (dateFilter) {
          case "today":
            matchesDate = logDate.toDateString() === now.toDateString();
            break;
          case "week":
            const weekAgo = new Date(now.getTime() - 7 * 24 * 60 * 60 * 1000);
            matchesDate = logDate >= weekAgo;
            break;
          case "month":
            const monthAgo = new Date(now.getTime() - 30 * 24 * 60 * 60 * 1000);
            matchesDate = logDate >= monthAgo;
            break;
        }
      }

      return matchesSearch && matchesStatus && matchesDate;
    });
  }, [logs, searchTerm, statusFilter, dateFilter]);

  // Analytics calculations
  const analytics = useMemo(() => {
    const total = filteredLogs.length;
    const completed = filteredLogs.filter(
      (log) => log.status === "completed"
    ).length;
    const denied = filteredLogs.filter((log) => log.status === "denied").length;
    const completionRate =
      total > 0 ? ((completed / total) * 100).toFixed(1) : 0;

    return {
      total,
      completed,
      denied,
      completionRate,
    };
  }, [filteredLogs]);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const handleExportClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleExportClose = () => {
    setAnchorEl(null);
  };

  const exportToCSV = () => {
    const headers = [
      "Substation",
      "Fault Type",
      "Date Completed",
      "Status",
      "Lineman ID",
    ];
    const csvContent = [
      headers.join(","),
      ...filteredLogs.map((log) =>
        [
          log.substation,
          log.faultType,
          formatDate(log.updatedAt || log.createdAt),
          log.status,
          log.linemanId || "N/A",
        ].join(",")
      ),
    ].join("\n");

    const blob = new Blob([csvContent], { type: "text/csv" });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `audit_log_${new Date().toISOString().split("T")[0]}.csv`;
    a.click();
    handleExportClose();
  };
  const formatDate = (timestamp) => {
    if (!timestamp) return "N/A";
    const date = timestamp.toDate ? timestamp.toDate() : new Date(timestamp);
    return date.toLocaleString();
  };

  const StatusChip = ({ status }) => {
    // All statuses use the same yellow color, minimal style
    return (
      <Chip
        size="small"
        label={status?.toUpperCase() || "UNKNOWN"}
        icon={<CheckCircleIcon sx={{ fontSize: 16, color: '#000' }} />}
        sx={{
          bgcolor: '#FFC107',
          color: '#000',
          fontWeight: 700,
          fontSize: '0.75rem',
          px: 1.5,
        }}
      />
    );
  };

  const sampleRecords = [
    {
      id: 1,
      substation: "Connaught Place",
      feeder: "Feeder A",
      faultType: "Transformer Failure",
      dateCompleted: "2025-10-12",
      finalStatus: "Completed",
      linemanId: "LC1001",
    },
    {
      id: 2,
      substation: "Karol Bagh",
      feeder: "Feeder B",
      faultType: "Line Fault",
      dateCompleted: "2025-10-11",
      finalStatus: "Denied",
      linemanId: "LC1002",
    },
    {
      id: 3,
      substation: "Lajpat Nagar",
      feeder: "Feeder C",
      faultType: "Voltage Issue",
      dateCompleted: "2025-10-10",
      finalStatus: "Completed",
      linemanId: "LC1003",
    },
    {
      id: 4,
      substation: "Dwarka",
      feeder: "Feeder D",
      faultType: "Cable Cut",
      dateCompleted: "2025-10-09",
      finalStatus: "Completed",
      linemanId: "LC1004",
    },
    {
      id: 5,
      substation: "Saket",
      feeder: "Feeder E",
      faultType: "Meter Fault",
      dateCompleted: "2025-10-08",
      finalStatus: "Denied",
      linemanId: "LC1005",
    },
    {
      id: 6,
      substation: "Rohini",
      feeder: "Feeder F",
      faultType: "Transformer Overload",
      dateCompleted: "2025-10-07",
      finalStatus: "Completed",
      linemanId: "LC1006",
    },
  ];

  // Use filteredLogs for summary cards so they match the table
  const totalRecords = filteredLogs.length;
  const completedOps = filteredLogs.filter(
    (r) =>
      (r.finalStatus || r.status) === "Completed" ||
      (r.finalStatus || r.status) === "completed"
  ).length;
  const deniedOps = filteredLogs.filter(
    (r) =>
      (r.finalStatus || r.status) === "Denied" ||
      (r.finalStatus || r.status) === "denied"
  ).length;
  const complianceRate = totalRecords
    ? Math.round((completedOps / totalRecords) * 100)
    : 0;

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
        <Stack
          direction="row"
          alignItems="center"
          justifyContent="space-between"
        >
          <Stack direction="row" alignItems="center" spacing={2}>
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
                sx={{ fontWeight: 700, color: "#000000" }}
              >
                Compliance Audit Log
              </Typography>
              <Typography
                variant="subtitle1"
                sx={{ color: "#424242", fontWeight: 500 }}
              >
                Government of India • Ministry of Power • Regulatory Compliance
                Records
              </Typography>
            </Box>
          </Stack>

          <Stack direction="row" spacing={1}>
            <Tooltip title="Refresh Data">
              <IconButton
                onClick={fetchLogs}
                disabled={loading}
                sx={{
                  color: "#000000",
                  "&:hover": { backgroundColor: "#F5F5F5" },
                }}
              >
                <RefreshIcon />
              </IconButton>
            </Tooltip>
            <Button
              variant="outlined"
              startIcon={<ExportIcon />}
              onClick={handleExportClick}
              sx={{
                minWidth: 120,
                borderColor: "#000000",
                color: "#000000",
                "&:hover": {
                  backgroundColor: "#F5F5F5",
                  borderColor: "#000000",
                },
              }}
            >
              Export Records
            </Button>
          </Stack>
        </Stack>
      </Paper>

      {/* Government Analytics Dashboard */}
      <Grid container spacing={3} sx={{ mb: 4 }}>
        <Grid item xs={12} sm={6} md={3}>
          <Paper
            elevation={2}
            sx={{
              height: "100%",
              backgroundColor: "#FFFFFF",
              border: "2px solid #E0E0E0",
              borderRadius: 1,
            }}
          >
            <CardContent sx={{ textAlign: "center", py: 3 }}>
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
                  mx: "auto",
                  mb: 2,
                }}
              >
                <AnalyticsIcon sx={{ fontSize: 28, color: "#000000" }} />
              </Box>
              <Typography
                variant="h4"
                sx={{ fontWeight: 700, color: "#000000" }}
              >
                {totalRecords}
              </Typography>
              <Typography variant="body2" sx={{ color: "#424242" }}>
                Total Records
              </Typography>
            </CardContent>
          </Paper>
        </Grid>

        <Grid item xs={12} sm={6} md={3}>
          <Paper
            elevation={2}
            sx={{
              height: "100%",
              backgroundColor: "#FFFFFF",
              border: "2px solid #E0E0E0",
              borderRadius: 1,
            }}
          >
            <CardContent sx={{ textAlign: "center", py: 3 }}>
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
                  mx: "auto",
                  mb: 2,
                }}
              >
                <CheckCircleIcon sx={{ fontSize: 28, color: "#000000" }} />
              </Box>
              <Typography
                variant="h4"
                sx={{ fontWeight: 700, color: "#000000" }}
              >
                {completedOps}
              </Typography>
              <Typography variant="body2" sx={{ color: "#424242" }}>
                Completed Operations
              </Typography>
            </CardContent>
          </Paper>
        </Grid>

        <Grid item xs={12} sm={6} md={3}>
          <Paper
            elevation={2}
            sx={{
              height: "100%",
              backgroundColor: "#FFFFFF",
              border: "2px solid #E0E0E0",
              borderRadius: 1,
            }}
          >
            <CardContent sx={{ textAlign: "center", py: 3 }}>
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
                  mx: "auto",
                  mb: 2,
                }}
              >
                <CancelIcon sx={{ fontSize: 28, color: "#000000" }} />
              </Box>
              <Typography
                variant="h4"
                sx={{ fontWeight: 700, color: "#000000" }}
              >
                {deniedOps}
              </Typography>
              <Typography variant="body2" sx={{ color: "#424242" }}>
                Denied Requests
              </Typography>
            </CardContent>
          </Paper>
        </Grid>

        <Grid item xs={12} sm={6} md={3}>
          <Paper
            elevation={2}
            sx={{
              height: "100%",
              backgroundColor: "#FFFFFF",
              border: "2px solid #E0E0E0",
              borderRadius: 1,
            }}
          >
            <CardContent sx={{ textAlign: "center", py: 3 }}>
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
                  mx: "auto",
                  mb: 2,
                }}
              >
                <EngineeringIcon sx={{ fontSize: 28, color: "#000000" }} />
              </Box>
              <Typography
                variant="h4"
                sx={{ fontWeight: 700, color: "#000000" }}
              >
                {complianceRate}%
              </Typography>
              <Typography variant="body2" sx={{ color: "#424242" }}>
                Compliance Rate
              </Typography>
            </CardContent>
          </Paper>
        </Grid>
      </Grid>

      {/* Government Filters & Search */}
      <Paper
        elevation={2}
        sx={{
          p: 3,
          mb: 3,
          backgroundColor: "#FFFFFF",
          border: "2px solid #E0E0E0",
          borderRadius: 1,
        }}
      >
        <Stack direction="row" alignItems="center" spacing={2} sx={{ mb: 2 }}>
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
            <FilterIcon sx={{ color: "#000000" }} />
          </Box>
          <Typography variant="h6" sx={{ fontWeight: 600, color: "#000000" }}>
            Government Records Filter & Search
          </Typography>
        </Stack>

        <Grid container spacing={2}>
          <Grid item xs={12} sm={6} md={4}>
            <TextField
              fullWidth
              label="Search Records"
              variant="outlined"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <SearchIcon color="action" />
                  </InputAdornment>
                ),
              }}
              placeholder="Search by substation, fault type, or lineman..."
            />
          </Grid>

          <Grid item xs={12} sm={6} md={4}>
            <FormControl fullWidth>
              <InputLabel>Status Filter</InputLabel>
              <Select
                value={statusFilter}
                label="Status Filter"
                onChange={(e) => setStatusFilter(e.target.value)}
              >
                <MenuItem value="all">All Statuses</MenuItem>
                <MenuItem value="completed">Completed</MenuItem>
                <MenuItem value="denied">Denied</MenuItem>
              </Select>
            </FormControl>
          </Grid>

          <Grid item xs={12} sm={6} md={4}>
            <FormControl fullWidth>
              <InputLabel>Date Range</InputLabel>
              <Select
                value={dateFilter}
                label="Date Range"
                onChange={(e) => setDateFilter(e.target.value)}
              >
                <MenuItem value="all">All Time</MenuItem>
                <MenuItem value="today">Today</MenuItem>
                <MenuItem value="week">Last 7 Days</MenuItem>
                <MenuItem value="month">Last 30 Days</MenuItem>
              </Select>
            </FormControl>
          </Grid>
        </Grid>

        {(searchTerm || statusFilter !== "all" || dateFilter !== "all") && (
          <Box
            sx={{ mt: 2, p: 2, backgroundColor: "#FFC107", borderRadius: 1 }}
          >
            <Typography
              variant="body2"
              sx={{ color: "#000000", fontWeight: 600 }}
            >
              Showing {filteredLogs.length} of {logs.length} government records
              {searchTerm && ` matching "${searchTerm}"`}
            </Typography>
          </Box>
        )}
      </Paper>

      {/* Government Data Table */}
      <Paper
        elevation={4}
        sx={{
          width: "100%",
          overflow: "hidden",
          backgroundColor: "#FFFFFF",
          border: "2px solid #E0E0E0",
          borderRadius: 1,
        }}
      >
        <TableContainer>
          <Table stickyHeader aria-label="government audit log table">
            <TableHead>
              <TableRow sx={{ backgroundColor: "primary.main" }}>
                <TableCell
                  sx={{
                    color: "primary.contrastText",
                    fontWeight: 700,
                    borderBottom: "2px solid #E0E0E0",
                  }}
                >
                  <Stack direction="row" alignItems="center" spacing={1}>
                    <EngineeringIcon
                      fontSize="small"
                      sx={{ color: "#FFC107" }}
                    />
                    <span>Substation & Feeder</span>
                  </Stack>
                </TableCell>
                <TableCell
                  sx={{
                    color: "primary.contrastText",
                    fontWeight: 700,
                    borderBottom: `2px solid ${theme.palette.divider}`,
                  }}
                >
                  Fault Type
                </TableCell>
                <TableCell
                  sx={{
                    color: "primary.contrastText",
                    fontWeight: 700,
                    borderBottom: `2px solid ${theme.palette.divider}`,
                  }}
                >
                  <Stack direction="row" alignItems="center" spacing={1}>
                    <CalendarIcon fontSize="small" />
                    <span>Date Completed</span>
                  </Stack>
                </TableCell>
                <TableCell
                  sx={{
                    color: "primary.contrastText",
                    fontWeight: 700,
                    borderBottom: `2px solid ${theme.palette.divider}`,
                  }}
                >
                  Final Status
                </TableCell>
                <TableCell
                  sx={{
                    color: "primary.contrastText",
                    fontWeight: 700,
                    borderBottom: `2px solid ${theme.palette.divider}`,
                  }}
                >
                  <Stack direction="row" alignItems="center" spacing={1}>
                    <PersonIcon fontSize="small" />
                    <span>Lineman ID</span>
                  </Stack>
                </TableCell>
                <TableCell
                  sx={{
                    color: "primary.contrastText",
                    fontWeight: 700,
                    borderBottom: `2px solid ${theme.palette.divider}`,
                  }}
                >
                  Supervisor
                </TableCell>
                <TableCell
                  sx={{
                    color: "primary.contrastText",
                    fontWeight: 700,
                    borderBottom: `2px solid ${theme.palette.divider}`,
                    width: 50,
                  }}
                >
                  Actions
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {loading ? (
                <TableRow>
                  <TableCell colSpan={6} align="center" sx={{ py: 6 }}>
                    <Stack alignItems="center" spacing={2}>
                      <CircularProgress
                        sx={{ color: "primary.main" }}
                        size={40}
                      />
                      <Typography color="text.secondary" variant="h6">
                        Loading audit records...
                      </Typography>
                      <Typography color="text.secondary" variant="body2">
                        Fetching historical data from secure database
                      </Typography>
                    </Stack>
                  </TableCell>
                </TableRow>
              ) : filteredLogs.length === 0 ? null : (
                filteredLogs
                  .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                  .map((log, index) => (
                    <TableRow
                      hover
                      key={log.id}
                      sx={{
                        "&:hover": {
                          bgcolor: "action.hover",
                        },
                        bgcolor: index % 2 === 0 ? "transparent" : "grey.25",
                      }}
                    >
                      <TableCell sx={{ fontWeight: 500 }}>
                        <Typography variant="body2" sx={{ fontWeight: 600 }}>
                          {log.substation}
                        </Typography>
                        {log.feeder && (
                          <Typography variant="caption" color="text.secondary">
                            Feeder: {log.feeder}
                          </Typography>
                        )}
                      </TableCell>
                      <TableCell>
                        <Chip
                          label={log.faultType || "N/A"}
                          size="small"
                          variant="outlined"
                          sx={{
                            borderColor: "primary.main",
                            color: "primary.main",
                            fontWeight: 500,
                          }}
                        />
                      </TableCell>
                      <TableCell sx={{ color: "text.secondary" }}>
                        <Typography variant="body2">
                          {/* Show dateCompleted for sampleRecords, fallback to formatted timestamp for firestore */}
                          {log.dateCompleted ||
                            formatDate(log.updatedAt || log.createdAt) ||
                            "N/A"}
                        </Typography>
                      </TableCell>
                      <TableCell>
                        {/* Show finalStatus for sampleRecords, fallback to status for firestore */}
                        <StatusChip
                          status={log.finalStatus || log.status || "UNKNOWN"}
                        />
                      </TableCell>
                      <TableCell>
                        <Stack direction="row" alignItems="center" spacing={1}>
                          <PersonIcon fontSize="small" color="action" />
                          <Typography variant="body2" sx={{ fontWeight: 500 }}>
                            {log.linemanId || "N/A"}
                          </Typography>
                        </Stack>
                      </TableCell>
                      <TableCell>
                        <Typography variant="body2" sx={{ fontWeight: 500 }}>
                          {log.supervisor || "N/A"}
                        </Typography>
                      </TableCell>
                      <TableCell>
                        <Tooltip title="View Details">
                          <IconButton
                            size="small"
                            sx={{ color: "primary.main" }}
                          >
                            <MoreVertIcon fontSize="small" />
                          </IconButton>
                        </Tooltip>
                      </TableCell>
                    </TableRow>
                  ))
              )}
            </TableBody>
          </Table>
        </TableContainer>
        <TablePagination
          rowsPerPageOptions={[10, 25, 50, 100]}
          component="div"
          count={filteredLogs.length}
          rowsPerPage={rowsPerPage}
          page={page}
          onPageChange={handleChangePage}
          onRowsPerPageChange={handleChangeRowsPerPage}
          sx={{
            borderTop: `1px solid ${theme.palette.divider}`,
            bgcolor: "grey.50",
            "& .MuiTablePagination-selectLabel, & .MuiTablePagination-displayedRows":
              {
                fontWeight: 500,
              },
          }}
        />
      </Paper>

      {/* Export Menu */}
      <Menu
        anchorEl={anchorEl}
        open={Boolean(anchorEl)}
        onClose={handleExportClose}
        transformOrigin={{ horizontal: "right", vertical: "top" }}
        anchorOrigin={{ horizontal: "right", vertical: "bottom" }}
      >
        <MenuList>
          <MenuItem onClick={exportToCSV}>
            <ListItemIcon>
              <ExportIcon fontSize="small" />
            </ListItemIcon>
            <ListItemText primary="Export as CSV" />
          </MenuItem>
        </MenuList>
      </Menu>
    </Container>
  );
}
