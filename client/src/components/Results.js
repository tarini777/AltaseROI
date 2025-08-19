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
  Chip,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Divider,
  Alert,
  LinearProgress,
  Accordion,
  AccordionSummary,
  AccordionDetails
} from '@mui/material';
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  RadarChart,
  PolarGrid,
  PolarAngleAxis,
  PolarRadiusAxis,
  Radar
} from 'recharts';
import { motion } from 'framer-motion';
import {
  CheckCircle,
  Warning,
  Download,
  Refresh,
  Timeline as TimelineIcon,
  ExpandMore,
  Architecture,
  Security,
  School,
  Assessment,
  AttachMoney
} from '@mui/icons-material';

const Results = ({ results, onReset, userInfo, onShowAdmin }) => {
  if (!results) return null;

  const { maturityScore, roiResults, recommendations, userInfo: resultUserInfo } = results;
  const displayUserInfo = userInfo || resultUserInfo || {};

  const formatCurrency = (value) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0
    }).format(value);
  };

  const formatPercentage = (value) => {
    return `${Math.round(value)}%`;
  };

  const getMaturityColor = (score) => {
    if (score >= 80) return '#4caf50';
    if (score >= 60) return '#2196f3';
    if (score >= 40) return '#ff9800';
    return '#f44336';
  };

  const getMaturityLevelColor = (level) => {
    switch (level) {
      case 'Optimized': return '#4caf50';
      case 'Advanced': return '#2196f3';
      case 'Intermediate': return '#ff9800';
      case 'Basic': return '#f44336';
      default: return '#757575';
    }
  };

  // Data for charts
  const pillarData = Object.entries(maturityScore.pillarScores).map(([pillar, score]) => ({
    pillar: pillar.replace('_', ' ').replace(/\b\w/g, l => l.toUpperCase()),
    score: Math.round(score),
    fill: getMaturityColor(score)
  }));

  const savingsData = [
    {
      name: 'Stencil Agent Benefits',
      savings: roiResults.stencilAgentBenefits?.totalBenefits || 0,
      color: '#4caf50'
    },
    {
      name: 'ATLASE Benefits',
      savings: roiResults.atlaseBenefits || 0,
      color: '#2196f3'
    },
    {
      name: 'Development Savings',
      savings: roiResults.stencilAgentBenefits?.developmentCostSavings || 0,
      color: '#ff9800'
    },
    {
      name: 'Efficiency Gains',
      savings: roiResults.stencilAgentBenefits?.efficiencyGains || 0,
      color: '#9c27b0'
    },
    {
      name: 'Complexity Reduction',
      savings: roiResults.stencilAgentBenefits?.complexityReductionSavings || 0,
      color: '#f44336'
    }
  ];

  const radarData = pillarData.map(item => ({
    subject: item.pillar,
    A: item.score,
    fullMark: 100
  }));

  const displayROIResults = () => {
    const { roiResults } = results;
    
    // Debug logging
    console.log('ROI Results received:', roiResults);
    console.log('ROI value:', roiResults?.roi);
    console.log('Payback period:', roiResults?.paybackPeriod);
    
    return (
      <Card elevation={3} sx={{ mb: 3 }}>
        <CardContent>
          <Typography variant="h5" gutterBottom color="primary" sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
            <AttachMoney sx={{ mr: 1 }} />
            ROI Analysis with Stencil Agent Framework
          </Typography>

          <Grid container spacing={3}>
            {/* Current Costs */}
            <Grid item xs={12} md={6}>
              <Card variant="outlined" sx={{ height: '100%' }}>
                <CardContent>
                  <Typography variant="h6" gutterBottom color="error">
                    Current Annual Costs
                  </Typography>
                  <List dense>
                    <ListItem>
                      <ListItemText 
                        primary="Data Preparation" 
                        secondary={`$${roiResults.currentCosts?.dataPreparation?.toLocaleString() || '0'}`} 
                      />
                    </ListItem>
                    <ListItem>
                      <ListItemText 
                        primary="Data Duplication" 
                        secondary={`$${roiResults.currentCosts?.dataDuplication?.toLocaleString() || '0'}`} 
                      />
                    </ListItem>
                    <ListItem>
                      <ListItemText 
                        primary="Manual Integration" 
                        secondary={`$${roiResults.currentCosts?.manualIntegration?.toLocaleString() || '0'}`} 
                      />
                    </ListItem>
                    <ListItem>
                      <ListItemText 
                        primary="Compliance Violations" 
                        secondary={`$${roiResults.currentCosts?.complianceViolations?.toLocaleString() || '0'}`} 
                      />
                    </ListItem>
                    <Divider sx={{ my: 1 }} />
                    <ListItem>
                      <ListItemText 
                        primary="Total Current Cost" 
                        secondary={`$${roiResults.currentCosts?.total?.toLocaleString() || '0'}`}
                        primaryTypographyProps={{ fontWeight: 'bold' }}
                        secondaryTypographyProps={{ fontWeight: 'bold', color: 'error.main' }}
                      />
                    </ListItem>
                  </List>
                </CardContent>
              </Card>
            </Grid>

            {/* Stencil Agent Framework Benefits */}
            <Grid item xs={12} md={6}>
              <Card variant="outlined" sx={{ height: '100%', bgcolor: 'success.light' }}>
                <CardContent>
                  <Typography variant="h6" gutterBottom color="success.dark">
                    Stencil Agent Framework Benefits
                  </Typography>
                  <List dense>
                    <ListItem>
                      <ListItemText 
                        primary="Development Cost Savings" 
                        secondary={`$${roiResults.stencilAgentBenefits?.developmentCostSavings?.toLocaleString() || '0'}`} 
                      />
                    </ListItem>
                    <ListItem>
                      <ListItemText 
                        primary="Maintenance Cost Savings" 
                        secondary={`$${roiResults.stencilAgentBenefits?.maintenanceCostSavings?.toLocaleString() || '0'}`} 
                      />
                    </ListItem>
                    <ListItem>
                      <ListItemText 
                        primary="Efficiency Gains" 
                        secondary={`$${roiResults.stencilAgentBenefits?.efficiencyGains?.toLocaleString() || '0'}`} 
                      />
                    </ListItem>
                    <ListItem>
                      <ListItemText 
                        primary="Time to Market Savings" 
                        secondary={`$${roiResults.stencilAgentBenefits?.timeToMarketSavings?.toLocaleString() || '0'}`} 
                      />
                    </ListItem>
                    <ListItem>
                      <ListItemText 
                        primary="Complexity Reduction" 
                        secondary={`$${roiResults.stencilAgentBenefits?.complexityReductionSavings?.toLocaleString() || '0'}`} 
                      />
                    </ListItem>
                    <Divider sx={{ my: 1 }} />
                    <ListItem>
                      <ListItemText 
                        primary="Total Stencil Agent Benefits" 
                        secondary={`$${roiResults.stencilAgentBenefits?.totalBenefits?.toLocaleString() || '0'}`}
                        primaryTypographyProps={{ fontWeight: 'bold' }}
                        secondaryTypographyProps={{ fontWeight: 'bold', color: 'success.dark' }}
                      />
                    </ListItem>
                  </List>
                </CardContent>
              </Card>
            </Grid>

            {/* ATLASE Benefits */}
            <Grid item xs={12} md={6}>
              <Card variant="outlined" sx={{ height: '100%', bgcolor: 'info.light' }}>
                <CardContent>
                  <Typography variant="h6" gutterBottom color="info.dark">
                    ATLASE Benefits
                  </Typography>
                  <Typography variant="body2" paragraph>
                    Enhanced benefits through ATLASE principles integration
                  </Typography>
                  <Typography variant="h4" color="info.dark" sx={{ fontWeight: 'bold' }}>
                    ${roiResults.atlaseBenefits?.toLocaleString() || '0'}
                  </Typography>
                </CardContent>
              </Card>
            </Grid>

            {/* Implementation Costs */}
            <Grid item xs={12} md={6}>
              <Card variant="outlined" sx={{ height: '100%', bgcolor: 'warning.light' }}>
                <CardContent>
                  <Typography variant="h6" gutterBottom color="warning.dark">
                    Implementation Costs
                  </Typography>
                  <List dense>
                    <ListItem>
                      <ListItemText 
                        primary="Stencil Agent Framework" 
                        secondary={`$${roiResults.implementationCosts?.stencilAgentCost?.toLocaleString() || '0'}`} 
                      />
                    </ListItem>
                    <ListItem>
                      <ListItemText 
                        primary="ATLASE Implementation" 
                        secondary={`$${roiResults.implementationCosts?.atlaseCost?.toLocaleString() || '0'}`} 
                      />
                    </ListItem>
                    <Divider sx={{ my: 1 }} />
                    <ListItem>
                      <ListItemText 
                        primary="Total Implementation Cost" 
                        secondary={`$${roiResults.implementationCosts?.totalCost?.toLocaleString() || '0'}`}
                        primaryTypographyProps={{ fontWeight: 'bold' }}
                        secondaryTypographyProps={{ fontWeight: 'bold', color: 'warning.dark' }}
                      />
                    </ListItem>
                  </List>
                </CardContent>
              </Card>
            </Grid>

            {/* ROI Summary */}
            <Grid item xs={12}>
              <Card variant="outlined" sx={{ bgcolor: 'primary.light' }}>
                <CardContent>
                  <Typography variant="h5" gutterBottom color="primary.dark" sx={{ textAlign: 'center' }}>
                    ROI Summary
                  </Typography>
                  <Grid container spacing={2} justifyContent="center">
                    <Grid item xs={12} md={3}>
                      <Box textAlign="center">
                        <Typography variant="h4" color="success.main" sx={{ fontWeight: 'bold' }}>
                          {roiResults.roi?.toFixed(1) || '0'}%
                        </Typography>
                        <Typography variant="body2" color="text.secondary">
                          Return on Investment
                        </Typography>
                      </Box>
                    </Grid>
                    <Grid item xs={12} md={3}>
                      <Box textAlign="center">
                        <Typography variant="h4" color="info.main" sx={{ fontWeight: 'bold' }}>
                          ${roiResults.netBenefits?.toLocaleString() || '0'}
                        </Typography>
                        <Typography variant="body2" color="text.secondary">
                          Net Benefits
                        </Typography>
                      </Box>
                    </Grid>
                    <Grid item xs={12} md={3}>
                      <Box textAlign="center">
                        <Typography variant="h4" color="warning.main" sx={{ fontWeight: 'bold' }}>
                          {roiResults.paybackPeriod?.toFixed(1) || '0'}
                        </Typography>
                        <Typography variant="body2" color="text.secondary">
                          Payback Period (months)
                        </Typography>
                      </Box>
                    </Grid>
                    <Grid item xs={12} md={3}>
                      <Box textAlign="center">
                        <Typography variant="h4" color="secondary.main" sx={{ fontWeight: 'bold' }}>
                          {roiResults.complexityMultiplier?.toFixed(2) || '1.0'}x
                        </Typography>
                        <Typography variant="body2" color="text.secondary">
                          Complexity Multiplier
                        </Typography>
                      </Box>
                    </Grid>
                  </Grid>
                </CardContent>
              </Card>
            </Grid>

            {/* Stencil Agent Framework Metrics */}
            <Grid item xs={12}>
              <Card variant="outlined" sx={{ bgcolor: 'success.light' }}>
                <CardContent>
                  <Typography variant="h6" gutterBottom color="success.dark">
                    Stencil Agent Framework Performance Metrics
                  </Typography>
                  <Grid container spacing={2}>
                    <Grid item xs={12} md={3}>
                      <Box textAlign="center">
                        <Typography variant="h4" color="success.main" sx={{ fontWeight: 'bold' }}>
                          {roiResults.stencilAgentBenefits?.metrics?.developmentTimeReduction || '70'}%
                        </Typography>
                        <Typography variant="body2" color="text.secondary">
                          Development Time Reduction
                        </Typography>
                      </Box>
                    </Grid>
                    <Grid item xs={12} md={3}>
                      <Box textAlign="center">
                        <Typography variant="h4" color="success.main" sx={{ fontWeight: 'bold' }}>
                          {roiResults.stencilAgentBenefits?.metrics?.maintainabilityImprovement || '90'}%
                        </Typography>
                        <Typography variant="body2" color="text.secondary">
                          Maintainability Improvement
                        </Typography>
                      </Box>
                    </Grid>
                    <Grid item xs={12} md={3}>
                      <Box textAlign="center">
                        <Typography variant="h4" color="success.main" sx={{ fontWeight: 'bold' }}>
                          {roiResults.stencilAgentBenefits?.metrics?.efficiencyIncrease || '60'}%
                        </Typography>
                        <Typography variant="body2" color="text.secondary">
                          Workflow Efficiency Increase
                        </Typography>
                      </Box>
                    </Grid>
                    <Grid item xs={12} md={3}>
                      <Box textAlign="center">
                        <Typography variant="h4" color="success.main" sx={{ fontWeight: 'bold' }}>
                          40%
                        </Typography>
                        <Typography variant="body2" color="text.secondary">
                          Complexity Impact Reduction
                        </Typography>
                      </Box>
                    </Grid>
                  </Grid>
                </CardContent>
              </Card>
            </Grid>
          </Grid>
        </CardContent>
      </Card>
    );
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
    >
      {/* User Information Display */}
      {displayUserInfo.email && (
        <Card elevation={1} sx={{ mb: 3, bgcolor: 'primary.50' }}>
          <CardContent>
            <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
              <Box>
                <Typography variant="h6" color="primary" gutterBottom>
                  Assessment for {displayUserInfo.name || 'User'}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  {displayUserInfo.email}
                </Typography>
              </Box>
              <Chip 
                label="Personalized Results" 
                color="primary" 
                variant="outlined"
                size="small"
              />
            </Box>
          </CardContent>
        </Card>
      )}

      <Paper elevation={0} sx={{ p: 3, mb: 3 }}>
        <Typography variant="h3" gutterBottom align="center" color="primary">
          Assessment Results
        </Typography>
        <Typography variant="h6" align="center" color="text.secondary" paragraph>
          Your ATLASE maturity score and potential ROI analysis
        </Typography>
      </Paper>

      {/* Overall Maturity Score */}
      <Card elevation={3} sx={{ mb: 3 }}>
        <CardContent>
          <Box sx={{ textAlign: 'center', mb: 3 }}>
            <Typography variant="h4" gutterBottom color="primary">
              Overall Maturity Score
            </Typography>
            <Box sx={{ position: 'relative', display: 'inline-flex', mb: 2 }}>
              <LinearProgress
                variant="determinate"
                value={maturityScore.overallScore}
                sx={{
                  width: 200,
                  height: 20,
                  borderRadius: 10,
                  backgroundColor: 'grey.200',
                  '& .MuiLinearProgress-bar': {
                    backgroundColor: getMaturityColor(maturityScore.overallScore),
                    borderRadius: 10
                  }
                }}
              />
              <Box
                sx={{
                  position: 'absolute',
                  top: '50%',
                  left: '50%',
                  transform: 'translate(-50%, -50%)',
                  color: 'white',
                  fontWeight: 'bold'
                }}
              >
                {Math.round(maturityScore.overallScore)}%
              </Box>
            </Box>
            <Chip
              label={maturityScore.maturityLevel}
              color="primary"
              variant="filled"
              sx={{
                backgroundColor: getMaturityLevelColor(maturityScore.maturityLevel),
                fontSize: '1.1rem',
                py: 1
              }}
            />
          </Box>
        </CardContent>
      </Card>

      <Grid container spacing={3} sx={{ mb: 3 }}>
        {/* Maturity Radar Chart */}
        <Grid item xs={12} md={6}>
          <Card elevation={2}>
            <CardHeader
              title="ATLASE Pillars Maturity"
              titleTypographyProps={{ variant: 'h6' }}
            />
            <CardContent>
              <ResponsiveContainer width="100%" height={300}>
                <RadarChart data={radarData}>
                  <PolarGrid />
                  <PolarAngleAxis dataKey="subject" />
                  <PolarRadiusAxis angle={30} domain={[0, 100]} />
                  <Radar
                    name="Maturity Score"
                    dataKey="A"
                    stroke="#8884d8"
                    fill="#8884d8"
                    fillOpacity={0.6}
                  />
                </RadarChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </Grid>

        {/* ROI Summary */}
        <Grid item xs={12} md={6}>
          {displayROIResults()}
        </Grid>
      </Grid>

      {/* Implementation Phases */}
      {roiResults.implementationPhases && (
        <Card elevation={2} sx={{ mb: 3 }}>
          <CardHeader
            title="Stencil Agent Framework Implementation Roadmap"
            titleTypographyProps={{ variant: 'h6' }}
            avatar={<TimelineIcon color="primary" />}
          />
          <CardContent>
            <Grid container spacing={3}>
              {roiResults.implementationPhases.map((phase, index) => (
                <Grid item xs={12} md={4} key={index}>
                  <Card elevation={1} sx={{ height: '100%' }}>
                    <CardContent>
                      <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                        <Box
                          sx={{
                            width: 40,
                            height: 40,
                            borderRadius: '50%',
                            backgroundColor: 'primary.main',
                            color: 'white',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            fontWeight: 'bold',
                            mr: 2
                          }}
                        >
                          {index + 1}
                        </Box>
                        <Typography variant="h6" component="span">
                          {phase.name}
                        </Typography>
                      </Box>
                      
                      <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
                        {phase.focus}
                      </Typography>
                      
                      <Typography variant="body2" color="primary" sx={{ mb: 2, fontWeight: 'bold' }}>
                        Duration: {phase.duration}
                      </Typography>
                      
                      <Typography variant="body2" color="primary" sx={{ mb: 2 }}>
                        Cost: {formatCurrency(phase.cost)}
                      </Typography>
                      
                      <Accordion sx={{ mb: 1 }}>
                        <AccordionSummary expandIcon={<ExpandMore />}>
                          <Typography variant="body2" fontWeight="bold">
                            Activities
                          </Typography>
                        </AccordionSummary>
                        <AccordionDetails>
                          <List dense>
                            {phase.activities.map((activity, idx) => (
                              <ListItem key={idx} sx={{ py: 0.5 }}>
                                <ListItemIcon>
                                  <CheckCircle color="primary" fontSize="small" />
                                </ListItemIcon>
                                <ListItemText primary={activity} />
                              </ListItem>
                            ))}
                          </List>
                        </AccordionDetails>
                      </Accordion>
                      
                      <Accordion>
                        <AccordionSummary expandIcon={<ExpandMore />}>
                          <Typography variant="body2" fontWeight="bold">
                            Deliverables
                          </Typography>
                        </AccordionSummary>
                        <AccordionDetails>
                          <List dense>
                            {phase.deliverables.map((deliverable, idx) => (
                              <ListItem key={idx} sx={{ py: 0.5 }}>
                                <ListItemIcon>
                                  <CheckCircle color="success" fontSize="small" />
                                </ListItemIcon>
                                <ListItemText primary={deliverable} />
                              </ListItem>
                            ))}
                          </List>
                        </AccordionDetails>
                      </Accordion>
                    </CardContent>
                  </Card>
                </Grid>
              ))}
            </Grid>
          </CardContent>
        </Card>
      )}

      {/* Savings Breakdown */}
      <Card elevation={2} sx={{ mb: 3 }}>
        <CardHeader
          title="Annual Savings Breakdown"
          titleTypographyProps={{ variant: 'h6' }}
        />
        <CardContent>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={savingsData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip 
                formatter={(value) => formatCurrency(value)}
                labelStyle={{ color: '#333' }}
              />
              <Bar dataKey="savings" fill="#8884d8" />
            </BarChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>

      {/* Detailed Pillar Analysis */}
      <Card elevation={2} sx={{ mb: 3 }}>
        <CardHeader
          title="Detailed Pillar Analysis"
          titleTypographyProps={{ variant: 'h6' }}
        />
        <CardContent>
          <Grid container spacing={2}>
            {pillarData.map((pillar, index) => (
              <Grid item xs={12} sm={6} md={4} key={pillar.pillar}>
                <Box sx={{ p: 2, border: 1, borderColor: 'grey.300', borderRadius: 2 }}>
                  <Typography variant="subtitle1" gutterBottom fontWeight="bold">
                    {pillar.pillar}
                  </Typography>
                  <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
                    <LinearProgress
                      variant="determinate"
                      value={pillar.score}
                      sx={{
                        flexGrow: 1,
                        mr: 2,
                        height: 8,
                        borderRadius: 4,
                        '& .MuiLinearProgress-bar': {
                          backgroundColor: pillar.fill
                        }
                      }}
                    />
                    <Typography variant="body2" fontWeight="bold">
                      {pillar.score}%
                    </Typography>
                  </Box>
                  <Chip
                    label={pillar.score >= 80 ? 'Optimized' : pillar.score >= 60 ? 'Advanced' : pillar.score >= 40 ? 'Intermediate' : 'Basic'}
                    size="small"
                    sx={{
                      backgroundColor: pillar.fill,
                      color: 'white',
                      fontSize: '0.75rem'
                    }}
                  />
                </Box>
              </Grid>
            ))}
          </Grid>
        </CardContent>
      </Card>

      {/* Enhanced Recommendations */}
      <Card elevation={2} sx={{ mb: 3 }}>
        <CardHeader
          title="Implementation Recommendations"
          titleTypographyProps={{ variant: 'h6' }}
        />
        <CardContent>
          <Grid container spacing={3}>
            <Grid item xs={12} md={6}>
              <Typography variant="h6" gutterBottom color="error.main">
                Immediate Actions
              </Typography>
              <List dense>
                {recommendations.immediate.map((rec, index) => (
                  <ListItem key={index} sx={{ py: 0.5 }}>
                    <ListItemIcon>
                      <Warning color="error" />
                    </ListItemIcon>
                    <ListItemText primary={rec} />
                  </ListItem>
                ))}
              </List>
            </Grid>
            
            <Grid item xs={12} md={6}>
              <Typography variant="h6" gutterBottom color="warning.main">
                Short Term (3-6 months)
              </Typography>
              <List dense>
                {recommendations.shortTerm.map((rec, index) => (
                  <ListItem key={index} sx={{ py: 0.5 }}>
                    <ListItemIcon>
                      <TimelineIcon color="warning" />
                    </ListItemIcon>
                    <ListItemText primary={rec} />
                  </ListItem>
                ))}
              </List>
            </Grid>
          </Grid>

          {/* Stencil Agent Framework Specific Recommendations */}
          {recommendations.stencilAgentSpecific && recommendations.stencilAgentSpecific.length > 0 && (
            <>
              <Divider sx={{ my: 3 }} />
              <Typography variant="h6" gutterBottom color="success.main">
                Stencil Agent Framework Recommendations
              </Typography>
              <List dense>
                {recommendations.stencilAgentSpecific.map((rec, index) => (
                  <ListItem key={index} sx={{ py: 0.5 }}>
                    <ListItemIcon>
                      <Assessment color="success" />
                    </ListItemIcon>
                    <ListItemText primary={rec} />
                  </ListItem>
                ))}
              </List>
            </>
          )}

          {/* Technology Considerations */}
          {recommendations.technologyConsiderations && recommendations.technologyConsiderations.length > 0 && (
            <>
              <Divider sx={{ my: 3 }} />
              <Typography variant="h6" gutterBottom color="primary">
                Technology Considerations
              </Typography>
              <List dense>
                {recommendations.technologyConsiderations.map((rec, index) => (
                  <ListItem key={index} sx={{ py: 0.5 }}>
                    <ListItemIcon>
                      <Architecture color="primary" />
                    </ListItemIcon>
                    <ListItemText primary={rec} />
                  </ListItem>
                ))}
              </List>
            </>
          )}

          {/* Risk Mitigation */}
          {recommendations.riskMitigation && recommendations.riskMitigation.length > 0 && (
            <>
              <Divider sx={{ my: 3 }} />
              <Typography variant="h6" gutterBottom color="warning.main">
                Risk Mitigation Strategies
              </Typography>
              <List dense>
                {recommendations.riskMitigation.map((rec, index) => (
                  <ListItem key={index} sx={{ py: 0.5 }}>
                    <ListItemIcon>
                      <Security color="warning" />
                    </ListItemIcon>
                    <ListItemText primary={rec} />
                  </ListItem>
                ))}
              </List>
            </>
          )}

          {/* Best Practices */}
          {recommendations.bestPractices && recommendations.bestPractices.length > 0 && (
            <>
              <Divider sx={{ my: 3 }} />
              <Typography variant="h6" gutterBottom color="success.main">
                Best Practices
              </Typography>
              <List dense>
                {recommendations.bestPractices.map((rec, index) => (
                  <ListItem key={index} sx={{ py: 0.5 }}>
                    <ListItemIcon>
                      <School color="success" />
                    </ListItemIcon>
                    <ListItemText primary={rec} />
                  </ListItem>
                ))}
              </List>
            </>
          )}
        </CardContent>
      </Card>

      <Alert severity="success" sx={{ mb: 3 }}>
        <Typography variant="body1">
          <strong>Congratulations!</strong> You've completed the ATLASE ROI assessment. 
          Based on your current maturity level of <strong>{maturityScore.maturityLevel}</strong>, 
          implementing ATLASE principles could deliver a <strong>{formatPercentage(roiResults.roi)} ROI</strong> 
          with a payback period of <strong>{roiResults.paybackPeriod.toFixed(1)} months</strong>.
          {roiResults.complexityMultiplier > 1.5 && (
            <span> Your technology complexity requires a <strong>{roiResults.complexityMultiplier.toFixed(1)}x</strong> implementation effort, 
            but this investment will provide significant long-term benefits.</span>
          )}
        </Typography>
      </Alert>

      <Box sx={{ display: 'flex', justifyContent: 'center', gap: 2 }}>
        <Button
          variant="outlined"
          startIcon={<Download />}
          onClick={() => window.print()}
        >
          Download Report
        </Button>
        
        <Button
          variant="outlined"
          color="secondary"
          startIcon={<Assessment />}
          onClick={onShowAdmin}
        >
          Admin Dashboard
        </Button>
        
        <Button
          variant="contained"
          startIcon={<Refresh />}
          onClick={onReset}
        >
          Start New Assessment
        </Button>
      </Box>
    </motion.div>
  );
};

export default Results; 