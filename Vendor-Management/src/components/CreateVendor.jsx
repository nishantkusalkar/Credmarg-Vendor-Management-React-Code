// src/components/CreateVendor.js
import React, { useState } from 'react';
import axios from 'axios';
import { Card, CardContent, Typography, TextField, Button, Snackbar } from '@mui/material';

const CreateVendor = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [upi, setUpi] = useState('');
  const [successOpen, setSuccessOpen] = useState(false);
  const [errorOpen, setErrorOpen] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  const handleSuccessClose = () => {
    setSuccessOpen(false);
  };

  const handleErrorClose = () => {
    setErrorOpen(false);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    const vendor = { name, email, upi };
    axios.post('http://localhost:8080/api/vendors', vendor)
      .then(response => {
        if (response.status === 200 || response.status === 201) {
          setName('');
          setEmail('');
          setUpi('');
          setSuccessOpen(true);
        } else {
          setErrorOpen(true);
          setErrorMessage('Failed to create vendor. Please try again.');
        }
      })
      .catch(error => {
        setErrorOpen(true);
        setErrorMessage('Failed to create vendor. Please try again.');
        console.error(error);
      });
  };

  return (
    <Card style={{ maxWidth: '400px', margin: 'auto', marginTop: '20px' }}>
      <CardContent>
        <Typography variant="h5" gutterBottom>Create Vendor</Typography>
        <form onSubmit={handleSubmit}>
          <TextField
            label="Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            fullWidth
            margin="normal"
            required
          />
          <TextField
            label="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            fullWidth
            margin="normal"
            required
            type="email"
          />
          <TextField
            label="UPI"
            value={upi}
            onChange={(e) => setUpi(e.target.value)}
            fullWidth
            margin="normal"
            required
          />
          <Button variant="contained" color="primary" type="submit">Create</Button>
        </form>
        <Snackbar
          open={successOpen}
          autoHideDuration={6000}
          onClose={handleSuccessClose}
          message="Vendor created successfully!"
        />
        <Snackbar
          open={errorOpen}
          autoHideDuration={6000}
          onClose={handleErrorClose}
          message={errorMessage}
          severity="error"
        />
      </CardContent>
    </Card>
  );
};

export default CreateVendor;
