import React, { useState, useEffect } from 'react';
import {
  Paper,
  Typography,
  Button,
  Box,
  Grid,
  Card,
  CardContent,
  CardHeader,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Chip,
  Alert,
  CircularProgress,
  TextField,
  InputAdornment,
  IconButton,
  Collapse
} from '@mui/material';
import {
  Refresh,
  Search,
  ExpandMore,
  ExpandLess,
  Assessment,
  People,
  TrendingUp,
  Storage
} from '@mui/icons-material';
import { motion } from 'framer-motion';
import axios from 'axios';

const AdminDashboard = () => {
  const [assessments, setAssessments] = useState([]);
  const [stats, setStats] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [searchEmail, setSearchEmail] = useState('');
  const [expandedRows, setExpandedRows] = useState(new Set());

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    setLoading(true);
    try {
      const [assessmentsRes, statsRes] = await Promise.all([
        axios.get('/api/admin/assessments'),
        axios.get('/api/admin/stats')
      ]);
      
      setAssessments(assessmentsRes.data);
      setStats(statsRes.data);
      setError('');
    } catch (err) {
      setError('Failed to fetch admin data');
      console.error('Admin data fetch error:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleRefresh = () => {
    fetchData();
  };

  const handleSearch = () => {
    if (!searchEmail.trim()) {
      fetchData();
      return;
    }

    setLoading(true);
    axios.get(`/api/admin/assessments/${encodeURIComponent(searchEmail)}`)
      .then(response => {
        setAssessments(response.data);
        setError('');
      })
      .catch(err => {
        setError('Failed to search assessments');
        console.error('Search error:', err);
      })
      .finally(() => {
        setLoading(false);
      });
  };

  const toggleRowExpansion = (id) => {
    const newExpanded = new Set(expandedRows);
    if (newExpanded.has(id)) {
      newExpanded.delete(id);
    } else {
      newExpanded.add(id);
    }
    setExpandedRows(newExpanded);
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleString();
  };

  const formatCurrency = (value) => {
    if (!value) return 'N/A';
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0
    }).format(value);
  };

  const getMaturityColor = (level) => {
    switch (level) {
      case 'Optimized': return 'success';
      case 'Advanced': return 'primary';
      case 'Intermediate': return 'warning';
      case 'Basic': return 'error';
      default: return 'default';
    }
  };

  if (loading) {
    return (
      <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '400px' }}>
        <CircularProgress />
      </Box>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
    >
      <Paper elevation={0} sx={{ p: 3, mb: 3 }}>
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
          <Typography variant="h4" component="h1" color="primary">
            Admin Dashboard
          </Typography>
          <Button
            variant="outlined"
            startIcon={<Refresh />}
            onClick={handleRefresh}
          >
            Refresh
          </Button>
        </Box>

        {error && (
          <Alert severity="error" sx={{ mb: 3 }}>
            {error}
          </Alert>
        )}

        {/* Statistics Cards */}
        {stats && (
          <Grid container spacing={3} sx={{ mb: 4 }}>
            <Grid item xs={12} sm={6} md={3}>
              <Card elevation={2}>
                <CardContent>
                  <Box sx={{ display: 'flex', alignItems: 'center' }}>
                    <Assessment color="primary" sx={{ mr: 2 }} />
                    <Box>
                      <Typography variant="h4" color="primary">
                        {stats.totalAssessments}
                      </Typography>
                      <Typography variant="body2" color="text.secondary">
                        Total Assessments
                      </Typography>
                    </Box>
                  </Box>
                </CardContent>
              </Card>
            </Grid>
            
            <Grid item xs={12} sm={6} md={3}>
              <Card elevation={2}>
                <CardContent>
                  <Box sx={{ display: 'flex', alignItems: 'center' }}>
                    <People color="primary" sx={{ mr: 2 }} />
                    <Box>
                      <Typography variant="h4" color="primary">
                        {stats.uniqueUsers}
                      </Typography>
                      <Typography variant="body2" color="text.secondary">
                        Unique Users
                      </Typography>
                    </Box>
                  </Box>
                </CardContent>
              </Card>
            </Grid>
            
            <Grid item xs={12} sm={6} md={3}>
              <Card elevation={2}>
                <CardContent>
                  <Box sx={{ display: 'flex', alignItems: 'center' }}>
                    <TrendingUp color="primary" sx={{ mr: 2 }} />
                    <Box>
                      <Typography variant="h4" color="primary">
                        {Math.round(stats.averageMaturityScore)}%
                      </Typography>
                      <Typography variant="body2" color="text.secondary">
                        Avg Maturity Score
                      </Typography>
                    </Box>
                  </Box>
                </CardContent>
              </Card>
            </Grid>
            
            <Grid item xs={12} sm={6} md={3}>
              <Card elevation={2}>
                <CardContent>
                  <Box sx={{ display: 'flex', alignItems: 'center' }}>
                    <Storage color="primary" sx={{ mr: 2 }} />
                    <Box>
                      <Typography variant="h4" color="primary">
                        {assessments.length}
                      </Typography>
                      <Typography variant="body2" color="text.secondary">
                        Records in DB
                      </Typography>
                    </Box>
                  </Box>
                </CardContent>
              </Card>
            </Grid>
          </Grid>
        )}

        {/* Search */}
        <Card elevation={2} sx={{ mb: 3 }}>
          <CardContent>
            <Typography variant="h6" gutterBottom>
              Search Assessments
            </Typography>
            <Box sx={{ display: 'flex', gap: 2 }}>
              <TextField
                fullWidth
                label="Search by Email"
                value={searchEmail}
                onChange={(e) => setSearchEmail(e.target.value)}
                onKeyPress={(e) => e.key === 'Enter' && handleSearch()}
                InputProps={{
                  endAdornment: (
                    <InputAdornment position="end">
                      <IconButton onClick={handleSearch}>
                        <Search />
                      </IconButton>
                    </InputAdornment>
                  ),
                }}
              />
            </Box>
          </CardContent>
        </Card>

        {/* Assessments Table */}
        <Card elevation={2}>
          <CardHeader
            title={`Assessment Results (${assessments.length} records)`}
            titleTypographyProps={{ variant: 'h6' }}
          />
          <CardContent>
            {assessments.length === 0 ? (
              <Alert severity="info">
                No assessment records found.
              </Alert>
            ) : (
              <TableContainer>
                <Table>
                  <TableHead>
                    <TableRow>
                      <TableCell>ID</TableCell>
                      <TableCell>Email</TableCell>
                      <TableCell>Name</TableCell>
                      <TableCell>Date</TableCell>
                      <TableCell>Maturity Score</TableCell>
                      <TableCell>Maturity Level</TableCell>
                      <TableCell>Actions</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {assessments.map((assessment) => (
                      <React.Fragment key={assessment.id}>
                        <TableRow>
                          <TableCell>{assessment.id}</TableCell>
                          <TableCell>{assessment.email}</TableCell>
                          <TableCell>{assessment.name || 'N/A'}</TableCell>
                          <TableCell>{formatDate(assessment.assessment_date)}</TableCell>
                          <TableCell>
                            <Typography variant="body2" fontWeight="bold">
                              {Math.round(assessment.maturity_score_overall)}%
                            </Typography>
                          </TableCell>
                          <TableCell>
                            <Chip
                              label={assessment.maturity_level}
                              color={getMaturityColor(assessment.maturity_level)}
                              size="small"
                            />
                          </TableCell>
                          <TableCell>
                            <IconButton
                              size="small"
                              onClick={() => toggleRowExpansion(assessment.id)}
                            >
                              {expandedRows.has(assessment.id) ? <ExpandLess /> : <ExpandMore />}
                            </IconButton>
                          </TableCell>
                        </TableRow>
                        <TableRow>
                          <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={7}>
                            <Collapse in={expandedRows.has(assessment.id)} timeout="auto" unmountOnExit>
                              <Box sx={{ margin: 1 }}>
                                <Grid container spacing={2}>
                                  <Grid item xs={12} md={6}>
                                    <Typography variant="subtitle2" gutterBottom>
                                      Pillar Scores:
                                    </Typography>
                                    {Object.entries(assessment.pillar_scores).map(([pillar, score]) => (
                                      <Box key={pillar} sx={{ mb: 1 }}>
                                        <Typography variant="body2">
                                          {pillar.replace('_', ' ').replace(/\b\w/g, l => l.toUpperCase())}: {Math.round(score)}%
                                        </Typography>
                                      </Box>
                                    ))}
                                  </Grid>
                                  <Grid item xs={12} md={6}>
                                    <Typography variant="subtitle2" gutterBottom>
                                      ROI Results:
                                    </Typography>
                                    <Typography variant="body2">
                                      Total Annual Savings: {formatCurrency(assessment.roi_results?.totalAnnualSavings)}
                                    </Typography>
                                    <Typography variant="body2">
                                      Implementation Cost: {formatCurrency(assessment.roi_results?.implementationCost)}
                                    </Typography>
                                    <Typography variant="body2">
                                      ROI: {assessment.roi_results?.roi ? `${Math.round(assessment.roi_results.roi)}%` : 'N/A'}
                                    </Typography>
                                  </Grid>
                                </Grid>
                              </Box>
                            </Collapse>
                          </TableCell>
                        </TableRow>
                      </React.Fragment>
                    ))}
                  </TableBody>
                </Table>
              </TableContainer>
            )}
          </CardContent>
        </Card>
      </Paper>
    </motion.div>
  );
};

export default AdminDashboard; 