# OpenResearch Platform - Design Document

## Architecture Overview

OpenResearch follows a hybrid Web3 architecture that combines the best of traditional web technologies with blockchain and decentralized storage. This approach ensures immediate usability while providing a clear path to full decentralization.

### Design Principles

1. **Progressive Decentralization**: Start with traditional tech, gradually migrate to Web3
2. **Modular Architecture**: Independent, loosely coupled components
3. **Hybrid Storage**: Traditional databases for performance, blockchain for immutability
4. **User-Centric Design**: Web3 complexity hidden behind intuitive interfaces
5. **Scalable Foundation**: Architecture supports growth from MVP to millions of users

## System Architecture

### High-Level Architecture Diagram

```
┌─────────────────┐    ┌─────────────────┐    ┌─────────────────┐
│   Web Frontend  │    │  Mobile Apps    │    │  Browser Ext    │
│   (React/Next)  │    │  (React Native) │    │   (Extension)   │
└─────────┬───────┘    └─────────┬───────┘    └─────────┬───────┘
          │                      │                      │
          └──────────────────────┼──────────────────────┘
                                 │
                    ┌─────────────┴─────────────┐
                    │      API Gateway          │
                    │   (Load Balancer/CDN)     │
                    └─────────────┬─────────────┘
                                  │
          ┌───────────────────────┼───────────────────────┐
          │                       │                       │
┌─────────┴───────┐    ┌─────────┴───────┐    ┌─────────┴───────┐
│  Core Services  │    │  Web3 Services  │    │ Storage Services│
│   (Node.js)     │    │   (Blockchain)  │    │  (IPFS/S3/DB)   │
└─────────────────┘    └─────────────────┘    └─────────────────┘
```

### Technology Stack

#### Frontend Layer
- **Framework**: Next.js 14 with React 18
- **Styling**: TailwindCSS with Headless UI components
- **State Management**: Zustand for client state, TanStack Query for server state
- **Web3 Integration**: Wagmi + Viem for Ethereum interactions
- **Authentication**: NextAuth.js with custom Web3 provider

#### Backend Layer
- **Runtime**: Node.js 20+ with TypeScript
- **Framework**: Fastify (performance) or Express (familiarity)
- **Database**: PostgreSQL 15+ with Prisma ORM
- **Caching**: Redis for session and query caching
- **Queue System**: BullMQ for background job processing
- **File Storage**: AWS S3 + IPFS hybrid approach

#### Blockchain Layer
- **Primary Network**: Polygon (low fees, fast transactions)
- **Fallback Networks**: Arbitrum, Optimism
- **Smart Contracts**: Solidity with Hardhat development environment
- **Indexing**: The Graph Protocol for blockchain data querying
#### Decentralized Storage
- **Primary**: IPFS with Pinata/Web3.Storage pinning services
- **Backup**: Arweave for permanent storage of critical documents
- **CDN**: Cloudflare for global content delivery

## Core Components Design

### 1. Authentication & Identity System

#### Hybrid Authentication Architecture
```typescript
interface AuthenticationSystem {
  traditional: {
    email: string;
    password: string;
    twoFactor?: boolean;
  };
  web3: {
    walletAddress: string;
    signature: string;
    nonce: string;
  };
  profile: {
    orcid?: string;
    institution: string;
    reputation: number;
    achievements: Badge[];
  };
}
```

#### Implementation Strategy
1. **Phase 1**: Traditional email/password authentication
2. **Phase 2**: Add Web3 wallet connection as optional
3. **Phase 3**: Enable wallet-only authentication
4. **Phase 4**: Implement decentralized identity (DID)

### 2. Paper Management System

#### Data Model
```typescript
interface Paper {
  id: string;
  doi?: string;
  title: string;
  abstract: string;
  authors: Author[];
  keywords: string[];
  category: ResearchCategory;
  
  // Storage
  fileHash: string;
  ipfsCid: string;
  s3Url: string;
  
  // Blockchain
  blockchainTxHash?: string;
  contractAddress?: string;
  tokenId?: number;
  
  // Status
  status: PaperStatus;
  submissionDate: Date;
  publicationDate?: Date;
  
  // Metrics
  viewCount: number;
  downloadCount: number;
  citationCount: number;
  qualityScore: number;
}
```

#### Storage Strategy
- **Metadata**: PostgreSQL for fast queries and complex relationships
- **Files**: IPFS for decentralization + S3 for performance
- **Immutable Records**: Blockchain for DOI registration and publication proof
### 3. Peer Review System

#### Review Workflow
```mermaid
graph TD
    A[Paper Submitted] --> B[Auto-assign Reviewers]
    B --> C[Send Review Invitations]
    C --> D[Reviewers Accept/Decline]
    D --> E[Review Submission]
    E --> F[Review Quality Check]
    F --> G[Mint Review NFT]
    G --> H[Calculate Paper Score]
    H --> I[Publication Decision]
    I --> J[DOI Registration on Chain]
```

#### Review NFT Structure
```solidity
struct ReviewNFT {
    uint256 paperId;
    address reviewer;
    string ipfsHash;
    uint8 rating;
    uint256 timestamp;
    bool isAnonymous;
    uint256 qualityScore;
}
```

### 4. Token Economy Design

#### ORES Token Utility
- **Governance**: Vote on platform decisions
- **Incentives**: Rewards for quality contributions
- **Staking**: Quality assurance mechanism
- **Access**: Premium features and services

#### Token Distribution
- 40% - Community rewards (papers, reviews, citations)
- 20% - Development team (4-year vesting)
- 15% - Early adopters and beta users
- 10% - Institutional partnerships
- 10% - Treasury for governance
- 5% - Advisors and consultants

#### Reward Mechanisms
```typescript
interface RewardSystem {
  paperSubmission: {
    base: 10; // ORES tokens
    qualityMultiplier: 1.0 - 3.0;
    categoryBonus: 0 - 5;
  };
  
  peerReview: {
    base: 5; // ORES tokens
    qualityMultiplier: 1.0 - 2.0;
    timelinessBonus: 0 - 2;
  };
  
  citations: {
    perCitation: 1; // ORES tokens
    impactMultiplier: 1.0 - 5.0;
  };
}
```
### 5. Smart Contract Architecture

#### Core Contracts

##### DOI Registry Contract
```solidity
contract DOIRegistry {
    struct DOIRecord {
        string doi;
        string ipfsHash;
        address author;
        uint256 timestamp;
        bool isPublished;
    }
    
    mapping(string => DOIRecord) public dois;
    
    function registerDOI(
        string memory doi,
        string memory ipfsHash
    ) external returns (bool);
    
    function verifyDOI(string memory doi) 
        external view returns (DOIRecord memory);
}
```

##### Review NFT Contract
```solidity
contract PeerReviewNFT is ERC721 {
    struct Review {
        uint256 paperId;
        address reviewer;
        string metadataURI;
        uint8 rating;
        uint256 qualityScore;
    }
    
    mapping(uint256 => Review) public reviews;
    
    function mintReview(
        uint256 paperId,
        string memory metadataURI,
        uint8 rating
    ) external returns (uint256 tokenId);
}
```

##### Reputation Contract
```solidity
contract ReputationSystem {
    mapping(address => uint256) public reputationScores;
    mapping(address => Badge[]) public userBadges;
    
    struct Badge {
        string name;
        string description;
        uint256 timestamp;
        BadgeRarity rarity;
    }
    
    function updateReputation(
        address user,
        int256 change,
        string memory reason
    ) external onlyAuthorized;
    
    function awardBadge(
        address user,
        Badge memory badge
    ) external onlyAuthorized;
}
```

### 6. Database Schema Design

#### Core Tables
```sql
-- Users table with hybrid auth support
CREATE TABLE users (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    email VARCHAR(255) UNIQUE,
    username VARCHAR(100) UNIQUE NOT NULL,
    password_hash VARCHAR(255),
    wallet_address VARCHAR(42) UNIQUE,
    
    -- Profile information
    full_name VARCHAR(255),
    bio TEXT,
    affiliation VARCHAR(255),
    orcid VARCHAR(50),
    website VARCHAR(255),
    
    -- Reputation and metrics
    reputation_score INTEGER DEFAULT 0,
    total_papers INTEGER DEFAULT 0,
    total_reviews INTEGER DEFAULT 0,
    total_citations INTEGER DEFAULT 0,
    
    -- Timestamps
    created_at TIMESTAMP DEFAULT NOW(),
    updated_at TIMESTAMP DEFAULT NOW(),
    last_login TIMESTAMP
);
```
```sql
-- Papers table with Web3 integration
CREATE TABLE papers (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    doi VARCHAR(100) UNIQUE,
    title TEXT NOT NULL,
    abstract TEXT NOT NULL,
    
    -- Authors and metadata
    authors JSONB NOT NULL,
    keywords JSONB,
    category VARCHAR(100) NOT NULL,
    license VARCHAR(50) DEFAULT 'CC-BY',
    
    -- Storage references
    file_hash VARCHAR(64) NOT NULL,
    ipfs_cid VARCHAR(100),
    s3_url TEXT,
    file_size BIGINT,
    
    -- Blockchain references
    blockchain_tx_hash VARCHAR(66),
    contract_address VARCHAR(42),
    token_id BIGINT,
    
    -- Status and workflow
    status paper_status DEFAULT 'draft',
    version INTEGER DEFAULT 1,
    submitted_by UUID REFERENCES users(id),
    
    -- Metrics
    view_count INTEGER DEFAULT 0,
    download_count INTEGER DEFAULT 0,
    citation_count INTEGER DEFAULT 0,
    quality_score DECIMAL(3,2) DEFAULT 0.00,
    
    -- Timestamps
    created_at TIMESTAMP DEFAULT NOW(),
    updated_at TIMESTAMP DEFAULT NOW(),
    submitted_at TIMESTAMP,
    published_at TIMESTAMP
);

-- Reviews table with NFT integration
CREATE TABLE reviews (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    paper_id UUID REFERENCES papers(id),
    reviewer_id UUID REFERENCES users(id),
    
    -- Review content
    rating INTEGER CHECK (rating BETWEEN 1 AND 5),
    recommendation review_recommendation,
    comments TEXT,
    strengths TEXT,
    weaknesses TEXT,
    suggestions TEXT,
    
    -- Review metadata
    is_anonymous BOOLEAN DEFAULT true,
    review_type VARCHAR(50) DEFAULT 'peer',
    quality_score DECIMAL(3,2) DEFAULT 0.00,
    
    -- NFT information
    nft_token_id BIGINT,
    nft_contract_address VARCHAR(42),
    ipfs_metadata_hash VARCHAR(100),
    
    -- Status and timeline
    status review_status DEFAULT 'pending',
    invited_at TIMESTAMP DEFAULT NOW(),
    submitted_at TIMESTAMP,
    completed_at TIMESTAMP
);
```

### 7. API Design

#### RESTful API Structure
```typescript
// Authentication endpoints
POST   /api/auth/register
POST   /api/auth/login
POST   /api/auth/wallet-connect
GET    /api/auth/me
POST   /api/auth/refresh

// Paper management
POST   /api/papers              // Submit paper
GET    /api/papers              // List papers with filters
GET    /api/papers/:id          // Get paper details
PUT    /api/papers/:id          // Update paper
DELETE /api/papers/:id          // Delete draft
POST   /api/papers/:id/publish  // Publish paper
GET    /api/papers/:id/download // Download file
POST   /api/papers/:id/cite     // Record citation

// Review system
POST   /api/reviews             // Submit review
GET    /api/reviews/paper/:id   // Get paper reviews
GET    /api/reviews/pending     // Get pending reviews
PUT    /api/reviews/:id         // Update review
POST   /api/reviews/:id/mint-nft // Mint review NFT

// User management
GET    /api/users/:id           // Get user profile
PUT    /api/users/:id           // Update profile
GET    /api/users/:id/papers    // Get user papers
GET    /api/users/:id/reviews   // Get user reviews
GET    /api/users/:id/reputation // Get reputation details

// Search and discovery
GET    /api/search/papers       // Search papers
GET    /api/search/users        // Search users
GET    /api/search/suggestions  // Get search suggestions

// Analytics and metrics
GET    /api/analytics/papers/:id // Paper analytics
GET    /api/analytics/users/:id  // User analytics
GET    /api/analytics/platform   // Platform metrics

// Web3 integration
POST   /api/web3/mint-doi       // Mint DOI on blockchain
POST   /api/web3/verify-signature // Verify wallet signature
GET    /api/web3/token-balance  // Get user token balance
POST   /api/web3/claim-rewards  // Claim token rewards
```
### 8. Frontend Architecture

#### Component Structure
```
src/
├── components/
│   ├── common/           # Reusable UI components
│   │   ├── Button.tsx
│   │   ├── Modal.tsx
│   │   ├── LoadingSpinner.tsx
│   │   └── ErrorBoundary.tsx
│   ├── layout/           # Layout components
│   │   ├── Header.tsx
│   │   ├── Sidebar.tsx
│   │   ├── Footer.tsx
│   │   └── Navigation.tsx
│   ├── auth/             # Authentication components
│   │   ├── LoginForm.tsx
│   │   ├── RegisterForm.tsx
│   │   ├── WalletConnect.tsx
│   │   └── ProfileSettings.tsx
│   ├── papers/           # Paper-related components
│   │   ├── PaperCard.tsx
│   │   ├── PaperList.tsx
│   │   ├── PaperDetail.tsx
│   │   ├── SubmissionForm.tsx
│   │   └── PaperViewer.tsx
│   ├── reviews/          # Review components
│   │   ├── ReviewForm.tsx
│   │   ├── ReviewCard.tsx
│   │   ├── ReviewDashboard.tsx
│   │   └── ReviewerInvite.tsx
│   ├── search/           # Search components
│   │   ├── SearchBar.tsx
│   │   ├── SearchFilters.tsx
│   │   ├── SearchResults.tsx
│   │   └── AdvancedSearch.tsx
│   ├── gamification/     # Gamification components
│   │   ├── ReputationBadge.tsx
│   │   ├── Leaderboard.tsx
│   │   ├── AchievementCard.tsx
│   │   └── TokenBalance.tsx
│   └── web3/             # Web3 components
│       ├── WalletProvider.tsx
│       ├── ContractInteraction.tsx
│       ├── TransactionStatus.tsx
│       └── NetworkSwitcher.tsx
├── hooks/                # Custom React hooks
│   ├── useAuth.ts
│   ├── usePapers.ts
│   ├── useReviews.ts
│   ├── useWallet.ts
│   └── useTokens.ts
├── services/             # API and external services
│   ├── api.ts
│   ├── auth.service.ts
│   ├── papers.service.ts
│   ├── reviews.service.ts
│   ├── web3.service.ts
│   └── ipfs.service.ts
├── store/                # State management
│   ├── authStore.ts
│   ├── papersStore.ts
│   ├── reviewsStore.ts
│   └── web3Store.ts
├── utils/                # Utility functions
│   ├── formatters.ts
│   ├── validators.ts
│   ├── constants.ts
│   └── helpers.ts
└── types/                # TypeScript type definitions
    ├── auth.types.ts
    ├── paper.types.ts
    ├── review.types.ts
    └── web3.types.ts
```

### 9. Security Architecture

#### Authentication Security
- JWT tokens with short expiration (15 minutes)
- Refresh tokens with longer expiration (7 days)
- Rate limiting on authentication endpoints
- Account lockout after failed attempts
- Two-factor authentication support

#### Web3 Security
- Signature verification for wallet authentication
- Nonce-based replay attack prevention
- Smart contract access controls
- Multi-signature requirements for critical functions
- Time-locked contract upgrades

#### Data Security
- Encryption at rest for sensitive data
- TLS 1.3 for data in transit
- Input validation and sanitization
- SQL injection prevention
- XSS protection with Content Security Policy

### 10. Performance Optimization

#### Caching Strategy
- Redis for session and frequently accessed data
- CDN for static assets and IPFS content
- Database query optimization with proper indexing
- API response caching with appropriate TTL

#### Frontend Optimization
- Code splitting and lazy loading
- Image optimization and WebP support
- Service worker for offline capabilities
- Progressive Web App (PWA) features

#### Database Optimization
- Proper indexing strategy
- Query optimization and monitoring
- Connection pooling
- Read replicas for analytics queries
## Implementation Phases

### Phase 1: Core MVP (Weeks 1-4)
**Goal**: Functional platform with traditional features

**Features**:
- User registration and authentication
- Paper submission and storage
- Basic search and discovery
- Simple review system
- User profiles and reputation

**Technology Focus**:
- Traditional web stack (Next.js, PostgreSQL, S3)
- Email-based authentication
- Basic UI/UX implementation

### Phase 2: Web3 Integration (Weeks 5-8)
**Goal**: Add blockchain features and token economy

**Features**:
- Wallet connection and Web3 authentication
- Smart contract deployment
- DOI registration on blockchain
- Review NFT minting
- Basic token rewards

**Technology Focus**:
- Smart contract development and testing
- IPFS integration for file storage
- Web3 frontend integration

### Phase 3: Gamification & Advanced Features (Weeks 9-12)
**Goal**: User engagement and retention features

**Features**:
- Achievement and badge system
- Leaderboards and competitions
- Advanced search and recommendations
- Citation graph visualization
- Analytics dashboard

**Technology Focus**:
- Advanced frontend features
- Machine learning for recommendations
- Data visualization components

### Phase 4: Decentralization & Governance (Weeks 13-16)
**Goal**: Full decentralization and community governance

**Features**:
- DAO governance implementation
- Decentralized moderation
- Advanced token economics
- Mobile applications
- API for third-party integrations

**Technology Focus**:
- Governance smart contracts
- Mobile app development
- API documentation and SDKs

## Deployment Architecture

### Development Environment
```yaml
# docker-compose.dev.yml
version: '3.8'
services:
  frontend:
    build: ./frontend
    ports: ["3000:3000"]
    environment:
      - NEXT_PUBLIC_API_URL=http://localhost:4000
      
  backend:
    build: ./backend
    ports: ["4000:4000"]
    environment:
      - DATABASE_URL=postgresql://user:pass@postgres:5432/openresearch
      - REDIS_URL=redis://redis:6379
      
  postgres:
    image: postgres:15
    environment:
      POSTGRES_DB: openresearch
      POSTGRES_USER: user
      POSTGRES_PASSWORD: pass
    volumes:
      - postgres_data:/var/lib/postgresql/data
      
  redis:
    image: redis:7-alpine
    volumes:
      - redis_data:/data
      
  ipfs:
    image: ipfs/go-ipfs:latest
    ports: ["5001:5001", "8080:8080"]
    volumes:
      - ipfs_data:/data/ipfs

volumes:
  postgres_data:
  redis_data:
  ipfs_data:
```

### Production Deployment
- **Frontend**: Vercel with global CDN
- **Backend**: Railway or AWS ECS with auto-scaling
- **Database**: AWS RDS PostgreSQL with read replicas
- **Storage**: AWS S3 + IPFS with Pinata pinning
- **Monitoring**: DataDog or New Relic
- **Error Tracking**: Sentry

## Testing Strategy

### Unit Testing
- Backend: Jest with supertest for API testing
- Frontend: Vitest with React Testing Library
- Smart Contracts: Hardhat with Waffle

### Integration Testing
- API integration tests
- Database integration tests
- Blockchain integration tests

### End-to-End Testing
- Playwright for critical user flows
- Wallet connection testing
- File upload/download testing

## Monitoring and Analytics

### Application Monitoring
- Performance metrics (response time, throughput)
- Error tracking and alerting
- User behavior analytics
- Business metrics dashboard

### Blockchain Monitoring
- Smart contract event monitoring
- Gas usage optimization
- Transaction success rates
- Token economy health metrics

This design document provides a comprehensive technical foundation for building OpenResearch as a scalable, secure, and user-friendly decentralized academic publishing platform.