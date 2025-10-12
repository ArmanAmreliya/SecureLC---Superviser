// File: src/App.jsx
import React, { useEffect, useState } from "react";
import LoginPage from "./pages/LoginPage";
import { onAuthChange, signOutUser } from "./services/authService";
import { Container, CircularProgress, Button } from "@mui/material";

function Dashboard({ user, onSignOut }) {
  return (
    <Container sx={{ mt: 6 }}>
      <h1>Welcome, {user?.email || "Supervisor"}</h1>
      <Button variant="contained" color="secondary" onClick={onSignOut}>
        Sign Out
      </Button>
    </Container>
  );
}

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
    <Dashboard user={user} onSignOut={handleSignOut} />
  ) : (
    <LoginPage />
  );
}

export default App;
