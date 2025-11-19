import React, { useEffect, useState } from 'react';
import { useTradingStore } from '../../store/useStore';
import { tradeService } from '../../services/trade';
import { AreaChart, Area, BarChart, Bar, PieChart, Pie, Cell, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

const Analytics: React.FC = () => {
  const { trades, setTrades, setLoading } = useTradingStore();
  const [timeRange, setTimeRange] = useState<'7d' | '30d' | '90d' | 'all'>('30d');

  useEffect(() => {
    const fetchTrades = async () => {
      try {
        setLoading(true);
        const data = await tradeService.getTrades({ limit: 1000 });
        setTrades(data);
      } catch (error) {
        console.error('Error fetching trades:', error);
      } finally {
        setLoading(false);
      }
    };
    fetchTrades();
  }, [setTrades, setLoading]);

  // Prepare chart data
  const profitData = trades
    .filter(t => t.status === 'closed')
    .slice(-30)
    .map((trade, index, array) => ({
      date: new Date(trade.updatedAt).toLocaleDateString('en-US', { month: 'short', day: 'numeric' }),
      profit: trade.profit,
      cumulative: array.slice(0, index + 1).reduce((sum, t) => sum + (t.profit || 0), 0),
    }));

  const symbolDistribution = trades.reduce((acc: any, trade) => {
    acc[trade.symbol] = (acc[trade.symbol] || 0) + 1;
    return acc;
  }, {});

  const pieData = Object.entries(symbolDistribution).map(([name, value]) => ({
    name,
    value,
  }));

  const COLORS = ['#3b82f6', '#10b981', '#f59e0b', '#ef4444', '#8b5cf6', '#ec4899'];

  const monthlyData = trades
    .filter(t => t.status === 'closed')
    .reduce((acc: any, trade) => {
      const month = new Date(trade.updatedAt).toLocaleDateString('en-US', { month: 'short', year: 'numeric' });
      if (!acc[month]) {
        acc[month] = { month, profit: 0, trades: 0 };
      }
      acc[month].profit += trade.profit || 0;
      acc[month].trades += 1;
      return acc;
    }, {});

  const monthlyChartData = Object.values(monthlyData);

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-dark-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-6 flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Analytics</h1>
            <p className="text-gray-600 dark:text-gray-400 mt-1">Detailed trading performance analysis</p>
          </div>
          <select
            value={timeRange}
            onChange={(e) => setTimeRange(e.target.value as any)}
            className="px-4 py-2 border border-gray-300 dark:border-dark-700 rounded-lg bg-white dark:bg-dark-800 text-gray-900 dark:text-white"
          >
            <option value="7d">Last 7 days</option>
            <option value="30d">Last 30 days</option>
            <option value="90d">Last 90 days</option>
            <option value="all">All time</option>
          </select>
        </div>

        {/* Charts Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
          {/* Cumulative Profit */}
          <div className="card">
            <div className="px-6 py-4 border-b border-gray-200 dark:border-dark-700">
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white">Cumulative Profit</h3>
            </div>
            <div className="p-6">
              <ResponsiveContainer width="100%" height={300}>
                <AreaChart data={profitData}>
                  <CartesianGrid strokeDasharray="3 3" className="opacity-30" />
                  <XAxis dataKey="date" />
                  <YAxis />
                  <Tooltip />
                  <Area type="monotone" dataKey="cumulative" stroke="#10b981" fill="#10b981" fillOpacity={0.2} />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </div>

          {/* Monthly Performance */}
          <div className="card">
            <div className="px-6 py-4 border-b border-gray-200 dark:border-dark-700">
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white">Monthly Performance</h3>
            </div>
            <div className="p-6">
              <ResponsiveContainer width="100%" height={300}>
                <BarChart data={monthlyChartData}>
                  <CartesianGrid strokeDasharray="3 3" className="opacity-30" />
                  <XAxis dataKey="month" />
                  <YAxis />
                  <Tooltip />
                  <Bar dataKey="profit" fill="#3b82f6" />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>
        </div>

        {/* Symbol Distribution */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <div className="card">
            <div className="px-6 py-4 border-b border-gray-200 dark:border-dark-700">
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white">Symbol Distribution</h3>
            </div>
            <div className="p-6">
              <ResponsiveContainer width="100%" height={300}>
                <PieChart>
                  <Pie
                    data={pieData}
                    cx="50%"
                    cy="50%"
                    labelLine={false}
                    label={({ name, percent }) => `${name} ${((percent || 0) * 100).toFixed(0)}%`}
                    outerRadius={80}
                    fill="#8884d8"
                    dataKey="value"
                  >
                    {pieData.map((_entry, index) => (
                      <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                    ))}
                  </Pie>
                  <Tooltip />
                </PieChart>
              </ResponsiveContainer>
            </div>
          </div>

          {/* Trade Statistics */}
          <div className="card">
            <div className="px-6 py-4 border-b border-gray-200 dark:border-dark-700">
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white">Trade Statistics</h3>
            </div>
            <div className="p-6">
              <div className="space-y-4">
                <div className="flex justify-between items-center">
                  <span className="text-gray-600 dark:text-gray-400">Total Trades</span>
                  <span className="font-semibold text-gray-900 dark:text-white">{trades.length}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-gray-600 dark:text-gray-400">Winning Trades</span>
                  <span className="font-semibold text-green-600 dark:text-green-400">
                    {trades.filter(t => (t.profit || 0) > 0).length}
                  </span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-gray-600 dark:text-gray-400">Losing Trades</span>
                  <span className="font-semibold text-red-600 dark:text-red-400">
                    {trades.filter(t => (t.profit || 0) < 0).length}
                  </span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-gray-600 dark:text-gray-400">Win Rate</span>
                  <span className="font-semibold text-gray-900 dark:text-white">
                    {trades.length > 0
                      ? ((trades.filter(t => (t.profit || 0) > 0).length / trades.length) * 100).toFixed(1)
                      : 0}%
                  </span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-gray-600 dark:text-gray-400">Average Profit</span>
                  <span className={`font-semibold ${
                    trades.reduce((sum, t) => sum + (t.profit || 0), 0) / trades.length >= 0
                      ? 'text-green-600 dark:text-green-400'
                      : 'text-red-600 dark:text-red-400'
                  }`}>
                    ${trades.length > 0
                      ? (trades.reduce((sum, t) => sum + (t.profit || 0), 0) / trades.length).toFixed(2)
                      : '0.00'}
                  </span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-gray-600 dark:text-gray-400">Total Profit</span>
                  <span className={`font-semibold text-lg ${
                    trades.reduce((sum, t) => sum + (t.profit || 0), 0) >= 0
                      ? 'text-green-600 dark:text-green-400'
                      : 'text-red-600 dark:text-red-400'
                  }`}>
                    ${trades.reduce((sum, t) => sum + (t.profit || 0), 0).toFixed(2)}
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Analytics;

