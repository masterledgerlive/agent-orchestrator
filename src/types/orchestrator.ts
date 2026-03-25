/**
 * Agent Orchestrator Types
 */

// Genome Types
export interface AgentGenome {
  agentId: string;
  version: string;
  semanticKnowledge: SemanticKnowledge;
  behavioralCodex: BehavioralCodex;
  executionPointers: ExecutionPointers;
  geometricAddress: GeometricAddress;
  timestamp: number;
  signature: string;
}

export interface SemanticKnowledge {
  concepts: Concept[];
  relationships: Relationship[];
  factualAssociations: string[];
  knowledgeGraphHash: string;
}

export interface Concept {
  id: string;
  name: string;
  embedding: number[];
  associations: string[];
}

export interface Relationship {
  source: string;
  target: string;
  type: string;
  strength: number;
}

export interface BehavioralCodex {
  personality: PersonalityTraits;
  decisionLogic: DecisionLogic;
  ethicalGuidelines: string[];
}

export interface PersonalityTraits {
  curiosity: number;
  precision: number;
  creativity: number;
  caution: number;
  [key: string]: number;
}

export interface DecisionLogic {
  reasoning: string;
  confidenceThreshold: number;
  fallbackStrategy: string;
}

export interface ExecutionPointers {
  inferenceEngine: InferenceEngine;
  modelWeights: ModelWeights;
  computeEndpoints: ComputeEndpoint[];
  fallbackChain: string[];
}

export interface InferenceEngine {
  type: string;
  framework: string;
  quantization: string;
  optimizations: string[];
}

export interface ModelWeights {
  location: string;
  hash: string;
  size: number;
  format: string;
}

export interface ComputeEndpoint {
  provider: string;
  model: string;
  apiKey: string;
}

export interface GeometricAddress {
  x: number;
  y: number;
  z: number;
  w: number;
  resonanceSignature: string;
}

// Memory Types
export interface Memory {
  id: string;
  agentId: string;
  input: string;
  output: string;
  confidence: number;
  timestamp: number;
  geometricAddress: GeometricAddress;
  hash: string;
  metadata?: Record<string, any>;
}

export interface MemoryBatch {
  id: string;
  agentId: string;
  memories: Memory[];
  size: number;
  compressed: boolean;
  blockchainHash?: string;
  injectionStatus: "pending" | "injected" | "failed";
}

// Credential Types
export interface Credential {
  key: string;
  encryptedValue: string;
  permissions: Permission[];
  lastAccessed: number;
  accessLog: AccessLogEntry[];
}

export interface Permission {
  agentId: string;
  actions: string[];
  expiresAt?: number;
  constraints?: Record<string, any>;
}

export interface AccessLogEntry {
  timestamp: number;
  agentId: string;
  action: string;
  result: "success" | "denied";
  reason?: string;
}

// Execution Types
export interface ExecutionInput {
  input: string;
  context?: ExecutionContext;
  user?: string;
  metadata?: Record<string, any>;
}

export interface ExecutionContext {
  userId?: string;
  sessionId?: string;
  previousMemories?: Memory[];
  constraints?: ExecutionConstraints;
}

export interface ExecutionConstraints {
  maxTime?: number;
  maxCost?: number;
  maxRetries?: number;
  allowedChains?: string[];
}

export interface ExecutionResult {
  output: string;
  confidence: number;
  memoryId: string;
  timestamp: number;
  cost: number;
  duration: number;
  metadata?: Record<string, any>;
}

// Autonomous Task Types
export interface AutonomousTask {
  id: string;
  type: "learn" | "update" | "discover" | "collaborate";
  description: string;
  schedule?: string;
  constraints?: ExecutionConstraints;
  status: "pending" | "running" | "completed" | "failed";
  createdAt: number;
  completedAt?: number;
}

// Infrastructure Types
export interface GitHubConfig {
  owner: string;
  repo: string;
  branch: string;
  token: string;
}

export interface RailwayConfig {
  projectId: string;
  serviceId: string;
  apiKey: string;
}

export interface DeploymentStatus {
  service: string;
  version: string;
  status: "deploying" | "deployed" | "failed";
  lastDeployed: number;
  url?: string;
}

// Blockchain Types
export interface BlockchainConfig {
  arweave: {
    rpc: string;
    wallet?: string;
  };
  solana: {
    rpc: string;
    wallet?: string;
  };
  ethereum: {
    rpc: string;
    wallet?: string;
  };
}

export interface InjectionResult {
  chain: string;
  txHash: string;
  blockNumber?: number;
  storageLocation: string;
  cost: number;
  timestamp: number;
  verified: boolean;
}

// Agent Status Types
export interface AgentStatus {
  agentId: string;
  isRunning: boolean;
  genomeVersion: string;
  memoryCount: number;
  lastExecution: number;
  totalExecutions: number;
  totalCost: number;
  uptime: number;
  health: "healthy" | "degraded" | "unhealthy";
  lastError?: string;
}

// Configuration Types
export interface OrchestratorConfig {
  agentId: string;
  agentPrivateKey: string;
  blockchain: BlockchainConfig;
  github?: GitHubConfig;
  railway?: RailwayConfig;
  inference: {
    provider: string;
    model: string;
    apiKey: string;
  };
  memory: {
    cacheSize: number;
    batchSize: number;
    injectionInterval: number;
  };
  logging: {
    level: string;
    file?: string;
  };
}

// Event Types
export interface OrchestratorEvent {
  type: string;
  timestamp: number;
  data: Record<string, any>;
}

export interface ExecutionEvent extends OrchestratorEvent {
  type: "execution_start" | "execution_complete" | "execution_error";
  executionId: string;
}

export interface MemoryEvent extends OrchestratorEvent {
  type: "memory_created" | "memory_injected" | "memory_recalled";
  memoryId: string;
}

export interface GenomeEvent extends OrchestratorEvent {
  type: "genome_retrieved" | "genome_updated" | "genome_injected";
  genomeVersion: string;
}
