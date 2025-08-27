# 🌟 Changa DAO

> **Decentralized Autonomous Organization for Community-Driven Impact Investing**

[![Internet Computer](https://img.shields.io/badge/Internet%20Computer-ICP-blue)](https://internetcomputer.org/)
[![Motoko](https://img.shields.io/badge/Motoko-Language-orange)](https://internetcomputer.org/docs/current/motoko/main/motoko)
[![React](https://img.shields.io/badge/React-18.0-blue)](https://reactjs.org/)
[![Vite](https://img.shields.io/badge/Vite-4.0-purple)](https://vitejs.dev/)

## 📋 Table of Contents

- [Overview](#overview)
- [Key Features](#key-features)
- [Technology Stack](#technology-stack)
- [Quick Start](#quick-start)
- [Project Structure](#project-structure)
- [Development](#development)
- [Deployment](#deployment)
- [Demo Access](#demo-access)
- [Contributing](#contributing)
- [License](#license)

## 🎯 Overview

Changa DAO is a revolutionary decentralized autonomous organization built on the Internet Computer (ICP) that democratizes impact investing by connecting global investors with local communities. Our platform enables transparent, community-driven decision-making for sustainable development projects.

### 🌍 Mission
To democratize access to impact investing by creating a transparent, decentralized platform where communities can propose, fund, and manage development projects through collective governance.

### 🎯 Vision
A world where every community has the power to drive their own development through decentralized funding and transparent governance.

## ✨ Key Features

### 🏛️ **Decentralized Governance**
- Community voting and proposal system
- Transparent decision-making processes
- On-chain governance token distribution
- Real-time voting results and analytics

### 💰 **Impact Investing Platform**
- Project funding and milestone tracking
- NFT-based impact tokens representing project ownership
- Transparent treasury management
- Automated milestone verification

### 🔐 **Internet Identity Integration**
- Secure authentication with Internet Identity
- Privacy-preserving user profiles
- KYC/AML compliance framework
- Reputation system for community members

### 📊 **Transparent Treasury Management**
- On-chain fund allocation tracking
- Real-time financial reporting
- Automated disbursement mechanisms
- Audit trail for all transactions

### 🎨 **User Experience**
- Intuitive React-based interface
- Mobile-responsive design
- Real-time updates and notifications
- Multi-language support (planned)

## 🛠️ Technology Stack

### **Backend (Internet Computer)**
- **Language**: Motoko
- **Framework**: DFX SDK
- **Storage**: Internet Computer canisters
- **Authentication**: Internet Identity

### **Frontend**
- **Framework**: React 18
- **Build Tool**: Vite
- **Styling**: SCSS + Material-UI
- **Routing**: React Router DOM
- **State Management**: React Hooks

### **Development Tools**
- **Package Manager**: npm
- **Version Control**: Git
- **Deployment**: Multiple platforms (Vercel, GitHub Pages, ICP)

## 🚀 Quick Start

### Prerequisites

- **Node.js** (>= 16.0.0)
- **npm** (>= 7.0.0)
- **DFX SDK** ([Install Guide](https://internetcomputer.org/docs/current/developer-docs/setup/install))
- **Internet Identity** account ([Get One](https://identity.ic0.app/))

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/yourusername/Changa_DAO.git
   cd Changa_DAO
   ```

2. **Install dependencies**
   ```bash
   # Using the provided batch file
   changa-dao.bat install
   
   # Or manually
   npm install
   cd src/Changa_DAO_frontend && npm install && cd ../..
   ```

3. **Start local development**
   ```bash
   # Start DFX local network
   changa-dao.bat dfx-start
   
   # Deploy canisters
   changa-dao.bat dfx-deploy
   
   # Start development server
   changa-dao.bat dev
   ```

4. **Access the application**
   - **Frontend**: http://localhost:8080
   - **Backend**: http://localhost:4943
   - **DFX Dashboard**: http://localhost:4943

### Alternative Setup (Manual)

```bash
# Start the replica in the background
dfx start --background

# Deploy canisters and generate candid interface
dfx deploy

# Start frontend development server
npm start
```

## 📁 Project Structure

```
Changa_DAO/
├── src/
│   ├── Changa_DAO_backend/     # Motoko backend canisters
│   │   └── main.mo            # Main backend logic
│   ├── Changa_DAO_frontend/    # React frontend application
│   │   ├── src/
│   │   │   ├── components/     # Reusable UI components
│   │   │   ├── pages/         # Page components
│   │   │   ├── services/      # API services
│   │   │   └── utils/         # Utility functions
│   │   └── dist/              # Built frontend assets
│   ├── api/                   # API services and data management
│   ├── components/            # Shared components
│   ├── pages/                 # Page components
│   └── services/              # Business logic services
├── public/                    # Static assets
├── declarations/              # Generated candid interfaces
├── .dfx/                      # DFX local network data
├── dfx.json                   # DFX configuration
├── package.json               # Project dependencies
├── changa-dao.bat            # Project management script
└── ai-deploy.sh              # Deployment automation
```

## 🔧 Development

### Available Scripts

Use the provided batch file for easy project management:

```bash
# Install dependencies
changa-dao.bat install

# Build the project
changa-dao.bat build

# Start development server
changa-dao.bat dev

# Run tests
changa-dao.bat test

# Clean build artifacts
changa-dao.bat clean
```

### DFX Commands

```bash
# Start local network
changa-dao.bat dfx-start

# Stop local network
changa-dao.bat dfx-stop

# Deploy to local network
changa-dao.bat dfx-deploy

# Generate candid interface
npm run generate
```

### Development Workflow

1. **Make changes** to Motoko backend in `src/Changa_DAO_backend/`
2. **Deploy changes** with `changa-dao.bat dfx-deploy`
3. **Develop frontend** in `src/Changa_DAO_frontend/`
4. **Test locally** with `changa-dao.bat dev`
5. **Build for production** with `changa-dao.bat build`

## 🚀 Deployment

### Internet Computer (Production)

```bash
# Deploy to Internet Computer mainnet
changa-dao.bat deploy icp

# Or manually
dfx deploy --network ic
```

### Alternative Platforms

```bash
# Deploy to Vercel
changa-dao.bat deploy vercel

# Deploy to GitHub Pages
changa-dao.bat deploy github-pages

# Deploy to Netlify
changa-dao.bat deploy netlify
```

### Environment Configuration

For production deployment, ensure proper environment variables:

```bash
# Set network to mainnet
export DFX_NETWORK=ic

# Or configure in dfx.json
{
  "canisters": {
    "Changa_DAO_frontend": {
      "declarations": {
        "env_override": "ic"
      }
    }
  }
}
```

## 🎮 Demo Access

### Live Demos

- **Local Development**: http://localhost:8080
- **Internet Computer**: [Your ICP Canister URL]
- **Vercel**: [Your Vercel URL]
- **GitHub Pages**: [Your GitHub Pages URL]

### Static Demos

Open these HTML files in any browser for instant demos:

- **`changa-dao-simple.html`** - Basic feature demonstration
- **`internet-identity-demo.html`** - Authentication showcase
- **`simple-changa-dao.html`** - Full application demo

### Demo Credentials

For testing purposes, you can use:
- **Demo Mode**: Available without authentication
- **Internet Identity**: Create an account at [identity.ic0.app](https://identity.ic0.app/)

## 🤝 Contributing

We welcome contributions from the community! Here's how you can help:

### Development Setup

1. Fork the repository
2. Create a feature branch: `git checkout -b feature/amazing-feature`
3. Make your changes
4. Test thoroughly
5. Submit a pull request

### Code Standards

- Follow existing code style and conventions
- Add tests for new features
- Update documentation as needed
- Ensure all tests pass before submitting

### Reporting Issues

- Use GitHub Issues for bug reports
- Provide detailed reproduction steps
- Include system information and error logs

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- **Internet Computer Foundation** for the amazing platform
- **DFX Team** for the development tools
- **React Community** for the frontend framework
- **Open Source Contributors** who made this possible

## 📞 Contact

- **Project**: [GitHub Repository](https://github.com/yourusername/Changa_DAO)
- **Issues**: [GitHub Issues](https://github.com/yourusername/Changa_DAO/issues)
- **Discussions**: [GitHub Discussions](https://github.com/yourusername/Changa_DAO/discussions)

---

<div align="center">

**Built with ❤️ on the Internet Computer**

[![Internet Computer](https://internetcomputer.org/img/IC_logo_horizontal.svg)](https://internetcomputer.org/)

</div>
