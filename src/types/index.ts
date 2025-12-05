// User types
export interface User {
  user_id: string;
  username: string;
  email: string;
  full_name: string;
  phone?: string;
  avatar_url?: string;
  investment_horizon?: 'short-term' | 'medium-term' | 'long-term';
  risk_tolerance?: 'conservative' | 'moderate' | 'aggressive';
  investment_goals?: string[];
  created_at: string;
}

export interface AuthState {
  user: User | null;
  isAuthenticated: boolean;
  isLoading: boolean;
}

// Chat types
export interface Message {
  id: string;
  chat_id: string;
  role: 'user' | 'assistant';
  content: string;
  timestamp: string;
  tool_calls?: ToolCall[];
  charts?: ChartData[];
}

export interface ToolCall {
  id: string;
  name: string;
  status: 'pending' | 'running' | 'completed' | 'error';
  result?: unknown;
}

export interface ChartData {
  type: 'line' | 'candlestick' | 'bar' | 'pie';
  data: unknown;
  layout?: unknown;
}

export interface Chat {
  chat_id: string;
  title: string;
  created_at: string;
  updated_at: string;
  message_count: number;
  preview?: string;
}

// Portfolio types
export interface Holding {
  stock_id: string;
  symbol: string;
  name: string;
  quantity: number;
  buy_price: number;
  current_price: number;
  change_percent: number;
  change_absolute: number;
  current_value: number;
  total_pnl: number;
  total_pnl_percent: number;
  sector?: string;
}

export interface PortfolioSummary {
  total_value: number;
  total_invested: number;
  today_change: number;
  today_change_percent: number;
  total_pnl: number;
  total_pnl_percent: number;
  holdings_count: number;
}

export interface Transaction {
  id: string;
  type: 'buy' | 'sell';
  symbol: string;
  name: string;
  quantity: number;
  price: number;
  total: number;
  date: string;
}

// Watchlist types
export interface WatchlistStock {
  stock_id: string;
  symbol: string;
  name: string;
  current_price: number;
  change_percent: number;
  change_absolute: number;
  volume: number;
  market_cap?: number;
  pe_ratio?: number;
}

export interface PriceAlert {
  id: string;
  stock_id: string;
  symbol: string;
  target_price: number;
  trigger_type: 'above' | 'below';
  is_active: boolean;
  created_at: string;
}

// Market types
export interface MarketStock {
  symbol: string;
  name: string;
  price: number;
  change_percent: number;
  volume: number;
}

export interface MarketSentiment {
  overall: 'bullish' | 'bearish' | 'neutral';
  positive_percent: number;
  neutral_percent: number;
  negative_percent: number;
}

// News types
export interface NewsArticle {
  id: string;
  title: string;
  source: string;
  timestamp: string;
  snippet: string;
  sentiment: 'positive' | 'neutral' | 'negative';
  related_stocks: string[];
  url: string;
  image_url?: string;
}
