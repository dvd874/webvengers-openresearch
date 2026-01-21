# 🔬 OpenResearch
**Decentralized Academic Publishing Platform**

> Revolutionizing scientific publishing through Web3 technology, token incentives, and decentralized peer review.

[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)
[![Built with](https://img.shields.io/badge/Built%20with-Web3-blue)](https://web3.foundation/)
[![Hackathon](https://img.shields.io/badge/Hackathon-Web3%20Node%20Engine-green)](https://hackathon.example.com)

## 🚀 **What is OpenResearch?**

OpenResearch is a decentralized academic publishing platform that addresses critical issues in traditional academic publishing:

- **🏦 High Costs**: Eliminate expensive journal fees and subscriptions
- **⏰ Slow Reviews**: Reduce publication time from months to weeks
- **👻 Invisible Reviewers**: Reward peer reviewers with NFTs and tokens
- **🔒 Centralized Control**: Democratize access to scientific knowledge

## ✨ **Key Features**

### 🔗 **Web3 Innovation**
- **Immutable DOIs**: Blockchain-verified publication records
- **Review NFTs**: Peer reviews become verifiable digital assets
- **ORES Tokens**: Earn rewards for quality contributions
- **Decentralized Storage**: Papers stored on IPFS for permanence
- **DAO Governance**: Community-driven platform decisions

### 🎓 **Academic Excellence**
- **AI-Powered Discovery**: Semantic search and recommendations
- **Citation Graphs**: Interactive network visualizations
- **Quality Scoring**: Automated paper and review assessment
- **Collaboration Tools**: Multi-author workflows and real-time editing
- **Reputation System**: Portable, verifiable academic credentials

### 🎮 **Gamification**
- **Achievement Badges**: NFT rewards for milestones
- **Leaderboards**: Rankings by papers, reviews, citations
- **Competitions**: Seasonal challenges with token prizes
- **Social Features**: Follow researchers, share discoveries

## 🛠 **Tech Stack**

### **Frontend**
- **Next.js 14** - React framework with SSR
- **TailwindCSS** - Utility-first styling
- **Wagmi + Viem** - Web3 React hooks
- **D3.js** - Data visualizations
- **Framer Motion** - Smooth animations

### **Backend**
- **Node.js + Express** - API server
- **PostgreSQL** - Relational database
- **Redis** - Caching and sessions
- **IPFS** - Decentralized file storage
- **OpenAI API** - AI-powered features

### **Blockchain**
- **Solidity** - Smart contracts
- **Hardhat** - Development framework
- **Polygon** - Layer 2 scaling
- **OpenZeppelin** - Security standards

## 🚀 **Quick Start**

### Prerequisites
- Node.js 18+
- Docker & Docker Compose
- MetaMask or compatible Web3 wallet

### Installation
```bash
# Clone the repository
git clone https://github.com/yourusername/openresearch.git
cd openresearch

# Install dependencies
npm install

# Start development environment
docker-compose up -d

# Run database migrations
npm run db:migrate

# Start backend
cd backend && npm run dev

# Start frontend (new terminal)
cd frontend && npm run dev
```

### Environment Setup
```bash
# Backend (.env)
DATABASE_URL=postgresql://admin:password@localhost:5432/openresearch
REDIS_URL=redis://localhost:6379
JWT_SECRET=your-secret-key
PINATA_API_KEY=your-pinata-key
OPENAI_API_KEY=your-openai-key

# Frontend (.env.local)
NEXT_PUBLIC_API_URL=http://localhost:4000/api
NEXT_PUBLIC_CHAIN_ID=80001
NEXT_PUBLIC_CONTRACT_ADDRESS=0x...
```

## 📱 **Usage**

### For Researchers
1. **Connect Wallet** - Sign in with MetaMask or email
2. **Submit Papers** - Upload to IPFS, mint DOI on-chain
3. **Peer Review** - Review papers, earn NFTs and tokens
4. **Build Reputation** - Gain verifiable academic credentials

### For Institutions
1. **Track Impact** - Monitor faculty research metrics
2. **Save Costs** - Eliminate journal subscription fees
3. **Increase Visibility** - Open access boosts citations
4. **Foster Collaboration** - Connect with global researchers

## 🏗 **Architecture**

```
┌─────────────────┐    ┌─────────────────┐    ┌─────────────────┐
│   Next.js App   │    │  Express API    │    │ Smart Contracts │
│   (Frontend)    │◄──►│   (Backend)     │◄──►│   (Blockchain)  │
└─────────────────┘    └─────────────────┘    └─────────────────┘
         │                       │                       │
         ▼                       ▼                       ▼
┌─────────────────┐    ┌─────────────────┐    ┌─────────────────┐
│   Web3 Wallets  │    │   PostgreSQL    │    │      IPFS       │
│   (Identity)    │    │   (Metadata)    │    │   (Storage)     │
└─────────────────┘    └─────────────────┘    └─────────────────┘
```

## 📊 **Smart Contracts**

| Contract | Purpose | Network |
|----------|---------|---------|
| `DOIRegistry` | Immutable publication records | Polygon |
| `PeerReviewNFT` | Review contribution proofs | Polygon |
| `ORESToken` | Platform utility token | Polygon |
| `ReputationSystem` | Academic reputation tracking | Polygon |
| `GovernanceDAO` | Community decision making | Polygon |

## 🎯 **Roadmap**

### ✅ **Phase 1: Core MVP** (Weeks 1-4)
- [x] User authentication (Web2 + Web3)
- [x] Paper submission and IPFS storage
- [x] Basic peer review system
- [x] Token rewards and NFT minting

### 🚧 **Phase 2: Advanced Features** (Weeks 5-8)
- [ ] AI-powered search and recommendations
- [ ] Citation graph visualization
- [ ] DAO governance implementation
- [ ] Mobile app development

### 🔮 **Phase 3: Ecosystem** (Weeks 9-12)
- [ ] Institution partnerships
- [ ] Cross-chain compatibility
- [ ] Advanced analytics
- [ ] API for third-party integrations

## 🤝 **Contributing**

We welcome contributions! Please see our [Contributing Guide](./.github/CONTRIBUTING.md) for details.

### Development Workflow
1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📄 **License**

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🏆 **Hackathon**

Built for the **Web3 Node Engine Hackathon** - showcasing the future of decentralized academic publishing.

**Team**: 2 developers, 38 hours of development + 5 hours presentation prep

## 📞 **Contact**

- **Website**: [openresearch.org](https://openresearch.org)
- **Twitter**: [@OpenResearchDAO](https://twitter.com/OpenResearchDAO)
- **Discord**: [Join our community](https://discord.gg/openresearch)
- **Email**: hello@openresearch.org

---

**🔬 Democratizing Science, One Paper at a Time**