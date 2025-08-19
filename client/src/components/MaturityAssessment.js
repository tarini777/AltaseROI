import React, { useState } from 'react';
import {
  Card,
  CardContent,
  Typography,
  Slider,
  FormControl,
  RadioGroup,
  FormControlLabel,
  Radio,
  Button,
  Box,
  Grid,
  Accordion,
  AccordionSummary,
  AccordionDetails,
  Chip
} from '@mui/material';
import { ExpandMore, NavigateBefore, NavigateNext } from '@mui/icons-material';

// Assessment questions embedded directly in component
const assessmentQuestions = {
  assured: [
    {
      id: "assured_1",
      question: "How would you rate your current data quality and integrity measures?",
      type: "slider",
      options: ["Poor", "Fair", "Good", "Excellent"],
      weights: [1, 2, 3, 4]
    },
    {
      id: "assured_2",
      question: "Do you have automated data validation and monitoring in place?",
      type: "multiple_choice",
      options: ["None", "Basic", "Advanced", "Comprehensive"],
      weights: [1, 2, 3, 4]
    },
    {
      id: "assured_3",
      question: "How standardized are your data formats across systems?",
      type: "slider",
      options: ["Not Standardized", "Partially", "Mostly", "Fully Standardized"],
      weights: [1, 2, 3, 4]
    },
    {
      id: "assured_4",
      question: "Do you use data contracts or stencils for data governance?",
      type: "multiple_choice",
      options: ["No", "Planning", "Partial", "Full Implementation"],
      weights: [1, 2, 3, 4]
    }
  ],
  traceable: [
    {
      id: "traceable_1",
      question: "How comprehensive is your data lineage tracking?",
      type: "slider",
      options: ["None", "Basic", "Advanced", "Complete"],
      weights: [1, 2, 3, 4]
    },
    {
      id: "traceable_2",
      question: "Do you maintain immutable records of data transformations?",
      type: "multiple_choice",
      options: ["No", "Some", "Most", "All"],
      weights: [1, 2, 3, 4]
    },
    {
      id: "traceable_3",
      question: "How robust are your audit capabilities?",
      type: "slider",
      options: ["Minimal", "Basic", "Good", "Excellent"],
      weights: [1, 2, 3, 4]
    },
    {
      id: "traceable_4",
      question: "Are you considering or using DLT for data lineage?",
      type: "multiple_choice",
      options: ["No Plans", "Evaluating", "Pilot", "Implemented"],
      weights: [1, 2, 3, 4]
    }
  ],
  logical: [
    {
      id: "logical_1",
      question: "How well is your storage decoupled from consumption?",
      type: "slider",
      options: ["Tightly Coupled", "Some Decoupling", "Mostly Decoupled", "Fully Decoupled"],
      weights: [1, 2, 3, 4]
    },
    {
      id: "logical_2",
      question: "Do you implement intelligent virtualization?",
      type: "multiple_choice",
      options: ["No", "Basic", "Advanced", "Comprehensive"],
      weights: [1, 2, 3, 4]
    },
    {
      id: "logical_3",
      question: "How automated is your schema reconciliation?",
      type: "slider",
      options: ["Manual", "Semi-Automated", "Mostly Automated", "Fully Automated"],
      weights: [1, 2, 3, 4]
    },
    {
      id: "logical_4",
      question: "Do you use materialized views for performance optimization?",
      type: "multiple_choice",
      options: ["No", "Limited", "Extensive", "Strategic"],
      weights: [1, 2, 3, 4]
    }
  ],
  ai_ready: [
    {
      id: "ai_ready_1",
      question: "How optimized is your data for ML/AI workloads?",
      type: "slider",
      options: ["Not Optimized", "Basic", "Good", "Highly Optimized"],
      weights: [1, 2, 3, 4]
    },
    {
      id: "ai_ready_2",
      question: "Do you have automated data classification and tagging?",
      type: "multiple_choice",
      options: ["No", "Manual", "Semi-Automated", "Fully Automated"],
      weights: [1, 2, 3, 4]
    },
    {
      id: "ai_ready_3",
      question: "How advanced is your feature engineering automation?",
      type: "slider",
      options: ["None", "Basic", "Advanced", "Comprehensive"],
      weights: [1, 2, 3, 4]
    },
    {
      id: "ai_ready_4",
      question: "Do you implement intelligent caching strategies?",
      type: "multiple_choice",
      options: ["No", "Basic", "Advanced", "Strategic"],
      weights: [1, 2, 3, 4]
    }
  ],
  sovereign: [
    {
      id: "sovereign_1",
      question: "How tamper-resistant are your data controls?",
      type: "slider",
      options: ["Not Resistant", "Basic", "Good", "Highly Resistant"],
      weights: [1, 2, 3, 4]
    },
    {
      id: "sovereign_2",
      question: "Do you have cryptographic integrity measures?",
      type: "multiple_choice",
      options: ["No", "Some", "Most", "Comprehensive"],
      weights: [1, 2, 3, 4]
    },
    {
      id: "sovereign_3",
      question: "How definitive is your source of truth?",
      type: "slider",
      options: ["Multiple Sources", "Some Clarity", "Mostly Clear", "Single Source"],
      weights: [1, 2, 3, 4]
    },
    {
      id: "sovereign_4",
      question: "Do you extend controls to edge computing?",
      type: "multiple_choice",
      options: ["No Edge", "Planning", "Partial", "Full Extension"],
      weights: [1, 2, 3, 4]
    }
  ],
  enhanced_resilience: [
    {
      id: "resilience_1",
      question: "How comprehensive is your security framework?",
      type: "slider",
      options: ["Basic", "Standard", "Advanced", "Comprehensive"],
      weights: [1, 2, 3, 4]
    },
    {
      id: "resilience_2",
      question: "Do you have automated disaster recovery?",
      type: "multiple_choice",
      options: ["Manual", "Semi-Automated", "Mostly Automated", "Fully Automated"],
      weights: [1, 2, 3, 4]
    },
    {
      id: "resilience_3",
      question: "How robust is your defense-in-depth strategy?",
      type: "slider",
      options: ["Single Layer", "Multiple Layers", "Advanced", "Comprehensive"],
      weights: [1, 2, 3, 4]
    },
    {
      id: "resilience_4",
      question: "Do you integrate with edge computing and DLT for secure lineage?",
      type: "multiple_choice",
      options: ["No Integration", "Planning", "Partial", "Full Integration"],
      weights: [1, 2, 3, 4]
    }
  ]
};

const pillarNames = {
  assured: "Assured",
  traceable: "Traceable", 
  logical: "Logical",
  ai_ready: "AI-Ready",
  sovereign: "Sovereign",
  enhanced_resilience: "Enhanced Resilience"
};

const pillarColors = {
  assured: "#1976d2",
  traceable: "#388e3c",
  logical: "#f57c00", 
  ai_ready: "#7b1fa2",
  sovereign: "#d32f2f",
  enhanced_resilience: "#0288d1"
};

const MaturityAssessment = ({ onComplete }) => {
  const [currentPillar, setCurrentPillar] = useState(0);
  const [responses, setResponses] = useState({});
  const [expandedPillar, setExpandedPillar] = useState(null);

  const pillars = Object.keys(assessmentQuestions);
  const currentPillarKey = pillars[currentPillar];
  const currentQuestions = assessmentQuestions[currentPillarKey];

  const handleResponse = (questionId, answer) => {
    setResponses(prev => ({
      ...prev,
      [questionId]: {
        pillar: currentPillarKey,
        questionId,
        answer
      }
    }));
  };

  const handleNext = () => {
    if (currentPillar < pillars.length - 1) {
      setCurrentPillar(currentPillar + 1);
    } else {
      // Convert responses to the format expected by the assessment logic
      const formattedResponses = Object.values(responses).filter(r => r !== null);
      onComplete(formattedResponses);
    }
  };

  const handlePrevious = () => {
    if (currentPillar > 0) {
      setCurrentPillar(currentPillar - 1);
    }
  };

  const getPillarProgress = (pillarKey) => {
    const pillarQuestions = assessmentQuestions[pillarKey];
    const answeredQuestions = pillarQuestions.filter(q => responses[q.id]);
    return (answeredQuestions.length / pillarQuestions.length) * 100;
  };

  const isCurrentPillarComplete = () => {
    return currentQuestions.every(q => responses[q.id]);
  };



  const renderQuestion = (question) => {
    const currentResponse = responses[question.id];

    if (question.type === "slider") {
      return (
        <Box key={question.id} sx={{ mb: 4 }}>
          <Typography variant="h6" gutterBottom>
            {question.question}
          </Typography>
          <Slider
            value={currentResponse?.answer || 0}
            onChange={(_, value) => handleResponse(question.id, value)}
            min={0}
            max={3}
            step={1}
            marks={question.options.map((option, index) => ({
              value: index,
              label: option
            }))}
            valueLabelDisplay="auto"
            sx={{ mt: 2 }}
          />
          <Typography variant="body2" color="text.secondary" sx={{ mt: 1 }}>
            Current: {question.options[currentResponse?.answer || 0]}
          </Typography>
        </Box>
      );
    }

    if (question.type === "multiple_choice") {
      return (
        <Box key={question.id} sx={{ mb: 4 }}>
          <Typography variant="h6" gutterBottom>
            {question.question}
          </Typography>
          <FormControl component="fieldset">
            <RadioGroup
              value={currentResponse?.answer || ""}
              onChange={(e) => handleResponse(question.id, parseInt(e.target.value))}
            >
              {question.options.map((option, index) => (
                <FormControlLabel
                  key={index}
                  value={index}
                  control={<Radio />}
                  label={option}
                />
              ))}
            </RadioGroup>
          </FormControl>
        </Box>
      );
    }

    return null;
  };

  return (
    <Box sx={{ maxWidth: 800, mx: 'auto', p: 3 }}>
      <Typography variant="h4" gutterBottom align="center" color="primary">
        ATLASE Maturity Assessment
      </Typography>
      
      <Typography variant="body1" paragraph align="center" color="text.secondary">
        Assess your organization's maturity across the six ATLASE pillars
      </Typography>

      {/* Pillar Progress Overview */}
      <Card sx={{ mb: 3 }}>
        <CardContent>
          <Typography variant="h6" gutterBottom>
            Assessment Progress
          </Typography>
          <Grid container spacing={2}>
            {pillars.map((pillar, index) => (
              <Grid item xs={12} sm={6} md={4} key={pillar}>
                <Accordion 
                  expanded={expandedPillar === pillar}
                  onChange={() => setExpandedPillar(expandedPillar === pillar ? null : pillar)}
                  sx={{ 
                    border: currentPillar === index ? 2 : 1,
                    borderColor: currentPillar === index ? pillarColors[pillar] : 'divider'
                  }}
                >
                  <AccordionSummary expandIcon={<ExpandMore />}>
                    <Box sx={{ display: 'flex', alignItems: 'center', width: '100%' }}>
                      <Chip 
                        label={`${Math.round(getPillarProgress(pillar))}%`}
                        color={getPillarProgress(pillar) === 100 ? "success" : "default"}
                        size="small"
                        sx={{ mr: 1 }}
                      />
                      <Typography 
                        variant="subtitle1" 
                        sx={{ 
                          color: pillarColors[pillar],
                          fontWeight: currentPillar === index ? 'bold' : 'normal'
                        }}
                      >
                        {pillarNames[pillar]}
                      </Typography>
                    </Box>
                  </AccordionSummary>
                  <AccordionDetails>
                    <Typography variant="body2" color="text.secondary">
                      {getPillarProgress(pillar) === 100 ? 
                        "✓ Complete" : 
                        `${assessmentQuestions[pillar].filter(q => responses[q.id]).length}/${assessmentQuestions[pillar].length} questions answered`
                      }
                    </Typography>
                  </AccordionDetails>
                </Accordion>
              </Grid>
            ))}
          </Grid>
        </CardContent>
      </Card>

      {/* Current Pillar Questions */}
      <Card>
        <CardContent>
          <Box sx={{ display: 'flex', alignItems: 'center', mb: 3 }}>
            <Chip 
              label={`Pillar ${currentPillar + 1} of ${pillars.length}`}
              color="primary"
              sx={{ mr: 2 }}
            />
            <Typography 
              variant="h5" 
              sx={{ color: pillarColors[currentPillarKey] }}
            >
              {pillarNames[currentPillarKey]}
            </Typography>
          </Box>

          {currentQuestions.map(renderQuestion)}

          <Box sx={{ display: 'flex', justifyContent: 'space-between', mt: 4 }}>
            <Button
              variant="outlined"
              startIcon={<NavigateBefore />}
              onClick={handlePrevious}
              disabled={currentPillar === 0}
            >
              Previous
            </Button>
            
            <Button
              variant="contained"
              endIcon={currentPillar === pillars.length - 1 ? null : <NavigateNext />}
              onClick={handleNext}
              disabled={!isCurrentPillarComplete()}
              sx={{ 
                bgcolor: pillarColors[currentPillarKey],
                '&:hover': { bgcolor: pillarColors[currentPillarKey] }
              }}
            >
              {currentPillar === pillars.length - 1 ? 'Complete Assessment' : 'Next'}
            </Button>
          </Box>
        </CardContent>
      </Card>
    </Box>
  );
};

export default MaturityAssessment; 