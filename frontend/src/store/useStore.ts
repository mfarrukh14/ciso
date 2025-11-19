import { create } from 'zustand';
import { persist } from 'zustand/middleware';

interface Trade {
  _id: string;
  symbol: string;
  type: string;
  lotSize: number;
  entryPrice: number;
  exitPrice?: number;
  stopLoss?: number;
  takeProfit?: number;
  status: 'open' | 'closed' | 'pending';
  profit: number;
  level: number;
  mt5Ticket?: number;
  riskProfile: number;
  createdAt: string;
  updatedAt: string;
}

interface TradeStats {
  totalTrades: number;
  openTrades: number;
  closedTrades: number;
  totalProfit: number;
  avgProfit: number;
}

interface TradingState {
  trades: Trade[];
  stats: TradeStats | null;
  isLoading: boolean;
  error: string | null;
  setTrades: (trades: Trade[]) => void;
  addTrade: (trade: Trade) => void;
  updateTrade: (id: string, updates: Partial<Trade>) => void;
  setStats: (stats: TradeStats) => void;
  setLoading: (loading: boolean) => void;
  setError: (error: string | null) => void;
  clearTrades: () => void;
}

const initialState = {
  trades: [],
  stats: null,
  isLoading: false,
  error: null,
};

export const useTradingStore = create<TradingState>()(
  persist(
    (set) => ({
      ...initialState,
      setTrades: (trades) => set({ trades }),
      addTrade: (trade) => set((state) => ({ trades: [...state.trades, trade] })),
      updateTrade: (id, updates) =>
        set((state) => ({
          trades: state.trades.map((trade) =>
            trade._id === id ? { ...trade, ...updates } : trade
          ),
        })),
      setStats: (stats) => set({ stats }),
      setLoading: (isLoading) => set({ isLoading }),
      setError: (error) => set({ error }),
      clearTrades: () => set(initialState),
    }),
    {
      name: 'trading-storage',
      partialize: (state) => ({ trades: state.trades, stats: state.stats }),
    }
  )
);

