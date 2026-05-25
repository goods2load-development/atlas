// Shared types for the Goods2Load Freight Assistant (chat agent).
// Extended with Atlas multi-agent pipeline fields
// (atlas/components/ranker_agent.py — RankedCandidate).

export type ChatRole = 'user' | 'assistant';

export interface ChatMessage {
  id: string;
  role: ChatRole;
  content: string;
  createdAt: number;
  data?: ChatMessageData;
}

export interface ChatMessageData {
  intent?: Record<string, unknown>;
  matches?: MatchedProvider[];
  recommendation?: string; // Atlas C5 Ranker recommendation_summary
  rag_hints?: string[]; // Historical forwarder hints from C1.5 RAG
}

export interface MatchedProvider {
  id: string;
  company_name: string;
  country?: string | null;
  city?: string | null;
  rank?: number;
  score?: number; // verification_score 0–100

  // Atlas pipeline fields
  verification_tier?: 'VERIFIED' | 'PARTIAL' | 'SELF_DECLARED';
  confidence_tier?: 'HIGH' | 'MEDIUM' | 'LOW';
  modes?: string; // "AIR, SEA, ROAD"
  google_rating?: number | null;
  google_review_count?: number | null;
  enrichment_summary?: string;
  match_rationale?: string;
  strengths?: string[];
  watch_outs?: string[];
  capabilities?: string[];
}

// Request/response contract for POST /api/agent
export interface AgentRequest {
  messages: Pick<ChatMessage, 'role' | 'content'>[];
  session_id?: string; // Atlas session — send back each turn
}

export interface AgentResponse {
  reply: string;
  session_id?: string; // Atlas session ID — persist across turns
  data?: ChatMessageData;
}
