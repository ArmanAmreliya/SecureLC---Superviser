import React from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Chip,
  Typography,
  Box,
  useTheme,
} from "@mui/material";

function formatDate(d) {
  if (!d) return "-";
  try {
    const date = d?.toDate ? d.toDate() : new Date(d);
    return date.toLocaleString();
  } catch (e) {
    return "-";
  }
}

function statusColor(status) {
  switch (status) {
    case "approved":
      return "success";
    case "denied":
      return "default";
    case "pending":
    default:
      return "warning";
  }
}
export default function RequestTable({ requests = [], onRowClick }) {
  const theme = useTheme();

  return (
    <TableContainer component={Paper} elevation={3} sx={{ borderRadius: 2 }}>
      <Box
        p={2}
        sx={{ borderBottom: "1px solid", borderColor: theme.palette.divider }}
      >
        <Typography variant="h6" color="primary">
          Live Line Clear Requests
        </Typography>
      </Box>

      <Table sx={{ minWidth: 650 }} aria-label="live requests table">
        <TableHead>
          <TableRow sx={{ backgroundColor: theme.palette.grey[100] }}>
            <TableCell sx={{ fontWeight: "bold" }}>Request ID</TableCell>
            <TableCell sx={{ fontWeight: "bold" }}>
              Substation & Feeder
            </TableCell>
            <TableCell sx={{ fontWeight: "bold" }}>Fault Type</TableCell>
            <TableCell sx={{ fontWeight: "bold" }}>Submitted On</TableCell>
            <TableCell sx={{ fontWeight: "bold" }}>Status</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {requests.map((request) => (
            <TableRow
              key={request.id}
              hover
              onClick={() => onRowClick && onRowClick(request)}
              sx={{ cursor: onRowClick ? "pointer" : "default" }}
            >
              <TableCell component="th" scope="row">
                {request.id}
              </TableCell>
              <TableCell>
                <Typography variant="subtitle2" sx={{ fontWeight: "600" }}>
                  {request.substation}
                </Typography>
                {request.feeder && (
                  <Typography variant="caption" color="text.secondary">
                    {request.feeder}
                  </Typography>
                )}
              </TableCell>
              <TableCell>{request.faultType}</TableCell>
              <TableCell>{formatDate(request.createdAt)}</TableCell>
              <TableCell>
                <Chip
                  label={request.status}
                  color={statusColor(request.status)}
                />
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
