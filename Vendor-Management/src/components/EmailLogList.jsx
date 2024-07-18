
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Container, Typography, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper } from '@mui/material';

const EmailLogList = () => {
  const [logs, setLogs] = useState([]);

  useEffect(() => {
    axios.get('http://localhost:8080/api/email-logs')
      .then(response => {
        setLogs(response.data);
      })
      .catch(error => {
        console.error('There was an error fetching the logs!', error);
      });
  }, []);

  return (
    <Container>
      <Typography variant="h4" gutterBottom>Employee Email Log</Typography>
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>ID</TableCell>
              <TableCell>Message</TableCell>
              <TableCell>Vendor ID</TableCell>
              <TableCell>Vendor Email</TableCell>
              <TableCell>Created By</TableCell>
              
            </TableRow>
          </TableHead>
          <TableBody>
            {logs.map((log) => (
              <TableRow key={log.id}>
                <TableCell>{log.id}</TableCell>
                <TableCell>{log.message}</TableCell>
                <TableCell>{log.vendor_id}</TableCell>
                <TableCell>{log.vendor_email}</TableCell>
                <TableCell>{log.createdBy}</TableCell>
                
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Container>
  );
};

export default EmailLogList;
