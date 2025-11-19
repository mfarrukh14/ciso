export interface TradingPair {
  id: string;
  symbol: string;
  name: string;
  price: number;
  change: number;
  changePercent: number;
  volume: number;
  high24h: number;
  low24h: number;
}

export interface Portfolio {
  id: string;
  userId: string;
  totalValue: number;
  totalProfit: number;
  totalProfitPercent: number;
  positions: Position[];
}

export interface Position {
  id: string;
  symbol: string;
  type: 'buy' | 'sell';
  amount: number;
  entryPrice: number;
  currentPrice: number;
  profit: number;
  profitPercent: number;
  createdAt: string;
}
