import React from "react";
import {
  Box,
  Typography,
  Button,
  Paper,
  Stack,
  Alert,
  Divider,
  Card,
  CardContent,
} from "@mui/material";
import {
  Error as ErrorIcon,
  Refresh as RefreshIcon,
  BugReport as BugReportIcon,
  Home as HomeIcon,
} from "@mui/icons-material";

class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { 
      hasError: false, 
      error: null, 
      errorInfo: null,
      retryCount: 0 
    };
  }

  static getDerivedStateFromError(error) {
    // Update state so the next render will show the fallback UI
    return { hasError: true };
  }

  componentDidCatch(error, errorInfo) {
    // Log error details
    console.error("ErrorBoundary caught an error:", error, errorInfo);
    
    this.setState({
      error,
      errorInfo,
    });

    // In production, you might want to send this to an error reporting service
    if (process.env.NODE_ENV === "production") {
      // Example: sendErrorToService(error, errorInfo);
    }
  }

  handleRetry = () => {
    this.setState(prevState => ({
      hasError: false,
      error: null,
      errorInfo: null,
      retryCount: prevState.retryCount + 1,
    }));
  };

  handleGoHome = () => {
    window.location.href = "/";
  };

  render() {
    if (this.state.hasError) {
      const { error, errorInfo, retryCount } = this.state;
      const { fallback, showDetails = false } = this.props;

      // Custom fallback component
      if (fallback) {
        return fallback;
      }

      return (
        <Box
          sx={{
            minHeight: "100vh",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            p: 3,
            bgcolor: "grey.50",
          }}
        >
          <Paper
            elevation={8}
            sx={{
              maxWidth: 600,
              width: "100%",
              p: 4,
              borderRadius: 3,
              bgcolor: "background.paper",
            }}
          >
            <Stack spacing={3} alignItems="center" textAlign="center">
              {/* Error Icon */}
              <Box
                sx={{
                  width: 80,
                  height: 80,
                  borderRadius: "50%",
                  bgcolor: "error.main",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  color: "white",
                }}
              >
                <ErrorIcon sx={{ fontSize: 40 }} />
              </Box>

              {/* Error Title */}
              <Box>
                <Typography variant="h4" sx={{ fontWeight: 700, mb: 1 }}>
                  Oops! Something went wrong
                </Typography>
                <Typography variant="body1" color="text.secondary">
                  We encountered an unexpected error. Don't worry, your data is safe.
                </Typography>
              </Box>

              {/* Error Message */}
              {error && (
                <Alert 
                  severity="error" 
                  sx={{ width: "100%", textAlign: "left" }}
                  icon={<BugReportIcon />}
                >
                  <Typography variant="subtitle2" sx={{ fontWeight: 600 }}>
                    Error Details:
                  </Typography>
                  <Typography variant="body2" sx={{ mt: 1, fontFamily: "monospace" }}>
                    {error.message || "An unknown error occurred"}
                  </Typography>
                </Alert>
              )}

              {/* Retry Count */}
              {retryCount > 0 && (
                <Typography variant="caption" color="text.secondary">
                  Retry attempt: {retryCount}
                </Typography>
              )}

              {/* Action Buttons */}
              <Stack direction="row" spacing={2} sx={{ mt: 2 }}>
                <Button
                  variant="contained"
                  startIcon={<RefreshIcon />}
                  onClick={this.handleRetry}
                  size="large"
                  sx={{
                    bgcolor: "primary.main",
                    "&:hover": { bgcolor: "primary.dark" },
                  }}
                >
                  Try Again
                </Button>
                <Button
                  variant="outlined"
                  startIcon={<HomeIcon />}
                  onClick={this.handleGoHome}
                  size="large"
                >
                  Go Home
                </Button>
              </Stack>

              {/* Development Details */}
              {showDetails && errorInfo && (
                <>
                  <Divider sx={{ width: "100%", my: 2 }} />
                  <Card sx={{ width: "100%", bgcolor: "grey.100" }}>
                    <CardContent>
                      <Typography variant="h6" sx={{ fontWeight: 600, mb: 2 }}>
                        Technical Details (Development Only)
                      </Typography>
                      <Typography
                        variant="body2"
                        sx={{
                          fontFamily: "monospace",
                          fontSize: "0.75rem",
                          whiteSpace: "pre-wrap",
                          overflow: "auto",
                          maxHeight: 200,
                          bgcolor: "white",
                          p: 2,
                          borderRadius: 1,
                          border: "1px solid",
                          borderColor: "grey.300",
                        }}
                      >
                        {error && error.stack}
                        {errorInfo.componentStack}
                      </Typography>
                    </CardContent>
                  </Card>
                </>
              )}

              {/* Help Text */}
              <Typography variant="caption" color="text.secondary" sx={{ mt: 2 }}>
                If this problem persists, please contact your system administrator
                or try refreshing the page.
              </Typography>
            </Stack>
          </Paper>
        </Box>
      );
    }

    return this.props.children;
  }
}

export default ErrorBoundary;
