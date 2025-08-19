#!/bin/bash

# 🚀 ATLASE ROI Assessment Tool - Vercel Deployment Script

echo "🚀 Starting Vercel deployment for ATLASE ROI Assessment Tool..."

# Check if Vercel CLI is installed
if ! command -v vercel &> /dev/null; then
    echo "❌ Vercel CLI not found. Installing..."
    npm install -g vercel
fi

# Check if user is logged in to Vercel
if ! vercel whoami &> /dev/null; then
    echo "🔐 Please log in to Vercel..."
    vercel login
fi

# Build the client application
echo "📦 Building client application..."
cd client
npm run build
cd ..

# Deploy to Vercel
echo "🚀 Deploying to Vercel..."
vercel --prod

echo "✅ Deployment complete!"
echo "🌐 Your application should now be live at the URL provided above."
echo ""
echo "📋 Next steps:"
echo "1. Update the CORS configuration in server/index.js with your actual domain"
echo "2. Test the application functionality"
echo "3. Check the API endpoints are working"
echo ""
echo "📖 For detailed instructions, see VERCEL_DEPLOYMENT.md" 