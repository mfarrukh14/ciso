import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Check, Zap, Crown, Rocket, ArrowRight } from 'lucide-react';

const Pricing: React.FC = () => {
  const navigate = useNavigate();
  const [selectedPlan, setSelectedPlan] = useState<string | null>(null);

  const plans = [
    {
      id: 'starter',
      name: 'Starter',
      price: 99,
      period: 'month',
      description: 'Perfect for beginners',
      icon: Zap,
      features: [
        'Basic trading bot access',
        'Standard hedging strategy',
        'Email support',
        'Basic analytics dashboard',
        '1 MT5 account connection',
        'Risk profile: Low to Medium',
      ],
      popular: false,
      color: 'blue',
    },
    {
      id: 'professional',
      name: 'Professional',
      price: 299,
      period: 'month',
      description: 'Most popular choice',
      icon: Crown,
      features: [
        'Advanced trading bot access',
        'All hedging strategies',
        'Priority support',
        'Advanced analytics & charts',
        'Up to 3 MT5 account connections',
        'All risk profiles (0-4)',
        'Custom strategy parameters',
        'API access',
        'Real-time trade alerts',
      ],
      popular: true,
      color: 'purple',
    },
    {
      id: 'enterprise',
      name: 'Enterprise',
      price: 999,
      period: 'month',
      description: 'For serious traders',
      icon: Rocket,
      features: [
        'All Professional features',
        'Unlimited MT5 connections',
        'Dedicated account manager',
        'Custom bot configurations',
        '24/7 priority support',
        'Advanced reporting',
        'White-label options',
        'Multi-account management',
        'Custom integrations',
      ],
      popular: false,
      color: 'gold',
    },
  ];

  const handleSelectPlan = (planId: string) => {
    setSelectedPlan(planId);
    navigate(`/checkout?plan=${planId}`);
  };

  return (
    <div className="pt-10 min-h-screen bg-gradient-to-br from-gray-50 via-white to-gray-50 dark:from-dark-900 dark:via-dark-800 dark:to-dark-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        {/* Header */}
        <div className="text-center mb-16">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-4">
            Choose Your Plan
          </h1>
          <p className="text-xl text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
            Start your trading journey with our professional bot. Select a plan that fits your needs.
          </p>
        </div>

        {/* Pricing Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
          {plans.map((plan) => {
            const Icon = plan.icon;
            const isPopular = plan.popular;
            return (
              <div
                key={plan.id}
                className={`
                  relative bg-white dark:bg-dark-800 rounded-2xl shadow-lg border-2 transition-all duration-300
                  ${isPopular
                    ? 'border-purple-500 scale-105 shadow-purple-500/20'
                    : 'border-gray-200 dark:border-dark-700 hover:border-primary-300 dark:hover:border-primary-700'
                  }
                  ${selectedPlan === plan.id ? 'ring-4 ring-primary-500' : ''}
                `}
              >
                {isPopular && (
                  <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                    <span className="bg-gradient-to-r from-purple-600 to-purple-700 text-white px-4 py-1 rounded-full text-sm font-semibold shadow-lg">
                      Most Popular
                    </span>
                  </div>
                )}

                <div className="p-8">
                  {/* Plan Header */}
                  <div className="text-center mb-6">
                    <div className={`inline-flex p-3 rounded-xl mb-4 ${
                      plan.color === 'blue' ? 'bg-blue-100 dark:bg-blue-900/20' :
                      plan.color === 'purple' ? 'bg-purple-100 dark:bg-purple-900/20' :
                      'bg-yellow-100 dark:bg-yellow-900/20'
                    }`}>
                      <Icon className={`w-8 h-8 ${
                        plan.color === 'blue' ? 'text-blue-600 dark:text-blue-400' :
                        plan.color === 'purple' ? 'text-purple-600 dark:text-purple-400' :
                        'text-yellow-600 dark:text-yellow-400'
                      }`} />
                    </div>
                    <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
                      {plan.name}
                    </h3>
                    <p className="text-gray-600 dark:text-gray-400 text-sm">
                      {plan.description}
                    </p>
                  </div>

                  {/* Price */}
                  <div className="text-center mb-6">
                    <div className="flex items-baseline justify-center">
                      <span className="text-5xl font-bold text-gray-900 dark:text-white">
                        ${plan.price}
                      </span>
                      <span className="text-gray-600 dark:text-gray-400 ml-2">
                        /{plan.period}
                      </span>
                    </div>
                  </div>

                  {/* Features */}
                  <ul className="space-y-4 mb-8">
                    {plan.features.map((feature, index) => (
                      <li key={index} className="flex items-start">
                        <Check className="w-5 h-5 text-green-500 mr-3 mt-0.5 flex-shrink-0" />
                        <span className="text-gray-700 dark:text-gray-300 text-sm">
                          {feature}
                        </span>
                      </li>
                    ))}
                  </ul>

                  {/* CTA Button */}
                  <button
                    onClick={() => handleSelectPlan(plan.id)}
                    className={`
                      w-full py-3 px-6 rounded-xl font-semibold transition-all duration-200 flex items-center justify-center
                      ${isPopular
                        ? 'bg-gradient-to-r from-purple-600 to-purple-700 text-white hover:from-purple-700 hover:to-purple-800 shadow-lg shadow-purple-500/30'
                        : 'bg-primary-600 text-white hover:bg-primary-700 shadow-md hover:shadow-lg'
                      }
                    `}
                  >
                    Get Started
                    <ArrowRight className="w-5 h-5 ml-2" />
                  </button>
                </div>
              </div>
            );
          })}
        </div>

        {/* FAQ Section */}
        <div className="max-w-3xl mx-auto">
          <h2 className="text-2xl font-bold text-center text-gray-900 dark:text-white mb-8">
            Frequently Asked Questions
          </h2>
          <div className="space-y-4">
            <div className="bg-white dark:bg-dark-800 rounded-xl p-6 border border-gray-200 dark:border-dark-700">
              <h3 className="font-semibold text-gray-900 dark:text-white mb-2">
                Can I change plans later?
              </h3>
              <p className="text-gray-600 dark:text-gray-400 text-sm">
                Yes, you can upgrade or downgrade your plan at any time. Changes will be prorated.
              </p>
            </div>
            <div className="bg-white dark:bg-dark-800 rounded-xl p-6 border border-gray-200 dark:border-dark-700">
              <h3 className="font-semibold text-gray-900 dark:text-white mb-2">
                What payment methods do you accept?
              </h3>
              <p className="text-gray-600 dark:text-gray-400 text-sm">
                We accept all major credit cards, PayPal, and bank transfers for Enterprise plans.
              </p>
            </div>
            <div className="bg-white dark:bg-dark-800 rounded-xl p-6 border border-gray-200 dark:border-dark-700">
              <h3 className="font-semibold text-gray-900 dark:text-white mb-2">
                Is there a free trial?
              </h3>
              <p className="text-gray-600 dark:text-gray-400 text-sm">
                All plans include a 7-day money-back guarantee. Try risk-free!
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Pricing;

