import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { TrendingUp, TrendingDown, BarChart3, DollarSign, Clock, Shield } from 'lucide-react';

const Trading: React.FC = () => {
  const [activeTab, setActiveTab] = useState('overview');

  const tradingPairs = [
    { symbol: 'XAU/USD', price: 2034.50, change: 12.30, changePercent: 0.61, volume: 'High' },
    { symbol: 'XAU/USD', price: 2034.50, change: 12.30, changePercent: 0.61, volume: 'High' },
    { symbol: 'XAU/USD', price: 2034.50, change: 12.30, changePercent: 0.61, volume: 'High' },
    { symbol: 'XAU/USD', price: 2034.50, change: 12.30, changePercent: 0.61, volume: 'High' },
    { symbol: 'XAU/USD', price: 2034.50, change: 12.30, changePercent: 0.61, volume: 'High' },
    { symbol: 'XAU/USD', price: 2034.50, change: 12.30, changePercent: 0.61, volume: 'High' },
  ];

  const features = [
    {
      icon: Shield,
      title: 'Zero Loss Protection',
      description: 'Our unique hedging strategy ensures trades close at either profit ($75) or break-even ($0), providing the only AI bot with zero percent loss guarantee.',
    },
    {
      icon: BarChart3,
      title: 'Advanced Hedging',
      description: 'Dynamically opens up to 12 simultaneous offsetting positions based on real-time market data to minimize risk and maximize returns.',
    },
    {
      icon: Clock,
      title: 'Automated Execution',
      description: 'AI Trading Bot automatically executes trades on MetaTrader 5, with options for manual or automatic trade initiation based on key indicators.',
    },
    {
      icon: DollarSign,
      title: 'Flexible Settings',
      description: 'Customize lot sizes, choose between manual and automatic modes, and configure the bot to match your trading preferences and risk tolerance.',
    },
  ];

  const tabs = [
    { id: 'overview', label: 'Overview' },
    { id: 'charts', label: 'Charts' },
    { id: 'analysis', label: 'Analysis' },
    { id: 'education', label: 'Education' },
  ];

  return (
    <div className="pt-10 min-h-screen mt-20 bg-white dark:bg-[#0A0E23]">
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-primary-600 to-primary-800 text-white py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-4xl md:text-5xl font-bold mb-6">
              AI Trading Bot for Gold/USD
            </h1>
            <p className="text-xl text-primary-100 max-w-3xl mx-auto mb-8">
              Trade Gold/USD with confidence using our advanced AI Trading Bot. 
              Sophisticated hedging techniques ensure either profit or break-even — 
              the only automated bot with zero percent loss guarantee.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                to="/pricing"
                className="btn-secondary bg-white text-primary-600 hover:bg-primary-50 inline-flex items-center justify-center px-8 py-3 rounded-lg font-semibold transition-colors shadow-lg hover:shadow-xl"
              >
                Start Trading
              </Link>
              <Link
                to="/trading"
                className="border-2 border-white text-white hover:bg-white hover:text-primary-600 px-8 py-3 rounded-lg font-semibold transition-colors inline-flex items-center justify-center"
              >
                View Demo
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Trading Interface Preview */}
      <section className="py-16 bg-white dark:bg-[#0A0E23]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Tab Navigation */}
          <div className="flex justify-center mb-8">
            <div className="bg-gray-100 dark:bg-gray-800 rounded-lg p-1">
              {tabs.map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`px-6 py-2 rounded-md font-medium transition-colors ${
                    activeTab === tab.id
                      ? 'bg-white dark:bg-gray-700 text-primary-600 dark:text-primary-400 shadow-sm'
                      : 'text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white'
                  }`}
                >
                  {tab.label}
                </button>
              ))}
            </div>
          </div>

          {/* Trading Pairs Table */}
          <div className="card overflow-hidden">
            <div className="px-6 py-4 border-b border-gray-200 dark:border-dark-700">
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                Gold/USD Trading
              </h3>
              <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">
                Our AI Trading Bot specializes in Gold/USD (XAU/USD) trading using advanced hedging techniques
              </p>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-white dark:bg-gray-800">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                      Pair
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                      Price
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                      Change
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                      Volume
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                      Action
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200 dark:divide-dark-700">
                  {tradingPairs.map((pair, index) => (
                    <tr key={index} className="hover:bg-gray-50 dark:hover:bg-gray-700">
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm font-medium text-gray-900 dark:text-white">
                          {pair.symbol}
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm text-gray-900 dark:text-white">
                          {pair.price}
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className={`flex items-center text-sm ${
                          pair.change >= 0 
                            ? 'text-green-600 dark:text-green-400' 
                            : 'text-red-600 dark:text-red-400'
                        }`}>
                          {pair.change >= 0 ? (
                            <TrendingUp className="w-4 h-4 mr-1" />
                          ) : (
                            <TrendingDown className="w-4 h-4 mr-1" />
                          )}
                          {pair.change} ({pair.changePercent}%)
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-400">
                        {pair.volume}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <Link
                          to="/pricing"
                          className="text-primary-600 dark:text-primary-400 hover:text-primary-800 dark:hover:text-primary-300 text-sm font-medium hover:underline"
                        >
                          Trade
                        </Link>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-white dark:bg-[#0A0E23]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-4">
              How It Works
            </h2>
            <p className="text-xl text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
              Our AI Trading Bot automates the entire trading process, from analysis to execution, 
              ensuring optimal risk management through sophisticated hedging strategies.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature, index) => {
              const Icon = feature.icon;
              return (
                <div key={index} className="card p-6 text-center">
                  <div className="w-16 h-16 bg-primary-100 dark:bg-primary-900 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Icon className="w-8 h-8 text-primary-600 dark:text-primary-400" />
                  </div>
                  <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-3">
                    {feature.title}
                  </h3>
                  <p className="text-gray-600 dark:text-gray-400 text-sm">
                    {feature.description}
                  </p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-primary-600">
        <div className="max-w-4xl mx-auto text-center px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">
            Ready to Start Trading?
          </h2>
          <p className="text-xl text-primary-100 mb-8">
            Join thousands of successful traders using our advanced platform.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              to="/pricing"
              className="inline-flex items-center px-8 py-4 bg-white text-primary-600 font-semibold rounded-lg hover:bg-primary-50 transition-colors shadow-lg hover:shadow-xl"
            >
              Open Trading Account
            </Link>
            <Link
              to="/trading"
              className="inline-flex items-center px-8 py-4 border-2 border-white text-white font-semibold rounded-lg hover:bg-white hover:text-primary-600 transition-colors"
            >
              Try Demo Account
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Trading;
