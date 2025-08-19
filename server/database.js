const sqlite3 = require('sqlite3').verbose();
const path = require('path');

// Database file path
const dbPath = path.join(__dirname, 'atlase_assessments.db');

// Initialize database
const initDatabase = () => {
  return new Promise((resolve, reject) => {
    const db = new sqlite3.Database(dbPath, (err) => {
      if (err) {
        console.error('Error opening database:', err.message);
        reject(err);
        return;
      }
      console.log('Connected to SQLite database');
      
      // Create assessments table
      db.run(`
        CREATE TABLE IF NOT EXISTS assessments (
          id INTEGER PRIMARY KEY AUTOINCREMENT,
          email TEXT NOT NULL,
          name TEXT,
          assessment_date DATETIME DEFAULT CURRENT_TIMESTAMP,
          maturity_score_overall REAL,
          maturity_level TEXT,
          pillar_scores TEXT,
          roi_results TEXT,
          recommendations TEXT,
          cost_inputs TEXT,
          technology_landscape TEXT,
          ip_address TEXT,
          user_agent TEXT
        )
      `, (err) => {
        if (err) {
          console.error('Error creating table:', err.message);
          reject(err);
          return;
        }
        console.log('Assessments table created or already exists');
        resolve(db);
      });
    });
  });
};

// Save assessment result
const saveAssessment = (assessmentData) => {
  return new Promise((resolve, reject) => {
    // Skip saving for test admin user
    if (assessmentData.userInfo && assessmentData.userInfo.email === 'test@atlase.com') {
      console.log('Skipping save for test admin user:', assessmentData.userInfo.email);
      resolve({ message: 'Test admin user - data not saved' });
      return;
    }

    const db = new sqlite3.Database(dbPath, (err) => {
      if (err) {
        console.error('Error opening database for save:', err.message);
        reject(err);
        return;
      }

      const {
        userInfo,
        maturityScore,
        roiResults,
        recommendations,
        costInputs,
        ipAddress,
        userAgent
      } = assessmentData;

      const query = `
        INSERT INTO assessments (
          email, name, maturity_score_overall, maturity_level, 
          pillar_scores, roi_results, recommendations, cost_inputs,
          technology_landscape, ip_address, user_agent
        ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
      `;

      const params = [
        userInfo.email || '',
        userInfo.name || '',
        maturityScore.overallScore,
        maturityScore.maturityLevel,
        JSON.stringify(maturityScore.pillarScores),
        JSON.stringify(roiResults),
        JSON.stringify(recommendations),
        JSON.stringify(costInputs),
        JSON.stringify({
          dataSourceCount: costInputs.dataSourceCount,
          integrationPatternCount: costInputs.integrationPatternCount,
          legacySystemPercentage: costInputs.legacySystemPercentage,
          cloudAdoptionPercentage: costInputs.cloudAdoptionPercentage,
          technologyComplexity: costInputs.technologyComplexity
        }),
        ipAddress || '',
        userAgent || ''
      ];

      db.run(query, params, function(err) {
        if (err) {
          console.error('Error saving assessment:', err.message);
          reject(err);
          return;
        }
        
        console.log(`Assessment saved with ID: ${this.lastID} for user: ${userInfo.email}`);
        resolve({ 
          id: this.lastID, 
          message: 'Assessment saved successfully',
          email: userInfo.email 
        });
      });

      db.close((err) => {
        if (err) {
          console.error('Error closing database:', err.message);
        }
      });
    });
  });
};

// Get all assessments (for admin purposes)
const getAllAssessments = () => {
  return new Promise((resolve, reject) => {
    const db = new sqlite3.Database(dbPath, (err) => {
      if (err) {
        console.error('Error opening database for query:', err.message);
        reject(err);
        return;
      }

      const query = `
        SELECT 
          id, email, name, assessment_date, maturity_score_overall, 
          maturity_level, pillar_scores, roi_results, recommendations, 
          cost_inputs, technology_landscape, ip_address, user_agent
        FROM assessments 
        ORDER BY assessment_date DESC
      `;

      db.all(query, [], (err, rows) => {
        if (err) {
          console.error('Error querying assessments:', err.message);
          reject(err);
          return;
        }

        // Parse JSON fields
        const assessments = rows.map(row => ({
          ...row,
          pillar_scores: JSON.parse(row.pillar_scores || '{}'),
          roi_results: JSON.parse(row.roi_results || '{}'),
          recommendations: JSON.parse(row.recommendations || '{}'),
          cost_inputs: JSON.parse(row.cost_inputs || '{}'),
          technology_landscape: JSON.parse(row.technology_landscape || '{}')
        }));

        resolve(assessments);
      });

      db.close((err) => {
        if (err) {
          console.error('Error closing database:', err.message);
        }
      });
    });
  });
};

// Get assessment by email
const getAssessmentByEmail = (email) => {
  return new Promise((resolve, reject) => {
    const db = new sqlite3.Database(dbPath, (err) => {
      if (err) {
        console.error('Error opening database for query:', err.message);
        reject(err);
        return;
      }

      const query = `
        SELECT 
          id, email, name, assessment_date, maturity_score_overall, 
          maturity_level, pillar_scores, roi_results, recommendations, 
          cost_inputs, technology_landscape, ip_address, user_agent
        FROM assessments 
        WHERE email = ?
        ORDER BY assessment_date DESC
      `;

      db.all(query, [email], (err, rows) => {
        if (err) {
          console.error('Error querying assessment by email:', err.message);
          reject(err);
          return;
        }

        // Parse JSON fields
        const assessments = rows.map(row => ({
          ...row,
          pillar_scores: JSON.parse(row.pillar_scores || '{}'),
          roi_results: JSON.parse(row.roi_results || '{}'),
          recommendations: JSON.parse(row.recommendations || '{}'),
          cost_inputs: JSON.parse(row.cost_inputs || '{}'),
          technology_landscape: JSON.parse(row.technology_landscape || '{}')
        }));

        resolve(assessments);
      });

      db.close((err) => {
        if (err) {
          console.error('Error closing database:', err.message);
        }
      });
    });
  });
};

// Get assessment statistics
const getAssessmentStats = () => {
  return new Promise((resolve, reject) => {
    const db = new sqlite3.Database(dbPath, (err) => {
      if (err) {
        console.error('Error opening database for stats:', err.message);
        reject(err);
        return;
      }

      const queries = [
        'SELECT COUNT(*) as total_assessments FROM assessments',
        'SELECT COUNT(DISTINCT email) as unique_users FROM assessments',
        'SELECT AVG(maturity_score_overall) as avg_maturity_score FROM assessments',
        'SELECT maturity_level, COUNT(*) as count FROM assessments GROUP BY maturity_level'
      ];

      Promise.all(queries.map(query => {
        return new Promise((resolveQuery, rejectQuery) => {
          db.get(query, [], (err, row) => {
            if (err) {
              rejectQuery(err);
              return;
            }
            resolveQuery(row);
          });
        });
      })).then(results => {
        const [totalCount, uniqueUsers, avgScore, maturityLevels] = results;
        
        resolve({
          totalAssessments: totalCount.total_assessments,
          uniqueUsers: uniqueUsers.unique_users,
          averageMaturityScore: avgScore.avg_maturity_score || 0,
          maturityLevelDistribution: maturityLevels
        });
      }).catch(reject);

      db.close((err) => {
        if (err) {
          console.error('Error closing database:', err.message);
        }
      });
    });
  });
};

module.exports = {
  initDatabase,
  saveAssessment,
  getAllAssessments,
  getAssessmentByEmail,
  getAssessmentStats
}; 