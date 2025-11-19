import React, { useState } from 'react';
import { TrendingUp, TrendingDown, DollarSign, PieChart, BarChart3, Eye, EyeOff } from 'lucide-react';

const Portfolio: React.FC = () => {
  const [showValues, setShowValues] = useState(true);
  const [timeRange, setTimeRange] = useState('1M');

  const portfolioData = {
    totalValue: 125430.50,
    totalProfit: 15430.50,
    profitPercent: 14.03,
    dayChange: 1250.30,
    dayChangePercent: 1.01,
  };

  const positions = [
    {
      symbol: 'EUR/USD',
      type: 'Long',
      amount: 10000,
      entryPrice: 1.0850,
      currentPrice: 1.0875,
      profit: 25.00,
      profitPercent: 0.25,
      allocation: 8.0,
    },
    {
      symbol: 'GBP/USD',
      type: 'Short',
      amount: 5000,
      entryPrice: 1.2650,
      currentPrice: 1.2625,
      profit: 12.50,
      profitPercent: 0.25,
      allocation: 4.0,
    },
    {
      symbol: 'USD/JPY',
      type: 'Long',
      amount: 8000,
      entryPrice: 149.00,
      currentPrice: 149.50,
      profit: 26.84,
      profitPercent: 0.34,
      allocation: 6.4,
    },
    {
      symbol: 'AUD/USD',
      type: 'Long',
      amount: 12000,
      entryPrice: 0.6520,
      currentPrice: 0.6545,
      profit: 46.15,
      profitPercent: 0.38,
      allocation: 9.6,
    },
  ];

  const timeRanges = [
    { value: '1D', label: '1 Day' },
    { value: '1W', label: '1 Week' },
    { value: '1M', label: '1 Month' },
    { value: '3M', label: '3 Months' },
    { value: '1Y', label: '1 Year' },
    { value: 'ALL', label: 'All Time' },
  ];

  const stats = [
    {
      title: 'Total Value',
      value: showValues ? `$${portfolioData.totalValue.toLocaleString()}` : '••••••',
      change: portfolioData.profitPercent,
      changeLabel: 'Total Return',
      icon: DollarSign,
      color: 'text-green-600 dark:text-green-400',
    },
    {
      title: 'Today\'s Change',
      value: showValues ? `$${portfolioData.dayChange.toLocaleString()}` : '••••••',
      change: portfolioData.dayChangePercent,
      changeLabel: 'Today\'s Return',
      icon: TrendingUp,
      color: portfolioData.dayChange >= 0 ? 'text-green-600 dark:text-green-400' : 'text-red-600 dark:text-red-400',
    },
    {
      title: 'Open Positions',
      value: positions.length.toString(),
      change: 0,
      changeLabel: 'Active Trades',
      icon: BarChart3,
      color: 'text-blue-600 dark:text-blue-400',
    },
    {
      title: 'Win Rate',
      value: '68.5%',
      change: 0,
      changeLabel: 'Success Rate',
      icon: PieChart,
      color: 'text-purple-600 dark:text-purple-400',
    },
  ];

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-dark-900">
      {/* Header */}
      <div className="bg-white dark:bg-dark-800 shadow-sm border-b border-gray-200 dark:border-dark-700">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
                Portfolio Overview
              </h1>
              <p className="text-gray-600 dark:text-gray-400">
                Track your trading performance and positions.
              </p>
            </div>
            <div className="flex items-center space-x-4">
              <div className="flex bg-gray-100 dark:bg-dark-700 rounded-lg p-1">
                {timeRanges.map((range) => (
                  <button
                    key={range.value}
                    onClick={() => setTimeRange(range.value)}
                    className={`px-3 py-1 text-sm font-medium rounded-md transition-colors ${
                      timeRange === range.value
                        ? 'bg-white dark:bg-dark-600 text-gray-900 dark:text-white shadow-sm'
                        : 'text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white'
                    }`}
                  >
                    {range.label}
                  </button>
                ))}
              </div>
              <button
                onClick={() => setShowValues(!showValues)}
                className="flex items-center px-4 py-2 bg-gray-100 dark:bg-dark-700 rounded-lg hover:bg-gray-200 dark:hover:bg-dark-600 transition-colors"
              >
                {showValues ? (
                  <EyeOff className="w-4 h-4 mr-2 text-gray-600 dark:text-gray-400" />
                ) : (
                  <Eye className="w-4 h-4 mr-2 text-gray-600 dark:text-gray-400" />
                )}
                {showValues ? 'Hide' : 'Show'} Values
              </button>
            </div>
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

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Positions Table */}
          <div className="lg:col-span-2">
            <div className="card">
              <div className="px-6 py-4 border-b border-gray-200 dark:border-dark-700">
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                  Open Positions
                </h3>
              </div>
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead className="bg-gray-50 dark:bg-dark-700">
                    <tr>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                        Symbol
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                        Type
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                        Amount
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                        Entry Price
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                        Current Price
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                        P&L
                      </th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-200 dark:divide-dark-700">
                    {positions.map((position, index) => (
                      <tr key={index} className="hover:bg-gray-50 dark:hover:bg-dark-700">
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="text-sm font-medium text-gray-900 dark:text-white">
                            {position.symbol}
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${
                            position.type === 'Long'
                              ? 'bg-green-100 dark:bg-green-900 text-green-800 dark:text-green-200'
                              : 'bg-red-100 dark:bg-red-900 text-red-800 dark:text-red-200'
                          }`}>
                            {position.type}
                          </span>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 dark:text-white">
                          ${position.amount.toLocaleString()}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 dark:text-white">
                          {position.entryPrice}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 dark:text-white">
                          {position.currentPrice}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className={`text-sm font-medium ${
                            position.profit >= 0 ? 'text-green-600 dark:text-green-400' : 'text-red-600 dark:text-red-400'
                          }`}>
                            {position.profit >= 0 ? '+' : ''}${position.profit.toFixed(2)}
                          </div>
                          <div className={`text-xs ${
                            position.profit >= 0 ? 'text-green-600 dark:text-green-400' : 'text-red-600 dark:text-red-400'
                          }`}>
                            {position.profit >= 0 ? '+' : ''}{position.profitPercent}%
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>

          {/* Portfolio Allocation */}
          <div>
            <div className="card">
              <div className="px-6 py-4 border-b border-gray-200 dark:border-dark-700">
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                  Portfolio Allocation
                </h3>
              </div>
              <div className="p-6">
                <div className="space-y-4">
                  {positions.map((position, index) => (
                    <div key={index} className="flex items-center justify-between">
                      <div className="flex items-center space-x-3">
                        <div className={`w-3 h-3 rounded-full ${
                          index === 0 ? 'bg-blue-500' :
                          index === 1 ? 'bg-green-500' :
                          index === 2 ? 'bg-yellow-500' : 'bg-purple-500'
                        }`}></div>
                        <div>
                          <div className="text-sm font-medium text-gray-900 dark:text-white">
                            {position.symbol}
                          </div>
                          <div className="text-xs text-gray-600 dark:text-gray-400">
                            {position.type}
                          </div>
                        </div>
                      </div>
                      <div className="text-sm font-medium text-gray-900 dark:text-white">
                        {position.allocation}%
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Performance Summary */}
            <div className="card mt-6">
              <div className="px-6 py-4 border-b border-gray-200 dark:border-dark-700">
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                  Performance Summary
                </h3>
              </div>
              <div className="p-6">
                <div className="space-y-4">
                  <div className="flex justify-between">
                    <span className="text-sm text-gray-600 dark:text-gray-400">Total Return</span>
                    <span className="text-sm font-medium text-green-600 dark:text-green-400">
                      +{portfolioData.profitPercent}%
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm text-gray-600 dark:text-gray-400">Best Trade</span>
                    <span className="text-sm font-medium text-green-600 dark:text-green-400">
                      +$46.15
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm text-gray-600 dark:text-gray-400">Worst Trade</span>
                    <span className="text-sm font-medium text-red-600 dark:text-red-400">
                      -$12.50
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm text-gray-600 dark:text-gray-400">Win Rate</span>
                    <span className="text-sm font-medium text-gray-900 dark:text-white">
                      68.5%
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Portfolio;
