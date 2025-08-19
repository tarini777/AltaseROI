import React, { useState } from 'react';
import {
  Container,
  Box,
  Stepper,
  Step,
  StepLabel,
  Paper,
  Typography,
  AppBar,
  Toolbar,
  Alert,
  Snackbar
} from '@mui/material';
import { motion, AnimatePresence } from 'framer-motion';

import Welcome from './components/Welcome';
import UserInfo from './components/UserInfo';
import MaturityAssessment from './components/MaturityAssessment';
import CostInputs from './components/CostInputs';
import Results from './components/Results';
import AdminDashboard from './components/AdminDashboard';

const steps = ['Welcome', 'User Information', 'Maturity Assessment', 'Cost Analysis', 'Results'];

// Client-side assessment processing functions
const calculateMaturityScore = (responses) => {
  const assessmentQuestions = {
    assured: [
      { id: "assured_1", weights: [1, 2, 3, 4] },
      { id: "assured_2", weights: [1, 2, 3, 4] },
      { id: "assured_3", weights: [1, 2, 3, 4] },
      { id: "assured_4", weights: [1, 2, 3, 4] }
    ],
    traceable: [
      { id: "traceable_1", weights: [1, 2, 3, 4] },
      { id: "traceable_2", weights: [1, 2, 3, 4] },
      { id: "traceable_3", weights: [1, 2, 3, 4] },
      { id: "traceable_4", weights: [1, 2, 3, 4] }
    ],
    logical: [
      { id: "logical_1", weights: [1, 2, 3, 4] },
      { id: "logical_2", weights: [1, 2, 3, 4] },
      { id: "logical_3", weights: [1, 2, 3, 4] },
      { id: "logical_4", weights: [1, 2, 3, 4] }
    ],
    ai_ready: [
      { id: "ai_ready_1", weights: [1, 2, 3, 4] },
      { id: "ai_ready_2", weights: [1, 2, 3, 4] },
      { id: "ai_ready_3", weights: [1, 2, 3, 4] },
      { id: "ai_ready_4", weights: [1, 2, 3, 4] }
    ],
    sovereign: [
      { id: "sovereign_1", weights: [1, 2, 3, 4] },
      { id: "sovereign_2", weights: [1, 2, 3, 4] },
      { id: "sovereign_3", weights: [1, 2, 3, 4] },
      { id: "sovereign_4", weights: [1, 2, 3, 4] }
    ],
    enhanced_resilience: [
      { id: "resilience_1", weights: [1, 2, 3, 4] },
      { id: "resilience_2", weights: [1, 2, 3, 4] },
      { id: "resilience_3", weights: [1, 2, 3, 4] },
      { id: "resilience_4", weights: [1, 2, 3, 4] }
    ]
  };

  const pillarScores = {};
  const maxScore = 4;
  
  Object.keys(assessmentQuestions).forEach(pillar => {
    const pillarResponses = responses.filter(r => r.pillar === pillar);
    const totalScore = pillarResponses.reduce((sum, response) => {
      const question = assessmentQuestions[pillar].find(q => q.id === response.questionId);
      return sum + question.weights[response.answer];
    }, 0);
    
    const maxPossibleScore = assessmentQuestions[pillar].length * maxScore;
    pillarScores[pillar] = (totalScore / maxPossibleScore) * 100;
  });
  
  const overallScore = Object.values(pillarScores).reduce((sum, score) => sum + score, 0) / Object.keys(pillarScores).length;
  
  return {
    pillarScores,
    overallScore,
    maturityLevel: getMaturityLevel(overallScore)
  };
};

const getMaturityLevel = (score) => {
  if (score >= 80) return 'Optimized';
  if (score >= 60) return 'Advanced';
  if (score >= 40) return 'Intermediate';
  return 'Basic';
};

// ROI calculation functions (simplified client-side version)
function calculateROI(maturityScore, costInputs) {
  const {
    dataScientistTime,
    dataScientistCount,
    dataScientistSalary,
    dataDuplicationCost,
    manualIntegrationCost,
    complianceViolationCost
  } = costInputs;

  // Base calculations
  const annualDataScientistCost = dataScientistCount * dataScientistSalary;
  const currentDataPrepCost = (dataScientistTime / 100) * annualDataScientistCost;
  const totalCurrentCost = currentDataPrepCost + dataDuplicationCost + manualIntegrationCost + complianceViolationCost;

  // Stencil Agent Framework benefits calculation
  const stencilAgentBenefits = calculateStencilAgentBenefits(maturityScore, costInputs);
  
  // Enhanced complexity multiplier with Stencil Agent Framework
  const complexityMultiplier = calculateComplexityMultiplier(costInputs);
  
  // ATLASE benefits with Stencil Agent Framework integration
  const atlaseBenefits = calculateATLASEBenefits(maturityScore, costInputs, stencilAgentBenefits);
  
  // Implementation costs with Stencil Agent Framework
  const implementationCosts = calculateImplementationCosts(maturityScore, costInputs, complexityMultiplier);
  
  // Total benefits including Stencil Agent Framework
  const totalBenefits = atlaseBenefits + stencilAgentBenefits.totalBenefits;
  
  // ROI calculation
  const netBenefits = totalBenefits - implementationCosts.totalCost;
  const roi = implementationCosts.totalCost > 0 ? (netBenefits / implementationCosts.totalCost) * 100 : 0;
  
  // Payback period
  const paybackPeriod = totalBenefits > 0 ? implementationCosts.totalCost / (totalBenefits / 12) : 0;

  return {
    currentCosts: {
      dataPreparation: currentDataPrepCost,
      dataDuplication: dataDuplicationCost,
      manualIntegration: manualIntegrationCost,
      complianceViolations: complianceViolationCost,
      total: totalCurrentCost
    },
    stencilAgentBenefits: stencilAgentBenefits,
    atlaseBenefits: atlaseBenefits,
    totalBenefits: totalBenefits,
    implementationCosts: implementationCosts,
    netBenefits: netBenefits,
    roi: roi,
    paybackPeriod: paybackPeriod,
    complexityMultiplier: complexityMultiplier
  };
}

function calculateStencilAgentBenefits(maturityScore, costInputs) {
  const {
    dataScientistCount,
    dataScientistSalary,
    timeToInsight
  } = costInputs;

  const annualDataScientistCost = dataScientistCount * dataScientistSalary;
  
  // Stencil Agent Framework operational benefits
  const developmentTimeReduction = 0.70; // 70% reduction in development time
  const maintainabilityImprovement = 0.90; // 90% improvement in maintainability
  const efficiencyIncrease = 0.60; // 60% increase in workflow efficiency
  
  // Calculate benefits based on maturity score
  const maturityMultiplier = maturityScore / 100;
  
  // Development cost savings
  const developmentCostSavings = annualDataScientistCost * developmentTimeReduction * maturityMultiplier;
  
  // Maintenance cost savings
  const maintenanceCostSavings = annualDataScientistCost * 0.3 * maintainabilityImprovement * maturityMultiplier;
  
  // Efficiency gains
  const efficiencyGains = annualDataScientistCost * efficiencyIncrease * maturityMultiplier;
  
  // Time to market acceleration
  const timeToMarketSavings = calculateTimeToMarketSavings(timeToInsight, maturityMultiplier);
  
  // Technology complexity reduction
  const complexityReductionSavings = calculateComplexityReductionSavings(maturityMultiplier);

  return {
    developmentCostSavings: developmentCostSavings,
    maintenanceCostSavings: maintenanceCostSavings,
    efficiencyGains: efficiencyGains,
    timeToMarketSavings: timeToMarketSavings,
    complexityReductionSavings: complexityReductionSavings,
    totalBenefits: developmentCostSavings + maintenanceCostSavings + efficiencyGains + timeToMarketSavings + complexityReductionSavings,
    metrics: {
      developmentTimeReduction: developmentTimeReduction * 100,
      maintainabilityImprovement: maintainabilityImprovement * 100,
      efficiencyIncrease: efficiencyIncrease * 100
    }
  };
}

function calculateTimeToMarketSavings(timeToInsight, maturityMultiplier) {
  const baseTimeToInsight = timeToInsight || 12; // weeks
  const stencilAgentAcceleration = 0.70; // 70% faster time to market
  const weeklyValue = 50000; // Estimated weekly value of faster insights
  
  const timeReduction = baseTimeToInsight * stencilAgentAcceleration * maturityMultiplier;
  return timeReduction * weeklyValue;
}

function calculateComplexityReductionSavings(maturityMultiplier) {
  const baseComplexityCost = 50000; // Simplified base complexity cost
  const complexityReduction = 0.50; // 50% reduction in complexity costs
  
  return baseComplexityCost * complexityReduction * maturityMultiplier;
}

function calculateComplexityMultiplier(costInputs) {
  const {
    legacySystemPercentage,
    cloudAdoptionPercentage
  } = costInputs;

  // Base complexity factors (simplified for client-side)
  const legacyFactor = (legacySystemPercentage / 100) * 0.3;
  const cloudFactor = (1 - cloudAdoptionPercentage / 100) * 0.3;

  // Stencil Agent Framework reduces complexity impact
  const stencilAgentComplexityReduction = 0.40; // 40% reduction in complexity impact

  const totalComplexity = (legacyFactor + cloudFactor);
  const adjustedComplexity = totalComplexity * (1 - stencilAgentComplexityReduction);

  return Math.max(1, 1 + adjustedComplexity);
}

function calculateATLASEBenefits(maturityScore, costInputs, stencilAgentBenefits) {
  const {
    dataScientistTime,
    dataScientistCount,
    dataScientistSalary,
    dataDuplicationCost,
    manualIntegrationCost,
    complianceViolationCost
  } = costInputs;

  const annualDataScientistCost = dataScientistCount * dataScientistSalary;
  const maturityMultiplier = maturityScore / 100;

  // Enhanced data preparation savings with Stencil Agent Framework
  const dataPrepSavings = (dataScientistTime / 100) * annualDataScientistCost * 0.6 * maturityMultiplier;
  
  // Enhanced duplication elimination with Stencil Agent Framework
  const duplicationSavings = dataDuplicationCost * 0.8 * maturityMultiplier;
  
  // Enhanced integration savings with Stencil Agent Framework
  const integrationSavings = manualIntegrationCost * 0.7 * maturityMultiplier;
  
  // Enhanced compliance savings with Stencil Agent Framework
  const complianceSavings = complianceViolationCost * 0.9 * maturityMultiplier;

  return dataPrepSavings + duplicationSavings + integrationSavings + complianceSavings;
}

function calculateImplementationCosts(maturityScore, costInputs, complexityMultiplier) {
  const {
    dataScientistCount,
    dataScientistSalary
  } = costInputs;

  const annualDataScientistCost = dataScientistCount * dataScientistSalary;
  const maturityMultiplier = maturityScore / 100;

  // Base implementation costs
  const baseImplementationCost = annualDataScientistCost * 0.5;
  
  // Stencil Agent Framework implementation costs
  const stencilAgentImplementationCost = calculateStencilAgentImplementationCost(costInputs);
  
  // ATLASE implementation costs
  const atlaseImplementationCost = baseImplementationCost * (1 - maturityMultiplier) * complexityMultiplier;
  
  // Total implementation cost
  const totalImplementationCost = stencilAgentImplementationCost + atlaseImplementationCost;

  return {
    stencilAgentCost: stencilAgentImplementationCost,
    atlaseCost: atlaseImplementationCost,
    totalCost: totalImplementationCost,
    complexityMultiplier: complexityMultiplier
  };
}

function calculateStencilAgentImplementationCost(costInputs) {
  const {
    dataScientistCount
  } = costInputs;

  // Base Stencil Agent Framework costs
  const baseFrameworkCost = 50000; // Base framework licensing and setup
  const perUserCost = 5000; // Cost per data scientist

  return baseFrameworkCost + (dataScientistCount * perUserCost);
}

function generateRecommendations(maturityScore, costInputs, stencilAgentBenefits) {
  const recommendations = {
    immediate: [],
    shortTerm: [],
    longTerm: [],
    stencilAgentSpecific: [],
    technologyConsiderations: [],
    riskMitigation: [],
    bestPractices: []
  };

  // Stencil Agent Framework specific recommendations
  if (stencilAgentBenefits.totalBenefits > 0) {
    recommendations.stencilAgentSpecific.push(
      "Implement Stencil Agent Framework to achieve 70% reduction in development time",
      "Leverage decoupled architecture for 90% improvement in system maintainability",
      "Utilize intelligent orchestration for 60% increase in workflow efficiency",
      "Establish stencil hierarchy (Grandad → Parent → Child → Sibling → Composite)",
      "Deploy specialized agents for domain-specific expertise"
    );
  }

  // Technology considerations
  recommendations.technologyConsiderations = [
    "Implement Stencil Agent Framework for AI-driven workflow orchestration",
    "Establish ATLASE data layer for unified data access",
    "Deploy intelligent agents for automated processing",
    "Configure dynamic routing based on workload and agent availability",
    "Implement predictive optimization using historical performance data"
  ];

  // Risk mitigation strategies
  recommendations.riskMitigation = [
    "Implement failover mechanisms for agent orchestration",
    "Establish audit trails for all stencil executions",
    "Configure load balancing for high availability",
    "Deploy monitoring and alerting for agent performance",
    "Implement data encryption for sensitive information"
  ];

  // Best practices
  recommendations.bestPractices = [
    "Start with foundation setup and core framework installation",
    "Develop stencils incrementally, beginning with high-level governance",
    "Create agents with specialized capabilities for specific domains",
    "Implement comprehensive testing for stencil-agent mappings",
    "Establish performance monitoring and optimization processes"
  ];

  // Maturity-based recommendations
  if (maturityScore < 25) {
    recommendations.immediate.push(
      "Begin with Stencil Agent Framework foundation setup",
      "Focus on establishing basic stencil hierarchy",
      "Implement core orchestration agents"
    );
  } else if (maturityScore < 50) {
    recommendations.shortTerm.push(
      "Expand stencil library with domain-specific frameworks",
      "Develop specialized processing agents",
      "Implement load balancing for scalability"
    );
  } else if (maturityScore < 75) {
    recommendations.longTerm.push(
      "Optimize stencil-agent mappings for performance",
      "Implement advanced AI capabilities",
      "Deploy predictive analytics for workflow optimization"
    );
  } else {
    recommendations.longTerm.push(
      "Implement advanced orchestration features",
      "Deploy multi-cloud support for distributed execution",
      "Establish enterprise-grade API management"
    );
  }

  return recommendations;
}

function App() {
  const [activeStep, setActiveStep] = useState(0);
  const [userInfo, setUserInfo] = useState({ email: '', name: '' });
  const [responses, setResponses] = useState([]);
  const [showAdmin, setShowAdmin] = useState(false);
  const [costInputs, setCostInputs] = useState({
    dataScientistTime: 65, // Default 65% as per white paper
    dataDuplicationCost: 500000,
    complianceViolationCost: 200000,
    timeToInsight: 12, // weeks
    manualIntegrationCost: 300000,
    annualRevenue: 10000000,
    dataScientistCount: 10,
    dataScientistSalary: 120000,
    // Technology landscape defaults
    technologyComplexity: 'medium',
    dataSourceCount: 5,
    integrationPatternCount: 3,
    legacySystemPercentage: 30,
    cloudAdoptionPercentage: 60,
    selectedDataSources: [],
    selectedIntegrationPatterns: []
  });
  const [results, setResults] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleNext = () => {
    setActiveStep((prevStep) => prevStep + 1);
  };

  const handleBack = () => {
    setActiveStep((prevStep) => prevStep - 1);
  };

  const handleUserInfoComplete = (info) => {
    setUserInfo(info);
    handleNext();
  };

  const handleAssessmentComplete = (assessmentResponses) => {
    setResponses(assessmentResponses);
    handleNext();
  };

  const handleCostInputsComplete = (inputs) => {
    setCostInputs(inputs);
    handleNext();
  };

  const handleCalculateROI = () => {
    setLoading(true);
    try {
      // Calculate maturity score
      const maturityScore = calculateMaturityScore(responses);
      
      // Calculate ROI
      const roiResults = calculateROI(maturityScore.overallScore, costInputs);
      
      // Generate recommendations
      const recommendations = generateRecommendations(maturityScore.overallScore, costInputs, roiResults.stencilAgentBenefits);
      
      // Prepare results
      const resultsData = {
        userInfo: userInfo,
        maturityScore: maturityScore,
        roiResults: roiResults,
        recommendations: recommendations
      };
      
      setResults(resultsData);
      handleNext();
    } catch (err) {
      setError('Failed to calculate ROI. Please try again.');
      console.error('Error calculating ROI:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleReset = () => {
    setActiveStep(0);
    setUserInfo({ email: '', name: '' });
    setResponses([]);
    setShowAdmin(false);
    setCostInputs({
      dataScientistTime: 65,
      dataDuplicationCost: 500000,
      complianceViolationCost: 200000,
      timeToInsight: 12,
      manualIntegrationCost: 300000,
      annualRevenue: 10000000,
      dataScientistCount: 10,
      dataScientistSalary: 120000,
      // Technology landscape defaults
      technologyComplexity: 'medium',
      dataSourceCount: 5,
      integrationPatternCount: 3,
      legacySystemPercentage: 30,
      cloudAdoptionPercentage: 60,
      selectedDataSources: [],
      selectedIntegrationPatterns: []
    });
    setResults(null);
  };

  const renderStepContent = () => {
    switch (activeStep) {
      case 0:
        return <Welcome onNext={handleNext} />;
      case 1:
        return (
          <UserInfo
            onComplete={handleUserInfoComplete}
            onBack={handleBack}
          />
        );
      case 2:
        return (
          <MaturityAssessment
            onComplete={handleAssessmentComplete}
          />
        );
      case 3:
        return (
          <CostInputs
            inputs={costInputs}
            onComplete={handleCostInputsComplete}
            onBack={handleBack}
            onCalculate={handleCalculateROI}
            loading={loading}
          />
        );
      case 4:
        return showAdmin ? (
          <AdminDashboard />
        ) : (
          <Results
            results={results}
            onReset={handleReset}
            userInfo={userInfo}
            onShowAdmin={() => setShowAdmin(true)}
          />
        );
      default:
        return null;
    }
  };

  return (
    <Box sx={{ flexGrow: 1, minHeight: '100vh', backgroundColor: 'background.default' }}>
      <AppBar position="static" elevation={0}>
        <Toolbar>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            ATLASE ROI Assessment Tool
          </Typography>
          <Typography variant="body2" color="inherit">
            Enterprise Data Architecture Maturity & ROI Calculator
          </Typography>
        </Toolbar>
      </AppBar>

      <Container maxWidth="lg" sx={{ py: 4 }}>
        <Paper elevation={0} sx={{ p: 3, mb: 3 }}>
          <Stepper activeStep={activeStep} alternativeLabel>
            {steps.map((label) => (
              <Step key={label}>
                <StepLabel>{label}</StepLabel>
              </Step>
            ))}
          </Stepper>
        </Paper>

        <AnimatePresence mode="wait">
          <motion.div
            key={activeStep}
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            transition={{ duration: 0.3 }}
          >
            {renderStepContent()}
          </motion.div>
        </AnimatePresence>
      </Container>

      <Snackbar
        open={!!error}
        autoHideDuration={6000}
        onClose={() => setError('')}
      >
        <Alert onClose={() => setError('')} severity="error" sx={{ width: '100%' }}>
          {error}
        </Alert>
      </Snackbar>
    </Box>
  );
}

export default App; 