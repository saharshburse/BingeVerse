import React, { useState } from 'react';
import {
  Container, TextField, Button, Typography, Box, Paper
} from '@mui/material';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const Register = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    password: ''
  });

  const [message, setMessage] = useState('');

  const handleChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post('http://localhost:8080/api/auth/register', formData);
      setMessage(res.data);
      setFormData({ firstName: '', lastName: '', email: '', password: '' });
      setTimeout(() => navigate('/login'), 1500);
    } catch (err) {
      setMessage(err.response?.data || 'Registration failed');
    }
  };

  return (
    <Container maxWidth="sm">
      <Paper elevation={3} sx={{ p: 4, mt: 8 }}>
        <Typography variant="h5" gutterBottom>
          Register for BingeVerse
        </Typography>
        <Box component="form" onSubmit={handleSubmit}>
          <TextField
            fullWidth margin="normal" label="First Name" name="firstName"
            value={formData.firstName} onChange={handleChange}
          />
          <TextField
            fullWidth margin="normal" label="Last Name" name="lastName"
            value={formData.lastName} onChange={handleChange}
          />
          <TextField
            fullWidth margin="normal" label="Email" name="email" type="email"
            value={formData.email} onChange={handleChange}
          />
          <TextField
            fullWidth margin="normal" label="Password" name="password" type="password"
            value={formData.password} onChange={handleChange}
          />
          <Button fullWidth variant="contained" type="submit" sx={{ mt: 2 }}>
            Register
          </Button>
        </Box>
        {message && (
          <Typography variant="body2" color="secondary" sx={{ mt: 2 }}>
            {message}
          </Typography>
        )}
      </Paper>
    </Container>
  );
};

export default Register;
