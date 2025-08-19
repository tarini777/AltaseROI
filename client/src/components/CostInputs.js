import React, { useState } from 'react';
import {
  Paper,
  Typography,
  Button,
  Box,
  Grid,
  Card,
  CardContent,
  CardHeader,
  TextField,
  Slider,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Alert,
  Checkbox,
  FormControlLabel,
  FormGroup,
  Divider
} from '@mui/material';
import { motion } from 'framer-motion';
import {
  AttachMoney,
  Group,
  Storage,
  Security,
  Schedule,
  Architecture
} from '@mui/icons-material';

const CostInputs = ({ inputs, onComplete, onBack, onCalculate, loading }) => {
  const [costInputs, setCostInputs] = useState({
    ...inputs,
    technologyComplexity: 'medium',
    dataSourceCount: 5,
    integrationPatternCount: 3,
    legacySystemPercentage: 30,
    cloudAdoptionPercentage: 60,
    selectedDataSources: [],
    selectedIntegrationPatterns: []
  });
  const [errors, setErrors] = useState({});

  const handleInputChange = (field, value) => {
    setCostInputs(prev => ({
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

  const handleDataSourceToggle = (source) => {
    setCostInputs(prev => ({
      ...prev,
      selectedDataSources: prev.selectedDataSources.includes(source)
        ? prev.selectedDataSources.filter(s => s !== source)
        : [...prev.selectedDataSources, source]
    }));
  };

  const handleIntegrationPatternToggle = (pattern) => {
    setCostInputs(prev => ({
      ...prev,
      selectedIntegrationPatterns: prev.selectedIntegrationPatterns.includes(pattern)
        ? prev.selectedIntegrationPatterns.filter(p => p !== pattern)
        : [...prev.selectedIntegrationPatterns, pattern]
    }));
  };

  const validateInputs = () => {
    const newErrors = {};
    
    if (!costInputs.annualRevenue || costInputs.annualRevenue <= 0) {
      newErrors.annualRevenue = 'Annual revenue is required and must be positive';
    }
    
    if (!costInputs.dataScientistCount || costInputs.dataScientistCount <= 0) {
      newErrors.dataScientistCount = 'Number of data scientists is required and must be positive';
    }
    
    if (!costInputs.dataScientistSalary || costInputs.dataScientistSalary <= 0) {
      newErrors.dataScientistSalary = 'Data scientist salary is required and must be positive';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleCalculate = () => {
    if (validateInputs()) {
      onCalculate();
    }
  };

  const dataSources = [
    'Relational Databases (SQL Server, Oracle, PostgreSQL)',
    'NoSQL Databases (MongoDB, Cassandra, DynamoDB)',
    'Data Warehouses (Snowflake, Redshift, BigQuery)',
    'Data Lakes (S3, ADLS, GCS)',
    'Streaming Platforms (Kafka, Kinesis, Pub/Sub)',
    'Legacy Systems (Mainframes, COBOL)',
    'Cloud Platforms (AWS, Azure, GCP)',
    'On-Premise Systems',
    'SaaS Applications (Salesforce, Workday, SAP)',
    'IoT Devices and Edge Computing'
  ];

  const integrationPatterns = [
    'ETL/ELT Pipelines',
    'API-based Integration',
    'Event-Driven Architecture',
    'Data Virtualization',
    'Change Data Capture (CDC)',
    'Batch Processing',
    'Real-time Streaming',
    'Microservices Architecture',
    'Service-Oriented Architecture (SOA)',
    'Point-to-Point Integration'
  ];

  const costCategories = [
    {
      title: 'Data Scientist Efficiency',
      icon: <Group color="primary" />,
      description: 'Time spent on data preparation vs. analysis',
      fields: [
        {
          key: 'dataScientistTime',
          label: 'Data Preparation Time (%)',
          type: 'slider',
          min: 20,
          max: 80,
          step: 5,
          helperText: 'Percentage of data scientists\' time spent on data preparation (industry average: 50-80%)',
          defaultValue: 65
        },
        {
          key: 'dataScientistCount',
          label: 'Number of Data Scientists',
          type: 'number',
          helperText: 'Total number of data scientists in your organization'
        },
        {
          key: 'dataScientistSalary',
          label: 'Average Data Scientist Salary ($)',
          type: 'number',
          helperText: 'Average annual salary per data scientist'
        }
      ]
    },
    {
      title: 'Data Infrastructure Costs',
      icon: <Storage color="primary" />,
      description: 'Current costs associated with data management',
      fields: [
        {
          key: 'dataDuplicationCost',
          label: 'Annual Data Duplication Cost ($)',
          type: 'number',
          helperText: 'Cost of storing and managing duplicate data across systems'
        },
        {
          key: 'manualIntegrationCost',
          label: 'Annual Manual Integration Cost ($)',
          type: 'number',
          helperText: 'Cost of manual data integration and governance inconsistencies'
        }
      ]
    },
    {
      title: 'Compliance & Risk',
      icon: <Security color="primary" />,
      description: 'Costs related to compliance and regulatory risks',
      fields: [
        {
          key: 'complianceViolationCost',
          label: 'Annual Compliance Violation Cost ($)',
          type: 'number',
          helperText: 'Estimated cost of compliance violations or audit failures'
        }
      ]
    },
    {
      title: 'Time to Value',
      icon: <Schedule color="primary" />,
      description: 'Impact of slow data processes on business value',
      fields: [
        {
          key: 'timeToInsight',
          label: 'Time to Insight (weeks)',
          type: 'number',
          helperText: 'Average time from data request to actionable insights'
        },
        {
          key: 'annualRevenue',
          label: 'Annual Revenue ($)',
          type: 'number',
          helperText: 'Your organization\'s annual revenue for ROI calculations'
        }
      ]
    }
  ];

  const renderField = (field) => {
    const value = costInputs[field.key];
    const error = errors[field.key];

    if (field.type === 'slider') {
      return (
        <Box key={field.key} sx={{ mb: 3 }}>
          <Typography variant="subtitle2" gutterBottom>
            {field.label}: {value}%
          </Typography>
          <Slider
            value={value}
            onChange={(_, newValue) => handleInputChange(field.key, newValue)}
            min={field.min}
            max={field.max}
            step={field.step}
            marks={[
              { value: field.min, label: `${field.min}%` },
              { value: field.max, label: `${field.max}%` }
            ]}
            valueLabelDisplay="auto"
            sx={{ mb: 1 }}
          />
          <Typography variant="body2" color="text.secondary">
            {field.helperText}
          </Typography>
        </Box>
      );
    }

    return (
      <TextField
        key={field.key}
        fullWidth
        label={field.label}
        type="number"
        value={value}
        onChange={(e) => handleInputChange(field.key, parseFloat(e.target.value) || 0)}
        error={!!error}
        helperText={error || field.helperText}
        sx={{ mb: 3 }}
        InputProps={{
          startAdornment: field.key.includes('Cost') || field.key.includes('Revenue') || field.key.includes('Salary') 
            ? <AttachMoney sx={{ mr: 1, color: 'text.secondary' }} />
            : null
        }}
      />
    );
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
    >
      <Paper elevation={0} sx={{ p: 3, mb: 3 }}>
        <Typography variant="h4" gutterBottom align="center" color="primary">
          Cost & Technology Analysis
        </Typography>
        <Typography variant="body1" align="center" color="text.secondary" paragraph>
          Provide information about your current data architecture costs and technology landscape
        </Typography>
      </Paper>

      <Grid container spacing={3}>
        {costCategories.map((category, index) => (
          <Grid item xs={12} md={6} key={index}>
            <Card elevation={2}>
              <CardHeader
                avatar={category.icon}
                title={category.title}
                titleTypographyProps={{ variant: 'h6' }}
                subheader={category.description}
              />
              <CardContent>
                {category.fields.map(renderField)}
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>

      {/* Technology Landscape Assessment */}
      <Card elevation={2} sx={{ mt: 3, mb: 3 }}>
        <CardHeader
          avatar={<Architecture color="primary" />}
          title="Technology Landscape Assessment"
          titleTypographyProps={{ variant: 'h6' }}
          subheader="Assess your current technology complexity and heterogeneous landscape"
        />
        <CardContent>
          <Grid container spacing={3}>
            <Grid item xs={12} md={6}>
              <Typography variant="h6" gutterBottom>
                Technology Complexity
              </Typography>
              <FormControl fullWidth sx={{ mb: 3 }}>
                <InputLabel>Overall Technology Complexity</InputLabel>
                <Select
                  value={costInputs.technologyComplexity}
                  onChange={(e) => handleInputChange('technologyComplexity', e.target.value)}
                  label="Overall Technology Complexity"
                >
                  <MenuItem value="low">Low - Standardized, modern stack</MenuItem>
                  <MenuItem value="medium">Medium - Mixed legacy and modern</MenuItem>
                  <MenuItem value="high">High - Complex, heterogeneous landscape</MenuItem>
                </Select>
              </FormControl>

              <Box sx={{ mb: 3 }}>
                <Typography variant="subtitle2" gutterBottom>
                  Number of Data Sources: {costInputs.dataSourceCount}
                </Typography>
                <Slider
                  value={costInputs.dataSourceCount}
                  onChange={(_, value) => handleInputChange('dataSourceCount', value)}
                  min={1}
                  max={20}
                  step={1}
                  marks={[
                    { value: 1, label: '1' },
                    { value: 10, label: '10' },
                    { value: 20, label: '20+' }
                  ]}
                  valueLabelDisplay="auto"
                />
              </Box>

              <Box sx={{ mb: 3 }}>
                <Typography variant="subtitle2" gutterBottom>
                  Integration Patterns: {costInputs.integrationPatternCount}
                </Typography>
                <Slider
                  value={costInputs.integrationPatternCount}
                  onChange={(_, value) => handleInputChange('integrationPatternCount', value)}
                  min={1}
                  max={10}
                  step={1}
                  marks={[
                    { value: 1, label: '1' },
                    { value: 5, label: '5' },
                    { value: 10, label: '10' }
                  ]}
                  valueLabelDisplay="auto"
                />
              </Box>
            </Grid>

            <Grid item xs={12} md={6}>
              <Box sx={{ mb: 3 }}>
                <Typography variant="subtitle2" gutterBottom>
                  Legacy Systems: {costInputs.legacySystemPercentage}%
                </Typography>
                <Slider
                  value={costInputs.legacySystemPercentage}
                  onChange={(_, value) => handleInputChange('legacySystemPercentage', value)}
                  min={0}
                  max={100}
                  step={5}
                  marks={[
                    { value: 0, label: '0%' },
                    { value: 50, label: '50%' },
                    { value: 100, label: '100%' }
                  ]}
                  valueLabelDisplay="auto"
                />
              </Box>

              <Box sx={{ mb: 3 }}>
                <Typography variant="subtitle2" gutterBottom>
                  Cloud Adoption: {costInputs.cloudAdoptionPercentage}%
                </Typography>
                <Slider
                  value={costInputs.cloudAdoptionPercentage}
                  onChange={(_, value) => handleInputChange('cloudAdoptionPercentage', value)}
                  min={0}
                  max={100}
                  step={5}
                  marks={[
                    { value: 0, label: '0%' },
                    { value: 50, label: '50%' },
                    { value: 100, label: '100%' }
                  ]}
                  valueLabelDisplay="auto"
                />
              </Box>
            </Grid>
          </Grid>

          <Divider sx={{ my: 3 }} />

          <Typography variant="h6" gutterBottom>
            Data Sources in Use
          </Typography>
          <FormGroup row>
            {dataSources.map((source) => (
              <FormControlLabel
                key={source}
                control={
                  <Checkbox
                    checked={costInputs.selectedDataSources.includes(source)}
                    onChange={() => handleDataSourceToggle(source)}
                  />
                }
                label={source}
                sx={{ width: '50%', mb: 1 }}
              />
            ))}
          </FormGroup>

          <Divider sx={{ my: 3 }} />

          <Typography variant="h6" gutterBottom>
            Integration Patterns in Use
          </Typography>
          <FormGroup row>
            {integrationPatterns.map((pattern) => (
              <FormControlLabel
                key={pattern}
                control={
                  <Checkbox
                    checked={costInputs.selectedIntegrationPatterns.includes(pattern)}
                    onChange={() => handleIntegrationPatternToggle(pattern)}
                  />
                }
                label={pattern}
                sx={{ width: '50%', mb: 1 }}
              />
            ))}
          </FormGroup>
        </CardContent>
      </Card>

      <Paper elevation={2} sx={{ p: 3, mt: 3 }}>
        <Typography variant="h6" gutterBottom color="primary">
          Technology Complexity Summary
        </Typography>
        <Grid container spacing={2}>
          <Grid item xs={12} sm={6} md={3}>
            <Box sx={{ textAlign: 'center', p: 2, bgcolor: 'grey.50', borderRadius: 2 }}>
              <Typography variant="h6" color="primary">
                {costInputs.dataSourceCount}
              </Typography>
              <Typography variant="body2" color="text.secondary">
                Data Sources
              </Typography>
            </Box>
          </Grid>
          <Grid item xs={12} sm={6} md={3}>
            <Box sx={{ textAlign: 'center', p: 2, bgcolor: 'grey.50', borderRadius: 2 }}>
              <Typography variant="h6" color="primary">
                {costInputs.integrationPatternCount}
              </Typography>
              <Typography variant="body2" color="text.secondary">
                Integration Patterns
              </Typography>
            </Box>
          </Grid>
          <Grid item xs={12} sm={6} md={3}>
            <Box sx={{ textAlign: 'center', p: 2, bgcolor: 'grey.50', borderRadius: 2 }}>
              <Typography variant="h6" color="primary">
                {costInputs.legacySystemPercentage}%
              </Typography>
              <Typography variant="body2" color="text.secondary">
                Legacy Systems
              </Typography>
            </Box>
          </Grid>
          <Grid item xs={12} sm={6} md={3}>
            <Box sx={{ textAlign: 'center', p: 2, bgcolor: 'grey.50', borderRadius: 2 }}>
              <Typography variant="h6" color="primary">
                {costInputs.cloudAdoptionPercentage}%
              </Typography>
              <Typography variant="body2" color="text.secondary">
                Cloud Adoption
              </Typography>
            </Box>
          </Grid>
        </Grid>
      </Paper>

      <Alert severity="info" sx={{ mt: 3, mb: 3 }}>
        <Typography variant="body2">
          <strong>Note:</strong> Technology complexity factors into implementation costs and timeline. 
          Higher complexity environments require more sophisticated integration approaches and may have 
          longer implementation timelines but can achieve greater ROI through better optimization.
        </Typography>
      </Alert>

      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <Button
          variant="outlined"
          onClick={onBack}
        >
          Back to Assessment
        </Button>

        <Button
          variant="contained"
          onClick={handleCalculate}
          disabled={loading}
          sx={{ px: 4 }}
        >
          {loading ? 'Calculating ROI...' : 'Calculate ROI'}
        </Button>
      </Box>
    </motion.div>
  );
};

export default CostInputs; 