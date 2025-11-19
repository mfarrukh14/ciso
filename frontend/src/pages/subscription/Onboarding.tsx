import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { CheckCircle, ArrowRight, ArrowLeft, Zap, Settings, Key, User } from 'lucide-react';
import { useAuth } from '../../contexts/AuthContext';
import { subscriptionService } from '../../services/subscription';
import { userService } from '../../services/user';

const Onboarding: React.FC = () => {
  const navigate = useNavigate();
  // const [searchParams] = useSearchParams();
  // const email = searchParams.get('email') || '';
  // const planId = searchParams.get('plan') || 'professional';
  const { register } = useAuth();
  
  const [currentStep, setCurrentStep] = useState(1);
  const [formData, setFormData] = useState({
    riskProfile: 2,
    mt5Login: '',
    mt5Server: '',
    tradingGoals: '',
    experience: 'beginner',
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const steps = [
    { id: 1, title: 'Welcome', icon: User },
    { id: 2, title: 'Trading Setup', icon: Settings },
    { id: 3, title: 'MT5 Connection', icon: Key },
    { id: 4, title: 'Complete', icon: CheckCircle },
  ];

  const riskProfiles = [
    { value: 0, label: 'Micro', description: 'Ultra conservative, minimal risk' },
    { value: 1, label: 'Low', description: 'Conservative approach' },
    { value: 2, label: 'Medium', description: 'Balanced risk/reward' },
    { value: 3, label: 'High', description: 'Aggressive trading' },
    { value: 4, label: 'Ultra', description: 'Maximum risk tolerance' },
  ];

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleNext = () => {
    if (currentStep < 4) {
      setCurrentStep(currentStep + 1);
    }
  };

  const handleBack = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    }
  };

  const handleComplete = async () => {
    setIsSubmitting(true);
    try {
      // Get pending subscription data from localStorage
      const pendingData = localStorage.getItem('pendingSubscription');
      if (!pendingData) {
        navigate('/pricing');
        return;
      }

      const subscriptionData = JSON.parse(pendingData);

      // Create user account
      const userData = {
        email: subscriptionData.email,
        firstName: subscriptionData.firstName,
        lastName: subscriptionData.lastName,
        password: subscriptionData.password,
        confirmPassword: subscriptionData.password,
      };

      const registerResponse = await register(userData);
      
      // Create subscription
      if (registerResponse && registerResponse.user && registerResponse.user.id) {
        try {
          await subscriptionService.createSubscription({
            userId: registerResponse.user.id,
            planId: subscriptionData.planId,
            paymentId: subscriptionData.paymentId,
            paymentMethod: 'card',
          });

          // Update user trading account settings
          if (formData.mt5Login || formData.mt5Server) {
            await userService.updateTradingAccount({
              riskProfile: formData.riskProfile,
              mt5Login: formData.mt5Login || undefined,
              mt5Server: formData.mt5Server || undefined,
            });
          }
        } catch (subError) {
          console.error('Subscription creation error:', subError);
          // Continue even if subscription creation fails - user can retry from dashboard
        }
      } else {
        console.error('Registration response missing user data:', registerResponse);
        throw new Error('Registration failed - user data not received');
      }

      // Clear pending subscription
      localStorage.removeItem('pendingSubscription');

      // Navigate to login with success message
      navigate('/auth/login?onboarding=complete&email=' + encodeURIComponent(subscriptionData.email));
    } catch (error: any) {
      console.error('Onboarding error:', error);
      alert(error.message || 'Failed to complete setup. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const progress = (currentStep / steps.length) * 100;

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-gray-50 dark:from-dark-900 dark:via-dark-800 dark:to-dark-900">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Progress Bar */}
        <div className="mb-12">
          <div className="flex items-center justify-between mb-4">
            {steps.map((step) => {
              const Icon = step.icon;
              const isActive = currentStep >= step.id;
              return (
                <div key={step.id} className="flex items-center flex-1">
                  <div className="flex flex-col items-center flex-1">
                    <div className={`
                      w-12 h-12 rounded-full flex items-center justify-center border-2 transition-all
                      ${isActive
                        ? 'bg-primary-600 border-primary-600 text-white'
                        : 'bg-white dark:bg-dark-800 border-gray-300 dark:border-dark-700 text-gray-400'
                      }
                    `}>
                      <Icon className="w-6 h-6" />
                    </div>
                    <span className={`mt-2 text-xs font-medium ${isActive ? 'text-primary-600 dark:text-primary-400' : 'text-gray-500'}`}>
                      {step.title}
                    </span>
                  </div>
                  {step.id < steps.length && (
                    <div className={`h-0.5 flex-1 mx-2 ${currentStep > step.id ? 'bg-primary-600' : 'bg-gray-300 dark:bg-dark-700'}`} />
                  )}
                </div>
              );
            })}
          </div>
          <div className="w-full bg-gray-200 dark:bg-dark-700 rounded-full h-2">
            <div
              className="bg-primary-600 h-2 rounded-full transition-all duration-300"
              style={{ width: `${progress}%` }}
            />
          </div>
        </div>

        {/* Step Content */}
        <div className="bg-white dark:bg-dark-800 rounded-2xl shadow-xl p-8 md:p-12">
          {currentStep === 1 && (
            <div className="text-center">
              <div className="w-20 h-20 bg-primary-100 dark:bg-primary-900/20 rounded-full flex items-center justify-center mx-auto mb-6">
                <Zap className="w-10 h-10 text-primary-600 dark:text-primary-400" />
              </div>
              <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">
                Welcome to NextGen Forex!
              </h2>
              <p className="text-gray-600 dark:text-gray-400 mb-8 max-w-2xl mx-auto">
                We're excited to have you on board. Let's set up your trading account in just a few simple steps.
                This will only take a couple of minutes.
              </p>
              <div className="bg-blue-50 dark:bg-blue-900/20 rounded-xl p-6 mb-8 text-left">
                <h3 className="font-semibold text-gray-900 dark:text-white mb-3">What you'll need:</h3>
                <ul className="space-y-2 text-sm text-gray-600 dark:text-gray-400">
                  <li className="flex items-start">
                    <CheckCircle className="w-5 h-5 text-green-500 mr-2 mt-0.5 flex-shrink-0" />
                    Your MetaTrader 5 account details (optional, can add later)
                  </li>
                  <li className="flex items-start">
                    <CheckCircle className="w-5 h-5 text-green-500 mr-2 mt-0.5 flex-shrink-0" />
                    Basic trading preferences
                  </li>
                  <li className="flex items-start">
                    <CheckCircle className="w-5 h-5 text-green-500 mr-2 mt-0.5 flex-shrink-0" />
                    About 2 minutes of your time
                  </li>
                </ul>
              </div>
              <button onClick={handleNext} className="btn-primary">
                Get Started
                <ArrowRight className="w-5 h-5 ml-2" />
              </button>
            </div>
          )}

          {currentStep === 2 && (
            <div>
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">
                Trading Preferences
              </h2>
              <div className="space-y-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-3">
                    Risk Profile
                  </label>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                    {riskProfiles.map((profile) => (
                      <button
                        key={profile.value}
                        type="button"
                        onClick={() => setFormData(prev => ({ ...prev, riskProfile: profile.value }))}
                        className={`
                          p-4 rounded-xl border-2 text-left transition-all
                          ${formData.riskProfile === profile.value
                            ? 'border-primary-600 bg-primary-50 dark:bg-primary-900/20'
                            : 'border-gray-200 dark:border-dark-700 hover:border-primary-300 dark:hover:border-primary-700'
                          }
                        `}
                      >
                        <div className="font-semibold text-gray-900 dark:text-white mb-1">
                          {profile.label}
                        </div>
                        <div className="text-xs text-gray-600 dark:text-gray-400">
                          {profile.description}
                        </div>
                      </button>
                    ))}
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Trading Experience
                  </label>
                  <select
                    name="experience"
                    value={formData.experience}
                    onChange={handleInputChange}
                    className="w-full px-4 py-2 border border-gray-300 dark:border-dark-700 rounded-lg bg-white dark:bg-dark-900 text-gray-900 dark:text-white"
                  >
                    <option value="beginner">Beginner (0-1 years)</option>
                    <option value="intermediate">Intermediate (1-3 years)</option>
                    <option value="advanced">Advanced (3+ years)</option>
                    <option value="expert">Expert (5+ years)</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Trading Goals (Optional)
                  </label>
                  <textarea
                    name="tradingGoals"
                    value={formData.tradingGoals}
                    onChange={handleInputChange}
                    rows={3}
                    className="w-full px-4 py-2 border border-gray-300 dark:border-dark-700 rounded-lg bg-white dark:bg-dark-900 text-gray-900 dark:text-white"
                    placeholder="e.g., Long-term wealth building, Monthly income, Learning..."
                  />
                </div>
              </div>
              <div className="flex items-center justify-between mt-8">
                <button onClick={handleBack} className="btn-secondary flex items-center">
                  <ArrowLeft className="w-4 h-4 mr-2" />
                  Back
                </button>
                <button onClick={handleNext} className="btn-primary flex items-center">
                  Continue
                  <ArrowRight className="w-5 h-5 ml-2" />
                </button>
              </div>
            </div>
          )}

          {currentStep === 3 && (
            <div>
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">
                Connect MetaTrader 5
              </h2>
              <p className="text-gray-600 dark:text-gray-400 mb-6">
                You can connect your MT5 account now or skip this step and add it later from your dashboard.
              </p>
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    MT5 Login (Optional)
                  </label>
                  <input
                    type="text"
                    name="mt5Login"
                    value={formData.mt5Login}
                    onChange={handleInputChange}
                    className="w-full px-4 py-2 border border-gray-300 dark:border-dark-700 rounded-lg bg-white dark:bg-dark-900 text-gray-900 dark:text-white"
                    placeholder="Enter your MT5 login number"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    MT5 Server (Optional)
                  </label>
                  <input
                    type="text"
                    name="mt5Server"
                    value={formData.mt5Server}
                    onChange={handleInputChange}
                    className="w-full px-4 py-2 border border-gray-300 dark:border-dark-700 rounded-lg bg-white dark:bg-dark-900 text-gray-900 dark:text-white"
                    placeholder="e.g., broker-Demo or broker-Live"
                  />
                </div>
                <div className="bg-blue-50 dark:bg-blue-900/20 rounded-xl p-4">
                  <p className="text-sm text-blue-800 dark:text-blue-300">
                    <strong>Note:</strong> You'll need to download and install our EA connector in MT5 to start trading.
                    We'll guide you through this process after account setup.
                  </p>
                </div>
              </div>
              <div className="flex items-center justify-between mt-8">
                <button onClick={handleBack} className="btn-secondary flex items-center">
                  <ArrowLeft className="w-4 h-4 mr-2" />
                  Back
                </button>
                <button onClick={handleNext} className="btn-primary flex items-center">
                  Continue
                  <ArrowRight className="w-5 h-5 ml-2" />
                </button>
              </div>
            </div>
          )}

          {currentStep === 4 && (
            <div className="text-center">
              <div className="w-20 h-20 bg-green-100 dark:bg-green-900/20 rounded-full flex items-center justify-center mx-auto mb-6">
                <CheckCircle className="w-10 h-10 text-green-600 dark:text-green-400" />
              </div>
              <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">
                You're All Set! 🎉
              </h2>
              <p className="text-gray-600 dark:text-gray-400 mb-8 max-w-2xl mx-auto">
                Your account has been created successfully. You can now log in to access your dashboard and start trading.
              </p>
              <div className="bg-gray-50 dark:bg-dark-900 rounded-xl p-6 mb-8 text-left max-w-md mx-auto">
                <h3 className="font-semibold text-gray-900 dark:text-white mb-3">Next Steps:</h3>
                <ul className="space-y-2 text-sm text-gray-600 dark:text-gray-400">
                  <li className="flex items-start">
                    <CheckCircle className="w-5 h-5 text-green-500 mr-2 mt-0.5 flex-shrink-0" />
                    Log in to your dashboard
                  </li>
                  <li className="flex items-start">
                    <CheckCircle className="w-5 h-5 text-green-500 mr-2 mt-0.5 flex-shrink-0" />
                    Download the EA connector from your dashboard
                  </li>
                  <li className="flex items-start">
                    <CheckCircle className="w-5 h-5 text-green-500 mr-2 mt-0.5 flex-shrink-0" />
                    Install and configure the EA in MetaTrader 5
                  </li>
                  <li className="flex items-start">
                    <CheckCircle className="w-5 h-5 text-green-500 mr-2 mt-0.5 flex-shrink-0" />
                    Start your first trade!
                  </li>
                </ul>
              </div>
              <button
                onClick={handleComplete}
                disabled={isSubmitting}
                className="btn-primary"
              >
                {isSubmitting ? (
                  <>
                    <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                    Setting up...
                  </>
                ) : (
                  <>
                    Go to Login
                    <ArrowRight className="w-5 h-5 ml-2" />
                  </>
                )}
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Onboarding;

