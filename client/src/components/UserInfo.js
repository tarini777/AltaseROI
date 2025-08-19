import React, { useState } from 'react';
import {
  Paper,
  Typography,
  Button,
  Box,
  Card,
  CardContent,
  Alert,
  FormControl,
  InputLabel,
  OutlinedInput,
  InputAdornment
} from '@mui/material';
import { motion } from 'framer-motion';
import {
  Email,
  Person,
  ArrowForward,
  Info
} from '@mui/icons-material';

const UserInfo = ({ onComplete, onBack }) => {
  const [userInfo, setUserInfo] = useState({
    email: '',
    name: ''
  });
  const [errors, setErrors] = useState({});

  const validateEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const validateForm = () => {
    const newErrors = {};

    if (!userInfo.email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!validateEmail(userInfo.email)) {
      newErrors.email = 'Please enter a valid email address';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validateForm()) {
      onComplete(userInfo);
    }
  };

  const handleInputChange = (field, value) => {
    setUserInfo(prev => ({
      ...prev,
      [field]: value
    }));
    
    // Clear error when user starts typing
    if (errors[field]) {
      setErrors(prev => ({
        ...prev,
        [field]: ''
      }));
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <Paper elevation={2} sx={{ p: 4, maxWidth: 600, mx: 'auto' }}>
        <Box sx={{ textAlign: 'center', mb: 4 }}>
          <Typography variant="h4" component="h1" gutterBottom color="primary">
            Welcome to ATLASE ROI Assessment
          </Typography>
          <Typography variant="body1" color="text.secondary" sx={{ mb: 3 }}>
            Please provide your information to get started with your personalized assessment
          </Typography>
        </Box>

        <Alert severity="info" sx={{ mb: 3 }}>
          <Info sx={{ mr: 1 }} />
          Your assessment results will be tailored to your organization's specific needs and challenges.
        </Alert>

        <form onSubmit={handleSubmit}>
          <Card elevation={1} sx={{ mb: 3 }}>
            <CardContent>
              <Typography variant="h6" gutterBottom>
                Contact Information
              </Typography>
              
              <FormControl fullWidth sx={{ mb: 3 }} error={!!errors.email}>
                <InputLabel htmlFor="email-input">Email Address *</InputLabel>
                <OutlinedInput
                  id="email-input"
                  type="email"
                  value={userInfo.email}
                  onChange={(e) => handleInputChange('email', e.target.value)}
                  startAdornment={
                    <InputAdornment position="start">
                      <Email color="action" />
                    </InputAdornment>
                  }
                  label="Email Address *"
                  placeholder="your.email@company.com"
                  error={!!errors.email}
                />
                {errors.email && (
                  <Typography variant="caption" color="error" sx={{ mt: 1, display: 'block' }}>
                    {errors.email}
                  </Typography>
                )}
              </FormControl>

              <FormControl fullWidth sx={{ mb: 2 }}>
                <InputLabel htmlFor="name-input">Full Name (Optional)</InputLabel>
                <OutlinedInput
                  id="name-input"
                  type="text"
                  value={userInfo.name}
                  onChange={(e) => handleInputChange('name', e.target.value)}
                  startAdornment={
                    <InputAdornment position="start">
                      <Person color="action" />
                    </InputAdornment>
                  }
                  label="Full Name (Optional)"
                  placeholder="John Doe"
                />
                <Typography variant="caption" color="text.secondary" sx={{ mt: 1, display: 'block' }}>
                  Providing your name helps us personalize your assessment experience
                </Typography>
              </FormControl>
            </CardContent>
          </Card>

          <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <Button
              variant="outlined"
              onClick={onBack}
              sx={{ minWidth: 120 }}
            >
              Back
            </Button>
            
            <Button
              type="submit"
              variant="contained"
              size="large"
              endIcon={<ArrowForward />}
              sx={{ minWidth: 150 }}
            >
              Start Assessment
            </Button>
          </Box>
        </form>

        <Box sx={{ mt: 4, p: 2, bgcolor: 'grey.50', borderRadius: 1 }}>
          <Typography variant="body2" color="text.secondary">
            <strong>Privacy Notice:</strong> Your email and name will only be used to:
          </Typography>
          <ul style={{ margin: '8px 0', paddingLeft: '20px' }}>
            <li>Personalize your assessment experience</li>
            <li>Send you your assessment results (if requested)</li>
            <li>Provide follow-up recommendations</li>
          </ul>
          <Typography variant="body2" color="text.secondary">
            We will not share your information with third parties without your explicit consent.
          </Typography>
        </Box>
      </Paper>
    </motion.div>
  );
};

export default UserInfo; 