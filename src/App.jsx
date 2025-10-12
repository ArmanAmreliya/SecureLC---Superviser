// File: src/App.jsx
import React, { useEffect, useState } from "react";
import LoginPage from "./pages/LoginPage";
import DashboardPage from "./pages/Dashboard";
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

  return user ? (
    <DashboardPage user={user} onSignOut={handleSignOut} />
  ) : (
    <LoginPage />
  );
}

export default App;
