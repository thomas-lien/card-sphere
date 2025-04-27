# CardSphere

A decentralized marketplace for NFT-based gift cards and vouchers, leveraging Web3 technology to create a more efficient, cost-effective alternative to traditional gift card systems.

## 🚀 Quick Start

1. **Clone the repository**
   ```bash
   git clone https://github.com/yourusername/card-sphere.git
   cd card-sphere
   ```

2. **Run Setup Script**

   **For Mac/Linux (Bash):**
   ```bash
   # Make the setup script executable
   chmod +x setup.sh
   
   # Run the setup script
   ./setup.sh
   ```

   **For Windows (PowerShell):**
   ```powershell
   # Run the PowerShell setup script
   .\setup.ps1
   ```
   
   If you encounter execution policy restrictions in PowerShell, try:
   ```powershell
   # Option 1: Run with bypass execution policy for this script only
   PowerShell -ExecutionPolicy Bypass -File setup.ps1
   
   # Option 2: Set execution policy for current user (more permissive)
   Set-ExecutionPolicy -ExecutionPolicy RemoteSigned -Scope CurrentUser
   .\setup.ps1
   ```

   The setup script will:
   - Clean existing dependencies
   - Install all dependencies with correct versions
   - Set up Web3 dependencies (wagmi, viem, etc.)
   - Create your .env.local file if it doesn't exist

   OR

3. **Manual Setup**
   ```bash
   # Install base dependencies
   npm install

   # Install Web3 dependencies with specific versions
   npm install wagmi@1.4.13 viem@1.21.4 @tanstack/react-query@4.36.1 --legacy-peer-deps
   ```

4. **Environment Setup**
   - Copy `.env.example` to `.env.local`
   ```bash
   cp .env.example .env.local
   ```
   - Fill in the required environment variables:
     ```
     NEXT_PUBLIC_WALLET_CONNECT_PROJECT_ID="your_wallet_connect_project_id"
     NEXT_PUBLIC_WEB3MODAL_PROJECT_ID="your_web3modal_project_id"
     ```
   
   > 🔑 **Required Steps for Environment Variables:**
   > 1. Get your WalletConnect Project ID from [WalletConnect Cloud](https://cloud.walletconnect.com/)
   > 2. Create a project and copy the Project ID
   > 3. Paste it in your `.env.local` file

5. **Start the development server**
   ```bash
   npm run dev
   ```

## 🔧 Tech Stack

- **Frontend**: Next.js 14, React, TailwindCSS
- **Web3**: wagmi, viem, WalletConnect
- **UI Components**: shadcn/ui
- **Styling**: Tailwind CSS

## 📁 Project Structure

```
card-sphere/
├── app/                # Next.js 14 app directory
├── components/         # React components
├── lib/               # Utility functions and hooks
├── public/            # Static assets
└── styles/            # Global styles
```

## 🔐 Smart Contracts

The smart contracts for CardSphere are deployed on:
- Testnet: [Contract Address]
- Mainnet: [Coming Soon]

## 🧪 Testing

```bash
# Run tests
npm test

# Run tests in watch mode
npm run test:watch
```

## 🤝 Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## ⚠️ Common Issues

1. **Dependency Conflicts**: If you encounter dependency conflicts, try:
   ```bash
   npm install --legacy-peer-deps
   ```

2. **Web3Modal Issues**: Ensure you have the correct Project IDs in your `.env.local`

3. **Network Issues**: Make sure you're connected to the correct network in your wallet

## 📝 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## Core Features

- User deposits money
- Search and purchase gift cards
- NFT-based gift card ownership
- P2P trading functionality
- Gift card redemption
- Vendor integration

## Upcoming Features

- LLM integration
- Enhanced trading features
- Advanced analytics
