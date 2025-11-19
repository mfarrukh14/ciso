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

interface ApiResponse<T = any> {
  success: boolean;
  data?: T;
  message?: string;
  error?: string;
}

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:3000/api';

class TradeService {
  private baseURL: string;

  constructor() {
    this.baseURL = API_BASE_URL;
  }

  private async request<T>(
    endpoint: string,
    options: RequestInit = {}
  ): Promise<ApiResponse<T>> {
    const token = localStorage.getItem('authToken');

    const config: RequestInit = {
      headers: {
        'Content-Type': 'application/json',
        ...(token && { Authorization: `Bearer ${token}` }),
        ...options.headers,
      },
      ...options,
    };

    try {
      const response = await fetch(`${this.baseURL}${endpoint}`, config);
      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || data.error || 'An error occurred');
      }

      return data;
    } catch (error) {
      console.error('API request failed:', error);
      throw error;
    }
  }

  async getTrades(params?: {
    status?: string;
    symbol?: string;
    limit?: number;
    page?: number;
  }): Promise<Trade[]> {
    const queryParams = new URLSearchParams();
    if (params?.status) queryParams.append('status', params.status);
    if (params?.symbol) queryParams.append('symbol', params.symbol);
    if (params?.limit) queryParams.append('limit', params.limit.toString());
    if (params?.page) queryParams.append('page', params.page.toString());

    const queryString = queryParams.toString();
    const endpoint = `/trades${queryString ? `?${queryString}` : ''}`;

    const response = await this.request<Trade[]>(endpoint);
    return response.data || [];
  }

  async getTrade(id: string): Promise<Trade> {
    const response = await this.request<Trade>(`/trades/${id}`);
    return response.data!;
  }

  async createTrade(tradeData: Partial<Trade>): Promise<Trade> {
    const response = await this.request<Trade>('/trades', {
      method: 'POST',
      body: JSON.stringify(tradeData),
    });
    return response.data!;
  }

  async updateTrade(id: string, updates: Partial<Trade>): Promise<Trade> {
    const response = await this.request<Trade>(`/trades/${id}`, {
      method: 'PUT',
      body: JSON.stringify(updates),
    });
    return response.data!;
  }

  async getTradeStats(): Promise<TradeStats> {
    const response = await this.request<TradeStats>('/trades/stats');
    return response.data!;
  }
}

export const tradeService = new TradeService();

