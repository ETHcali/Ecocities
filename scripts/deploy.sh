#!/bin/bash

# EcoCity Token Dashboard Deployment Script
# This script builds and deploys the dashboard to Vercel

set -e

echo "🌱 EcoCity Token Dashboard - Deployment Script"
echo "=============================================="

# Check if we're in the right directory
if [ ! -f "package.json" ]; then
    echo "❌ Error: package.json not found. Please run this script from the project root."
    exit 1
fi

# Check if Vercel CLI is installed
if ! command -v vercel &> /dev/null; then
    echo "📦 Installing Vercel CLI..."
    npm install -g vercel
fi

# Install dependencies
echo "📦 Installing dependencies..."
npm ci

# Type check
echo "🔍 Running type checks..."
npm run type-check

# Build the project
echo "🏗️  Building project..."
npm run build

# Deploy to Vercel
echo "🚀 Deploying to Vercel..."
vercel --prod

echo "✅ Deployment completed successfully!"
echo "🌐 Your dashboard should be available at: https://tokendashboard.ethcali.org" 