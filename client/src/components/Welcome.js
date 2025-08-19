import React from 'react';
import {
  Paper,
  Typography,
  Button,
  Box,
  Grid,
  Card,
  CardContent,
  CardHeader,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Chip
} from '@mui/material';
import {
  Assessment,
  TrendingUp,
  Security,
  Speed,
  Storage,
  Analytics
} from '@mui/icons-material';
import { motion } from 'framer-motion';

const Welcome = ({ onNext }) => {
  const pillars = [
    {
      name: 'Assured',
      description: 'Data quality, integrity, and automated validation',
      icon: <Security color="primary" />
    },
    {
      name: 'Traceable',
      description: 'Data lineage, audit capabilities, and immutable records',
      icon: <Analytics color="primary" />
    },
    {
      name: 'Logical',
      description: 'Intelligent virtualization and decoupled storage',
      icon: <Storage color="primary" />
    },
    {
      name: 'AI-Ready',
      description: 'Optimized for ML workloads and automated classification',
      icon: <TrendingUp color="primary" />
    },
    {
      name: 'Sovereign',
      description: 'Tamper-resistant controls and cryptographic integrity',
      icon: <Security color="primary" />
    },
    {
      name: 'Enhanced Resilience',
      description: 'Comprehensive security and disaster recovery',
      icon: <Speed color="primary" />
    }
  ];

  const benefits = [
    'Reduce data scientist time spent on data preparation by 60-80%',
    'Eliminate 60-80% of data duplication costs through "Store Once, View Many"',
    'Accelerate AI model development and deployment by 70%',
    'Improve regulatory compliance and reduce audit risks by 50%',
    'Amplify value in existing data investments rather than costly replacements'
  ];

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
    >
      <Paper elevation={0} sx={{ p: 4, mb: 3 }}>
        <Typography variant="h3" component="h1" gutterBottom align="center" color="primary">
          Welcome to ATLASE ROI Assessment
        </Typography>
        <Typography variant="h6" align="center" color="text.secondary" paragraph>
          Measure your enterprise data architecture maturity and calculate potential ROI
        </Typography>
        
        <Box sx={{ textAlign: 'center', mb: 4 }}>
          <Chip
            icon={<Assessment />}
            label="Based on ATLASE White Paper Principles"
            color="primary"
            variant="outlined"
            sx={{ fontSize: '1.1rem', py: 1 }}
          />
        </Box>

        <Typography variant="body1" paragraph sx={{ fontSize: '1.1rem', textAlign: 'center' }}>
          ATLASE (Assured, Traceable, Logical, AI-Ready, Sovereign, Enhanced Resilience) 
          drives value by achieving 'AI-Ready' and 'Sovereign' data architecture through 
          its innovative 'Store Once, View Many' approach.
        </Typography>
      </Paper>

      <Grid container spacing={3} sx={{ mb: 4 }}>
        <Grid item xs={12} md={6}>
          <Card elevation={2}>
            <CardHeader
              title="ATLASE Pillars"
              titleTypographyProps={{ variant: 'h5', color: 'primary' }}
            />
            <CardContent>
              <Grid container spacing={2}>
                {pillars.map((pillar, index) => (
                  <Grid item xs={12} sm={6} key={pillar.name}>
                    <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
                      {pillar.icon}
                      <Typography variant="subtitle1" sx={{ ml: 1, fontWeight: 600 }}>
                        {pillar.name}
                      </Typography>
                    </Box>
                    <Typography variant="body2" color="text.secondary">
                      {pillar.description}
                    </Typography>
                  </Grid>
                ))}
              </Grid>
            </CardContent>
          </Card>
        </Grid>

        <Grid item xs={12} md={6}>
          <Card elevation={2}>
            <CardHeader
              title="Expected Benefits"
              titleTypographyProps={{ variant: 'h5', color: 'primary' }}
            />
            <CardContent>
              <List>
                {benefits.map((benefit, index) => (
                  <ListItem key={index} sx={{ py: 0.5 }}>
                    <ListItemIcon>
                      <TrendingUp color="success" />
                    </ListItemIcon>
                    <ListItemText primary={benefit} />
                  </ListItem>
                ))}
              </List>
            </CardContent>
          </Card>
        </Grid>
      </Grid>

      <Box sx={{ textAlign: 'center' }}>
        <Typography variant="body1" paragraph color="text.secondary">
          This assessment will help you understand your current maturity level across all ATLASE pillars 
          and calculate the potential ROI of implementing ATLASE principles in your organization.
        </Typography>
        
        <Button
          variant="contained"
          size="large"
          onClick={onNext}
          sx={{ 
            px: 4, 
            py: 1.5, 
            fontSize: '1.1rem',
            borderRadius: 2
          }}
        >
          Get Started
        </Button>
      </Box>
    </motion.div>
  );
};

export default Welcome; 