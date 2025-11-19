import React from 'react';
import { Link } from 'react-router-dom';

const Register: React.FC = () => {

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-dark-900 flex flex-col justify-center py-12 sm:px-6 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-md">
        {/* Logo */}
        <div className="flex justify-center">
          <div className="flex items-center">
            <div className="w-10 h-10 bg-primary-600 rounded-lg flex items-center justify-center">
              <span className="text-white font-bold text-xl">N</span>
            </div>
            <span className="ml-3 text-2xl font-bold text-gray-900 dark:text-white">
              NextGen Forex
            </span>
          </div>
        </div>

        <h2 className="mt-6 text-center text-3xl font-bold text-gray-900 dark:text-white">
          Subscribe to Get Started
        </h2>
        <p className="mt-2 text-center text-sm text-gray-600 dark:text-gray-400">
          Choose a plan and complete your registration
        </p>
        <div className="mt-6">
          <Link
            to="/pricing"
            className="btn-primary w-full flex justify-center items-center"
          >
            View Pricing Plans
          </Link>
        </div>
        <p className="mt-4 text-center text-sm text-gray-600 dark:text-gray-400">
          Already have an account?{' '}
          <Link
            to="/auth/login"
            className="font-medium text-primary-600 dark:text-primary-400 hover:text-primary-500 dark:hover:text-primary-300"
          >
            Sign in
          </Link>
        </p>
      </div>

      <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
        <div className="card py-8 px-4 shadow sm:rounded-lg sm:px-10">
          <div className="text-center">
            <p className="text-gray-600 dark:text-gray-400 mb-6">
              To create an account, please select a subscription plan first.
            </p>
            <Link
              to="/pricing"
              className="btn-primary w-full flex justify-center items-center"
            >
              View Pricing Plans
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Register;
