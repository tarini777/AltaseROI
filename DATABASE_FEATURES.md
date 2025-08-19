# Database Features for ATLASE ROI Assessment Tool

## Overview

The ATLASE ROI Assessment Tool now includes a comprehensive database system to store and manage assessment results. This feature allows for data persistence, analytics, and administrative oversight while maintaining user privacy.

## Database Technology

- **Database**: SQLite3 (file-based, lightweight)
- **File Location**: `server/atlase_assessments.db`
- **Table**: `assessments`

## Database Schema

### Assessments Table

| Column | Type | Description |
|--------|------|-------------|
| `id` | INTEGER PRIMARY KEY | Auto-incrementing unique identifier |
| `email` | TEXT NOT NULL | User's email address |
| `name` | TEXT | User's name (optional) |
| `assessment_date` | DATETIME | Timestamp of assessment completion |
| `maturity_score_overall` | REAL | Overall ATLASE maturity score (0-100) |
| `maturity_level` | TEXT | Maturity level (Basic, Intermediate, Advanced, Optimized) |
| `pillar_scores` | TEXT | JSON string of individual pillar scores |
| `roi_results` | TEXT | JSON string of ROI calculations |
| `recommendations` | TEXT | JSON string of generated recommendations |
| `cost_inputs` | TEXT | JSON string of user cost inputs |
| `technology_landscape` | TEXT | JSON string of technology landscape data |
| `ip_address` | TEXT | User's IP address for analytics |
| `user_agent` | TEXT | Browser/device information |

## Key Features

### 1. Automatic Data Storage
- All assessment results are automatically saved to the database
- Data is stored when users complete the assessment
- Includes comprehensive assessment data for analysis

### 2. Test Admin User Exclusion
- **Email**: `test@atlase.com`
- **Behavior**: Assessments from this email are processed but not saved to database
- **Purpose**: Allows testing without polluting the database
- **Response**: Returns success message but skips database insertion

### 3. Admin Dashboard
- **Access**: Available via "Admin Dashboard" button on results page
- **Features**:
  - View all assessment records
  - Search by email address
  - Expandable rows for detailed view
  - Statistics dashboard
  - Real-time data refresh

### 4. API Endpoints

#### Assessment Storage
- **POST** `/api/assess` - Saves assessment results automatically

#### Admin Endpoints
- **GET** `/api/admin/assessments` - Get all assessments
- **GET** `/api/admin/assessments/:email` - Get assessments by email
- **GET** `/api/admin/stats` - Get assessment statistics

### 5. Statistics Dashboard
- **Total Assessments**: Count of all completed assessments
- **Unique Users**: Count of distinct email addresses
- **Average Maturity Score**: Mean maturity score across all assessments
- **Maturity Level Distribution**: Breakdown by maturity levels

## Data Privacy & Security

### Privacy Features
- **Email Validation**: Ensures valid email format
- **Optional Name**: Name field is optional for user privacy
- **IP Tracking**: Basic IP tracking for analytics (can be disabled)
- **User Agent**: Browser information for technical analysis

### Security Considerations
- **Local Database**: SQLite file stored locally on server
- **No External Dependencies**: Self-contained database system
- **Input Validation**: All inputs are validated before storage
- **JSON Sanitization**: JSON data is properly parsed and stored

## Usage Examples

### Testing with Admin User
```bash
# This assessment will be processed but NOT saved
curl -X POST http://localhost:5001/api/assess \
  -H "Content-Type: application/json" \
  -d '{
    "responses": [],
    "costInputs": {"dataScientistTime": 65},
    "userInfo": {"email": "test@atlase.com", "name": "Admin User"}
  }'
```

### Regular User Assessment
```bash
# This assessment will be processed AND saved
curl -X POST http://localhost:5001/api/assess \
  -H "Content-Type: application/json" \
  -d '{
    "responses": [],
    "costInputs": {"dataScientistTime": 65},
    "userInfo": {"email": "user@company.com", "name": "John Doe"}
  }'
```

### Viewing Admin Data
```bash
# Get all assessments
curl http://localhost:5001/api/admin/assessments

# Get statistics
curl http://localhost:5001/api/admin/stats

# Search by email
curl http://localhost:5001/api/admin/assessments/user@company.com
```

## Database Management

### Backup
```bash
# Backup database file
cp server/atlase_assessments.db server/backup_$(date +%Y%m%d_%H%M%S).db
```

### Reset Database
```bash
# Remove database file to start fresh
rm server/atlase_assessments.db
# Restart server to recreate database
```

### Database Location
- **Development**: `server/atlase_assessments.db`
- **Production**: Same location (adjust path as needed)

## Error Handling

### Database Errors
- Database connection failures are logged
- Assessment processing continues even if save fails
- Graceful degradation ensures tool remains functional

### Validation Errors
- Invalid email formats are rejected
- Missing required fields trigger validation errors
- JSON parsing errors are handled gracefully

## Future Enhancements

### Potential Additions
- **Data Export**: CSV/Excel export functionality
- **Advanced Analytics**: Trend analysis and reporting
- **User Management**: User accounts and authentication
- **Data Retention**: Automatic cleanup of old records
- **Backup Automation**: Scheduled database backups
- **Encryption**: Database encryption for sensitive data

### Scalability Considerations
- **Migration to PostgreSQL**: For larger datasets
- **Cloud Storage**: For production deployments
- **Caching**: Redis integration for performance
- **API Rate Limiting**: Protection against abuse

## Troubleshooting

### Common Issues

1. **Database File Not Found**
   - Ensure server has write permissions
   - Check if database file exists in server directory
   - Restart server to recreate database

2. **Permission Errors**
   - Check file permissions on database file
   - Ensure server process has write access

3. **Data Not Saving**
   - Verify email is not `test@atlase.com`
   - Check server logs for database errors
   - Ensure database file is not locked

4. **Admin Dashboard Not Loading**
   - Check browser console for API errors
   - Verify admin endpoints are accessible
   - Ensure CORS is properly configured

### Logs
- Database operations are logged to server console
- Check server output for database-related messages
- Error messages include detailed information for debugging 