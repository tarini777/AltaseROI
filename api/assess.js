// API endpoint for assessment processing
const sqlite3 = require('sqlite3').verbose();
const path = require('path');

// Assessment questions (same as questions.js)
const assessmentQuestions = {
  assured: [
    { id: "assured_1", question: "How would you rate your current data quality and integrity measures?", type: "slider", options: ["Poor", "Fair", "Good", "Excellent"], weights: [1, 2, 3, 4] },
    { id: "assured_2", question: "Do you have automated data validation and monitoring in place?", type: "multiple_choice", options: ["None", "Basic", "Advanced", "Comprehensive"], weights: [1, 2, 3, 4] },
    { id: "assured_3", question: "How standardized are your data formats across systems?", type: "slider", options: ["Not Standardized", "Partially", "Mostly", "Fully Standardized"], weights: [1, 2, 3, 4] },
    { id: "assured_4", question: "Do you use data contracts or stencils for data governance?", type: "multiple_choice", options: ["No", "Planning", "Partial", "Full Implementation"], weights: [1, 2, 3, 4] }
  ],
  traceable: [
    { id: "traceable_1", question: "How comprehensive is your data lineage tracking?", type: "slider", options: ["None", "Basic", "Advanced", "Complete"], weights: [1, 2, 3, 4] },
    { id: "traceable_2", question: "Do you maintain immutable records of data transformations?", type: "multiple_choice", options: ["No", "Some", "Most", "All"], weights: [1, 2, 3, 4] },
    { id: "traceable_3", question: "How robust are your audit capabilities?", type: "slider", options: ["Minimal", "Basic", "Good", "Excellent"], weights: [1, 2, 3, 4] },
    { id: "traceable_4", question: "Are you considering or using DLT for data lineage?", type: "multiple_choice", options: ["No Plans", "Evaluating", "Pilot", "Implemented"], weights: [1, 2, 3, 4] }
  ],
  logical: [
    { id: "logical_1", question: "How well is your storage decoupled from consumption?", type: "slider", options: ["Tightly Coupled", "Some Decoupling", "Mostly Decoupled", "Fully Decoupled"], weights: [1, 2, 3, 4] },
    { id: "logical_2", question: "Do you implement intelligent virtualization?", type: "multiple_choice", options: ["No", "Basic", "Advanced", "Comprehensive"], weights: [1, 2, 3, 4] },
    { id: "logical_3", question: "How automated is your schema reconciliation?", type: "slider", options: ["Manual", "Semi-Automated", "Mostly Automated", "Fully Automated"], weights: [1, 2, 3, 4] },
    { id: "logical_4", question: "Do you use materialized views for performance optimization?", type: "multiple_choice", options: ["No", "Limited", "Extensive", "Strategic"], weights: [1, 2, 3, 4] }
  ],
  ai_ready: [
    { id: "ai_ready_1", question: "How optimized is your data for ML/AI workloads?", type: "slider", options: ["Not Optimized", "Basic", "Good", "Highly Optimized"], weights: [1, 2, 3, 4] },
    { id: "ai_ready_2", question: "Do you have automated data classification and tagging?", type: "multiple_choice", options: ["No", "Manual", "Semi-Automated", "Fully Automated"], weights: [1, 2, 3, 4] },
    { id: "ai_ready_3", question: "How advanced is your feature engineering automation?", type: "slider", options: ["None", "Basic", "Advanced", "Comprehensive"], weights: [1, 2, 3, 4] },
    { id: "ai_ready_4", question: "Do you implement intelligent caching strategies?", type: "multiple_choice", options: ["No", "Basic", "Advanced", "Strategic"], weights: [1, 2, 3, 4] }
  ],
  sovereign: [
    { id: "sovereign_1", question: "How tamper-resistant are your data controls?", type: "slider", options: ["Not Resistant", "Basic", "Good", "Highly Resistant"], weights: [1, 2, 3, 4] },
    { id: "sovereign_2", question: "Do you have cryptographic integrity measures?", type: "multiple_choice", options: ["No", "Some", "Most", "Comprehensive"], weights: [1, 2, 3, 4] },
    { id: "sovereign_3", question: "How definitive is your source of truth?", type: "slider", options: ["Multiple Sources", "Some Clarity", "Mostly Clear", "Single Source"], weights: [1, 2, 3, 4] },
    { id: "sovereign_4", question: "Do you extend controls to edge computing?", type: "multiple_choice", options: ["No Edge", "Planning", "Partial", "Full Extension"], weights: [1, 2, 3, 4] }
  ],
  enhanced_resilience: [
    { id: "resilience_1", question: "How comprehensive is your security framework?", type: "slider", options: ["Basic", "Standard", "Advanced", "Comprehensive"], weights: [1, 2, 3, 4] },
    { id: "resilience_2", question: "Do you have automated disaster recovery?", type: "multiple_choice", options: ["Manual", "Semi-Automated", "Mostly Automated", "Fully Automated"], weights: [1, 2, 3, 4] },
    { id: "resilience_3", question: "How robust is your defense-in-depth strategy?", type: "slider", options: ["Single Layer", "Multiple Layers", "Advanced", "Comprehensive"], weights: [1, 2, 3, 4] },
    { id: "resilience_4", question: "Do you integrate with edge computing and DLT for secure lineage?", type: "multiple_choice", options: ["No Integration", "Planning", "Partial", "Full Integration"], weights: [1, 2, 3, 4] }
  ]
};

// Maturity scoring logic
const calculateMaturityScore = (responses) => {
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

// ROI calculation functions
function calculateROI(maturityScore, costInputs) {
  const {
    dataScientistTime,
    dataScientistCount,
    dataScientistSalary,
    dataDuplicationCost,
    manualIntegrationCost,
    complianceViolationCost,
    timeToInsight,
    technologyComplexity,
    dataSourceCount,
    integrationPatternCount,
    legacySystemPercentage,
    cloudAdoptionPercentage
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
    timeToInsight,
    technologyComplexity,
    dataSourceCount,
    integrationPatternCount
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
  const complexityReductionSavings = calculateComplexityReductionSavings(
    technologyComplexity, 
    dataSourceCount, 
    integrationPatternCount, 
    maturityMultiplier
  );

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

function calculateComplexityReductionSavings(technologyComplexity, dataSourceCount, integrationPatternCount, maturityMultiplier) {
  const baseComplexityCost = (technologyComplexity * 10000) + (dataSourceCount * 5000) + (integrationPatternCount * 3000);
  const complexityReduction = 0.50; // 50% reduction in complexity costs
  
  return baseComplexityCost * complexityReduction * maturityMultiplier;
}

function calculateComplexityMultiplier(costInputs) {
  const {
    technologyComplexity,
    dataSourceCount,
    integrationPatternCount,
    legacySystemPercentage,
    cloudAdoptionPercentage
  } = costInputs;

  // Map technologyComplexity string to a numerical factor
  let techComplexityFactorValue = 0;
  if (technologyComplexity === 'high') techComplexityFactorValue = 10;
  else if (technologyComplexity === 'medium') techComplexityFactorValue = 5;
  else techComplexityFactorValue = 1;

  // Base complexity factors
  const techComplexityFactor = (techComplexityFactorValue / 10) * 0.3;
  const dataSourceFactor = Math.min(dataSourceCount / 10, 1) * 0.2;
  const integrationFactor = Math.min(integrationPatternCount / 10, 1) * 0.2;
  const legacyFactor = (legacySystemPercentage / 100) * 0.15;
  const cloudFactor = (1 - cloudAdoptionPercentage / 100) * 0.15;

  // Stencil Agent Framework reduces complexity impact
  const stencilAgentComplexityReduction = 0.40; // 40% reduction in complexity impact

  const totalComplexity = (techComplexityFactor + dataSourceFactor + integrationFactor + legacyFactor + cloudFactor);
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
    dataScientistSalary,
    technologyComplexity,
    dataSourceCount,
    integrationPatternCount
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
    dataScientistCount,
    technologyComplexity,
    dataSourceCount,
    integrationPatternCount
  } = costInputs;

  // Base Stencil Agent Framework costs
  const baseFrameworkCost = 50000; // Base framework licensing and setup
  const perUserCost = 5000; // Cost per data scientist
  const complexityCost = technologyComplexity * 2000; // Additional complexity cost
  const integrationCost = (dataSourceCount + integrationPatternCount) * 1000; // Integration complexity cost

  return baseFrameworkCost + (dataScientistCount * perUserCost) + complexityCost + integrationCost;
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

module.exports = (req, res) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
  
  if (req.method === 'OPTIONS') {
    res.status(200).end();
    return;
  }
  
  if (req.method !== 'POST') {
    res.status(405).json({ error: 'Method not allowed' });
    return;
  }

  try {
    const { responses, costInputs, userInfo } = req.body;
    
    if (!responses || !costInputs) {
      return res.status(400).json({ error: 'Missing required data' });
    }
    
    const maturityScore = calculateMaturityScore(responses);
    const roiResults = calculateROI(maturityScore.overallScore, costInputs);
    const recommendations = generateRecommendations(maturityScore.overallScore, costInputs, roiResults.stencilAgentBenefits);
    
    // Prepare response data
    const responseData = {
      userInfo: userInfo || {},
      maturityScore,
      roiResults,
      recommendations
    };
    
    res.json(responseData);
  } catch (error) {
    console.error('Assessment error:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};
