# Setup script for CardSphere development environment (PowerShell)

Write-Host "🚀 Setting up CardSphere development environment..." -ForegroundColor Cyan

# Clean existing dependencies
Write-Host "🧹 Cleaning existing dependencies..." -ForegroundColor Yellow
if (Test-Path "node_modules") {
    Remove-Item -Recurse -Force "node_modules"
    Write-Host "Removed node_modules directory"
}
if (Test-Path "package-lock.json") {
    Remove-Item -Force "package-lock.json"
    Write-Host "Removed package-lock.json"
}

# Install specific React version and dependencies
Write-Host "📦 Installing React and core dependencies..." -ForegroundColor Green
npm install react@18.2.0 react-dom@18.2.0 --legacy-peer-deps

# Install base dependencies
Write-Host "📦 Installing base dependencies..." -ForegroundColor Green
npm install --legacy-peer-deps

# Install Web3 and additional required dependencies
Write-Host "🌐 Installing Web3 and additional dependencies..." -ForegroundColor Green
npm install wagmi@1.4.13 viem@1.21.4 @tanstack/react-query@4.36.1 pino-pretty --legacy-peer-deps

# Check if .env.local exists
if (-not (Test-Path ".env.local")) {
    if (Test-Path ".env.example") {
        Write-Host "Creating .env.local file..."
        Copy-Item ".env.example" ".env.local"
        Write-Host "Don't forget to add your WalletConnect Project ID to .env.local"
    } else {
        Write-Host "Warning: .env.example not found. Please create .env.local manually."
    }
}

Write-Host "`n✅ Setup complete!" -ForegroundColor Green
Write-Host "📝 Next steps:" -ForegroundColor Cyan
Write-Host "1. Make sure your .env.local has the correct WalletConnect Project ID" -ForegroundColor Cyan
Write-Host "2. Run 'npm run dev' to start the development server" -ForegroundColor Cyan