#!/bin/bash

# AI Agent Deployment Script for Changa DAO
# Usage: ./ai-deploy.sh [platform]

set -e

PLATFORM=${1:-"vercel"}
PROJECT_DIR="src/Changa_DAO_frontend"

echo "🤖 AI Agent deploying Changa DAO to $PLATFORM..."

# Build the project
echo "🔨 Building project..."
cd $PROJECT_DIR
npm run build
cd ../..

# Deploy based on platform
case $PLATFORM in
  "vercel")
    echo "🚀 Deploying to Vercel..."
    cd $PROJECT_DIR
    npx vercel --prod --yes
    cd ../..
    ;;
  "github-pages")
    echo "📄 Deploying to GitHub Pages..."
    cd $PROJECT_DIR
    npm run deploy
    cd ../..
    echo "✅ Deployed to: https://miabritacreations.github.io/Changa_DAO/"
    ;;
  "netlify")
    echo "🌐 Deploying to Netlify..."
    echo "⚠️  Please drag dist folder to https://app.netlify.com/drop"
    ;;
  "icp")
    echo "🔗 Deploying to Internet Computer..."
    dfx deploy --network ic
    ;;
  *)
    echo "❌ Unknown platform: $PLATFORM"
    echo "Supported platforms: vercel, github-pages, netlify, icp"
    exit 1
    ;;
esac

echo "🎉 Deployment completed!"
