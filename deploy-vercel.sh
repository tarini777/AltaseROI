#!/bin/bash

# 🚀 ATLASE ROI Assessment Tool - Vercel Deployment Script

echo "🚀 Starting ATLASE ROI Assessment Tool deployment to Vercel..."

# Check if we're in the right directory
if [ ! -f "package.json" ] || [ ! -f "vercel.json" ]; then
    echo "❌ Error: Please run this script from the project root directory"
    echo "   Current directory: $(pwd)"
    echo "   Expected files: package.json, vercel.json"
    exit 1
fi

echo "✅ Project structure verified"

# Check if Vercel CLI is available
if ! command -v npx &> /dev/null; then
    echo "❌ Error: npx is not available. Please install Node.js and npm first."
    exit 1
fi

echo "✅ Node.js and npm available"

# Build the client
echo "📦 Building React client..."
cd client
npm run build
if [ $? -ne 0 ]; then
    echo "❌ Error: Failed to build React client"
    exit 1
fi
cd ..

echo "✅ React client built successfully"

# Deploy to Vercel
echo "🌐 Deploying to Vercel..."
echo "   This will open your browser for authentication if needed."
echo "   Follow the prompts to complete deployment."
echo ""

npx vercel --prod

if [ $? -eq 0 ]; then
    echo ""
    echo "🎉 Deployment successful!"
    echo ""
    echo "📋 Next steps:"
    echo "   1. Check your Vercel dashboard for the live URL"
    echo "   2. Test all features on the live site"
    echo "   3. Configure environment variables if needed"
    echo "   4. Set up custom domain (optional)"
    echo ""
    echo "🔗 Your ATLASE ROI Assessment Tool is now live!"
else
    echo "❌ Deployment failed. Please check the error messages above."
    exit 1
fi
