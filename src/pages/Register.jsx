import React, { useState } from "react";
import {
  Container,
  Card,
  Typography,
  TextField,
  Button,
  Box,
} from "@mui/material";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { getAuth } from "firebase/auth";

export default function Register() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleRegister = async (e) => {
    e.preventDefault();
    setError("");
    try {
      const auth = getAuth();
      await createUserWithEmailAndPassword(auth, email, password);
      // onAuthChange in App will handle navigation after registration
    } catch (err) {
      setError(err.message || "Registration failed");
    }
  };

  return (
    <Container maxWidth="xs" sx={{ mt: 10 }}>
      <Card sx={{ p: 4 }}>
        <Typography variant="h5" gutterBottom>
          Supervisor Registration
        </Typography>
        <Box component="form" onSubmit={handleRegister}>
          <TextField
            label="Email"
            fullWidth
            required
            sx={{ mb: 2 }}
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <TextField
            label="Password"
            fullWidth
            required
            type="password"
            sx={{ mb: 2 }}
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <Button type="submit" variant="contained" fullWidth>
            Register
          </Button>
        </Box>
      </Card>
    </Container>
  );
}
