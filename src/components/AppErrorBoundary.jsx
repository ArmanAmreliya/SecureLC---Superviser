import React from "react";
import { Box, Typography, Button, Stack } from "@mui/material";
import { Security as SecurityIcon, Refresh as RefreshIcon } from "@mui/icons-material";
import ErrorBoundary from "./ErrorBoundary";

// Custom fallback for app-level errors
const AppErrorFallback = ({ error, retry }) => (
  <Box
    sx={{
      minHeight: "100vh",
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      justifyContent: "center",
      p: 3,
      bgcolor: "grey.50",
    }}
  >
    <Stack spacing={4} alignItems="center" textAlign="center" maxWidth={500}>
      {/* SecureLC Logo */}
      <Box
        sx={{
          width: 100,
          height: 100,
          borderRadius: 3,
          background: "linear-gradient(135deg, #FFC107 0%, #FF8F00 100%)",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          color: "#000",
          boxShadow: "0 8px 32px rgba(255, 193, 7, 0.3)",
        }}
      >
        <SecurityIcon sx={{ fontSize: 50, fontWeight: 900 }} />
      </Box>

      {/* Error Message */}
      <Box>
        <Typography variant="h4" sx={{ fontWeight: 800, mb: 2, color: "text.primary" }}>
          SecureLC System Error
        </Typography>
        <Typography variant="h6" sx={{ color: "text.secondary", mb: 2 }}>
          We're experiencing technical difficulties
        </Typography>
        <Typography variant="body1" color="text.secondary">
          The SecureLC Supervisor system encountered an unexpected error. 
          Our team has been notified and is working to resolve this issue.
        </Typography>
      </Box>

      {/* Action Buttons */}
      <Stack direction="row" spacing={2}>
        <Button
          variant="contained"
          size="large"
          startIcon={<RefreshIcon />}
          onClick={retry}
          sx={{
            background: "linear-gradient(135deg, #FFC107 0%, #FF8F00 100%)",
            color: "#000",
            fontWeight: 700,
            px: 4,
            py: 1.5,
            "&:hover": {
              background: "linear-gradient(135deg, #FF8F00 0%, #F57C00 100%)",
            },
          }}
        >
          Retry System
        </Button>
      </Stack>

      {/* Status Info */}
      <Box sx={{ textAlign: "center" }}>
        <Typography variant="caption" color="text.secondary">
          Error ID: {error?.message?.substring(0, 8) || "UNKNOWN"}
        </Typography>
        <br />
        <Typography variant="caption" color="text.secondary">
          Time: {new Date().toLocaleString()}
        </Typography>
      </Box>
    </Stack>
  </Box>
);

export default function AppErrorBoundary({ children }) {
  return (
    <ErrorBoundary
      fallback={(error, retry) => <AppErrorFallback error={error} retry={retry} />}
      showDetails={process.env.NODE_ENV === "development"}
    >
      {children}
    </ErrorBoundary>
  );
}
