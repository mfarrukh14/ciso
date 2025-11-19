import React from 'react';
import { Link } from 'react-router-dom';
import { Users, Award, Target, Globe, ArrowRight, Briefcase, TrendingUp, Server } from 'lucide-react';

const About: React.FC = () => {
  const values = [
    {
      icon: Target,
      title: 'Precision',
      description: 'We deliver accurate, real-time data and execution to help you make informed trading decisions.',
    },
    {
      icon: Award,
      title: 'Excellence',
      description: 'Our commitment to excellence drives us to continuously improve our platform and services.',
    },
    {
      icon: Users,
      title: 'Community',
      description: 'We foster a strong community of traders who share knowledge and support each other.',
    },
    {
      icon: Globe,
      title: 'Innovation',
      description: 'We leverage cutting-edge technology to provide the most advanced trading tools available.',
    },
  ];

  return (
    <div className="pt-10 min-h-screen mt-20">
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-primary-600 to-primary-800 text-white py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-4xl md:text-5xl font-bold mb-6">
              About NextGen Forex Systems
            </h1>
            <p className="text-xl text-primary-100 max-w-3xl mx-auto">
              Empowering traders through intelligent algorithms and data-driven insights. 
              Our AI Trading Bot revolutionizes Gold/USD trading with zero loss protection.
            </p>
          </div>
        </div>
      </section>

      {/* Business Overview Section */}
      <section className="py-20 bg-white dark:bg-[#0A0E23]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-6">
              Our Business
            </h2>
            <p className="text-xl text-gray-600 dark:text-gray-400 max-w-3xl mx-auto leading-relaxed">
              NextGen Forex Systems offers a subscription-based AI Trading Bot that trades Gold/USD 
              using advanced hedging techniques to minimize risk and maximize returns.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mb-16">
            {/* Vision */}
            <div className="card p-8 hover:shadow-xl transition-all duration-300">
              <div className="flex items-center mb-6">
                <div className="w-14 h-14 bg-gradient-to-br from-blue-500 to-blue-600 rounded-xl flex items-center justify-center mr-4 shadow-lg">
                  <Target className="w-7 h-7 text-white" />
                </div>
                <h3 className="text-2xl font-bold text-gray-900 dark:text-white">
                  Business Vision
                </h3>
              </div>
              <p className="text-lg text-gray-600 dark:text-gray-400 leading-relaxed">
                Harnessing power of technology to shape the future of trading.
              </p>
            </div>

            {/* Mission */}
            <div className="card p-8 hover:shadow-xl transition-all duration-300">
              <div className="flex items-center mb-6">
                <div className="w-14 h-14 bg-gradient-to-br from-green-500 to-green-600 rounded-xl flex items-center justify-center mr-4 shadow-lg">
                  <Award className="w-7 h-7 text-white" />
                </div>
                <h3 className="text-2xl font-bold text-gray-900 dark:text-white">
                  Business Mission
                </h3>
              </div>
              <p className="text-lg text-gray-600 dark:text-gray-400 leading-relaxed">
                Our mission is to empower traders through intelligent algorithms, data-driven insights, 
                and seamless user experiences that help investors achieve financial success in global markets.
              </p>
            </div>
          </div>

          {/* USP Section */}
          <div className="card p-8 bg-gradient-to-br from-primary-50 to-primary-100 dark:from-primary-900/30 dark:to-primary-800/30 hover:shadow-xl transition-all duration-300">
            <div className="flex items-center mb-6">
              <div className="w-14 h-14 bg-gradient-to-br from-purple-500 to-purple-600 rounded-xl flex items-center justify-center mr-4 shadow-lg">
                <Globe className="w-7 h-7 text-white" />
              </div>
              <h3 className="text-2xl font-bold text-gray-900 dark:text-white">
                Unique Selling Point (USP)
              </h3>
            </div>
            <p className="text-lg text-gray-700 dark:text-gray-300 leading-relaxed">
              Our sophisticated hedging strategy is designed to ensure either a profit or to close trades at no loss. 
              This aggressive risk management approach provides traders with confidence in achieving consistent returns 
              while minimizing downside risk. <strong className="text-primary-600 dark:text-primary-400">There is no automated AI bot 
              in the market that offers zero percent loss.</strong> Our bot gives a probability of 50% profit or a 50% break even.
            </p>
          </div>
        </div>
      </section>

      {/* Target Market Section */}
      <section className="py-20 bg-gray-50 dark:bg-[#0F1529]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-4">
              Target Market & Customers
            </h2>
            <p className="text-xl text-gray-600 dark:text-gray-400 max-w-3xl mx-auto">
              We serve diverse trading communities seeking intelligent automation and risk management.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            <div className="card p-6 hover:shadow-xl transition-all duration-300 hover:scale-105">
              <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-blue-600 rounded-xl flex items-center justify-center mx-auto mb-4 shadow-lg">
                <Users className="w-6 h-6 text-white" />
              </div>
              <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-3 text-center">
                Retail Traders
              </h3>
              <p className="text-gray-600 dark:text-gray-400 text-sm text-center leading-relaxed">
                Beginners or intermediate individuals seeking automated trading solutions
              </p>
            </div>

            <div className="card p-6 hover:shadow-xl transition-all duration-300 hover:scale-105">
              <div className="w-12 h-12 bg-gradient-to-br from-green-500 to-green-600 rounded-xl flex items-center justify-center mx-auto mb-4 shadow-lg">
                <Briefcase className="w-6 h-6 text-white" />
              </div>
              <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-3 text-center">
                Proprietary Trading Firms
              </h3>
              <p className="text-gray-600 dark:text-gray-400 text-sm text-center leading-relaxed">
                Firms using their own capital to trade financial markets
              </p>
            </div>

            <div className="card p-6 hover:shadow-xl transition-all duration-300 hover:scale-105">
              <div className="w-12 h-12 bg-gradient-to-br from-purple-500 to-purple-600 rounded-xl flex items-center justify-center mx-auto mb-4 shadow-lg">
                <TrendingUp className="w-6 h-6 text-white" />
              </div>
              <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-3 text-center">
                Hedge Funds & Asset Managers
              </h3>
              <p className="text-gray-600 dark:text-gray-400 text-sm text-center leading-relaxed">
                Professional investment firms seeking diversification into gold or algo trading
              </p>
            </div>

            <div className="card p-6 hover:shadow-xl transition-all duration-300 hover:scale-105">
              <div className="w-12 h-12 bg-gradient-to-br from-orange-500 to-orange-600 rounded-xl flex items-center justify-center mx-auto mb-4 shadow-lg">
                <Server className="w-6 h-6 text-white" />
              </div>
              <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-3 text-center">
                Brokers & Trading Platforms
              </h3>
              <p className="text-gray-600 dark:text-gray-400 text-sm text-center leading-relaxed">
                Platforms looking for tools that attract traders and increase trading volume
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Values Section */}
      <section className="py-20 bg-white dark:bg-[#0A0E23]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-4">
              Our Core Values
            </h2>
            <p className="text-xl text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
              These principles guide everything we do and shape our commitment to excellence.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {values.map((value, index) => {
              const Icon = value.icon;
              return (
                <div key={index} className="card p-6 text-center">
                  <div className="w-12 h-12 bg-primary-100 dark:bg-primary-900 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Icon className="w-6 h-6 text-primary-600 dark:text-primary-400" />
                  </div>
                  <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-3">
                    {value.title}
                  </h3>
                  <p className="text-gray-600 dark:text-gray-400 text-sm">
                    {value.description}
                  </p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Why Gold Trading Section */}
      <section className="py-20 bg-white dark:bg-[#0A0E23]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-4">
              Why Gold Trading?
            </h2>
            <p className="text-xl text-gray-600 dark:text-gray-400 max-w-3xl mx-auto leading-relaxed">
              Gold is one of the most actively traded assets worldwide, especially during times of inflation, 
              currency volatility, and global uncertainty. This means there's always liquidity, always interest, 
              and always volatility — which are ideal conditions for algorithmic and AI-based trading.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="card p-8 text-center hover:shadow-xl transition-all duration-300 hover:scale-105">
              <div className="w-16 h-16 bg-gradient-to-br from-yellow-500 to-yellow-600 rounded-xl flex items-center justify-center mx-auto mb-6 shadow-lg">
                <TrendingUp className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-4">
                High Liquidity
              </h3>
              <p className="text-gray-600 dark:text-gray-400 leading-relaxed">
                Gold markets offer exceptional liquidity, ensuring your trades execute quickly and efficiently, 
                even during volatile market conditions.
              </p>
            </div>

            <div className="card p-8 text-center hover:shadow-xl transition-all duration-300 hover:scale-105">
              <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-blue-600 rounded-xl flex items-center justify-center mx-auto mb-6 shadow-lg">
                <Globe className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-4">
                Global Interest
              </h3>
              <p className="text-gray-600 dark:text-gray-400 leading-relaxed">
                Gold attracts traders worldwide, creating consistent market activity and trading opportunities 
                around the clock, five days a week.
              </p>
            </div>

            <div className="card p-8 text-center hover:shadow-xl transition-all duration-300 hover:scale-105">
              <div className="w-16 h-16 bg-gradient-to-br from-green-500 to-green-600 rounded-xl flex items-center justify-center mx-auto mb-6 shadow-lg">
                <Award className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-4">
                Ideal Volatility
              </h3>
              <p className="text-gray-600 dark:text-gray-400 leading-relaxed">
                The volatility in gold markets provides perfect conditions for our hedging strategy, 
                allowing the AI bot to capitalize on price movements while managing risk.
              </p>
            </div>
          </div>
        </div>
      </section>


      {/* Stats Section */}
      <section className="py-20 bg-primary-600">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
              Our Impact
            </h2>
            <p className="text-xl text-primary-100">
              Numbers that speak to our success and growth
            </p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-12">
            <div className="text-center">
              <div className="text-4xl font-bold text-white mb-2">50,000+</div>
              <div className="text-primary-200">Active Traders</div>
            </div>
            <div className="text-center">
              <div className="text-4xl font-bold text-white mb-2">$2.5B+</div>
              <div className="text-primary-200">Trading Volume</div>
            </div>
            <div className="text-center">
              <div className="text-4xl font-bold text-white mb-2">150+</div>
              <div className="text-primary-200">Countries</div>
            </div>
            <div className="text-center">
              <div className="text-4xl font-bold text-white mb-2">99.9%</div>
              <div className="text-primary-200">Uptime</div>
            </div>
          </div>

          <div className="text-center">
            <Link
              to="/pricing"
              className="inline-flex items-center px-8 py-4 bg-white text-primary-600 font-semibold rounded-lg hover:bg-primary-50 transition-colors shadow-lg hover:shadow-xl"
            >
              Join Our Community
              <ArrowRight className="ml-2 w-5 h-5" />
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
};

export default About;
