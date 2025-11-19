import React, { useState, useEffect } from 'react';
import { DollarSign, BarChart3, PieChart, Activity, Eye, EyeOff, ArrowUpRight, ArrowDownRight } from 'lucide-react';
import { useAuth } from '../../contexts/AuthContext';
import { useTradingStore } from '../../store/useStore';
import { tradeService } from '../../services/trade';
import { AreaChart, Area, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

const DashboardHome: React.FC = () => {
  const { user } = useAuth();
  const [showBalance, setShowBalance] = useState(true);
  const { trades, stats: tradeStats, isLoading, setTrades, setStats, setLoading, setError } = useTradingStore();

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const [tradesData, statsData] = await Promise.all([
          tradeService.getTrades({ limit: 50 }),
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

  // Calculate portfolio data
  const portfolioData = {
    totalBalance: tradeStats ? (100000 + (tradeStats.totalProfit || 0)) : 100000,
    totalProfit: tradeStats?.totalProfit || 0,
    profitPercent: tradeStats ? ((tradeStats.totalProfit || 0) / 100000) * 100 : 0,
    todayProfit: 0,
    todayProfitPercent: 0,
  };

  // Get open trades
  const openTrades = trades.filter(trade => trade.status === 'open');
  
  // Get recent closed trades
  const recentTrades = trades
    .filter(trade => trade.status === 'closed')
    .sort((a, b) => new Date(b.updatedAt).getTime() - new Date(a.updatedAt).getTime())
    .slice(0, 5);

  // Prepare chart data
  const closedTrades = trades.filter(t => t.status === 'closed');
  const chartData = closedTrades
    .slice(-30)
    .map((trade) => {
      const tradeIndex = closedTrades.indexOf(trade);
      return {
        date: new Date(trade.updatedAt).toLocaleDateString('en-US', { month: 'short', day: 'numeric' }),
        profit: trade.profit,
        cumulative: closedTrades
          .slice(0, tradeIndex + 1)
          .reduce((sum, t) => sum + (t.profit || 0), 0),
      };
    });

  const stats = [
    {
      title: 'Total Balance',
      value: showBalance ? `$${portfolioData.totalBalance.toLocaleString()}` : '••••••',
      change: portfolioData.profitPercent,
      changeLabel: 'Total Profit',
      icon: DollarSign,
      color: 'text-green-600 dark:text-green-400',
      bgColor: 'bg-green-50 dark:bg-green-900/20',
    },
    {
      title: 'Today\'s P&L',
      value: showBalance ? `$${portfolioData.todayProfit.toLocaleString()}` : '••••••',
      change: portfolioData.todayProfitPercent,
      changeLabel: 'Today\'s Change',
      icon: Activity,
      color: portfolioData.todayProfit >= 0 ? 'text-green-600 dark:text-green-400' : 'text-red-600 dark:text-red-400',
      bgColor: portfolioData.todayProfit >= 0 ? 'bg-green-50 dark:bg-green-900/20' : 'bg-red-50 dark:bg-red-900/20',
    },
    {
      title: 'Open Positions',
      value: tradeStats?.openTrades?.toString() || '0',
      change: 0,
      changeLabel: 'Active Trades',
      icon: BarChart3,
      color: 'text-blue-600 dark:text-blue-400',
      bgColor: 'bg-blue-50 dark:bg-blue-900/20',
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
      bgColor: 'bg-purple-50 dark:bg-purple-900/20',
    },
  ];

  return (
    <div className=" min-h-screen bg-gradient-to-br from-gray-50 via-white to-gray-50 dark:from-dark-900 dark:via-dark-800 dark:to-dark-900">
      {/* Header */}
      <div className="bg-white/80 dark:bg-dark-800/80 backdrop-blur-lg shadow-sm border-b border-gray-200/50 dark:border-dark-700/50 sticky top-0 z-10">
        <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-10 py-6">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
                Welcome back, {user?.firstName}! 👋
              </h1>
              <p className="text-gray-600 dark:text-gray-400 mt-1.5 text-sm">
                Here's what's happening with your trading account today.
              </p>
            </div>
            <button
              onClick={() => setShowBalance(!showBalance)}
              className="flex items-center px-4 py-2.5 bg-white dark:bg-dark-700 border border-gray-200 dark:border-dark-600 rounded-xl hover:bg-gray-50 dark:hover:bg-dark-600 transition-all duration-200 shadow-sm hover:shadow-md"
            >
              {showBalance ? (
                <EyeOff className="w-4 h-4 mr-2 text-gray-600 dark:text-gray-400" />
              ) : (
                <Eye className="w-4 h-4 mr-2 text-gray-600 dark:text-gray-400" />
              )}
              <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
                {showBalance ? 'Hide' : 'Show'} Balance
              </span>
            </button>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-10 py-8">
        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-10">
          {stats.map((stat, index) => {
            const Icon = stat.icon;
            return (
              <div 
                key={index} 
                className="group relative bg-white dark:bg-dark-800 rounded-2xl p-6 shadow-sm hover:shadow-xl transition-all duration-300 border border-gray-100 dark:border-dark-700 overflow-hidden"
              >
                <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-primary-50 to-transparent dark:from-primary-900/10 rounded-full -mr-16 -mt-16 opacity-50 group-hover:opacity-100 transition-opacity"></div>
                <div className="relative flex items-start justify-between">
                  <div className="flex-1">
                    <p className="text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider mb-2">
                      {stat.title}
                    </p>
                    <p className="text-3xl font-bold text-gray-900 dark:text-white mb-3">
                      {stat.value}
                    </p>
                    {stat.change !== 0 && (
                      <div className={`flex items-center ${stat.color}`}>
                        {stat.change >= 0 ? (
                          <ArrowUpRight className="w-4 h-4 mr-1.5" />
                        ) : (
                          <ArrowDownRight className="w-4 h-4 mr-1.5" />
                        )}
                        <span className="text-sm font-semibold">
                          {stat.change >= 0 ? '+' : ''}{stat.change.toFixed(2)}%
                        </span>
                        <span className="text-xs text-gray-500 dark:text-gray-400 ml-2">
                          {stat.changeLabel}
                        </span>
                      </div>
                    )}
                  </div>
                  <div className={`p-3.5 rounded-xl ${stat.bgColor} shadow-sm`}>
                    <Icon className={`w-6 h-6 ${stat.color}`} />
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Charts */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-10">
          {/* Profit Chart */}
          <div className="bg-white dark:bg-dark-800 rounded-2xl shadow-sm border border-gray-100 dark:border-dark-700 overflow-hidden">
            <div className="px-6 py-5 border-b border-gray-100 dark:border-dark-700 bg-gray-50/50 dark:bg-dark-900/50">
              <h3 className="text-lg font-bold text-gray-900 dark:text-white">
                Profit & Loss
              </h3>
              <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">Cumulative performance over time</p>
            </div>
            <div className="p-6">
              {chartData.length > 0 ? (
                <ResponsiveContainer width="100%" height={300}>
                  <AreaChart data={chartData}>
                    <CartesianGrid strokeDasharray="3 3" className="opacity-30" />
                    <XAxis dataKey="date" className="text-xs" />
                    <YAxis className="text-xs" />
                    <Tooltip
                      contentStyle={{
                        backgroundColor: 'var(--bg-color)',
                        border: '1px solid var(--border-color)',
                        borderRadius: '8px',
                      }}
                    />
                    <Area
                      type="monotone"
                      dataKey="cumulative"
                      stroke="#10b981"
                      fill="#10b981"
                      fillOpacity={0.2}
                      name="Cumulative Profit"
                    />
                  </AreaChart>
                </ResponsiveContainer>
              ) : (
                <div className="h-[300px] flex items-center justify-center text-gray-500 dark:text-gray-400">
                  No data available
                </div>
              )}
            </div>
          </div>

          {/* Trade Distribution */}
          <div className="bg-white dark:bg-dark-800 rounded-2xl shadow-sm border border-gray-100 dark:border-dark-700 overflow-hidden">
            <div className="px-6 py-5 border-b border-gray-100 dark:border-dark-700 bg-gray-50/50 dark:bg-dark-900/50">
              <h3 className="text-lg font-bold text-gray-900 dark:text-white">
                Trade Distribution
              </h3>
              <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">Overview of trade status</p>
            </div>
            <div className="p-6">
              {tradeStats ? (
                <ResponsiveContainer width="100%" height={300}>
                  <BarChart data={[
                    { name: 'Open', value: tradeStats.openTrades || 0 },
                    { name: 'Closed', value: tradeStats.closedTrades || 0 },
                    { name: 'Total', value: tradeStats.totalTrades || 0 },
                  ]}>
                    <CartesianGrid strokeDasharray="3 3" className="opacity-30" />
                    <XAxis dataKey="name" />
                    <YAxis />
                    <Tooltip />
                    <Bar dataKey="value" fill="#3b82f6" />
                  </BarChart>
                </ResponsiveContainer>
              ) : (
                <div className="h-[300px] flex items-center justify-center text-gray-500 dark:text-gray-400">
                  No data available
                </div>
              )}
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Open Positions */}
          <div className="bg-white dark:bg-dark-800 rounded-2xl shadow-sm border border-gray-100 dark:border-dark-700 overflow-hidden">
            <div className="px-6 py-5 border-b border-gray-100 dark:border-dark-700 bg-gray-50/50 dark:bg-dark-900/50">
              <h3 className="text-lg font-bold text-gray-900 dark:text-white">
                Open Positions
              </h3>
              <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">Currently active trades</p>
            </div>
            <div className="p-6">
              {isLoading ? (
                <div className="text-center py-8 text-gray-500 dark:text-gray-400">
                  Loading...
                </div>
              ) : openTrades.length === 0 ? (
                <div className="text-center py-12 text-gray-500 dark:text-gray-400">
                  <BarChart3 className="w-12 h-12 mx-auto mb-3 opacity-50" />
                  <p className="text-sm">No open positions</p>
                </div>
              ) : (
                <div className="space-y-3">
                  {openTrades.map((trade) => (
                    <div key={trade._id} className="flex items-center justify-between p-4 bg-gradient-to-r from-gray-50 to-white dark:from-dark-700 dark:to-dark-800 rounded-xl border border-gray-100 dark:border-dark-600 hover:shadow-md transition-all duration-200">
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
          <div className="bg-white dark:bg-dark-800 rounded-2xl shadow-sm border border-gray-100 dark:border-dark-700 overflow-hidden">
            <div className="px-6 py-5 border-b border-gray-100 dark:border-dark-700 bg-gray-50/50 dark:bg-dark-900/50">
              <h3 className="text-lg font-bold text-gray-900 dark:text-white">
                Recent Trades
              </h3>
              <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">Latest closed positions</p>
            </div>
            <div className="p-6">
              {isLoading ? (
                <div className="text-center py-8 text-gray-500 dark:text-gray-400">
                  Loading...
                </div>
              ) : recentTrades.length === 0 ? (
                <div className="text-center py-12 text-gray-500 dark:text-gray-400">
                  <Activity className="w-12 h-12 mx-auto mb-3 opacity-50" />
                  <p className="text-sm">No recent trades</p>
                </div>
              ) : (
                <div className="space-y-3">
                  {recentTrades.map((trade) => {
                    const tradeTime = new Date(trade.updatedAt).toLocaleTimeString('en-US', { 
                      hour: '2-digit', 
                      minute: '2-digit' 
                    });
                    return (
                      <div key={trade._id} className="flex items-center justify-between p-4 bg-gradient-to-r from-gray-50 to-white dark:from-dark-700 dark:to-dark-800 rounded-xl border border-gray-100 dark:border-dark-600 hover:shadow-md transition-all duration-200">
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
      </div>
    </div>
  );
};

export default DashboardHome;

