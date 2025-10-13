import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import CssBaseline from "@mui/material/CssBaseline";
import Divider from "@mui/material/Divider";
import Drawer from "@mui/material/Drawer";
import IconButton from "@mui/material/IconButton";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import Chip from "@mui/material/Chip";
import Avatar from "@mui/material/Avatar";
import Stack from "@mui/material/Stack";
import Badge from "@mui/material/Badge";
import Tooltip from "@mui/material/Tooltip";
import Paper from "@mui/material/Paper";
import { useTheme } from "@mui/material/styles";
import {
  Logout as LogoutIcon,
  Dashboard as DashboardIcon,
  Map as MapIcon,
  History as HistoryIcon,
  AccessTime as AccessTimeIcon,
  AccountCircle as AccountCircleIcon,
  Security as SecurityIcon,
  Notifications as NotificationsIcon,
  AccountBalance as AccountBalanceIcon,
  Assignment as AssignmentIcon,
  Timeline as TimelineIcon,
  Assessment as AssessmentIcon,
} from "@mui/icons-material";
import { Link as RouterLink, useLocation } from "react-router-dom";
import { signOutUser, getCurrentUser } from "../services/authService";

const drawerWidth = 280;

export default function MainLayout({ children }) {
  const theme = useTheme();
  const location = useLocation();
  const [currentTime, setCurrentTime] = useState(new Date());
  const [currentUser, setCurrentUser] = useState(null);

  // Update clock every second
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  // Get current user
  useEffect(() => {
    const user = getCurrentUser();
    setCurrentUser(user);
  }, []);

  const handleSignOut = async () => {
    try {
      await signOutUser();
      window.location.href = "/";
    } catch (err) {
      console.error("Sign out failed", err);
    }
  };

  const formatDateTime = (date) => {
    return date.toLocaleString("en-IN", {
      weekday: "short",
      year: "numeric",
      month: "short",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
      second: "2-digit",
      hour12: true,
    });
  };

  const getUserInitials = (email) => {
    if (!email) return "SU";
    const parts = email.split("@")[0].split(".");
    if (parts.length >= 2) {
      return `${parts[0][0]}${parts[1][0]}`.toUpperCase();
    }
    return email[0].toUpperCase();
  };

  const isActiveRoute = (path) => {
    return location.pathname === path;
  };

  const navItems = [
    {
      text: "Supervisor Dashboard",
      icon: <DashboardIcon />,
      to: "/dashboard",
      badge: null,
    },
    { 
      text: "Field Operations Map", 
      icon: <MapIcon />, 
      to: "/livemap", 
      badge: "LIVE" 
    },
    { 
      text: "Compliance Audit Log", 
      icon: <HistoryIcon />, 
      to: "/auditlog", 
      badge: null 
    },
  ];

  return (
    <Box sx={{ display: "flex", backgroundColor: "#FFFFFF" }}>
      <CssBaseline />

      {/* Government AppBar */}
      <AppBar
        position="fixed"
        elevation={0}
        sx={{
          zIndex: (theme) => theme.zIndex.drawer + 1,
          backgroundColor: "#000000",
          borderBottom: "4px solid #FFC107",
        }}
      >
        <Toolbar sx={{ py: 2 }}>
          {/* Government Logo and Title */}
          <Stack direction="row" alignItems="center" spacing={2} sx={{ flexGrow: 1 }}>
            <Box
              sx={{
                width: 50,
                height: 50,
                backgroundColor: "#FFC107",
                borderRadius: 1,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                border: "2px solid #FFFFFF",
              }}
            >
              <AccountBalanceIcon sx={{ fontSize: 28, color: "#000000" }} />
            </Box>
            <Box>
              <Typography
                variant="h5"
                sx={{
                  fontWeight: 700,
                  color: "#FFFFFF",
                  lineHeight: 1,
                }}
              >
                Government of India
              </Typography>
              <Typography
                variant="subtitle1"
                sx={{
                  color: "#FFC107",
                  fontWeight: 600,
                  lineHeight: 1,
                }}
              >
                Lineman Management System
              </Typography>
              <Typography
                variant="caption"
                sx={{
                  color: "#FFFFFF",
                  opacity: 0.8,
                }}
              >
                Ministry of Power • Supervisor Portal
              </Typography>
            </Box>
          </Stack>

          <Stack direction="row" alignItems="center" spacing={2}>
            {/* System Status */}
            <Paper
              elevation={0}
              sx={{
                backgroundColor: "#FFC107",
                px: 2,
                py: 1,
                borderRadius: 1,
                border: "1px solid #FFFFFF",
              }}
            >
              <Stack direction="row" alignItems="center" spacing={1}>
                <SecurityIcon sx={{ color: "#000000", fontSize: 18 }} />
                <Typography
                  variant="caption"
                  sx={{
                    color: "#000000",
                    fontWeight: 600,
                    fontSize: "0.75rem",
                  }}
                >
                  SYSTEM ACTIVE
                </Typography>
              </Stack>
            </Paper>

            {/* Live Clock */}
            <Paper
              elevation={0}
              sx={{
                backgroundColor: "#FFFFFF",
                px: 2,
                py: 1,
                borderRadius: 1,
                border: "1px solid #E0E0E0",
              }}
            >
              <Stack direction="row" alignItems="center" spacing={1}>
                <AccessTimeIcon sx={{ color: "#000000", fontSize: 18 }} />
                <Typography
                  variant="caption"
                  sx={{
                    color: "#000000",
                    fontWeight: 600,
                    fontFamily: "monospace",
                    fontSize: "0.75rem",
                  }}
                >
                  {formatDateTime(currentTime)}
                </Typography>
              </Stack>
            </Paper>

            {/* User Information */}
            {currentUser && (
              <Paper
                elevation={0}
                sx={{
                  backgroundColor: "#FFFFFF",
                  px: 2,
                  py: 1,
                  borderRadius: 1,
                  border: "1px solid #E0E0E0",
                }}
              >
                <Stack direction="row" alignItems="center" spacing={1}>
                  <Avatar
                    sx={{
                      width: 24,
                      height: 24,
                      backgroundColor: "#FFC107",
                      color: "#000000",
                      fontSize: "0.7rem",
                      fontWeight: 700,
                    }}
                  >
                    {getUserInitials(currentUser.email)}
                  </Avatar>
                  <Typography
                    variant="caption"
                    sx={{
                      color: "#000000",
                      fontWeight: 600,
                      fontSize: "0.75rem",
                    }}
                  >
                    {currentUser.email}
                  </Typography>
                </Stack>
              </Paper>
            )}

            {/* Sign Out Button */}
            <Button
              variant="outlined"
              size="small"
              startIcon={<LogoutIcon />}
              onClick={handleSignOut}
              sx={{
                borderColor: "#FFC107",
                color: "#FFC107",
                fontWeight: 600,
                fontSize: "0.75rem",
                "&:hover": {
                  backgroundColor: "#FFC107",
                  color: "#000000",
                  borderColor: "#FFC107",
                },
              }}
            >
              Sign Out
            </Button>
          </Stack>
        </Toolbar>
      </AppBar>

      {/* Government Sidebar */}
      <Drawer
        variant="permanent"
        sx={{
          width: drawerWidth,
          flexShrink: 0,
          [`& .MuiDrawer-paper`]: {
            width: drawerWidth,
            boxSizing: "border-box",
            display: "flex",
            flexDirection: "column",
            backgroundColor: "#F5F5F5",
            borderRight: "4px solid #FFC107",
          },
        }}
      >
        <Toolbar />

        {/* Government Navigation Header */}
        <Paper
          elevation={0}
          sx={{
            p: 2,
            backgroundColor: "#FFC107",
            borderRadius: 0,
            borderBottom: "2px solid #000000",
          }}
        >
          <Typography
            variant="h6"
            sx={{
              fontWeight: 700,
              color: "#000000",
              textAlign: "center",
            }}
          >
            SUPERVISOR PORTAL
          </Typography>
          <Typography
            variant="caption"
            sx={{
              color: "#000000",
              fontWeight: 600,
              textAlign: "center",
              display: "block",
            }}
          >
            Ministry of Power
          </Typography>
        </Paper>

        <Divider sx={{ borderColor: "#E0E0E0" }} />

        {/* Navigation Items */}
        <List sx={{ flexGrow: 1, p: 1 }}>
          {navItems.map((item) => (
            <ListItem key={item.text} disablePadding sx={{ mb: 1 }}>
              <ListItemButton
                component={RouterLink}
                to={item.to}
                sx={{
                  borderRadius: 1,
                  mx: 1,
                  backgroundColor: isActiveRoute(item.to)
                    ? "#FFC107"
                    : "transparent",
                  color: isActiveRoute(item.to) ? "#000000" : "#000000",
                  border: isActiveRoute(item.to) 
                    ? "2px solid #000000" 
                    : "2px solid #E0E0E0",
                  "&:hover": {
                    backgroundColor: isActiveRoute(item.to)
                      ? "#F57F17"
                      : "#FFFFFF",
                    borderColor: "#FFC107",
                  },
                  transition: "all 0.2s ease-in-out",
                }}
              >
                <ListItemIcon
                  sx={{
                    color: isActiveRoute(item.to)
                      ? "#000000"
                      : "#424242",
                    minWidth: 40,
                  }}
                >
                  {item.icon}
                </ListItemIcon>
                <ListItemText
                  primary={item.text}
                  primaryTypographyProps={{
                    fontWeight: isActiveRoute(item.to) ? 700 : 600,
                    fontSize: "0.9rem",
                  }}
                />
                {item.badge && (
                  <Chip
                    label={item.badge}
                    size="small"
                    sx={{
                      height: 20,
                      fontSize: "0.65rem",
                      fontWeight: 700,
                      backgroundColor: "#000000",
                      color: "#FFFFFF",
                    }}
                  />
                )}
              </ListItemButton>
            </ListItem>
          ))}
        </List>

        {/* Government Footer Section */}
        <Box sx={{ p: 2 }}>
          <Divider sx={{ mb: 2, borderColor: "#E0E0E0" }} />
          
          {/* Active Supervisor Info */}
          {currentUser && (
            <Paper
              elevation={2}
              sx={{
                p: 2,
                backgroundColor: "#FFFFFF",
                border: "2px solid #000000",
                borderRadius: 1,
                mb: 2,
              }}
            >
              <Typography
                variant="caption"
                sx={{
                  fontWeight: 700,
                  color: "#000000",
                  textTransform: "uppercase",
                  letterSpacing: "0.5px",
                  display: "block",
                  mb: 1,
                }}
              >
                Active Supervisor
              </Typography>
              <Stack direction="row" alignItems="center" spacing={2}>
                <Avatar
                  sx={{
                    width: 32,
                    height: 32,
                    backgroundColor: "#FFC107",
                    color: "#000000",
                    fontWeight: 700,
                    fontSize: "0.8rem",
                    border: "2px solid #000000",
                  }}
                >
                  {getUserInitials(currentUser.email)}
                </Avatar>
                <Box sx={{ flex: 1 }}>
                  <Typography
                    variant="body2"
                    sx={{
                      fontWeight: 600,
                      color: "#000000",
                      fontSize: "0.8rem",
                    }}
                  >
                    {currentUser.email}
                  </Typography>
                  <Chip
                    label="ONLINE"
                    size="small"
                    sx={{
                      mt: 0.5,
                      height: 16,
                      fontSize: "0.6rem",
                      fontWeight: 700,
                      backgroundColor: "#000000",
                      color: "#FFFFFF",
                    }}
                  />
                </Box>
              </Stack>
            </Paper>
          )}

          {/* Government Footer */}
          <Paper
            elevation={0}
            sx={{
              p: 1,
              backgroundColor: "#000000",
              borderRadius: 1,
              textAlign: "center",
            }}
          >
            <Typography
              variant="caption"
              sx={{
                color: "#FFC107",
                fontWeight: 600,
                fontSize: "0.7rem",
              }}
            >
              Government of India
            </Typography>
            <Typography
              variant="caption"
              sx={{
                color: "#FFFFFF",
                fontSize: "0.65rem",
                display: "block",
              }}
            >
              Ministry of Power
            </Typography>
          </Paper>
        </Box>
      </Drawer>

      {/* Main Content Area */}
      <Box
        component="main"
        sx={{
          flexGrow: 1,
          p: 3,
          width: { sm: `calc(100% - ${drawerWidth}px)` },
          backgroundColor: "#FFFFFF",
          minHeight: "100vh",
        }}
      >
        <Toolbar />
        {children}
      </Box>
    </Box>
  );
}

MainLayout.propTypes = {
  children: PropTypes.node.isRequired,
};
