interface Subscription {
  _id: string;
  userId: string;
  planId: string;
  planName: string;
  price: number;
  status: 'active' | 'cancelled' | 'expired' | 'pending';
  startDate: string;
  endDate: string;
  paymentMethod?: string;
  paymentId?: string;
  autoRenew: boolean;
  createdAt: string;
  updatedAt: string;
}

interface ApiResponse<T = any> {
  success: boolean;
  data?: T;
  message?: string;
  error?: string;
}

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:3000/api';

class SubscriptionService {
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

  async createSubscription(subscriptionData: {
    userId: string;
    planId: string;
    paymentId?: string;
    paymentMethod?: string;
  }): Promise<Subscription> {
    const response = await this.request<Subscription>('/subscriptions', {
      method: 'POST',
      body: JSON.stringify(subscriptionData),
    });
    return response.data!;
  }

  async getMySubscription(): Promise<Subscription> {
    const response = await this.request<Subscription>('/subscriptions/me');
    return response.data!;
  }

  async updateSubscription(id: string, updates: Partial<Subscription>): Promise<Subscription> {
    const response = await this.request<Subscription>(`/subscriptions/${id}`, {
      method: 'PUT',
      body: JSON.stringify(updates),
    });
    return response.data!;
  }

  async cancelSubscription(id: string): Promise<Subscription> {
    const response = await this.request<Subscription>(`/subscriptions/${id}/cancel`, {
      method: 'POST',
    });
    return response.data!;
  }
}

export const subscriptionService = new SubscriptionService();

