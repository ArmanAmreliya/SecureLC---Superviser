import React from "react";
import Box from "@mui/material/Box";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import Button from "@mui/material/Button";
import Container from "@mui/material/Container";
import Typography from "@mui/material/Typography";
import Grid from "@mui/material/Grid";
import Stack from "@mui/material/Stack";
import Divider from "@mui/material/Divider";
import Link from "@mui/material/Link";
import Chip from "@mui/material/Chip";
import Paper from "@mui/material/Paper";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
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
    <Box sx={{ minHeight: "100vh", backgroundColor: "#fff", position: "relative" }}>
      {/* Government Header */}
      <AppBar position="static" elevation={0} sx={{ backgroundColor: "#000", borderBottom: "4px solid #FFC107" }}>
        <Container maxWidth="lg">
          <Toolbar disableGutters sx={{ py: 2 }}>
            <Stack direction="row" alignItems="center" spacing={2} sx={{ flexGrow: 1 }}>
              <Box sx={{ width: 60, height: 60, backgroundColor: "#FFC107", borderRadius: 1, display: "flex", alignItems: "center", justifyContent: "center", border: "2px solid #000" }}>
                <SecurityIcon sx={{ fontSize: 32, color: "#000" }} />
              </Box>
              <Box>
                <Typography variant="h4" sx={{ fontWeight: 700, color: "#fff", lineHeight: 1 }}>Government of India</Typography>
                <Typography variant="h6" sx={{ fontWeight: 600, color: "#FFC107", lineHeight: 1 }}>Lineman Management System</Typography>
                <Typography variant="body2" sx={{ color: "#fff", opacity: 0.8 }}>Ministry of Power • Department of Electrical Safety</Typography>
              </Box>
            </Stack>
            <Stack direction="row" spacing={2}>
              <Button component={RouterLink} to="/login" variant="outlined" sx={{ borderColor: "#FFC107", color: "#FFC107", fontWeight: 600, px: 3, '&:hover': { backgroundColor: "#FFC107", color: "#000", borderColor: "#FFC107" } }}>Supervisor Login</Button>
              <Button component={RouterLink} to="/register" variant="contained" sx={{ backgroundColor: "#FFC107", color: "#000", fontWeight: 600, px: 3, '&:hover': { backgroundColor: "#F57F17" } }}>Register</Button>
            </Stack>
          </Toolbar>
        </Container>
      </AppBar>

      {/* Hero Section with background image */}
      <Box component="section" sx={{ position: 'relative', minHeight: { xs: 320, md: 400 }, display: 'flex', alignItems: 'center', justifyContent: 'center', backgroundImage: 'url(/hero-bg-.jpg)', backgroundSize: 'cover', backgroundPosition: 'center', backgroundRepeat: 'no-repeat', borderBottom: '2px solid #E0E0E0' }}>
        <Box sx={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', bgcolor: 'rgba(255,255,255,0.7)', zIndex: 1 }} />
        <Container maxWidth="lg" sx={{ position: 'relative', zIndex: 2 }}>
          <Grid container spacing={6} alignItems="center">
            <Grid item xs={12} md={8}>
              <Typography variant="h2" component="h1" gutterBottom sx={{ fontWeight: 700, color: '#000', mb: 3, fontSize: { xs: '2rem', md: '3rem' }, textShadow: '0 2px 8px rgba(255,255,255,0.5)' }}>Centralized Lineman Management System</Typography>
              <Typography variant="h6" sx={{ color: '#333', fontWeight: 400, mb: 2, textShadow: '0 1px 4px rgba(255,255,255,0.4)' }}>Official government platform for managing electrical line clearance operations, ensuring field safety, and maintaining comprehensive audit trails for regulatory compliance.</Typography>
              <Stack direction="row" spacing={2} sx={{ mt: 3 }}>
                <Button component={RouterLink} to="/login" variant="contained" sx={{ backgroundColor: '#FFC107', color: '#000', fontWeight: 600 }}>Access Supervisor Portal</Button>
                <Button component={RouterLink} to="/register" variant="outlined" sx={{ borderColor: '#FFC107', color: '#000', fontWeight: 600 }}>Register New Supervisor</Button>
              </Stack>
            </Grid>
            <Grid item xs={12} md={4}>
              <Paper elevation={2} sx={{ p: 3, bgcolor: '#fff', borderRadius: 2 }}>
                <Typography variant="h6" sx={{ color: '#FFC107', fontWeight: 700, mb: 2 }}>System Features</Typography>
                <List>
                  <ListItem><ListItemIcon><TimelineIcon sx={{ color: '#FFC107' }} /></ListItemIcon><ListItemText primary="Real-time Field Monitoring" /></ListItem>
                  <ListItem><ListItemIcon><AssessmentIcon sx={{ color: '#FFC107' }} /></ListItemIcon><ListItemText primary="Compliance & Audit Trails" /></ListItem>
                  <ListItem><ListItemIcon><SecurityIcon sx={{ color: '#FFC107' }} /></ListItemIcon><ListItemText primary="Government Security Standards" /></ListItem>
                  <ListItem><ListItemIcon><PublicIcon sx={{ color: '#FFC107' }} /></ListItemIcon><ListItemText primary="Mobile Field Access" /></ListItem>
                </List>
              </Paper>
            </Grid>
          </Grid>
        </Container>
      </Box>

      {/* Features Section */}
      <Box component="section" sx={{ py: { xs: 6, md: 10 }, backgroundColor: '#fff' }}>
        <Container maxWidth="lg">
          <Typography variant="h3" component="h2" align="center" sx={{ fontWeight: 700, mb: 2, color: '#000' }}>System Capabilities</Typography>
          <Typography variant="h6" align="center" sx={{ mb: 6, maxWidth: '600px', mx: 'auto', color: '#424242' }}>Comprehensive government-grade tools for electrical safety management and regulatory compliance.</Typography>
          <Grid container spacing={4}>
            <Grid item xs={12} sm={6} md={3}><Paper elevation={2} sx={{ height: '100%', p: 3, textAlign: 'center', border: '2px solid #E0E0E0', '&:hover': { borderColor: '#FFC107', boxShadow: '0px 4px 12px rgba(255, 193, 7, 0.2)' } }}><Box sx={{ width: 60, height: 60, borderRadius: 1, display: 'flex', alignItems: 'center', justifyContent: 'center', backgroundColor: '#FFC107', color: '#000', mx: 'auto', mb: 2, border: '2px solid #000' }}><TimelineIcon sx={{ fontSize: 28 }} /></Box><Typography variant="h6" sx={{ fontWeight: 600, mb: 1, color: '#000' }}>Real-Time Monitoring</Typography><Typography variant="body2" sx={{ color: '#424242' }}>Live tracking of field operations with precise timestamps and location data for regulatory compliance.</Typography></Paper></Grid>
            <Grid item xs={12} sm={6} md={3}><Paper elevation={2} sx={{ height: '100%', p: 3, textAlign: 'center', border: '2px solid #E0E0E0', '&:hover': { borderColor: '#FFC107', boxShadow: '0px 4px 12px rgba(255, 193, 7, 0.2)' } }}><Box sx={{ width: 60, height: 60, borderRadius: 1, display: 'flex', alignItems: 'center', justifyContent: 'center', backgroundColor: '#FFC107', color: '#000', mx: 'auto', mb: 2, border: '2px solid #000' }}><AssignmentIcon sx={{ fontSize: 28 }} /></Box><Typography variant="h6" sx={{ fontWeight: 600, mb: 1, color: '#000' }}>Approval Workflow</Typography><Typography variant="body2" sx={{ color: '#424242' }}>Streamlined clearance request processing with digital signatures and audit trails.</Typography></Paper></Grid>
            <Grid item xs={12} sm={6} md={3}><Paper elevation={2} sx={{ height: '100%', p: 3, textAlign: 'center', border: '2px solid #E0E0E0', '&:hover': { borderColor: '#FFC107', boxShadow: '0px 4px 12px rgba(255, 193, 7, 0.2)' } }}><Box sx={{ width: 60, height: 60, borderRadius: 1, display: 'flex', alignItems: 'center', justifyContent: 'center', backgroundColor: '#FFC107', color: '#000', mx: 'auto', mb: 2, border: '2px solid #000' }}><SecurityIcon sx={{ fontSize: 28 }} /></Box><Typography variant="h6" sx={{ fontWeight: 600, mb: 1, color: '#000' }}>Safety Compliance</Typography><Typography variant="body2" sx={{ color: '#424242' }}>Built-in safety protocols and comprehensive documentation for government regulations.</Typography></Paper></Grid>
            <Grid item xs={12} sm={6} md={3}><Paper elevation={2} sx={{ height: '100%', p: 3, textAlign: 'center', border: '2px solid #E0E0E0', '&:hover': { borderColor: '#FFC107', boxShadow: '0px 4px 12px rgba(255, 193, 7, 0.2)' } }}><Box sx={{ width: 60, height: 60, borderRadius: 1, display: 'flex', alignItems: 'center', justifyContent: 'center', backgroundColor: '#FFC107', color: '#000', mx: 'auto', mb: 2, border: '2px solid #000' }}><AssessmentIcon sx={{ fontSize: 28 }} /></Box><Typography variant="h6" sx={{ fontWeight: 600, mb: 1, color: '#000' }}>Reporting & Analytics</Typography><Typography variant="body2" sx={{ color: '#424242' }}>Detailed reports and analytics for operational efficiency and regulatory reporting.</Typography></Paper></Grid>
          </Grid>
        </Container>
      </Box>

      {/* Government Footer */}
      <Box component="footer" sx={{ backgroundColor: '#000', color: '#fff', py: 6, borderTop: '4px solid #FFC107' }}>
        <Container maxWidth="lg">
          <Grid container spacing={4}>
            <Grid item xs={12} md={4}>
              <Stack spacing={2}>
                <Stack direction="row" alignItems="center" spacing={2}>
                  <Box sx={{ width: 40, height: 40, backgroundColor: '#FFC107', borderRadius: 1, display: 'flex', alignItems: 'center', justifyContent: 'center', border: '2px solid #fff' }}>
                    <AccountBalanceIcon sx={{ fontSize: 24, color: '#000' }} />
                  </Box>
                  <Box>
                    <Typography variant="h6" sx={{ fontWeight: 600, color: '#fff' }}>Government of India</Typography>
                    <Typography variant="body2" sx={{ color: '#FFC107' }}>Ministry of Power</Typography>
                  </Box>
                </Stack>
                <Typography variant="body2" sx={{ color: '#fff', opacity: 0.8 }}>Official platform for electrical safety management and lineman operations oversight.</Typography>
              </Stack>
            </Grid>
            <Grid item xs={12} md={4}>
              <Typography variant="h6" sx={{ fontWeight: 600, color: '#fff', mb: 2 }}>Contact Information</Typography>
              <Stack spacing={1}>
                <Stack direction="row" alignItems="center" spacing={1}>
                  <PhoneIcon sx={{ color: '#FFC107', fontSize: 18 }} />
                  <Typography variant="body2" sx={{ color: '#fff', opacity: 0.8 }}>+91-11-1234-5678</Typography>
                </Stack>
                <Stack direction="row" alignItems="center" spacing={1}>
                  <EmailIcon sx={{ color: '#FFC107', fontSize: 18 }} />
                  <Typography variant="body2" sx={{ color: '#fff', opacity: 0.8 }}>support@power.gov.in</Typography>
                </Stack>
                <Stack direction="row" alignItems="center" spacing={1}>
                  <LocationOnIcon sx={{ color: '#FFC107', fontSize: 18 }} />
                  <Typography variant="body2" sx={{ color: '#fff', opacity: 0.8 }}>New Delhi, India</Typography>
                </Stack>
              </Stack>
            </Grid>
            <Grid item xs={12} md={4}>
              <Typography variant="h6" sx={{ fontWeight: 600, color: '#fff', mb: 2 }}>Quick Links</Typography>
              <Stack spacing={1}>
                <Link component="button" underline="hover" sx={{ color: '#fff', opacity: 0.8, textAlign: 'left', '&:hover': { color: '#FFC107', opacity: 1 } }}>Privacy Policy</Link>
                <Link component="button" underline="hover" sx={{ color: '#fff', opacity: 0.8, textAlign: 'left', '&:hover': { color: '#FFC107', opacity: 1 } }}>Terms of Service</Link>
                <Link component="button" underline="hover" sx={{ color: '#fff', opacity: 0.8, textAlign: 'left', '&:hover': { color: '#FFC107', opacity: 1 } }}>Help & Support</Link>
                <Link component="button" underline="hover" sx={{ color: '#fff', opacity: 0.8, textAlign: 'left', '&:hover': { color: '#FFC107', opacity: 1 } }}>Accessibility Statement</Link>
              </Stack>
            </Grid>
          </Grid>
          <Divider sx={{ my: 4, borderColor: '#424242' }} />
          <Grid container spacing={2} alignItems="center">
            <Grid item xs={12} md={6}>
              <Typography variant="body2" sx={{ color: '#fff', opacity: 0.8 }}>© {new Date().getFullYear()} Government of India, Ministry of Power. All rights reserved.</Typography>
            </Grid>
            <Grid item xs={12} md={6} sx={{ textAlign: { xs: 'left', md: 'right' } }}>
              <Stack direction="row" spacing={2} justifyContent={{ xs: 'flex-start', md: 'flex-end' }}>
                <Chip icon={<PublicIcon />} label="Official Government Website" size="small" sx={{ backgroundColor: '#FFC107', color: '#000', fontWeight: 600, fontSize: '0.75rem' }} />
              </Stack>
            </Grid>
          </Grid>
        </Container>
      </Box>
    </Box>
  );
}
