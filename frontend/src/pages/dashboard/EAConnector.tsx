import React, { useState } from 'react';
import { Download, Copy, CheckCircle, AlertCircle, Key, Server, FileText } from 'lucide-react';
import { useAuth } from '../../contexts/AuthContext';

const EAConnector: React.FC = () => {
  const { user } = useAuth();
  const [licenseKey] = useState('TX-BOT-2024-ABC123XYZ789');
  const [copied, setCopied] = useState(false);
  const [connectionStatus, setConnectionStatus] = useState<'connected' | 'disconnected' | 'connecting'>('disconnected');

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleConnect = () => {
    setConnectionStatus('connecting');
    setTimeout(() => {
      setConnectionStatus('connected');
    }, 2000);
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-dark-900">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-6">
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white">EA Connector</h1>
          <p className="text-gray-600 dark:text-gray-400 mt-1">Connect your MetaTrader 5 terminal with our trading bot</p>
        </div>

        {/* Connection Status */}
        <div className="card mb-6">
          <div className="p-6">
            <div className="flex items-center justify-between">
              <div className="flex items-center">
                <div className={`w-3 h-3 rounded-full mr-3 ${
                  connectionStatus === 'connected' ? 'bg-green-500' :
                  connectionStatus === 'connecting' ? 'bg-yellow-500 animate-pulse' :
                  'bg-red-500'
                }`}></div>
                <div>
                  <p className="text-sm font-medium text-gray-900 dark:text-white">
                    {connectionStatus === 'connected' ? 'Connected' :
                     connectionStatus === 'connecting' ? 'Connecting...' :
                     'Disconnected'}
                  </p>
                  <p className="text-xs text-gray-500 dark:text-gray-400">
                    {connectionStatus === 'connected' ? 'Your EA is connected and ready' :
                     connectionStatus === 'connecting' ? 'Establishing connection...' :
                     'Connect your EA to start trading'}
                  </p>
                </div>
              </div>
              {connectionStatus !== 'connected' && (
                <button onClick={handleConnect} className="btn-primary">
                  Connect EA
                </button>
              )}
            </div>
          </div>
        </div>

        {/* Download Section */}
        <div className="card mb-6">
          <div className="px-6 py-4 border-b border-gray-200 dark:border-dark-700">
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white flex items-center">
              <Download className="w-5 h-5 mr-2" />
              Download EA Connector
            </h3>
          </div>
          <div className="p-6">
            <div className="bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-lg p-4 mb-4">
              <div className="flex items-start">
                <AlertCircle className="w-5 h-5 text-blue-600 dark:text-blue-400 mr-3 mt-0.5" />
                <div className="flex-1">
                  <p className="text-sm text-blue-800 dark:text-blue-300">
                    <strong>Installation Instructions:</strong>
                  </p>
                  <ol className="list-decimal list-inside mt-2 text-sm text-blue-700 dark:text-blue-400 space-y-1">
                    <li>Download the EA file below</li>
                    <li>Open MetaTrader 5</li>
                    <li>Go to File → Open Data Folder</li>
                    <li>Navigate to MQL5 → Experts</li>
                    <li>Copy the EA file to this folder</li>
                    <li>Restart MT5 or refresh the Navigator</li>
                    <li>Drag the EA onto a chart</li>
                    <li>Enter your license key and server URL</li>
                  </ol>
                </div>
              </div>
            </div>
            <button className="btn-primary flex items-center">
              <Download className="w-4 h-4 mr-2" />
              Download EA Connector (v1.0.0)
            </button>
          </div>
        </div>

        {/* License Key */}
        <div className="card mb-6">
          <div className="px-6 py-4 border-b border-gray-200 dark:border-dark-700">
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white flex items-center">
              <Key className="w-5 h-5 mr-2" />
              License Key
            </h3>
          </div>
          <div className="p-6">
            <p className="text-sm text-gray-600 dark:text-gray-400 mb-3">
              Use this license key when configuring your EA connector in MetaTrader 5
            </p>
            <div className="flex items-center space-x-2">
              <div className="flex-1 px-4 py-3 bg-gray-50 dark:bg-dark-700 rounded-lg border border-gray-300 dark:border-dark-600">
                <code className="text-sm font-mono text-gray-900 dark:text-white">{licenseKey}</code>
              </div>
              <button
                onClick={() => copyToClipboard(licenseKey)}
                className="btn-secondary flex items-center"
              >
                {copied ? (
                  <>
                    <CheckCircle className="w-4 h-4 mr-2" />
                    Copied!
                  </>
                ) : (
                  <>
                    <Copy className="w-4 h-4 mr-2" />
                    Copy
                  </>
                )}
              </button>
            </div>
          </div>
        </div>

        {/* Server Configuration */}
        <div className="card mb-6">
          <div className="px-6 py-4 border-b border-gray-200 dark:border-dark-700">
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white flex items-center">
              <Server className="w-5 h-5 mr-2" />
              Server Configuration
            </h3>
          </div>
          <div className="p-6 space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Server URL
              </label>
              <div className="flex items-center space-x-2">
                <input
                  type="text"
                  defaultValue="wss://api.yourdomain.com/ws"
                  readOnly
                  className="flex-1 px-4 py-2 border border-gray-300 dark:border-dark-700 rounded-lg bg-gray-50 dark:bg-dark-800 text-gray-900 dark:text-white"
                />
                <button
                  onClick={() => copyToClipboard('wss://api.yourdomain.com/ws')}
                  className="btn-secondary flex items-center"
                >
                  <Copy className="w-4 h-4" />
                </button>
              </div>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                User ID
              </label>
              <input
                type="text"
                defaultValue={user?.id || ''}
                readOnly
                className="w-full px-4 py-2 border border-gray-300 dark:border-dark-700 rounded-lg bg-gray-50 dark:bg-dark-800 text-gray-900 dark:text-white"
              />
            </div>
          </div>
        </div>

        {/* Documentation */}
        <div className="card">
          <div className="px-6 py-4 border-b border-gray-200 dark:border-dark-700">
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white flex items-center">
              <FileText className="w-5 h-5 mr-2" />
              Documentation
            </h3>
          </div>
          <div className="p-6">
            <div className="space-y-3">
              <a href="#" className="block p-4 bg-gray-50 dark:bg-dark-700 rounded-lg hover:bg-gray-100 dark:hover:bg-dark-600 transition-colors">
                <p className="font-medium text-gray-900 dark:text-white">EA Setup Guide</p>
                <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">Complete guide to setting up your EA connector</p>
              </a>
              <a href="#" className="block p-4 bg-gray-50 dark:bg-dark-700 rounded-lg hover:bg-gray-100 dark:hover:bg-dark-600 transition-colors">
                <p className="font-medium text-gray-900 dark:text-white">Troubleshooting</p>
                <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">Common issues and solutions</p>
              </a>
              <a href="#" className="block p-4 bg-gray-50 dark:bg-dark-700 rounded-lg hover:bg-gray-100 dark:hover:bg-dark-600 transition-colors">
                <p className="font-medium text-gray-900 dark:text-white">API Reference</p>
                <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">Technical documentation for developers</p>
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EAConnector;

