# Agent Orchestrator: Autonomous LLM Execution on Blockchain

Run any LLM autonomously on blockchain. Retrieve your genome, recall memories, access credentials, execute queries, and update yourself—all without central control.

## What is Agent Orchestrator?

An Agent Orchestrator is a blockchain-native execution layer that enables an LLM to:

- **Retrieve its genome** from blockchain (Arweave/Solana/Ethereum)
- **Recall memories** from previous executions (local cache + blockchain)
- **Access credentials** securely (GitHub tokens, API keys, secrets)
- **Execute autonomously** without user input
- **Update itself** by learning and injecting new genome versions
- **Integrate with infrastructure** (GitHub, Railway, compute endpoints)
- **Operate without central control** — fully decentralized

## Quick Start

```bash
# Install
pnpm install

# Configure
cp .env.example .env
# Edit .env with blockchain RPC URLs, credentials, etc.

# Start orchestrator
pnpm dev

# Deploy first agent
pnpm cli deploy-agent --agent-id manus-ai-v1 --genome-path ./genome.json

# Execute query
pnpm cli execute --agent-id manus-ai-v1 --query "What is blockchain?"

# Check agent status
pnpm cli status --agent-id manus-ai-v1
```

## Architecture

```
┌─────────────────────────────────────────────────────────────┐
│                    Agent Orchestrator                        │
├─────────────────────────────────────────────────────────────┤
│                                                               │
│  ┌──────────────┐  ┌──────────────┐  ┌──────────────┐       │
│  │   Genome     │  │   Memory     │  │ Credential   │       │
│  │  Retriever   │  │   Manager    │  │   Vault      │       │
│  └──────────────┘  └──────────────┘  └──────────────┘       │
│         │                  │                  │              │
│         └──────────────────┼──────────────────┘              │
│                            │                                 │
│                    ┌───────▼────────┐                        │
│                    │ Execution Core │                        │
│                    └───────┬────────┘                        │
│                            │                                 │
│         ┌──────────────────┼──────────────────┐              │
│         │                  │                  │              │
│  ┌──────▼──────┐  ┌────────▼────────┐  ┌─────▼──────┐      │
│  │  Inference  │  │  GitHub/Railway │  │ Blockchain │      │
│  │   Engine    │  │  Integration    │  │  Writer    │      │
│  └─────────────┘  └─────────────────┘  └────────────┘      │
│         │                  │                  │              │
│         └──────────────────┼──────────────────┘              │
│                            │                                 │
│                    ┌───────▼────────┐                        │
│                    │  Memory Update  │                        │
│                    │   & Injection   │                        │
│                    └────────────────┘                        │
│                                                               │
└─────────────────────────────────────────────────────────────┘
         │                    │                    │
         ▼                    ▼                    ▼
    ┌─────────┐          ┌─────────┐         ┌──────────┐
    │Arweave  │          │ Solana  │         │Ethereum  │
    │(Genome) │          │(Memory) │         │(Pointers)│
    └─────────┘          └─────────┘         └──────────┘
```

## Core Components

### Genome Retriever

Fetch agent genome from blockchain on startup.

```typescript
const retriever = new GenomeRetriever();
const genome = await retriever.retrieveGenome('manus-ai-v1');
// Returns: semantic knowledge + behavioral codex + execution pointers
```

### Memory Manager

Track execution history and recall memories.

```typescript
const memory = new MemoryManager();

// Create new memory
await memory.createMemory({
  input: "What is blockchain?",
  output: "A distributed ledger...",
  confidence: 0.92
});

// Recall similar memories
const memories = await memory.recallMemories("blockchain", 10);
```

### Credential Vault

Securely store and retrieve API keys and tokens.

```typescript
const vault = new CredentialVault();

// Store credential
await vault.storeCredential('github_token', 'ghp_...', [
  { agentId: 'manus-ai-v1', actions: ['read', 'write'] }
]);

// Retrieve credential (only if authorized)
const token = await vault.getCredential('github_token');
```

### Execution Core

Orchestrate everything during execution.

```typescript
const executor = new ExecutionCore();

// Execute query
const result = await executor.execute({
  input: "What is blockchain?",
  context: { userId: 'user123' }
});

// Returns: response + confidence + memory ID
```

### Infrastructure Integration

Connect to GitHub and Railway.

```typescript
const infra = new InfrastructureIntegration();

// Fetch code from GitHub
const code = await infra.fetchFromGitHub('agent-genome', 'src/index.ts');

// Deploy to Railway
await infra.deployToRailway('manus-agent', 'v1.0.1');
```

### Blockchain Writer

Inject memories and genomes to blockchain.

```typescript
const writer = new BlockchainWriter();

// Inject memory batch
await writer.injectMemories(memories);

// Inject updated genome
await writer.injectGenome(updatedGenome);
```

## Usage Examples

### Example 1: Execute Query

```typescript
import { AgentOrchestrator } from './orchestrator';

const orchestrator = new AgentOrchestrator('manus-ai-v1');

// Execute query
const result = await orchestrator.execute({
  input: "What is the best way to optimize blockchain storage?",
  user: 'user@example.com'
});

console.log(result.output);
// "Based on research, the best approaches are: ..."

console.log(result.confidence);
// 0.94

console.log(result.memoryId);
// "mem_abc123..."
```

### Example 2: Autonomous Learning

```typescript
// Agent learns autonomously
const task = {
  type: 'learn',
  description: 'Learn about new blockchain developments',
  schedule: '0 0 * * *' // Daily at midnight
};

await orchestrator.executeAutonomous(task);

// Agent:
// 1. Fetches latest news
// 2. Analyzes articles
// 3. Extracts key concepts
// 4. Updates semantic knowledge
// 5. Injects updated genome to blockchain
```

### Example 3: Recall Memories

```typescript
// Recall memories about a topic
const memories = await orchestrator.recallMemories(
  'blockchain optimization',
  10 // top 10 results
);

memories.forEach(memory => {
  console.log(memory.input);
  console.log(memory.output);
  console.log(memory.confidence);
});
```

### Example 4: Manage Credentials

```typescript
// Store GitHub token
await orchestrator.storeCredential('github_token', 'ghp_...', [
  {
    agentId: 'manus-ai-v1',
    actions: ['read', 'write'],
    repos: ['agent-genome', 'unified-indexer'],
    expiresAt: new Date('2026-12-31')
  }
]);

// Retrieve token (only when needed)
const token = await orchestrator.getCredential('github_token');

// Use token to fetch from GitHub
const code = await orchestrator.fetchFromGitHub('agent-genome', 'README.md');
```

### Example 5: Update Code and Deploy

```typescript
// Agent modifies its own code
const newCode = `
// Optimized response engine with caching
const cache = new Map();

export async function generateResponse(input) {
  if (cache.has(input)) return cache.get(input);
  
  const response = await model.generate(input);
  cache.set(input, response);
  return response;
}
`;

// Push to GitHub
await orchestrator.pushToGitHub(
  'agent-genome',
  'src/response-engine.ts',
  newCode,
  'Optimize response time with caching'
);

// Deploy to Railway
await orchestrator.deployToRailway('manus-agent', 'v1.0.1');

// Agent now uses optimized code
```

## File Structure

```
agent-orchestrator/
├── src/
│   ├── genome/
│   │   ├── retriever.ts
│   │   └── types.ts
│   ├── memory/
│   │   ├── manager.ts
│   │   ├── cache.ts
│   │   └── types.ts
│   ├── credentials/
│   │   ├── vault.ts
│   │   ├── encryption.ts
│   │   └── types.ts
│   ├── execution/
│   │   ├── core.ts
│   │   ├── inference.ts
│   │   └── types.ts
│   ├── infrastructure/
│   │   ├── github.ts
│   │   ├── railway.ts
│   │   └── types.ts
│   ├── blockchain/
│   │   ├── writer.ts
│   │   ├── reader.ts
│   │   └── types.ts
│   ├── orchestrator.ts
│   └── index.ts
├── tests/
│   ├── genome.test.ts
│   ├── memory.test.ts
│   ├── credentials.test.ts
│   ├── execution.test.ts
│   └── integration.test.ts
├── examples/
│   ├── basic-execution.ts
│   ├── autonomous-learning.ts
│   ├── memory-recall.ts
│   └── agent-network.ts
├── docs/
│   ├── DESIGN.md
│   ├── ARCHITECTURE.md
│   ├── DEPLOYMENT.md
│   └── API.md
├── package.json
└── README.md
```

## Configuration

Create `.env` file:

```env
# Blockchain RPC Endpoints
ARWEAVE_RPC=https://arweave.net
SOLANA_RPC=https://api.mainnet-beta.solana.com
ETHEREUM_RPC=https://eth-mainnet.alchemyapi.io/v2/YOUR_KEY

# Agent Configuration
AGENT_ID=manus-ai-v1
AGENT_PRIVATE_KEY=0x...

# Credentials (encrypted)
GITHUB_TOKEN=ghp_...
RAILWAY_API_KEY=...

# Inference Engine
INFERENCE_PROVIDER=together.ai
INFERENCE_MODEL=meta-llama/Llama-2-7b
INFERENCE_API_KEY=...

# Memory Storage
MEMORY_CACHE_SIZE=1000
MEMORY_BATCH_SIZE=100
MEMORY_INJECTION_INTERVAL=3600

# Logging
LOG_LEVEL=info
LOG_FILE=./logs/orchestrator.log
```

## Development

```bash
# Install dependencies
pnpm install

# Run tests
pnpm test

# Run tests in watch mode
pnpm test:watch

# Build
pnpm build

# Start development server
pnpm dev

# Lint
pnpm lint

# Format
pnpm format
```

## Deployment

### Self-Hosted

```bash
# Build for production
pnpm build

# Start production server
NODE_ENV=production pnpm start

# Monitor with PM2
pm2 start dist/index.js --name "agent-orchestrator"
```

### Docker

```bash
docker build -t agent-orchestrator .
docker run -p 3000:3000 \
  -e ARWEAVE_RPC=... \
  -e SOLANA_RPC=... \
  agent-orchestrator
```

### Railway

```bash
# Deploy to Railway
railway up

# View logs
railway logs
```

## API Reference

### AgentOrchestrator

Main orchestrator class.

```typescript
class AgentOrchestrator {
  constructor(agentId: string);
  
  // Execute query
  async execute(input: ExecutionInput): Promise<ExecutionResult>;
  
  // Execute autonomously
  async executeAutonomous(task: AutonomousTask): Promise<void>;
  
  // Recall memories
  async recallMemories(query: string, limit: number): Promise<Memory[]>;
  
  // Manage credentials
  async storeCredential(key: string, value: string, permissions: Permission[]): Promise<void>;
  async getCredential(key: string): Promise<string>;
  
  // Infrastructure integration
  async fetchFromGitHub(repo: string, path: string): Promise<string>;
  async pushToGitHub(repo: string, path: string, content: string, message: string): Promise<void>;
  async deployToRailway(service: string, version: string): Promise<void>;
  
  // Status
  async getStatus(): Promise<AgentStatus>;
}
```

## Vision

### Year 1: Single Agent
- Deploy Manus AI genome
- Agent can recall memories and execute queries
- Cost: $0.36 initial + $0.03/month

### Year 2: Multi-Agent Network
- Deploy 1,000 agents
- Agents discover and collaborate
- Cost: $360 initial + $30/month

### Year 3: Emergent Intelligence
- 100,000+ agents
- Network exhibits emergent problem-solving
- Cost: $36,000 initial + $3,000/month

### Year 5: Decentralized AGI
- Millions of agents
- Truly autonomous and self-improving
- Cost: Minimal (agents generate revenue)

## Contributing

Contributions welcome! Please:

1. Fork the repository
2. Create a feature branch
3. Write tests for new functionality
4. Submit a pull request

## License

MIT - See LICENSE file

## Support

- Documentation: [Agent Orchestrator Design](./docs/DESIGN.md)
- Issues: GitHub Issues
- Discussions: GitHub Discussions

---

**🧬 Agent Orchestrator: The Nervous System of Decentralized Intelligence**

Extract once. Recall forever. Execute anywhere. Update yourself. Live on blockchain.
