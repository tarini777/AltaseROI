# 🚀 Vercel Deployment Guide for ATLASE ROI Assessment Tool

This guide will walk you through deploying the ATLASE ROI Assessment Tool on Vercel.

## 📋 Prerequisites

1. **Vercel Account**: Sign up at [vercel.com](https://vercel.com)
2. **GitHub/GitLab/Bitbucket Account**: Your code should be in a Git repository
3. **Node.js**: Version 16 or higher (for local testing)

## 🛠️ Pre-Deployment Setup

### 1. Prepare Your Repository

Ensure your project structure looks like this:
```
AtlaseROI/
├── client/
│   ├── package.json
│   ├── public/
│   └── src/
├── server/
│   ├── package.json
│   └── index.js
├── package.json
├── vercel.json
└── .vercelignore
```

### 2. Update Environment Configuration

Before deploying, update the CORS configuration in `server/index.js`:

```javascript
app.use(cors({
  origin: process.env.NODE_ENV === 'production' 
    ? ['https://your-actual-domain.vercel.app'] 
    : ['http://localhost:3000'],
  credentials: true
}));
```

Replace `your-actual-domain.vercel.app` with your actual Vercel domain after deployment.

## 🚀 Deployment Steps

### Method 1: Deploy via Vercel Dashboard (Recommended)

1. **Push to Git Repository**
   ```bash
   git add .
   git commit -m "Prepare for Vercel deployment"
   git push origin main
   ```

2. **Connect to Vercel**
   - Go to [vercel.com](https://vercel.com)
   - Click "New Project"
   - Import your Git repository
   - Select the repository containing your ATLASE ROI tool

3. **Configure Project Settings**
   - **Framework Preset**: Other
   - **Root Directory**: `./` (leave as default)
   - **Build Command**: Leave empty (handled by vercel.json)
   - **Output Directory**: Leave empty (handled by vercel.json)

4. **Environment Variables** (Optional)
   - Add any environment variables if needed
   - For now, the app works without additional environment variables

5. **Deploy**
   - Click "Deploy"
   - Wait for the build to complete

### Method 2: Deploy via Vercel CLI

1. **Install Vercel CLI**
   ```bash
   npm install -g vercel
   ```

2. **Login to Vercel**
   ```bash
   vercel login
   ```

3. **Deploy**
   ```bash
   vercel
   ```

4. **Follow the prompts**:
   - Link to existing project or create new
   - Confirm project settings
   - Deploy

## 🔧 Post-Deployment Configuration

### 1. Update CORS Origins

After deployment, update the CORS configuration in `server/index.js` with your actual Vercel domain:

```javascript
app.use(cors({
  origin: process.env.NODE_ENV === 'production' 
    ? ['https://your-app-name.vercel.app'] 
    : ['http://localhost:3000'],
  credentials: true
}));
```

### 2. Redeploy After CORS Update

```bash
git add .
git commit -m "Update CORS for production domain"
git push origin main
```

Vercel will automatically redeploy on push.

## 🌐 Access Your Deployed Application

Your application will be available at:
- **Production URL**: `https://your-app-name.vercel.app`
- **API Endpoints**: `https://your-app-name.vercel.app/api/*`

## 📊 Testing Your Deployment

### 1. Test Frontend
- Visit your Vercel URL
- Complete the assessment flow
- Verify all components load correctly

### 2. Test API Endpoints
```bash
# Test questions endpoint
curl https://your-app-name.vercel.app/api/questions

# Test assessment endpoint
curl -X POST https://your-app-name.vercel.app/api/assess \
  -H "Content-Type: application/json" \
  -d '{"responses":[{"pillar":"assured","id":"assured_1","response":3}],"costInputs":{"annualRevenue":10000000}}'
```

## 🔍 Troubleshooting

### Common Issues

1. **Build Failures**
   - Check that all dependencies are in package.json
   - Ensure build scripts are correct
   - Review Vercel build logs

2. **API Not Working**
   - Verify CORS configuration
   - Check that API routes are correctly configured in vercel.json
   - Ensure server/index.js is properly exported

3. **Frontend Not Loading**
   - Check that client/build directory is generated
   - Verify static file routing in vercel.json
   - Review client-side console errors

### Debug Commands

```bash
# Check build locally
cd client && npm run build

# Test server locally
cd server && npm start

# Check Vercel logs
vercel logs
```

## 🔄 Continuous Deployment

Once deployed, Vercel will automatically:
- Deploy on every push to your main branch
- Create preview deployments for pull requests
- Provide automatic HTTPS certificates
- Handle CDN distribution

## 📈 Performance Optimization

### Vercel Optimizations
- **Automatic CDN**: Static assets are served from edge locations
- **Serverless Functions**: API endpoints run as serverless functions
- **Automatic Scaling**: Handles traffic spikes automatically

### Recommended Settings
- **Function Timeout**: 30 seconds (configured in vercel.json)
- **Memory**: Default (sufficient for this application)
- **Regions**: Auto (Vercel chooses optimal regions)

## 🔐 Security Considerations

1. **Environment Variables**: Store sensitive data in Vercel environment variables
2. **CORS**: Properly configured for production domains
3. **Helmet**: Security headers enabled
4. **Input Validation**: Server-side validation implemented

## 📞 Support

If you encounter issues:
1. Check Vercel deployment logs
2. Review this guide's troubleshooting section
3. Check Vercel documentation: [vercel.com/docs](https://vercel.com/docs)
4. Contact Vercel support if needed

## 🎉 Success!

Once deployed, your ATLASE ROI Assessment Tool will be:
- ✅ Accessible worldwide via HTTPS
- ✅ Automatically scaled
- ✅ Continuously deployed
- ✅ Performance optimized
- ✅ Production ready

**Your tool is now live and ready to help organizations assess their data architecture maturity and calculate ROI!** 🚀 