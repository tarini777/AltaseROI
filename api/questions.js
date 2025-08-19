// API endpoint for assessment questions
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

module.exports = (req, res) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
  
  if (req.method === 'OPTIONS') {
    res.status(200).end();
    return;
  }
  
  res.status(200).json(assessmentQuestions);
};
