import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Routes, Link, Navigate } from 'react-router-dom';
import { AppBar, Toolbar, Typography, Button, Container } from '@mui/material';
import EmployeeList from './components/EmployeeList';
import VendorList from './components/VendorList';
import EmailLogList from './components/EmailLogList';
import CreateEmployee from './components/CreateEmployee';
import CreateVendor from './components/CreateVendor';
import SendEmail from './components/SendEmail';
import LoginPage from './components/LoginPage';

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userEmail, setUserEmail] = useState('');
  const [userId, setUserId] = useState(null);

  const handleLogin = (email, id) => {
    setIsLoggedIn(true);
    setUserEmail(email);
    setUserId(id);
  };

  const handleLogout = () => {
    setIsLoggedIn(false);
    setUserEmail('');
    setUserId(null);
  };

  return (
    <Router>
      <div>
        <AppBar position="static">
          <Toolbar>
            <Typography variant="h6" style={{ flexGrow: 1, cursor: 'pointer' }}>
              <Link to="/" style={{ color: 'inherit', textDecoration: 'none' }}>
                Vendor Management
              </Link>
            </Typography>
            {isLoggedIn ? (
              <>
                <Button color="inherit" component={Link} to="/employees">Employees</Button>
                <Button color="inherit" component={Link} to="/vendors">Vendors</Button>
                <Button color="inherit" component={Link} to="/email-logs">Email Logs</Button>
                <Button color="inherit" component={Link} to="/create-employee">Create Employee</Button>
                <Button color="inherit" component={Link} to="/create-vendor">Create Vendor</Button>
                <Button color="inherit" component={Link} to="/send-email">Send Email</Button>
                <Button color="inherit" onClick={handleLogout}>Logout</Button>
              </>
            ) : null }
          </Toolbar>
        </AppBar>
        <Container style={{ marginTop: '20px' }}>
          <Routes>
           
            <Route path="/" element={isLoggedIn ? <Navigate to="/home" /> : <Navigate to="/login" />} />
            <Route path="/home" element={isLoggedIn ? <EmployeeList userId={userId} /> : <Navigate to="/login" />} />
            <Route path="/employees" element={isLoggedIn ? <EmployeeList userId={userId} /> : <Navigate to="/login" />} />
            <Route path="/vendors" element={isLoggedIn ? <VendorList /> : <Navigate to="/login" />} />
            <Route path="/email-logs" element={isLoggedIn ? <EmailLogList /> : <Navigate to="/login" />} />
            <Route path="/create-employee" element={isLoggedIn ? <CreateEmployee createdBy={userId} /> : <Navigate to="/login" />} />
            <Route path="/create-vendor" element={isLoggedIn ? <CreateVendor /> : <Navigate to="/login" />} />
            <Route path="/send-email" element={isLoggedIn ? <SendEmail /> : <Navigate to="/login" />} />
          
            {!isLoggedIn && <Route path="/login" element={<LoginPage onLogin={handleLogin} />} />}
          </Routes>
        </Container>
      </div>
    </Router>
  );
}

export default App;
