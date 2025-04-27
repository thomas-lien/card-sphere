#!/bin/bash

echo "🚀 Setting up CardSphere development environment..."

# Clean existing dependencies
echo "🧹 Cleaning existing dependencies..."
if [ -d "node_modules" ]; then
    rm -rf node_modules
    echo "Removed node_modules directory"
fi
if [ -f "package-lock.json" ]; then
    rm package-lock.json
    echo "Removed package-lock.json"
fi

# Install specific React version and dependencies
echo "📦 Installing React and core dependencies..."
npm install react@18.2.0 react-dom@18.2.0 --legacy-peer-deps

# Install base dependencies
echo "📦 Installing base dependencies..."
npm install --legacy-peer-deps

# Install Web3 and additional required dependencies
echo "🌐 Installing Web3 and additional dependencies..."
npm install wagmi@1.4.13 viem@1.21.4 @tanstack/react-query@4.36.1 pino-pretty --legacy-peer-deps

# Check if .env.local exists
if [ ! -f .env.local ]; then
    if [ -f .env.example ]; then
        echo "🔑 Creating .env.local file..."
        cp .env.example .env.local
        echo "⚠️  Don't forget to add your WalletConnect Project ID to .env.local"
    else
        echo "⚠️  Warning: .env.example not found. Please create .env.local manually"
    fi
fi

echo "✅ Setup complete!"
echo "📝 Next steps:"
echo "1. Make sure your .env.local has the correct WalletConnect Project ID"
echo "2. Run 'npm run dev' to start the development server" 