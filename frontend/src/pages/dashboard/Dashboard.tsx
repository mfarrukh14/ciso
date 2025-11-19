import React, { useState, useEffect } from 'react';
import { TrendingUp, TrendingDown, DollarSign, BarChart3, PieChart, Activity, Eye, EyeOff } from 'lucide-react';
import { useAuth } from '../../contexts/AuthContext';
import { useTradingStore } from '../../store/useStore';
import { tradeService } from '../../services/trade';

const Dashboard: React.FC = () => {
  const { user } = useAuth();
  const [showBalance, setShowBalance] = useState(true);
  const { trades, stats: tradeStats, isLoading, setTrades, setStats, setLoading, setError } = useTradingStore();

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const [tradesData, statsData] = await Promise.all([
          tradeService.getTrades({ status: 'open', limit: 10 }),
          tradeService.getTradeStats(),
        ]);
        setTrades(tradesData);
        setStats(statsData);
      } catch (error: any) {
        setError(error.message || 'Failed to fetch data');
        console.error('Error fetching dashboard data:', error);
      } finally {
        setLoading(false);
      }
    };

    if (user) {
      fetchData();
    }
  }, [user, setTrades, setStats, setLoading, setError]);

  // Calculate portfolio data from tradeStats
  const portfolioData = {
    totalBalance: tradeStats ? (100000 + (tradeStats.totalProfit || 0)) : 100000,
    totalProfit: tradeStats?.totalProfit || 0,
    profitPercent: tradeStats ? ((tradeStats.totalProfit || 0) / 100000) * 100 : 0,
    todayProfit: 0, // Can be calculated from recent trades
    todayProfitPercent: 0,
  };

  // Get open trades
  const openTrades = trades.filter(trade => trade.status === 'open');
  
  // Get recent closed trades
  const recentTrades = trades
    .filter(trade => trade.status === 'closed')
    .sort((a, b) => new Date(b.updatedAt).getTime() - new Date(a.updatedAt).getTime())
    .slice(0, 5);

  const stats = [
    {
      title: 'Total Balance',
      value: showBalance ? `$${portfolioData.totalBalance.toLocaleString()}` : '••••••',
      change: portfolioData.profitPercent,
      changeLabel: 'Total Profit',
      icon: DollarSign,
      color: 'text-green-600 dark:text-green-400',
    },
    {
      title: 'Today\'s P&L',
      value: showBalance ? `$${portfolioData.todayProfit.toLocaleString()}` : '••••••',
      change: portfolioData.todayProfitPercent,
      changeLabel: 'Today\'s Change',
      icon: Activity,
      color: portfolioData.todayProfit >= 0 ? 'text-green-600 dark:text-green-400' : 'text-red-600 dark:text-red-400',
    },
    {
      title: 'Open Positions',
      value: tradeStats?.openTrades?.toString() || '0',
      change: 0,
      changeLabel: 'Active Trades',
      icon: BarChart3,
      color: 'text-blue-600 dark:text-blue-400',
    },
    {
      title: 'Win Rate',
      value: (() => {
        if (!tradeStats || tradeStats.closedTrades === 0) return '0%';
        const closedTradesList = trades.filter(t => t.status === 'closed');
        const winningTrades = closedTradesList.filter(t => (t.profit ?? 0) > 0).length;
        const winRate = closedTradesList.length > 0 
          ? (winningTrades / closedTradesList.length) * 100 
          : 0;
        return `${winRate.toFixed(1)}%`;
      })(),
      change: 0,
      changeLabel: 'Success Rate',
      icon: PieChart,
      color: 'text-purple-600 dark:text-purple-400',
    },
  ];

  return (
    <div className="dashboard min-h-screen mt-20 bg-gray-50 dark:bg-dark-900">
      {/* Header */}
      <div className="bg-white dark:bg-dark-800 shadow-sm border-b border-gray-200 dark:border-dark-700">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
                Welcome back, {user?.firstName}!
              </h1>
              <p className="text-gray-600 dark:text-gray-400">
                Here's what's happening with your trading account.
              </p>
            </div>
            <button
              onClick={() => setShowBalance(!showBalance)}
              className="flex items-center px-4 py-2 bg-gray-100 dark:bg-dark-700 rounded-lg hover:bg-gray-200 dark:hover:bg-dark-600 transition-colors"
            >
              {showBalance ? (
                <EyeOff className="w-4 h-4 mr-2 text-gray-600 dark:text-gray-400" />
              ) : (
                <Eye className="w-4 h-4 mr-2 text-gray-600 dark:text-gray-400" />
              )}
              {showBalance ? 'Hide' : 'Show'} Balance
            </button>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {stats.map((stat, index) => {
            const Icon = stat.icon;
            return (
              <div key={index} className="card p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-600 dark:text-gray-400">
                      {stat.title}
                    </p>
                    <p className="text-2xl font-bold text-gray-900 dark:text-white mt-1">
                      {stat.value}
                    </p>
                    {stat.change !== 0 && (
                      <div className={`flex items-center mt-2 ${stat.color}`}>
                        {stat.change >= 0 ? (
                          <TrendingUp className="w-4 h-4 mr-1" />
                        ) : (
                          <TrendingDown className="w-4 h-4 mr-1" />
                        )}
                        <span className="text-sm font-medium">
                          {stat.change >= 0 ? '+' : ''}{stat.change}%
                        </span>
                        <span className="text-sm text-gray-500 dark:text-gray-400 ml-1">
                          {stat.changeLabel}
                        </span>
                      </div>
                    )}
                  </div>
                  <div className={`p-3 rounded-lg ${stat.color.replace('text-', 'bg-').replace('dark:text-', 'dark:bg-')} bg-opacity-10`}>
                    <Icon className={`w-6 h-6 ${stat.color}`} />
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Open Positions */}
          <div className="card">
            <div className="px-6 py-4 border-b border-gray-200 dark:border-dark-700">
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                Open Positions
              </h3>
            </div>
            <div className="p-6">
              {isLoading ? (
                <div className="text-center py-8 text-gray-500 dark:text-gray-400">
                  Loading...
                </div>
              ) : openTrades.length === 0 ? (
                <div className="text-center py-8 text-gray-500 dark:text-gray-400">
                  No open positions
                </div>
              ) : (
                <div className="space-y-4">
                  {openTrades.map((trade) => (
                    <div key={trade._id} className="flex items-center justify-between p-4 bg-gray-50 dark:bg-dark-700 rounded-lg">
                      <div className="flex items-center space-x-4">
                        <div className={`w-3 h-3 rounded-full ${
                          trade.type === 'BUY' || trade.type === 'BUY_STOP' ? 'bg-green-500' : 'bg-red-500'
                        }`}></div>
                        <div>
                          <div className="font-medium text-gray-900 dark:text-white">
                            {trade.symbol}
                          </div>
                          <div className="text-sm text-gray-600 dark:text-gray-400">
                            {trade.type} • {trade.lotSize} lots
                          </div>
                        </div>
                      </div>
                      <div className="text-right">
                        <div className="font-medium text-gray-900 dark:text-white">
                          ${trade.entryPrice.toFixed(2)}
                        </div>
                        <div className={`text-sm ${
                          trade.profit >= 0 ? 'text-green-600 dark:text-green-400' : 'text-red-600 dark:text-red-400'
                        }`}>
                          {trade.profit >= 0 ? '+' : ''}${trade.profit.toFixed(2)}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>

          {/* Recent Trades */}
          <div className="card">
            <div className="px-6 py-4 border-b border-gray-200 dark:border-dark-700">
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                Recent Trades
              </h3>
            </div>
            <div className="p-6">
              {isLoading ? (
                <div className="text-center py-8 text-gray-500 dark:text-gray-400">
                  Loading...
                </div>
              ) : recentTrades.length === 0 ? (
                <div className="text-center py-8 text-gray-500 dark:text-gray-400">
                  No recent trades
                </div>
              ) : (
                <div className="space-y-4">
                  {recentTrades.map((trade) => {
                    const tradeTime = new Date(trade.updatedAt).toLocaleTimeString('en-US', { 
                      hour: '2-digit', 
                      minute: '2-digit' 
                    });
                    return (
                      <div key={trade._id} className="flex items-center justify-between py-3 border-b border-gray-200 dark:border-dark-700 last:border-b-0">
                        <div className="flex items-center space-x-4">
                          <div className={`w-2 h-2 rounded-full ${
                            trade.type === 'BUY' || trade.type === 'BUY_STOP' ? 'bg-green-500' : 'bg-red-500'
                          }`}></div>
                          <div>
                            <div className="font-medium text-gray-900 dark:text-white">
                              {trade.symbol}
                            </div>
                            <div className="text-sm text-gray-600 dark:text-gray-400">
                              {trade.type} • {trade.lotSize} lots
                            </div>
                          </div>
                        </div>
                        <div className="text-right">
                          <div className="font-medium text-gray-900 dark:text-white">
                            ${trade.exitPrice?.toFixed(2) || trade.entryPrice.toFixed(2)}
                          </div>
                          <div className="text-sm text-gray-600 dark:text-gray-400">
                            {tradeTime}
                          </div>
                        </div>
                        <div className={`text-sm font-medium ${
                          trade.profit >= 0 ? 'text-green-600 dark:text-green-400' : 'text-red-600 dark:text-red-400'
                        }`}>
                          {trade.profit >= 0 ? '+' : ''}${trade.profit.toFixed(2)}
                        </div>
                      </div>
                    );
                  })}
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Quick Actions */}
        <div className="mt-8">
          <div className="card">
            <div className="px-6 py-4 border-b border-gray-200 dark:border-dark-700">
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                Quick Actions
              </h3>
            </div>
            <div className="p-6">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <button className="btn-primary">
                  New Trade
                </button>
                <button className="btn-secondary">
                  View Charts
                </button>
                <button className="btn-secondary">
                  Market Analysis
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
