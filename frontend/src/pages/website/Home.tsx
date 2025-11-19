import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, TrendingUp, Shield, Zap, Users, Award, Check, Star, MapPin, ChevronDown, ChevronUp, Globe, DollarSign } from 'lucide-react';
import Img from '../../assets/hero-img.jpg'
// import Img2 from '../../assets/1a56c3be-731f-4492-abe0-16cb0456e931.jpg'
// import Img3 from '../../assets/futuristic-digital-globe-world-map-with-communications-network-technology-concept.jpg'
// import Img4 from '../../assets/holographic-globe-with-international-financial-indicators.jpg'

const Home: React.FC = () => {
  const [openFAQ, setOpenFAQ] = useState<number | null>(null);
  const [currencyRates, setCurrencyRates] = useState<any>(null);
  // const [commodityRates, setCommodityRates] = useState<any>(null);
  const [lastUpdated, setLastUpdated] = useState<string>('');

  // Fetch currency rates from Currency Freaks API
  useEffect(() => {
    const fetchRates = async () => {
      try {
        const response = await fetch('https://api.currencyfreaks.com/v2.0/rates/latest?apikey=2f19d2cea83749e5b2012f3a6d1723b7');
        const data = await response.json();
        setCurrencyRates(data.rates);
        setLastUpdated(data.date);
      } catch (error) {
        console.error('Error fetching currency rates:', error);
      }
    };

    fetchRates();
    // Update rates every 5 minutes
    const interval = setInterval(fetchRates, 5 * 60 * 1000);
    return () => clearInterval(interval);
  }, []);

  // Generate currency pair data with real rates
  const getCurrencyPairData = () => {
    if (!currencyRates) return '';
    
    const pairs = [
      { pair: 'EUR/USD', base: 'EUR', quote: 'USD' },
      { pair: 'GBP/USD', base: 'GBP', quote: 'USD' },
      { pair: 'USD/JPY', base: 'USD', quote: 'JPY' },
      { pair: 'AUD/USD', base: 'AUD', quote: 'USD' },
      { pair: 'USD/CAD', base: 'USD', quote: 'CAD' },
      { pair: 'NZD/USD', base: 'NZD', quote: 'USD' },
      { pair: 'EUR/GBP', base: 'EUR', quote: 'GBP' },
      { pair: 'USD/CHF', base: 'USD', quote: 'CHF' }
    ];

    return pairs.map(({ pair, base, quote }) => {
      const baseRate = currencyRates[base];
      const quoteRate = currencyRates[quote];
      
      if (!baseRate || !quoteRate) return `${pair} N/A`;
      
      let rate, change;
      if (quote === 'USD') {
        rate = (1 / parseFloat(baseRate)).toFixed(4);
        change = (Math.random() - 0.5) * 0.01; // Simulated change
      } else if (base === 'USD') {
        rate = parseFloat(quoteRate).toFixed(4);
        change = (Math.random() - 0.5) * 0.01;
      } else {
        const baseToUSD = 1 / parseFloat(baseRate);
        const quoteToUSD = 1 / parseFloat(quoteRate);
        rate = (baseToUSD / quoteToUSD).toFixed(4);
        change = (Math.random() - 0.5) * 0.01;
      }
      
      const changeStr = change >= 0 ? `+${change.toFixed(4)}` : change.toFixed(4);
      const changeColor = change >= 0 ? 'text-green-500' : 'text-red-500';
      
      return `<span class="text-red-600 dark:text-red-400 font-bold">${pair}</span> ${rate} <span class="${changeColor}">${changeStr}</span>`;
    }).join(' &nbsp;&nbsp;•&nbsp;&nbsp; ') + ' &nbsp;&nbsp;•&nbsp;&nbsp; ';
  };

  // Generate commodity data (simulated since we don't have commodity API)
  const getCommodityData = () => {
    const commodities = [
      { name: 'GOLD', basePrice: 2034.50, volatility: 20 },
      { name: 'SILVER', basePrice: 24.85, volatility: 0.5 },
      { name: 'OIL', basePrice: 78.92, volatility: 2 },
      { name: 'COPPER', basePrice: 3.85, volatility: 0.1 },
      { name: 'PLATINUM', basePrice: 1245.60, volatility: 10 },
      { name: 'PALLADIUM', basePrice: 1890.30, volatility: 30 },
      { name: 'NATURAL GAS', basePrice: 2.85, volatility: 0.2 },
      { name: 'WHEAT', basePrice: 6.45, volatility: 0.3 }
    ];

    return commodities.map(({ name, basePrice, volatility }) => {
      const change = (Math.random() - 0.5) * volatility;
      const currentPrice = (basePrice + change).toFixed(2);
      const changeStr = change >= 0 ? `+${change.toFixed(2)}` : change.toFixed(2);
      const changeColor = change >= 0 ? 'text-green-500' : 'text-red-500';
      
      return `<span class="text-red-600 dark:text-red-400 font-bold">${name}</span> ${currentPrice} <span class="${changeColor}">${changeStr}</span>`;
    }).join(' &nbsp;&nbsp;•&nbsp;&nbsp; ') + ' &nbsp;&nbsp;•&nbsp;&nbsp; ';
  };

  const features = [
    {
      icon: Shield,
      title: 'Zero Loss Protection',
      description: 'Our sophisticated strategy ensures either profit or break-even — the only AI bot with zero percent loss guarantee.',
    },
    {
      icon: TrendingUp,
      title: 'Advanced strategy',
      description: 'Dynamically adjusts positions using real-time data to minimize risk and maximize returns in volatile gold markets.',
    },
    {
      icon: Zap,
      title: 'Automated Trading',
      description: 'AI Trading Bot executes trades automatically on MetaTrader 5, opening up to 12 simultaneous positions for optimal hedging.',
    },
    {
      icon: Users,
      title: 'For All Traders',
      description: 'Perfect for retail traders, proprietary firms, hedge funds, and brokers seeking intelligent automation.',
    },
    {
      icon: Award,
      title: 'Proven Strategy',
      description: '50% probability of profit or 50% break-even — providing consistent returns while minimizing downside risk.',
    },
  ];

  const stats = [
    { label: 'Active Traders', value: '50,000+' },
    { label: 'Trading Volume', value: '$2.5B+' },
    { label: 'Countries', value: '150+' },
    { label: 'Years Experience', value: '10+' },
  ];

  const pricingPlans = [
    {
      name: 'Starter',
      price: '$59.99',
      period: '/month',
      description: 'Perfect for beginners',
      features: [
        'AI Trading Bot for Gold/USD',
        'Zero loss protection guarantee',
        'Automated hedging strategy',
        'MetaTrader 5 integration',
        'Email support',
        '3-day free demo trial'
      ],
      popular: false,
      buttonText: 'Get Started',
      buttonStyle: 'btn-secondary'
    },
    {
      name: 'Professional',
      price: '$59.99',
      period: '/month',
      description: 'Most popular choice',
      features: [
        'All Starter features',
        'Up to 12 simultaneous positions',
        'Manual & automatic trade modes',
        'Custom lot size settings',
        'Priority support',
        'VPS hosting available',
        'Quarterly: 25% discount'
      ],
      popular: true,
      buttonText: 'Start Free Trial',
      buttonStyle: 'btn-primary'
    },
    {
      name: 'Enterprise',
      price: '$59.99',
      period: '/month',
      description: 'For institutions',
      features: [
        'All Professional features',
        'Multiple account support',
        'Dedicated account manager',
        'Custom configurations',
        '24/7 priority support',
        'Advanced reporting',
        'Annual: 50% discount'
      ],
      popular: false,
      buttonText: 'Contact Sales',
      buttonStyle: 'btn-secondary'
    }
  ];

  const testimonials = [
    {
      name: 'Retail Trader',
      role: 'Gold Trading Enthusiast',
      location: 'Global',
      rating: 5,
      text: 'The zero loss guarantee gives me peace of mind. I can trade Gold/USD knowing the bot will either profit or break even. This is exactly what I needed as a beginner.',
      avatar: 'RT'
    },
    {
      name: 'Proprietary Trading Firm',
      role: 'Institutional Client',
      location: 'Global',
      rating: 5,
      text: 'The hedging strategy is sophisticated and the automated execution is flawless. We\'ve seen consistent results with minimal downside risk.',
      avatar: 'PT'
    },
    {
      name: 'Hedge Fund Manager',
      role: 'Asset Manager',
      location: 'Global',
      rating: 5,
      text: 'The AI Trading Bot has become an essential part of our gold trading strategy. The risk mitigation approach aligns perfectly with our portfolio management goals.',
      avatar: 'HF'
    },
    {
      name: 'Trading Platform',
      role: 'Broker Partner',
      location: 'Global',
      rating: 5,
      text: 'Integrating NextGen Forex\'s bot has increased our trading volume significantly. Our clients love the automated hedging and zero loss protection.',
      avatar: 'TP'
    }
  ];

  const faqs = [
    {
      question: 'How does the zero loss guarantee work?',
      answer: 'Our AI Trading Bot uses advanced hedging techniques to ensure trades either close at a profit or break even. The bot dynamically opens offsetting positions (up to 12 simultaneous trades) to minimize risk, providing a 50% probability of profit or 50% break-even outcome.'
    },
    {
      question: 'What is the AI Trading Bot and how does it work?',
      answer: 'Our AI Trading Bot is designed to trade Gold/USD using sophisticated hedging strategies. It analyzes market trends in real-time and automatically opens offsetting positions to reduce potential losses. Trades close automatically when reaching $75 profit or breaking even at $0.'
    },
    {
      question: 'Do I need trading experience to use the bot?',
      answer: 'No! Our bot is perfect for beginners and intermediate traders. The automated system handles all the complex hedging strategies, making it accessible to traders of all experience levels. We also offer a 3-day free demo so you can try it risk-free.'
    },
    {
      question: 'What trading platform does the bot work with?',
      answer: 'The AI Trading Bot integrates seamlessly with MetaTrader 5 (MT5). After subscribing, you\'ll receive automated installation instructions. The bot can be configured for manual or automatic trade initiation based on key market indicators.'
    },
    {
      question: 'What are your pricing options?',
      answer: 'Our competitive pricing is $59.99 per month. We offer discounts for longer commitments: 25% off for quarterly subscriptions and 50% off for annual subscriptions. The first 100 customers also receive a 50% introductory discount.'
    },
    {
      question: 'Do you offer VPS hosting services?',
      answer: 'Yes! We offer VPS hosting as a subsidiary service to ensure your AI Trading Bot runs 24/7 without interruption. This is especially important for automated trading to capture opportunities around the clock.'
    }
  ];

  const worldLocations = [
    { city: 'New York', country: 'USA', x: 20, y: 35, traders: '15,000+' },
    { city: 'London', country: 'UK', x: 48, y: 30, traders: '12,000+' },
    { city: 'Tokyo', country: 'Japan', x: 85, y: 40, traders: '8,500+' },
    { city: 'Singapore', country: 'Singapore', x: 75, y: 60, traders: '6,200+' },
    { city: 'Sydney', country: 'Australia', x: 90, y: 70, traders: '4,800+' },
    { city: 'Frankfurt', country: 'Germany', x: 50, y: 35, traders: '7,300+' },
    { city: 'Dubai', country: 'UAE', x: 60, y: 50, traders: '3,500+' },
    { city: 'Toronto', country: 'Canada', x: 15, y: 30, traders: '5,100+' }
  ];

  return (
    <div className="pt-5 min-h-screen bg-white dark:bg-[#0A0E23] relative overflow-hidden">
      {/* Floating Background Orbs - Fixed positioning to stay behind all content */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none z-0">
        {/* Top Right Orb - Extra large floating orb */}
        <div className="absolute -top-60 -right-60 w-[500px] h-[500px] bg-gradient-to-br from-blue-400/20 to-purple-600/20 dark:from-blue-400/30 dark:to-purple-600/30 rounded-full blur-3xl floating-orb"></div>
        
        {/* Middle Left Orb - Extra large drifting orb */}
        <div className="absolute top-1/2 -left-60 w-[600px] h-[600px] bg-gradient-to-br from-cyan-400/15 to-blue-500/15 dark:from-cyan-400/25 dark:to-blue-500/25 rounded-full blur-3xl drift-orb" style={{animationDelay: '2s'}}></div>
        
        {/* Bottom Right Orb - Large floating orb */}
        <div className="absolute -bottom-60 right-1/4 w-[450px] h-[450px] bg-gradient-to-br from-purple-400/20 to-pink-500/20 dark:from-purple-400/30 dark:to-pink-500/30 rounded-full blur-3xl floating-orb" style={{animationDelay: '4s'}}></div>
        
        {/* Additional Medium Orbs for Sparkle Effect */}
        <div className="absolute top-1/4 left-1/4 w-48 h-48 bg-gradient-to-br from-yellow-400/10 to-orange-500/10 dark:from-yellow-400/20 dark:to-orange-500/20 rounded-full blur-2xl sparkle-orb" style={{animationDelay: '1s'}}></div>
        <div className="absolute top-3/4 right-1/3 w-40 h-40 bg-gradient-to-br from-green-400/15 to-teal-500/15 dark:from-green-400/25 dark:to-teal-500/25 rounded-full blur-2xl sparkle-orb" style={{animationDelay: '3s'}}></div>
        
        {/* Extra sparkle orbs for more aesthetic effect */}
        <div className="absolute top-1/3 right-1/2 w-32 h-32 bg-gradient-to-br from-pink-400/20 to-rose-500/20 dark:from-pink-400/30 dark:to-rose-500/30 rounded-full blur-xl sparkle-orb" style={{animationDelay: '2.5s'}}></div>
        <div className="absolute bottom-1/3 left-1/2 w-36 h-36 bg-gradient-to-br from-indigo-400/15 to-purple-500/15 dark:from-indigo-400/25 dark:to-purple-500/25 rounded-full blur-xl sparkle-orb" style={{animationDelay: '5s'}}></div>
      </div>

      {/* Hero Section */}
      <section className="relative bg-white/50 dark:bg-[#0A0E23]/50 text-gray-900 dark:text-white overflow-hidden backdrop-blur-sm z-10">
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-32">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            {/* Left Side - Content */}
            <div className="text-left space-y-8">
              <div className="space-y-6">
                <div className="inline-flex items-center px-4 py-2 bg-blue-100 dark:bg-blue-900/30 rounded-full text-blue-600 dark:text-blue-400 text-sm font-medium">
                  <Zap className="w-4 h-4 mr-2" />
                  AI Trading Bot with Zero Loss Guarantee
                </div>
                <h1 className="text-6xl md:text-6xl font-bold leading-tight heading-primary">
                  AI-Powered Gold Trading
                  <span className="block text-blue-600 dark:text-blue-200 bg-gradient-to-r from-blue-600 to-blue-700 dark:from-blue-200 dark:to-blue-300 bg-clip-text text-transparent animate-pulse">
                    Zero Loss Guarantee
                  </span>
                </h1>
                <p className="text-xl md:text-2xl text-gray-600 dark:text-blue-100 text-premium leading-relaxed max-w-2xl">
                  Trade Gold/USD with our advanced AI Trading Bot using sophisticated hedging techniques. 
                  Our unique strategy ensures either profit or break-even — providing the only automated bot 
                  in the market with zero percent loss protection.
                </p>
              </div>
              
              <div className="flex flex-col sm:flex-row gap-6">
                <Link
                  to="/pricing"
                  className="btn-primary inline-flex items-center px-10 py-4 text-lg group hover:scale-105 transition-transform duration-300"
                >
                  Start Trading Now
                  <ArrowRight className="ml-3 w-5 h-5 group-hover:translate-x-1 transition-transform duration-300" />
                </Link>
                <Link
                  to="/trading"
                  className="btn-secondary inline-flex items-center px-10 py-4 text-lg group hover:scale-105 transition-transform duration-300"
                >
                  View Platform
                </Link>
              </div>

              {/* Trust indicators */}
              <div className="flex items-center space-x-8 pt-8">
                <div className="text-center">
                  <div className="text-2xl font-bold text-gray-900 dark:text-white">50,000+</div>
                  <div className="text-sm text-gray-600 dark:text-gray-400">Active Traders</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-gray-900 dark:text-white">$2.5B+</div>
                  <div className="text-sm text-gray-600 dark:text-gray-400">Trading Volume</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-gray-900 dark:text-white">150+</div>
                  <div className="text-sm text-gray-600 dark:text-gray-400">Countries</div>
                </div>
              </div>
            </div>

            {/* Right Side - Image with enhanced styling */}
            <div className="flex w-full justify-center lg:justify-end">
              <div className="relative group">
                <div className="w-full max-w-lg h-[500px] rounded-3xl overflow-hidden shadow-2xl group-hover:shadow-3xl transition-all duration-500">
                  <img 
                    src={Img} 
                    alt="Trading Dashboard" 
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" 
                  />
                </div>
                {/* Floating elements */}
                <div className="absolute -top-4 -right-4 w-8 h-8 bg-blue-500 rounded-full animate-bounce"></div>
                <div className="absolute -bottom-4 -left-4 w-6 h-6 bg-green-500 rounded-full animate-pulse"></div>
                <div className="absolute top-1/2 -left-6 w-4 h-4 bg-purple-500 rounded-full animate-ping"></div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Live Forex Ticker Section */}
      <section className="py-8 bg-white/30 dark:bg-[#0A0E23]/30 backdrop-blur-sm relative z-10 overflow-hidden">
        {/* Last Updated Indicator */}
        {lastUpdated && (
          <div className="absolute top-2 right-4 z-20">
            <div className="bg-green-500 text-white px-3 py-1 rounded-full text-xs font-medium">
              Live Rates • {new Date(lastUpdated).toLocaleTimeString()}
            </div>
          </div>
        )}
        <div className="marquee-container relative h-40 overflow-visible">
          {/* First marquee bar - 3 degrees, top 20%, light blue background */}
          <div className="marquee-bar1 absolute w-full bg-blue-100 dark:bg-blue-900/30 py-2" style={{transform: 'rotate(3deg)', top: '20%'}}>
            <div className="marquee">
              <div className="marquee-content" dangerouslySetInnerHTML={{ __html: getCurrencyPairData() }}></div>
              <div className="marquee-content" dangerouslySetInnerHTML={{ __html: getCurrencyPairData() }}></div>
            </div>
          </div>

          {/* Second marquee bar - -3 degrees, bottom 20%, dark blue background */}
          <div className="marquee-bar absolute w-full bg-blue-200 dark:bg-blue-800/50 py-2" style={{transform: 'rotate(-3deg)', bottom: '20%'}}>
            <div className="marquee">
              <div className="marquee-content" dangerouslySetInnerHTML={{ __html: getCommodityData() }}></div>
              <div className="marquee-content" dangerouslySetInnerHTML={{ __html: getCommodityData() }}></div>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-24 bg-white/50 dark:bg-[#0A0E23]/50 backdrop-blur-sm relative z-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-6 heading-primary">
              Trusted by Traders Worldwide
            </h2>
            <p className="text-xl text-gray-600 dark:text-gray-400 max-w-3xl mx-auto text-premium leading-relaxed">
              Join thousands of successful traders who have chosen NextGen Forex for their trading journey.
            </p>
          </div>
          
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {stats.map((stat, index) => (
              <div key={index} className="text-center group">
                <div className="relative">
                  <div className="text-5xl md:text-6xl font-bold text-blue-600 dark:text-blue-400 mb-4 heading-primary group-hover:scale-110 transition-all duration-500">
                    {stat.value}
                  </div>
                  <div className="absolute -top-2 -right-2 w-4 h-4 bg-green-500 rounded-full animate-ping"></div>
                </div>
                <div className="text-gray-600 dark:text-gray-400 font-semibold text-premium text-lg">
                  {stat.label}
                </div>
                <div className="w-16 h-1 bg-gradient-to-r from-blue-500 to-purple-500 mx-auto mt-4 rounded-full group-hover:w-24 transition-all duration-300"></div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-24 bg-white/50 dark:bg-[#0A0E23]/50 backdrop-blur-sm relative z-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-20">
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-6 heading-primary">
              Why Choose NextGen Forex?
            </h2>
            <p className="text-xl text-gray-600 dark:text-gray-400 max-w-3xl mx-auto text-premium leading-relaxed">
              The only AI Trading Bot in the market offering zero percent loss protection. 
              Our sophisticated hedging strategy ensures either profit or break-even, giving you 
              confidence in achieving consistent returns while minimizing downside risk.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {features.map((feature, index) => {
              const Icon = feature.icon;
              return (
                <div key={index} className="card card-hover-border p-8 text-center group transition-all duration-500 hover:scale-105">
                  <div className="relative mb-8">
                    <div className="w-20 h-20 bg-gradient-to-br from-blue-500 to-purple-600 dark:from-blue-600 dark:to-purple-700 rounded-2xl flex items-center justify-center mx-auto mb-6 group-hover:rotate-12 transition-transform duration-500 shadow-lg group-hover:shadow-xl">
                      <Icon className="w-10 h-10 text-white" />
                    </div>
                    <div className="absolute -top-2 -right-2 w-6 h-6 bg-green-500 rounded-full flex items-center justify-center">
                      <Check className="w-4 h-4 text-white" />
                    </div>
                  </div>
                  <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-4 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors duration-300">
                    {feature.title}
                  </h3>
                  <p className="text-gray-600 dark:text-gray-400 leading-relaxed text-lg">
                    {feature.description}
                  </p>
                  <div className="mt-6 w-12 h-1 bg-gradient-to-r from-blue-500 to-purple-500 mx-auto rounded-full group-hover:w-20 transition-all duration-300"></div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-white/50 dark:bg-[#0A0E23]/50 backdrop-blur-sm relative z-10">
        <div className="max-w-4xl mx-auto text-center px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-6">
            Ready to Start Your Trading Journey?
          </h2>
          <p className="text-xl text-gray-600 dark:text-primary-100 mb-8">
            Join thousands of successful traders who trust NextGen Forex for their trading needs.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              to="/pricing"
              className="inline-flex items-center px-8 py-4 bg-primary-600 text-white font-semibold rounded-lg hover:bg-primary-700 transition-colors shadow-lg hover:shadow-xl"
            >
              Get Started
              <ArrowRight className="ml-2 w-5 h-5" />
            </Link>
            <Link
              to="/contact"
              className="inline-flex items-center px-8 py-4 border-2 border-primary-600 text-primary-600 dark:border-white dark:text-white font-semibold rounded-lg hover:bg-primary-600 hover:text-white dark:hover:bg-white dark:hover:text-primary-600 transition-colors"
            >
              Contact Sales
            </Link>
          </div>
        </div>
      </section>

      {/* Pricing Section */}
      <section className="py-24 bg-white/50 dark:bg-[#0A0E23]/50 backdrop-blur-sm relative z-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-6 heading-primary">
              Choose Your Trading Plan
            </h2>
            <p className="text-xl text-gray-600 dark:text-gray-400 max-w-3xl mx-auto text-premium leading-relaxed">
              Flexible pricing plans designed to meet the needs of traders at every level, 
              from beginners to institutional investors.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {pricingPlans.map((plan, index) => (
              <div
                key={index}
                className={`card card-hover-border p-8 relative group transition-all duration-500 hover:scale-105 ${
                  plan.popular ? 'ring-2 ring-blue-500 dark:ring-blue-400 scale-105 shadow-2xl' : ''
                }`}
              >
                {plan.popular && (
                  <div className="absolute -top-6 left-1/2 transform -translate-x-1/2 z-10">
                    <span className="bg-gradient-to-r from-blue-500 to-purple-600 text-white px-6 py-3 rounded-full text-sm font-bold shadow-lg animate-pulse">
                      ⭐ Most Popular
                    </span>
                  </div>
                )}
                
                <div className="text-center mb-8">
                  <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-purple-600 rounded-2xl flex items-center justify-center mx-auto mb-6 group-hover:rotate-12 transition-transform duration-500">
                    <DollarSign className="w-8 h-8 text-white" />
                  </div>
                  <h3 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
                    {plan.name}
                  </h3>
                  <p className="text-gray-600 dark:text-gray-400 mb-6 text-lg">
                    {plan.description}
                  </p>
                  <div className="flex items-baseline justify-center mb-2">
                    <span className="text-6xl font-bold text-gray-900 dark:text-white">
                      {plan.price}
                    </span>
                    <span className="text-gray-600 dark:text-gray-400 ml-2 text-xl">
                      {plan.period}
                    </span>
                  </div>
                  <div className="text-sm text-gray-500 dark:text-gray-500">Billed monthly</div>
                </div>

                <ul className="space-y-5 mb-8">
                  {plan.features.map((feature, featureIndex) => (
                    <li key={featureIndex} className="flex items-center group">
                      <div className="w-6 h-6 bg-green-500 rounded-full flex items-center justify-center mr-4 flex-shrink-0 group-hover:scale-110 transition-transform duration-300">
                        <Check className="w-4 h-4 text-white" />
                      </div>
                      <span className="text-gray-600 dark:text-gray-400 text-lg">{feature}</span>
                    </li>
                  ))}
                </ul>

                <Link
                  to="/pricing"
                  className={`w-full ${plan.buttonStyle} py-4 px-6 text-center text-lg font-semibold group-hover:scale-105 transition-transform duration-300 inline-flex items-center justify-center`}
                >
                  {plan.buttonText}
                  <ArrowRight className="ml-2 w-5 h-5" />
                </Link>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-24 bg-white/50 dark:bg-[#0A0E23]/50 backdrop-blur-sm relative z-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-6 heading-primary">
              What Our Traders Say
            </h2>
            <p className="text-xl text-gray-600 dark:text-gray-400 max-w-3xl mx-auto text-premium leading-relaxed">
              Don't just take our word for it. Here's what our successful traders have to say about their experience.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {testimonials.map((testimonial, index) => (
              <div
                key={index}
                className="card card-hover-border p-8 group transition-all duration-500 hover:scale-105"
              >
                <div className="flex items-center mb-6">
                  <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-purple-600 rounded-2xl flex items-center justify-center text-white font-bold mr-4 group-hover:rotate-12 transition-transform duration-500 shadow-lg">
                    {testimonial.avatar}
                  </div>
                  <div>
                    <h4 className="font-bold text-gray-900 dark:text-white text-lg">
                      {testimonial.name}
                    </h4>
                    <p className="text-sm text-gray-600 dark:text-gray-400 font-medium">
                      {testimonial.role}
                    </p>
                    <p className="text-xs text-gray-500 dark:text-gray-500 flex items-center">
                      <MapPin className="w-3 h-3 mr-1" />
                      {testimonial.location}
                    </p>
                  </div>
                </div>
                
                <div className="flex mb-6">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <Star key={i} className="w-5 h-5 text-yellow-400 fill-current group-hover:scale-110 transition-transform duration-300" style={{animationDelay: `${i * 100}ms`}} />
                  ))}
                </div>
                
                <p className="text-gray-600 dark:text-gray-400 italic text-lg leading-relaxed">
                  "{testimonial.text}"
                </p>
                
                <div className="mt-6 w-12 h-1 bg-gradient-to-r from-blue-500 to-purple-500 mx-auto rounded-full group-hover:w-20 transition-all duration-300"></div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* World Map Section */}
      <section className="py-24 bg-white/50 dark:bg-[#0A0E23]/50 backdrop-blur-sm relative z-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-6 heading-primary">
              Global Trading Community
            </h2>
            <p className="text-xl text-gray-600 dark:text-gray-400 max-w-3xl mx-auto text-premium leading-relaxed">
              Join thousands of traders from around the world who trust NextGen Forex for their trading needs.
            </p>
          </div>

          <div className="relative">
            {/* World Map Background */}
            <div className="w-full h-[500px] bg-gradient-to-br from-blue-50 to-indigo-100 dark:from-blue-900/20 dark:to-indigo-900/20 rounded-3xl relative overflow-hidden shadow-2xl">
              <div className="absolute inset-0 bg-gradient-to-br from-blue-100/50 to-purple-100/50 dark:from-blue-800/30 dark:to-purple-800/30 rounded-3xl"></div>
              
              {/* World Map SVG */}
              <div className="absolute inset-0 flex items-center justify-center">
                <svg 
                  viewBox="0 0 1000 500" 
                  className="w-full h-full opacity-80 dark:opacity-60"
                  style={{filter: 'drop-shadow(0 4px 8px rgba(0,0,0,0.1))'}}
                >
                  {/* World Map Paths */}
                  <path d="M150,200 L200,180 L250,190 L300,185 L350,200 L400,195 L450,210 L500,205 L550,220 L600,215 L650,230 L700,225 L750,240 L800,235 L850,250 L900,245 L950,260 L1000,255" 
                        fill="none" 
                        stroke="#3b82f6" 
                        strokeWidth="2" 
                        className="animate-pulse" />
                  
                  {/* Continents simplified */}
                  <path d="M100,150 Q200,100 300,120 Q400,110 500,130 Q600,125 700,140 Q800,135 900,150 L900,200 Q800,190 700,200 Q600,195 500,210 Q400,205 300,220 Q200,215 100,230 Z" 
                        fill="#60a5fa" 
                        fillOpacity="0.3" 
                        className="hover:fill-opacity-50 transition-all duration-300" />
                  
                  {/* Additional landmasses */}
                  <circle cx="200" cy="300" r="40" fill="#3b82f6" fillOpacity="0.4" className="animate-pulse" />
                  <circle cx="600" cy="350" r="35" fill="#8b5cf6" fillOpacity="0.4" className="animate-pulse" />
                  <circle cx="800" cy="320" r="30" fill="#06b6d4" fillOpacity="0.4" className="animate-pulse" />
                  
                  {/* Grid lines */}
                  <defs>
                    <pattern id="grid" width="50" height="50" patternUnits="userSpaceOnUse">
                      <path d="M 50 0 L 0 0 0 50" fill="none" stroke="#3b82f6" strokeWidth="0.5" opacity="0.3"/>
                    </pattern>
                  </defs>
                  <rect width="100%" height="100%" fill="url(#grid)" />
                </svg>
              </div>
              
              {/* Animated background elements */}
              <div className="absolute top-10 left-10 w-4 h-4 bg-blue-400 rounded-full animate-ping"></div>
              <div className="absolute bottom-20 right-20 w-3 h-3 bg-purple-400 rounded-full animate-pulse"></div>
              <div className="absolute top-1/2 right-10 w-2 h-2 bg-green-400 rounded-full animate-bounce"></div>
              
              {/* Location Markers */}
              {worldLocations.map((location, index) => (
                <div
                  key={index}
                  className="absolute group cursor-pointer animate-pulse"
                  style={{
                    left: `${location.x}%`,
                    top: `${location.y}%`,
                    transform: 'translate(-50%, -50%)',
                    animationDelay: `${index * 0.5}s`
                  }}
                >
                  <div className="relative">
                    <div className="w-8 h-8 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center shadow-lg group-hover:scale-125 transition-all duration-300">
                      <MapPin className="w-5 h-5 text-white" />
                    </div>
                    
                    {/* Pulsing ring */}
                    <div className="absolute inset-0 w-8 h-8 bg-blue-500 rounded-full animate-ping opacity-30"></div>
                    
                    {/* Tooltip */}
                    <div className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-3 opacity-0 group-hover:opacity-100 transition-all duration-300 z-10">
                      <div className="bg-gray-900 dark:bg-gray-100 text-white dark:text-gray-900 px-4 py-3 rounded-xl text-sm whitespace-nowrap shadow-xl">
                        <div className="font-bold">{location.city}, {location.country}</div>
                        <div className="text-xs text-blue-300 dark:text-blue-600">{location.traders} traders</div>
                      </div>
                      <div className="absolute top-full left-1/2 transform -translate-x-1/2 w-0 h-0 border-l-4 border-r-4 border-t-4 border-transparent border-t-gray-900 dark:border-t-gray-100"></div>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Enhanced stats below map */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mt-16">
              <div className="text-center group">
                <div className="w-20 h-20 bg-gradient-to-br from-blue-500 to-blue-600 rounded-2xl flex items-center justify-center mx-auto mb-4 group-hover:scale-110 group-hover:rotate-12 transition-all duration-500 shadow-lg">
                  <Users className="w-10 h-10 text-white" />
                </div>
                <div className="text-3xl font-bold text-gray-900 dark:text-white mb-2">50,000+</div>
                <div className="text-gray-600 dark:text-gray-400 text-lg font-medium">Active Traders</div>
                <div className="w-16 h-1 bg-gradient-to-r from-blue-500 to-blue-600 mx-auto mt-3 rounded-full group-hover:w-24 transition-all duration-300"></div>
              </div>
              <div className="text-center group">
                <div className="w-20 h-20 bg-gradient-to-br from-green-500 to-green-600 rounded-2xl flex items-center justify-center mx-auto mb-4 group-hover:scale-110 group-hover:rotate-12 transition-all duration-500 shadow-lg">
                  <DollarSign className="w-10 h-10 text-white" />
                </div>
                <div className="text-3xl font-bold text-gray-900 dark:text-white mb-2">$2.5B+</div>
                <div className="text-gray-600 dark:text-gray-400 text-lg font-medium">Trading Volume</div>
                <div className="w-16 h-1 bg-gradient-to-r from-green-500 to-green-600 mx-auto mt-3 rounded-full group-hover:w-24 transition-all duration-300"></div>
              </div>
              <div className="text-center group">
                <div className="w-20 h-20 bg-gradient-to-br from-purple-500 to-purple-600 rounded-2xl flex items-center justify-center mx-auto mb-4 group-hover:scale-110 group-hover:rotate-12 transition-all duration-500 shadow-lg">
                  <Globe className="w-10 h-10 text-white" />
                </div>
                <div className="text-3xl font-bold text-gray-900 dark:text-white mb-2">150+</div>
                <div className="text-gray-600 dark:text-gray-400 text-lg font-medium">Countries</div>
                <div className="w-16 h-1 bg-gradient-to-r from-purple-500 to-purple-600 mx-auto mt-3 rounded-full group-hover:w-24 transition-all duration-300"></div>
              </div>
              <div className="text-center group">
                <div className="w-20 h-20 bg-gradient-to-br from-orange-500 to-orange-600 rounded-2xl flex items-center justify-center mx-auto mb-4 group-hover:scale-110 group-hover:rotate-12 transition-all duration-500 shadow-lg">
                  <Award className="w-10 h-10 text-white" />
                </div>
                <div className="text-3xl font-bold text-gray-900 dark:text-white mb-2">10+</div>
                <div className="text-gray-600 dark:text-gray-400 text-lg font-medium">Years Experience</div>
                <div className="w-16 h-1 bg-gradient-to-r from-orange-500 to-orange-600 mx-auto mt-3 rounded-full group-hover:w-24 transition-all duration-300"></div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-24 bg-white/50 dark:bg-[#0A0E23]/50 backdrop-blur-sm relative z-10">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-6 heading-primary">
              Frequently Asked Questions
            </h2>
            <p className="text-xl text-gray-600 dark:text-gray-400 text-premium leading-relaxed">
              Find answers to common questions about our trading platform and services.
            </p>
          </div>

          <div className="space-y-6">
            {faqs.map((faq, index) => (
              <div
                key={index}
                className="card card-hover-border group transition-all duration-500 hover:scale-[1.02]"
              >
                <button
                  className="w-full px-8 py-6 text-left flex items-center justify-between focus:outline-none group-hover:bg-blue-50 dark:group-hover:bg-blue-900/20 transition-colors duration-300 rounded-t-2xl"
                  onClick={() => setOpenFAQ(openFAQ === index ? null : index)}
                >
                  <h3 className="text-xl font-bold text-gray-900 dark:text-white pr-4 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors duration-300">
                    {faq.question}
                  </h3>
                  <div className="flex-shrink-0">
                    {openFAQ === index ? (
                      <ChevronUp className="w-6 h-6 text-blue-500 dark:text-blue-400 transform rotate-180 transition-all duration-300" />
                    ) : (
                      <ChevronDown className="w-6 h-6 text-gray-500 dark:text-gray-400 group-hover:text-blue-500 dark:group-hover:text-blue-400 transition-all duration-300" />
                    )}
                  </div>
                </button>
                
                <div className={`overflow-hidden transition-all duration-500 ${
                  openFAQ === index ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'
                }`}>
                  <div className="px-8 pb-6">
                    <div className="w-full h-px bg-gradient-to-r from-blue-500 to-purple-500 mb-4"></div>
                    <p className="text-gray-600 dark:text-gray-400 leading-relaxed text-lg">
                      {faq.answer}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Final CTA Section */}
      <section className="py-20 bg-white/50 dark:bg-[#0A0E23]/50 backdrop-blur-sm relative z-10">
        <div className="max-w-4xl mx-auto text-center px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-6">
            Ready to Transform Your Trading?
          </h2>
          <p className="text-xl text-gray-600 dark:text-gray-400 mb-8">
            Join the next generation of forex traders and start your journey to financial success today.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              to="/pricing"
              className="btn-primary inline-flex items-center px-8 py-4 text-lg shadow-lg hover:shadow-xl"
            >
              Get Started
              <ArrowRight className="ml-2 w-5 h-5" />
            </Link>
            <Link
              to="/contact"
              className="btn-secondary inline-flex items-center px-8 py-4 text-lg"
            >
              Contact Sales
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;
