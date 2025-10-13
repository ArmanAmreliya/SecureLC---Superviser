import React from "react";
import {
  AppBar,
  Toolbar,
  Box,
  Button,
  Container,
  Typography,
  Grid,
  Card,
  CardContent,
  IconButton,
  Stack,
  Divider,
  Link,
  Chip,
  Paper,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
} from "@mui/material";
import { Link as RouterLink } from "react-router-dom";
import { useTheme } from "@mui/material/styles";
import {
  Security as SecurityIcon,
  Assignment as AssignmentIcon,
  Timeline as TimelineIcon,
  Assessment as AssessmentIcon,
  Menu as MenuIcon,
  ArrowForward as ArrowForwardIcon,
  CheckCircle as CheckCircleIcon,
  Phone as PhoneIcon,
  Email as EmailIcon,
  LocationOn as LocationOnIcon,
  Public as PublicIcon,
  AccountBalance as AccountBalanceIcon,
  Engineering as EngineeringIcon,
  Build as BuildIcon,
  Warning as WarningIcon,
  Info as InfoIcon,
} from "@mui/icons-material";

export default function LandingPage() {
  const theme = useTheme();

  return (
    <Box sx={{ minHeight: "100vh", backgroundColor: "#FFFFFF" }}>
      {/* Government Header */}
      <AppBar
        position="static"
        elevation={0}
        sx={{
          backgroundColor: "#000000",
          borderBottom: "4px solid #FFC107",
        }}
      >
        <Container maxWidth="lg">
          <Toolbar disableGutters sx={{ py: 2 }}>
            <Stack direction="row" alignItems="center" spacing={2} sx={{ flexGrow: 1 }}>
              <Box
                sx={{
                  width: 60,
                  height: 60,
                  backgroundColor: "#FFC107",
                  borderRadius: 1,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  border: "2px solid #000000",
                }}
              >
                <SecurityIcon sx={{ fontSize: 32, color: "#000000" }} />
              </Box>
              <Box>
                <Typography variant="h4" sx={{ fontWeight: 700, color: "#FFFFFF", lineHeight: 1 }}>
                  Government of India
                </Typography>
                <Typography variant="h6" sx={{ fontWeight: 600, color: "#FFC107", lineHeight: 1 }}>
                  Lineman Management System
                </Typography>
                <Typography variant="body2" sx={{ color: "#FFFFFF", opacity: 0.8 }}>
                  Ministry of Power • Department of Electrical Safety
                </Typography>
              </Box>
            </Stack>

            <Stack direction="row" spacing={2}>
              <Button
                component={RouterLink}
                to="/login"
                variant="outlined"
                sx={{
                  borderColor: "#FFC107",
                  color: "#FFC107",
                  fontWeight: 600,
                  px: 3,
                  "&:hover": {
                    backgroundColor: "#FFC107",
                    color: "#000000",
                    borderColor: "#FFC107",
                  },
                }}
              >
                Supervisor Login
              </Button>
              <Button
                component={RouterLink}
                to="/register"
                variant="contained"
                sx={{
                  backgroundColor: "#FFC107",
                  color: "#000000",
                  fontWeight: 600,
                  px: 3,
                  "&:hover": {
                    backgroundColor: "#F57F17",
                  },
                }}
              >
                Register
              </Button>
            </Stack>
          </Toolbar>
        </Container>
      </AppBar>

      {/* Hero Section */}
      <Box
        component="section"
        sx={{
          backgroundColor: "#F5F5F5",
          py: { xs: 6, md: 10 },
          borderBottom: "2px solid #E0E0E0",
        }}
      >
        <Container maxWidth="lg">
          <Grid container spacing={6} alignItems="center">
            <Grid item xs={12} md={8}>
              <Typography
                variant="h2"
                component="h1"
                gutterBottom
                sx={{
                  fontWeight: 700,
                  color: "#000000",
                  mb: 3,
                  fontSize: { xs: "2rem", md: "3rem" },
                }}
              >
                Centralized Lineman Management System
              </Typography>

              <Typography
                variant="h5"
                sx={{
                  color: "#424242",
                  mb: 4,
                  maxWidth: { md: "90%" },
                  fontWeight: 400,
                  lineHeight: 1.6,
                }}
              >
                Official government platform for managing electrical line clearance operations, 
                ensuring field safety, and maintaining comprehensive audit trails for regulatory compliance.
              </Typography>

              <Stack direction={{ xs: "column", sm: "row" }} spacing={2}>
                <Button
                  component={RouterLink}
                  to="/login"
                  variant="contained"
                  size="large"
                  sx={{
                    backgroundColor: "#FFC107",
                    color: "#000000",
                    px: 4,
                    py: 1.5,
                    fontWeight: 600,
                    fontSize: "1rem",
                    "&:hover": { backgroundColor: "#F57F17" },
                  }}
                >
                  Access Supervisor Portal
                </Button>

                <Button
                  component={RouterLink}
                  to="/register"
                  variant="outlined"
                  size="large"
                  sx={{
                    borderColor: "#000000",
                    color: "#000000",
                    px: 4,
                    py: 1.5,
                    fontWeight: 600,
                    fontSize: "1rem",
                    "&:hover": {
                      backgroundColor: "#F5F5F5",
                      borderColor: "#000000",
                    },
                  }}
                >
                  Register New Supervisor
                </Button>
              </Stack>
            </Grid>

            <Grid item xs={12} md={4}>
              <Paper
                elevation={2}
                sx={{
                  p: 4,
                  backgroundColor: "#FFFFFF",
                  border: "2px solid #E0E0E0",
                }}
              >
                <Typography
                  variant="h6"
                  sx={{ fontWeight: 600, mb: 3, color: "#000000" }}
                >
                  System Features
                </Typography>

                <List dense>
                  <ListItem sx={{ px: 0 }}>
                    <ListItemIcon>
                      <CheckCircleIcon sx={{ color: "#FFC107", fontSize: 20 }} />
                    </ListItemIcon>
                    <ListItemText
                      primary="Real-time Field Monitoring"
                      primaryTypographyProps={{ fontSize: "0.9rem", fontWeight: 500 }}
                    />
                  </ListItem>
                  <ListItem sx={{ px: 0 }}>
                    <ListItemIcon>
                      <CheckCircleIcon sx={{ color: "#FFC107", fontSize: 20 }} />
                    </ListItemIcon>
                    <ListItemText
                      primary="Compliance & Audit Trails"
                      primaryTypographyProps={{ fontSize: "0.9rem", fontWeight: 500 }}
                    />
                  </ListItem>
                  <ListItem sx={{ px: 0 }}>
                    <ListItemIcon>
                      <CheckCircleIcon sx={{ color: "#FFC107", fontSize: 20 }} />
                    </ListItemIcon>
                    <ListItemText
                      primary="Government Security Standards"
                      primaryTypographyProps={{ fontSize: "0.9rem", fontWeight: 500 }}
                    />
                  </ListItem>
                  <ListItem sx={{ px: 0 }}>
                    <ListItemIcon>
                      <CheckCircleIcon sx={{ color: "#FFC107", fontSize: 20 }} />
                    </ListItemIcon>
                    <ListItemText
                      primary="Mobile Field Access"
                      primaryTypographyProps={{ fontSize: "0.9rem", fontWeight: 500 }}
                    />
                  </ListItem>
                </List>
              </Paper>
            </Grid>
          </Grid>
        </Container>
      </Box>

      {/* Features Section */}
      <Box
        component="section"
        sx={{ py: { xs: 6, md: 10 }, backgroundColor: "#FFFFFF" }}
      >
        <Container maxWidth="lg">
          <Typography
            variant="h3"
            component="h2"
            align="center"
            sx={{
              fontWeight: 700,
              mb: 2,
              color: "#000000",
            }}
          >
            System Capabilities
          </Typography>
          <Typography
            variant="h6"
            align="center"
            sx={{ mb: 6, maxWidth: "600px", mx: "auto", color: "#424242" }}
          >
            Comprehensive government-grade tools for electrical safety management and regulatory compliance.
          </Typography>

          <Grid container spacing={4}>
            <Grid item xs={12} sm={6} md={3}>
              <Paper
                elevation={2}
                sx={{
                  height: "100%",
                  p: 3,
                  textAlign: "center",
                  border: "2px solid #E0E0E0",
                  "&:hover": {
                    borderColor: "#FFC107",
                    boxShadow: "0px 4px 12px rgba(255, 193, 7, 0.2)",
                  },
                }}
              >
                <Box
                  sx={{
                    width: 60,
                    height: 60,
                    borderRadius: 1,
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    backgroundColor: "#FFC107",
                    color: "#000000",
                    mx: "auto",
                    mb: 2,
                    border: "2px solid #000000",
                  }}
                >
                  <TimelineIcon sx={{ fontSize: 28 }} />
                </Box>
                <Typography variant="h6" sx={{ fontWeight: 600, mb: 1, color: "#000000" }}>
                  Real-Time Monitoring
                </Typography>
                <Typography variant="body2" sx={{ color: "#424242" }}>
                  Live tracking of field operations with precise timestamps and location data for regulatory compliance.
                </Typography>
              </Paper>
            </Grid>

            <Grid item xs={12} sm={6} md={3}>
              <Paper
                elevation={2}
                sx={{
                  height: "100%",
                  p: 3,
                  textAlign: "center",
                  border: "2px solid #E0E0E0",
                  "&:hover": {
                    borderColor: "#FFC107",
                    boxShadow: "0px 4px 12px rgba(255, 193, 7, 0.2)",
                  },
                }}
              >
                <Box
                  sx={{
                    width: 60,
                    height: 60,
                    borderRadius: 1,
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    backgroundColor: "#FFC107",
                    color: "#000000",
                    mx: "auto",
                    mb: 2,
                    border: "2px solid #000000",
                  }}
                >
                  <AssignmentIcon sx={{ fontSize: 28 }} />
                </Box>
                <Typography variant="h6" sx={{ fontWeight: 600, mb: 1, color: "#000000" }}>
                  Approval Workflow
                </Typography>
                <Typography variant="body2" sx={{ color: "#424242" }}>
                  Streamlined clearance request processing with digital signatures and audit trails.
                </Typography>
              </Paper>
            </Grid>

            <Grid item xs={12} sm={6} md={3}>
              <Paper
                elevation={2}
                sx={{
                  height: "100%",
                  p: 3,
                  textAlign: "center",
                  border: "2px solid #E0E0E0",
                  "&:hover": {
                    borderColor: "#FFC107",
                    boxShadow: "0px 4px 12px rgba(255, 193, 7, 0.2)",
                  },
                }}
              >
                <Box
                  sx={{
                    width: 60,
                    height: 60,
                    borderRadius: 1,
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    backgroundColor: "#FFC107",
                    color: "#000000",
                    mx: "auto",
                    mb: 2,
                    border: "2px solid #000000",
                  }}
                >
                  <SecurityIcon sx={{ fontSize: 28 }} />
                </Box>
                <Typography variant="h6" sx={{ fontWeight: 600, mb: 1, color: "#000000" }}>
                  Safety Compliance
                </Typography>
                <Typography variant="body2" sx={{ color: "#424242" }}>
                  Built-in safety protocols and comprehensive documentation for government regulations.
                </Typography>
              </Paper>
            </Grid>

            <Grid item xs={12} sm={6} md={3}>
              <Paper
                elevation={2}
                sx={{
                  height: "100%",
                  p: 3,
                  textAlign: "center",
                  border: "2px solid #E0E0E0",
                  "&:hover": {
                    borderColor: "#FFC107",
                    boxShadow: "0px 4px 12px rgba(255, 193, 7, 0.2)",
                  },
                }}
              >
                <Box
                  sx={{
                    width: 60,
                    height: 60,
                    borderRadius: 1,
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    backgroundColor: "#FFC107",
                    color: "#000000",
                    mx: "auto",
                    mb: 2,
                    border: "2px solid #000000",
                  }}
                >
                  <AssessmentIcon sx={{ fontSize: 28 }} />
                </Box>
                <Typography variant="h6" sx={{ fontWeight: 600, mb: 1, color: "#000000" }}>
                  Reporting & Analytics
                </Typography>
                <Typography variant="body2" sx={{ color: "#424242" }}>
                  Detailed reports and analytics for operational efficiency and regulatory reporting.
                </Typography>
              </Paper>
            </Grid>
          </Grid>
        </Container>
      </Box>

      {/* Government Footer */}
      <Box
        component="footer"
        sx={{ 
          backgroundColor: "#000000", 
          color: "#FFFFFF", 
          py: 6,
          borderTop: "4px solid #FFC107",
        }}
      >
        <Container maxWidth="lg">
          <Grid container spacing={4}>
            <Grid item xs={12} md={4}>
              <Stack spacing={2}>
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
                      border: "2px solid #FFFFFF",
                    }}
                  >
                    <AccountBalanceIcon sx={{ fontSize: 24, color: "#000000" }} />
                  </Box>
                  <Box>
                    <Typography variant="h6" sx={{ fontWeight: 600, color: "#FFFFFF" }}>
                      Government of India
                    </Typography>
                    <Typography variant="body2" sx={{ color: "#FFC107" }}>
                      Ministry of Power
                    </Typography>
                  </Box>
                </Stack>
                <Typography variant="body2" sx={{ color: "#FFFFFF", opacity: 0.8 }}>
                  Official platform for electrical safety management and lineman operations oversight.
                </Typography>
              </Stack>
            </Grid>

            <Grid item xs={12} md={4}>
              <Typography variant="h6" sx={{ fontWeight: 600, color: "#FFFFFF", mb: 2 }}>
                Contact Information
              </Typography>
              <Stack spacing={1}>
                <Stack direction="row" alignItems="center" spacing={1}>
                  <PhoneIcon sx={{ color: "#FFC107", fontSize: 18 }} />
                  <Typography variant="body2" sx={{ color: "#FFFFFF", opacity: 0.8 }}>
                    +91-11-1234-5678
                  </Typography>
                </Stack>
                <Stack direction="row" alignItems="center" spacing={1}>
                  <EmailIcon sx={{ color: "#FFC107", fontSize: 18 }} />
                  <Typography variant="body2" sx={{ color: "#FFFFFF", opacity: 0.8 }}>
                    support@power.gov.in
                  </Typography>
                </Stack>
                <Stack direction="row" alignItems="center" spacing={1}>
                  <LocationOnIcon sx={{ color: "#FFC107", fontSize: 18 }} />
                  <Typography variant="body2" sx={{ color: "#FFFFFF", opacity: 0.8 }}>
                    New Delhi, India
                  </Typography>
                </Stack>
              </Stack>
            </Grid>

            <Grid item xs={12} md={4}>
              <Typography variant="h6" sx={{ fontWeight: 600, color: "#FFFFFF", mb: 2 }}>
                Quick Links
              </Typography>
              <Stack spacing={1}>
                <Link
                  component="button"
                  underline="hover"
                  sx={{
                    color: "#FFFFFF",
                    opacity: 0.8,
                    textAlign: "left",
                    "&:hover": { color: "#FFC107", opacity: 1 },
                  }}
                >
                  Privacy Policy
                </Link>
                <Link
                  component="button"
                  underline="hover"
                  sx={{
                    color: "#FFFFFF",
                    opacity: 0.8,
                    textAlign: "left",
                    "&:hover": { color: "#FFC107", opacity: 1 },
                  }}
                >
                  Terms of Service
                </Link>
                <Link
                  component="button"
                  underline="hover"
                  sx={{
                    color: "#FFFFFF",
                    opacity: 0.8,
                    textAlign: "left",
                    "&:hover": { color: "#FFC107", opacity: 1 },
                  }}
                >
                  Help & Support
                </Link>
                <Link
                  component="button"
                  underline="hover"
                  sx={{
                    color: "#FFFFFF",
                    opacity: 0.8,
                    textAlign: "left",
                    "&:hover": { color: "#FFC107", opacity: 1 },
                  }}
                >
                  Accessibility Statement
                </Link>
              </Stack>
            </Grid>
          </Grid>

          <Divider sx={{ my: 4, borderColor: "#424242" }} />

          <Grid container spacing={2} alignItems="center">
            <Grid item xs={12} md={6}>
              <Typography variant="body2" sx={{ color: "#FFFFFF", opacity: 0.8 }}>
                © {new Date().getFullYear()} Government of India, Ministry of Power. All rights reserved.
              </Typography>
            </Grid>
            <Grid item xs={12} md={6} sx={{ textAlign: { xs: "left", md: "right" } }}>
              <Stack direction="row" spacing={2} justifyContent={{ xs: "flex-start", md: "flex-end" }}>
                <Chip
                  icon={<PublicIcon />}
                  label="Official Government Website"
                  size="small"
                  sx={{
                    backgroundColor: "#FFC107",
                    color: "#000000",
                    fontWeight: 600,
                    fontSize: "0.75rem",
                  }}
                />
              </Stack>
            </Grid>
          </Grid>
        </Container>
      </Box>
    </Box>
  );
}
