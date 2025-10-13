// File: src/App.jsx
import React, { useEffect, useState } from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import LandingPage from "./pages/LandingPage";
import LoginPage from "./pages/LoginPage";
import Register from "./pages/Register";
import DashboardPage from "./pages/Dashboard";
import LiveMap from "./pages/LiveMap";
import AuditLog from "./pages/AuditLog";
import MainLayout from "./layouts/MainLayout";
import { onAuthChange, signOutUser } from "./services/authService";
import { Container, CircularProgress } from "@mui/material";

function App() {
  const [user, setUser] = useState(null);
  const [initializing, setInitializing] = useState(true);

  useEffect(() => {
    const unsubscribe = onAuthChange((u) => {
      setUser(u);
      setInitializing(false);
    });
    return () => unsubscribe && unsubscribe();
  }, []);

  const handleSignOut = async () => {
    try {
      await signOutUser();
    } catch (err) {
      console.error("Sign out failed", err);
    }
  };

  if (initializing) {
    return (
      <Container sx={{ display: "flex", justifyContent: "center", mt: 12 }}>
        <CircularProgress />
      </Container>
    );
  }

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route
          path="/login"
          element={user ? <Navigate to="/dashboard" /> : <LoginPage />}
        />
        <Route
          path="/register"
          element={user ? <Navigate to="/dashboard" /> : <Register />}
        />
        <Route
          path="/dashboard"
          element={
            user ? (
              <MainLayout onSignOut={handleSignOut}>
                <DashboardPage user={user} />
              </MainLayout>
            ) : (
              <Navigate to="/login" />
            )
          }
        />
        <Route
          path="/livemap"
          element={
            user ? (
              <MainLayout onSignOut={handleSignOut}>
                <LiveMap user={user} />
              </MainLayout>
            ) : (
              <Navigate to="/login" />
            )
          }
        />
        <Route
          path="/auditlog"
          element={
            user ? (
              <MainLayout onSignOut={handleSignOut}>
                <AuditLog user={user} />
              </MainLayout>
            ) : (
              <Navigate to="/login" />
            )
          }
        />
        {/* Fallback to landing */}
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
