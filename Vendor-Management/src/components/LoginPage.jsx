// src/components/LoginPage.js
import React, { useState } from 'react';
import { TextField, Button, Card, CardContent, Typography, Snackbar } from '@mui/material';
import axios from 'axios';

const LoginPage = ({ onLogin }) => {
  const [email, setEmail] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [snackbarOpen, setSnackbarOpen] = useState(false);

  const handleSnackbarClose = () => {
    setSnackbarOpen(false);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      const response = await axios.post('http://localhost:8080/api/login', { email });

      if (response.status === 200) {
        onLogin(email, response.data.id); // Pass email and ID to parent component
      } else {
        setErrorMessage('Failed to login. Please try again.');
        setSnackbarOpen(true);
      }
    } catch (error) {
      console.error('Login error:', error);
      setErrorMessage('Failed to login. Please try again.');
      setSnackbarOpen(true);
    }
  };

  return (
    <Card style={{ maxWidth: '400px', margin: 'auto', marginTop: '20px' }}>
      <CardContent>
        <Typography variant="h4" gutterBottom>Login</Typography>
        <form onSubmit={handleSubmit}>
          <TextField
            label="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            fullWidth
            margin="normal"
            required
            type="email"
          />
          <Button variant="contained" color="primary" type="submit">Login</Button>
        </form>
        <Snackbar
          open={snackbarOpen}
          autoHideDuration={6000}
          onClose={handleSnackbarClose}
          message={errorMessage}
        />
      </CardContent>
    </Card>
  );
};

export default LoginPage;
