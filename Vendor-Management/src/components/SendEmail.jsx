// src/components/SendEmail.js
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Paper, Typography, FormControl, InputLabel, Select, MenuItem, TextField, Button, Snackbar } from '@mui/material';

const SendEmail = () => {
  const [vendors, setVendors] = useState([]);
  const [selectedVendor, setSelectedVendor] = useState('');
  const [message, setMessage] = useState('');
  const [emailContent, setEmailContent] = useState('');
  const [emailSent, setEmailSent] = useState(false);
  const [errorOpen, setErrorOpen] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [createdBy, setCreatedBy] = useState('Admin'); // Assuming Admin as default
  const [vendorId, setVendorId] = useState('');
  const [vendorEmail, setVendorEmail] = useState('');

  useEffect(() => {
    fetchVendors();
  }, []);

  const fetchVendors = () => {
    axios.get('http://localhost:8080/api/vendors')
      .then(response => setVendors(response.data))
      .catch(error => console.error(error));
  };

  const handleSendEmail = () => {
    const selectedVendorData = vendors.find(vendor => vendor.email === selectedVendor);
    if (!selectedVendorData) return;

    const emailData = {
      recipientEmail: selectedVendorData.email,
      message: message,
      created_by: createdBy,
      vendor_id: selectedVendorData.id,
      vendor_email: selectedVendorData.email
    };

    axios.post('http://localhost:8080/api/send-email', emailData)
      .then(response => {
        setEmailContent(`Email sent to ${selectedVendorData.name} at ${selectedVendorData.email}`);
        setEmailSent(true);
      })
      .catch(error => {
        setErrorOpen(true);
        setErrorMessage('Failed to send email. Please try again.');
        console.error(error);
      });
  };

  const handleChangeVendor = (event) => {
    const selectedEmail = event.target.value;
    setSelectedVendor(selectedEmail);

    const selectedVendorData = vendors.find(vendor => vendor.email === selectedEmail);
    if (selectedVendorData) {
      setVendorId(selectedVendorData.id);
      setVendorEmail(selectedVendorData.email);
    }
  };

  const handleCloseError = () => {
    setErrorOpen(false);
  };

  return (
    <Paper style={{ padding: '20px' }}>
      <Typography variant="h4" gutterBottom>Send Email to Vendor</Typography>
      <FormControl fullWidth variant="outlined" style={{ marginBottom: '20px' }}>
        <InputLabel id="vendor-select-label">Select Vendor Email</InputLabel>
        <Select
          labelId="vendor-select-label"
          id="vendor-select"
          value={selectedVendor}
          onChange={handleChangeVendor}
          label="Select Vendor Email"
        >
          {vendors.map((vendor) => (
            <MenuItem key={vendor.email} value={vendor.email}>
              {vendor.email}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
      <TextField
        label="Message"
        multiline
        rows={4}
        variant="outlined"
        fullWidth
        value={message}
        onChange={(e) => setMessage(e.target.value)}
        style={{ marginBottom: '20px' }}
      />
      <Button variant="contained" color="primary" onClick={handleSendEmail}>Send Email</Button>
      {emailSent && (
        <Typography variant="body1" style={{ marginTop: '10px' }}>
          {emailContent}
        </Typography>
      )}
      <Snackbar
        open={errorOpen}
        autoHideDuration={6000}
        onClose={handleCloseError}
        message={errorMessage}
        severity="error"
      />
    </Paper>
  );
};

export default SendEmail;
