import React, { useState } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TablePagination,
  Paper,
  Chip,
  Typography,
  Box,
  Stack,
  IconButton,
  Tooltip,
  Avatar,
  useTheme,
  InputAdornment,
  TextField,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
} from "@mui/material";
import {
  CheckCircle as CheckCircleIcon,
  PauseCircleOutline as PauseCircleOutlineIcon,
  Cancel as CancelIcon,
  History as HistoryIcon,
  Search as SearchIcon,
  FilterList as FilterListIcon,
  Visibility as VisibilityIcon,
  Assignment as AssignmentIcon,
  Schedule as ScheduleIcon,
  ThumbUp as ThumbUpIcon,
  ThumbDown as ThumbDownIcon,
  Done as DoneIcon,
} from "@mui/icons-material";
import ActionDialog from "./ActionDialog";

function formatDate(d) {
  if (!d) return "-";
  try {
    const date = d?.toDate ? d.toDate() : new Date(d);
    return (
      date.toLocaleDateString() +
      " " +
      date.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })
    );
  } catch (e) {
    return "-";
  }
}

function renderStatus(status, theme) {
  switch (status) {
    case "approved":
      return (
        <Chip
          label="Approved"
          icon={<CheckCircleIcon />}
          sx={{
            backgroundColor: theme.palette.primary.main,
            color: "#000000",
            fontWeight: 700,
            fontSize: "0.75rem",
            height: 28,
            "& .MuiChip-icon": {
              color: "#000000",
              fontSize: 16,
            },
          }}
        />
      );
    case "pending":
      return (
        <Chip
          label="Pending"
          icon={<PauseCircleOutlineIcon />}
          variant="outlined"
          sx={{
            borderColor: theme.palette.primary.main,
            color: theme.palette.primary.main,
            fontWeight: 700,
            fontSize: "0.75rem",
            height: 28,
            "& .MuiChip-icon": {
              color: theme.palette.primary.main,
              fontSize: 16,
            },
          }}
        />
      );
    case "denied":
      return (
        <Chip
          label="Denied"
          icon={<CancelIcon />}
          sx={{
            backgroundColor: "rgba(117, 117, 117, 0.1)",
            color: "#757575",
            fontWeight: 600,
            fontSize: "0.75rem",
            height: 28,
            "& .MuiChip-icon": {
              color: "#757575",
              fontSize: 16,
            },
          }}
        />
      );
    case "completed":
      return (
        <Chip
          label="Completed"
          icon={<HistoryIcon />}
          sx={{
            backgroundColor: "rgba(76, 175, 80, 0.1)",
            color: "#4CAF50",
            fontWeight: 600,
            fontSize: "0.75rem",
            height: 28,
            "& .MuiChip-icon": {
              color: "#4CAF50",
              fontSize: 16,
            },
          }}
        />
      );
    default:
      return (
        <Chip
          label="Unknown"
          sx={{
            backgroundColor: "rgba(158, 158, 158, 0.1)",
            color: "#9e9e9e",
            fontWeight: 600,
            fontSize: "0.75rem",
            height: 28,
          }}
        />
      );
  }
}

export default function RequestTable({
  requests = [],
  onRowClick,
  onApprove,
  onDeny,
  onComplete,
  currentUser = null,
}) {
  const theme = useTheme();
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [actionDialog, setActionDialog] = useState({
    open: false,
    action: null,
    request: null,
  });

  // Filter and search logic
  const filteredRequests = requests.filter((request) => {
    const matchesSearch =
      request.id?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      request.substation?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      request.faultType?.toLowerCase().includes(searchTerm.toLowerCase());

    const matchesStatus =
      statusFilter === "all" || request.status === statusFilter;

    return matchesSearch && matchesStatus;
  });

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const handleActionClick = (request, action) => {
    setActionDialog({ open: true, action, request });
  };

  const handleActionConfirm = async (requestId, notes) => {
    const supervisorId = currentUser?.email || "unknown";

    try {
      switch (actionDialog.action) {
        case "approve":
          await onApprove?.(requestId, supervisorId, notes);
          break;
        case "deny":
          await onDeny?.(requestId, supervisorId, notes);
          break;
        case "complete":
          await onComplete?.(requestId, supervisorId, notes);
          break;
        default:
          throw new Error("Unknown action");
      }
    } catch (error) {
      throw error; // Re-throw to be handled by ActionDialog
    }
  };

  const handleActionDialogClose = () => {
    setActionDialog({ open: false, action: null, request: null });
  };

  const getPriorityColor = (request) => {
    if (request.faultType?.toLowerCase().includes("emergency"))
      return "#f44336";
    if (request.faultType?.toLowerCase().includes("urgent")) return "#ff9800";
    return "transparent";
  };

  return (
    <Paper
      elevation={4}
      sx={{
        borderRadius: 3,
        overflow: "hidden",
        border: `1px solid ${theme.palette.divider}`,
        background: "linear-gradient(135deg, #ffffff 0%, #fafafa 100%)",
      }}
    >
      {/* Enhanced Header */}
      <Box
        sx={{
          p: 3,
          backgroundColor: theme.palette.primary.main,
          color: theme.palette.primary.contrastText,
          position: "relative",
        }}
      >
        <Stack direction="row" alignItems="center" spacing={2} sx={{ mb: 2 }}>
          <AssignmentIcon sx={{ fontSize: 32 }} />
          <Box sx={{ flex: 1 }}>
            <Typography
              variant="h5"
              sx={{
                fontWeight: 800,
                fontSize: "1.5rem",
                letterSpacing: "-0.5px",
              }}
            >
              Live Line Clear Requests
            </Typography>
            <Typography
              variant="body2"
              sx={{
                opacity: 0.8,
                fontWeight: 500,
              }}
            >
              Real-time monitoring and management system •{" "}
              {filteredRequests.length} requests
            </Typography>
          </Box>
          <ScheduleIcon sx={{ fontSize: 24, opacity: 0.8 }} />
        </Stack>

        {/* Search and Filter Controls */}
        <Stack direction={{ xs: "column", sm: "row" }} spacing={2}>
          <TextField
            placeholder="Search requests..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            size="small"
            sx={{
              minWidth: 250,
              "& .MuiOutlinedInput-root": {
                backgroundColor: "rgba(255,255,255,0.15)",
                "& fieldset": { borderColor: "rgba(0,0,0,0.3)" },
                "&:hover fieldset": { borderColor: "rgba(0,0,0,0.5)" },
                "&.Mui-focused fieldset": { borderColor: "rgba(0,0,0,0.7)" },
              },
              "& .MuiInputBase-input": { color: "#000" },
              "& .MuiInputBase-input::placeholder": {
                color: "rgba(0,0,0,0.6)",
              },
            }}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <SearchIcon sx={{ color: "rgba(0,0,0,0.6)" }} />
                </InputAdornment>
              ),
            }}
          />

          <FormControl size="small" sx={{ minWidth: 150 }}>
            <InputLabel sx={{ color: "rgba(0,0,0,0.7)" }}>
              Status Filter
            </InputLabel>
            <Select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              label="Status Filter"
              sx={{
                backgroundColor: "rgba(255,255,255,0.15)",
                "& .MuiOutlinedInput-notchedOutline": {
                  borderColor: "rgba(0,0,0,0.3)",
                },
                "&:hover .MuiOutlinedInput-notchedOutline": {
                  borderColor: "rgba(0,0,0,0.5)",
                },
                "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
                  borderColor: "rgba(0,0,0,0.7)",
                },
                "& .MuiSelect-select": { color: "#000" },
              }}
            >
              <MenuItem value="all">All Status</MenuItem>
              <MenuItem value="pending">Pending</MenuItem>
              <MenuItem value="approved">Approved</MenuItem>
              <MenuItem value="completed">Completed</MenuItem>
              <MenuItem value="denied">Denied</MenuItem>
            </Select>
          </FormControl>
        </Stack>
      </Box>

      {/* Enhanced Table */}
      <TableContainer>
        <Table sx={{ minWidth: 650 }} aria-label="enhanced requests table">
          <TableHead>
            <TableRow sx={{ backgroundColor: theme.palette.primary.light }}>
              <TableCell
                sx={{
                  fontWeight: 700,
                  color: theme.palette.primary.contrastText,
                  borderBottom: `2px solid ${theme.palette.primary.main}`,
                }}
              >
                Request Details
              </TableCell>
              <TableCell
                sx={{
                  fontWeight: 700,
                  color: theme.palette.primary.contrastText,
                  borderBottom: `2px solid ${theme.palette.primary.main}`,
                }}
              >
                Location & Type
              </TableCell>
              <TableCell
                sx={{
                  fontWeight: 700,
                  color: theme.palette.primary.contrastText,
                  borderBottom: `2px solid ${theme.palette.primary.main}`,
                }}
              >
                Submitted
              </TableCell>
              <TableCell
                sx={{
                  fontWeight: 700,
                  color: theme.palette.primary.contrastText,
                  borderBottom: `2px solid ${theme.palette.primary.main}`,
                }}
              >
                Status
              </TableCell>
              <TableCell
                sx={{
                  fontWeight: 700,
                  color: theme.palette.primary.contrastText,
                  borderBottom: `2px solid ${theme.palette.primary.main}`,
                  textAlign: "center",
                }}
              >
                Actions
              </TableCell>
              <TableCell
                sx={{
                  fontWeight: 700,
                  color: theme.palette.primary.contrastText,
                  borderBottom: `2px solid ${theme.palette.primary.main}`,
                  textAlign: "center",
                  width: 120,
                }}
              >
                Supervisor
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {filteredRequests
              .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
              .map((request, index) => (
                <TableRow
                  key={request.id}
                  sx={{
                    cursor: onRowClick ? "pointer" : "default",
                    transition: "all 0.2s ease",
                    borderLeft: `4px solid ${getPriorityColor(request)}`,
                    "&:hover": {
                      backgroundColor: "rgba(255, 193, 7, 0.08)",
                      transform: "translateX(2px)",
                    },
                    "&:nth-of-type(even)": {
                      backgroundColor: "rgba(0, 0, 0, 0.02)",
                    },
                  }}
                >
                  <TableCell>
                    <Stack direction="row" alignItems="center" spacing={2}>
                      <Avatar
                        sx={{
                          width: 40,
                          height: 40,
                          backgroundColor: theme.palette.primary.main,
                          color: "#000",
                          fontWeight: 700,
                          fontSize: "0.9rem",
                        }}
                      >
                        {(index + 1).toString().padStart(2, "0")}
                      </Avatar>
                      <Box>
                        <Typography
                          variant="subtitle1"
                          sx={{
                            fontWeight: 700,
                            color: "text.primary",
                            fontSize: "0.95rem",
                          }}
                        >
                          Request #{request.id?.substring(0, 8)}
                        </Typography>
                        <Typography
                          variant="caption"
                          sx={{
                            color: "text.secondary",
                            fontFamily: "monospace",
                            backgroundColor: "rgba(0,0,0,0.05)",
                            px: 1,
                            py: 0.25,
                            borderRadius: 0.5,
                          }}
                        >
                          {request.id}
                        </Typography>
                      </Box>
                    </Stack>
                  </TableCell>

                  <TableCell>
                    <Box>
                      <Typography
                        variant="subtitle2"
                        sx={{ fontWeight: 700, color: "text.primary", mb: 0.5 }}
                      >
                        {request.substation}
                      </Typography>
                      <Chip
                        label={request.faultType}
                        size="small"
                        variant="outlined"
                        sx={{
                          borderColor: theme.palette.primary.main,
                          color: theme.palette.primary.main,
                          fontSize: "0.7rem",
                          height: 22,
                          fontWeight: 600,
                        }}
                      />
                      {request.feeder && (
                        <Typography
                          variant="caption"
                          sx={{
                            color: "text.secondary",
                            display: "block",
                            mt: 0.5,
                            fontWeight: 500,
                          }}
                        >
                          Feeder: {request.feeder}
                        </Typography>
                      )}
                    </Box>
                  </TableCell>

                  <TableCell>
                    <Typography
                      variant="body2"
                      sx={{
                        fontFamily: "monospace",
                        fontWeight: 600,
                        color: "text.primary",
                      }}
                    >
                      {formatDate(request.createdAt)}
                    </Typography>
                  </TableCell>

                  <TableCell>{renderStatus(request.status, theme)}</TableCell>

                  <TableCell align="center">
                    <Tooltip title="View Details">
                      <IconButton
                        size="small"
                        onClick={(e) => {
                          e.stopPropagation();
                          onRowClick && onRowClick(request);
                        }}
                        sx={{
                          color: theme.palette.primary.main,
                          "&:hover": {
                            backgroundColor: "rgba(255, 193, 7, 0.1)",
                          },
                        }}
                      >
                        <VisibilityIcon fontSize="small" />
                      </IconButton>
                    </Tooltip>
                  </TableCell>

                  <TableCell align="center">
                    <Stack direction="row" spacing={1} justifyContent="center">
                      {request.status === "pending" && (
                        <>
                          <Tooltip title="Approve">
                            <IconButton
                              size="small"
                              onClick={(e) => {
                                e.stopPropagation();
                                handleActionClick(request, "approve");
                              }}
                              sx={{ color: theme.palette.success.main }}
                            >
                              <CheckCircleIcon fontSize="small" />
                            </IconButton>
                          </Tooltip>
                          <Tooltip title="Deny">
                            <IconButton
                              size="small"
                              onClick={(e) => {
                                e.stopPropagation();
                                handleActionClick(request, "deny");
                              }}
                              sx={{ color: theme.palette.error.main }}
                            >
                              <CancelIcon fontSize="small" />
                            </IconButton>
                          </Tooltip>
                        </>
                      )}
                      {request.status === "approved" && (
                        <Tooltip title="Complete">
                          <IconButton
                            size="small"
                            onClick={(e) => {
                              e.stopPropagation();
                              handleActionClick(request, "complete");
                            }}
                            sx={{ color: theme.palette.info.main }}
                          >
                            <DoneIcon fontSize="small" />
                          </IconButton>
                        </Tooltip>
                      )}
                      {(request.status === "completed" ||
                        request.status === "denied") && (
                        <CheckCircleIcon
                          fontSize="small"
                          sx={{ color: theme.palette.grey[500] }}
                        />
                      )}
                    </Stack>
                  </TableCell>
                </TableRow>
              ))}
          </TableBody>
        </Table>
      </TableContainer>

      {/* Enhanced Pagination */}
      <Box
        sx={{
          borderTop: `1px solid ${theme.palette.divider}`,
          backgroundColor: "rgba(0,0,0,0.02)",
        }}
      >
        <TablePagination
          component="div"
          count={filteredRequests.length}
          page={page}
          onPageChange={handleChangePage}
          rowsPerPage={rowsPerPage}
          onRowsPerPageChange={handleChangeRowsPerPage}
          rowsPerPageOptions={[5, 10, 25, 50]}
          sx={{
            "& .MuiTablePagination-toolbar": {
              px: 3,
            },
            "& .MuiTablePagination-selectLabel, & .MuiTablePagination-displayedRows":
              {
                fontWeight: 600,
              },
          }}
        />
      </Box>

      {/* Action Dialog */}
      <ActionDialog
        open={actionDialog.open}
        onClose={handleActionDialogClose}
        request={actionDialog.request}
        action={actionDialog.action}
        onConfirm={handleActionConfirm}
      />
    </Paper>
  );
}
