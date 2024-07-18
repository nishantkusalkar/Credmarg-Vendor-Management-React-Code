// src/components/CreateEmployee.js
import React, { useState } from 'react';
import axios from 'axios';
import { Card, CardContent, Typography, TextField, Button, MenuItem, Select, FormControl, InputLabel, Snackbar } from '@mui/material';

const CreateEmployee = ({ createdBy }) => {
  const [name, setName] = useState('');
  const [designation, setDesignation] = useState('');
  const [ctc, setCtc] = useState('');
  const [email, setEmail] = useState('');
  const [role, setRole] = useState('');
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
    const employee = { name, designation, ctc: parseFloat(ctc), email, role, createdBy: createdBy };
    axios.post('http://localhost:8080/api/employees', employee)
      .then((response) => {
        if (response.status === 200 || response.status === 201) {
          setName('');
          setDesignation('');
          setCtc('');
          setEmail('');
          setRole('');
          setSuccessOpen(true);
        } else {
          setErrorOpen(true);
          setErrorMessage('Failed to create employee. Please try again.');
        }
      })
      .catch(error => {
        setErrorOpen(true);
        setErrorMessage('Failed to create employee. Please try again.');
        console.error(error);
      });
  };

  return (
    <Card style={{ maxWidth: '400px', margin: 'auto', marginTop: '20px' }}>
      <CardContent>
        <Typography variant="h4" gutterBottom>Create Employee</Typography>
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
            label="Designation"
            value={designation}
            onChange={(e) => setDesignation(e.target.value)}
            fullWidth
            margin="normal"
            required
          />
          <TextField
            label="CTC"
            value={ctc}
            onChange={(e) => setCtc(e.target.value)}
            fullWidth
            margin="normal"
            required
            type="number"
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
          <FormControl fullWidth margin="normal">
            <InputLabel>Role</InputLabel>
            <Select
              value={role}
              onChange={(e) => setRole(e.target.value)}
              required
            >
              <MenuItem value="Normal">Normal</MenuItem>
              <MenuItem value="Admin">Admin</MenuItem>
            </Select>
          </FormControl>
          <Button variant="contained" color="primary" type="submit">Create</Button>
        </form>
        <Snackbar
          open={successOpen}
          autoHideDuration={6000}
          onClose={handleSuccessClose}
          message="Employee created successfully!"
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

export default CreateEmployee;
