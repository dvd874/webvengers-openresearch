# OpenResearch - Kiro Collaboration Strategy
## Preventing Conflicts & Context Issues with 2 Developers

---

## ⚠️ **Potential Issues & Solutions**

### **1. Git Merge Conflicts**

#### **Problems**:
- Both devs editing same files simultaneously
- Conflicting changes to shared components
- Package.json/lock file conflicts
- Database schema conflicts

#### **Solutions**:
```bash
# File Ownership Strategy
contracts/          # Dev A primary ownership
backend/            # Dev A primary ownership  
frontend/src/components/web3/  # Dev A secondary
frontend/src/components/ui/    # Dev B primary ownership
frontend/src/pages/            # Dev B primary ownership
frontend/src/services/         # Shared - coordinate changes
shared/types/                  # Shared - coordinate changes
```

#### **Git Workflow**:
```bash
# Frequent commits (every 30 minutes)
git add .
git commit -m "feat: add wallet connection component"
git pull --rebase origin main
git push origin main

# For major features, use short-lived branches
git checkout -b feature/review-nft
# Work for 2-4 hours max
git checkout main
git merge feature/review-nft
git branch -d feature/review-nft
```

### **2. Kiro Context Conflicts**

#### **Problems**:
- Multiple Kiro instances accessing same files
- Context getting corrupted with simultaneous edits
- AI suggestions based on outdated context
- Conflicting code generation

#### **Solutions**:

##### **Context Partitioning Strategy**:
```
Developer A Kiro Context:
- Focus on: contracts/, backend/, database/
- Secondary: frontend/src/components/web3/
- Avoid: frontend/src/components/ui/, frontend/src/pages/

Developer B Kiro Context:  
- Focus on: frontend/src/components/ui/, frontend/src/pages/
- Secondary: frontend/src/services/, frontend/src/hooks/
- Avoid: contracts/, backend/
```

##### **Kiro Session Management**:
```bash
# Dev A - Backend/Web3 focused session
kiro --context="backend,contracts,web3" --exclude="ui,pages"

# Dev B - Frontend/UI focused session  
kiro --context="frontend,ui,components" --exclude="contracts,backend"
```

### **3. Package Dependencies Conflicts**

#### **Problems**:
- Both devs installing different packages
- Package-lock.json conflicts
- Version mismatches

#### **Solutions**:
```bash
# Coordinate package installations
# Dev A: Backend & Web3 packages
npm install --prefix backend express cors dotenv pg redis
npm install --prefix frontend wagmi viem @rainbow-me/rainbowkit

# Dev B: Frontend & UI packages  
npm install --prefix frontend @headlessui/react framer-motion
npm install --prefix frontend recharts d3 @types/d3

# Always communicate before installing new packages
# Use shared Slack/Discord for package announcements
```

---

## 🔄 **Recommended Collaboration Workflow**

### **Hour-by-Hour Coordination**

#### **Every Hour: Quick Sync** (2 minutes)
```bash
# Status update format:
"Working on: [specific component/feature]
Blocked by: [any dependencies]  
Next: [what you'll work on next hour]
Files touched: [list of files you're editing]"
```

#### **Every 4 Hours: Integration Checkpoint** (15 minutes)
```bash
# Both devs:
1. Commit and push current work
2. Pull latest changes
3. Test integration points
4. Resolve any conflicts immediately
5. Update shared types/interfaces if needed
```

### **File Coordination System**

#### **Shared File Protocol**:
```typescript
// For files both devs need to edit (types, configs, etc.)
// Use this comment system:

// @dev-a: Working on user types (ETA: 30 min)
export interface User {
  // Dev A's work here
}

// @dev-b: Working on UI types (ETA: 45 min)  
export interface UIState {
  // Dev B's work here
}

// @shared: Coordinate before editing
export interface SharedConfig {
  // Discuss changes in chat first
}
```

#### **Lock File System** (for critical shared files):
```bash
# Create temporary lock files for coordination
touch .locks/types.lock  # Dev A editing shared types
touch .locks/api.lock    # Dev B editing API interfaces

# Check for locks before editing shared files
ls .locks/
```

---

## 🛠 **Technical Solutions**

### **1. Separate Development Ports**
```bash
# Dev A ports
Backend: 4000
Frontend: 3000  
Database: 5432
Redis: 6379

# Dev B ports (if running locally)
Backend: 4001
Frontend: 3001
Database: 5433
Redis: 6380

# Or use shared development environment
Docker Compose with shared services
```

### **2. Database Migration Strategy**
```bash
# Sequential migration numbering
001_initial_schema.sql     # Dev A
002_add_reviews_table.sql  # Dev A  
003_add_ui_preferences.sql # Dev B
004_add_citations.sql      # Dev A

# Always coordinate database changes
# Test migrations on shared dev database
```

### **3. Environment Variable Management**
```bash
# Use different .env files
.env.dev-a    # Dev A's local config
.env.dev-b    # Dev B's local config  
.env.shared   # Shared development config
.env.example  # Template for both devs
```

### **4. Kiro Hooks for Coordination**
```json
// .kiro/hooks/pre-commit.json
{
  "name": "Coordination Check",
  "when": {
    "type": "fileEdited",
    "patterns": ["shared/**", "types/**", "api/**"]
  },
  "then": {
    "type": "askAgent",
    "prompt": "Check if other developer is working on this file. Coordinate changes if needed."
  }
}
```

---

## 📋 **Daily Workflow Protocol**

### **Start of Day** (10 minutes)
```bash
# Both developers:
1. Pull latest changes: git pull origin main
2. Check .locks/ directory for active work
3. Review overnight commits and changes
4. Sync on day's priorities and file ownership
5. Start Kiro with appropriate context filters
```

### **During Development**
```bash
# Every 30 minutes:
- Commit work in progress
- Check for conflicts: git status
- Pull latest changes: git pull --rebase
- Push updates: git push origin main

# Before editing shared files:
- Check Slack/Discord for coordination
- Look for .lock files
- Announce your intentions
```

### **End of Day** (15 minutes)
```bash
# Both developers:
1. Commit and push all work
2. Remove any .lock files you created
3. Test integration points
4. Document any breaking changes
5. Plan next day's work and dependencies
```

---

## 🚨 **Emergency Conflict Resolution**

### **Git Merge Conflicts**
```bash
# When conflicts occur:
1. Don't panic - conflicts are normal
2. Communicate immediately with other dev
3. Use VS Code merge conflict resolution
4. Test thoroughly after resolution
5. Commit with descriptive message

# Example conflict resolution:
git pull origin main
# Resolve conflicts in VS Code
npm test  # Ensure nothing broke
git add .
git commit -m "resolve: merge conflict in user types"
git push origin main
```

### **Kiro Context Issues**
```bash
# If Kiro context gets corrupted:
1. Close Kiro completely
2. Clear Kiro cache: rm -rf .kiro/cache/
3. Restart with clean context
4. Re-establish file focus areas
5. Communicate with other dev about reset
```

### **Package Dependency Hell**
```bash
# If package conflicts occur:
1. Delete node_modules and package-lock.json
2. Coordinate with other dev on package versions
3. Install packages in agreed order
4. Test that everything still works
5. Commit lock files immediately

rm -rf node_modules package-lock.json
npm install
npm test
git add package-lock.json
git commit -m "fix: resolve package dependency conflicts"
```

---

## 🎯 **Success Metrics for Collaboration**

### **Conflict Prevention**
- [ ] Zero major merge conflicts requiring manual resolution
- [ ] No lost work due to coordination issues
- [ ] Kiro context remains clean and focused
- [ ] Both devs can work simultaneously without blocking

### **Communication Effectiveness**
- [ ] Hourly status updates maintained
- [ ] Shared file changes coordinated in advance
- [ ] Integration checkpoints completed on schedule
- [ ] No duplicate work or conflicting implementations

### **Technical Quality**
- [ ] Code quality maintained despite rapid development
- [ ] Integration points work smoothly
- [ ] No breaking changes without coordination
- [ ] Consistent coding standards across both developers

---

## 🛡️ **Backup Plans**

### **If Collaboration Breaks Down**
1. **Split into separate branches**: Each dev works on feature branch
2. **Designate integration lead**: One person handles all merges
3. **Reduce scope**: Focus on core features only
4. **Pair programming**: Work together on critical components

### **If Kiro Conflicts Persist**
1. **Single Kiro instance**: One dev uses Kiro, other uses traditional tools
2. **Time-boxed Kiro usage**: Alternate Kiro access every 2 hours
3. **Context separation**: Strict file ownership with no overlap
4. **Manual coordination**: Increase communication frequency

### **If Git Issues Escalate**
1. **Feature branch strategy**: No more direct main commits
2. **Integration windows**: Scheduled merge times
3. **Code review requirement**: All changes reviewed before merge
4. **Rollback plan**: Keep working versions tagged

---

**The key is proactive communication and clear boundaries. With proper coordination, two developers can work efficiently in the same Kiro context without major conflicts.**