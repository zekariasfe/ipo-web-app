// src/features/ipo/components/SubscriptionModal.tsx
import { useState, useEffect } from 'react';
import { EthiopiaTime } from '../../../utils/timeUtils';

interface SubscriptionModalProps {
  ipoId: string;
  ipoName: string;
  price: number;
  onClose: () => void;
  onSubmit: (shares: number) => Promise<void>;
}

export default function SubscriptionModal({
  ipoId,
  ipoName,
  price,
  onClose,
  onSubmit
}: SubscriptionModalProps) {
  const [shares, setShares] = useState(100);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [marketOpen, setMarketOpen] = useState(EthiopiaTime.isMarketOpen());
  
  // Check market status every minute
  useEffect(() => {
    const timer = setInterval(() => {
      setMarketOpen(EthiopiaTime.isMarketOpen());
    }, 60000);
    
    return () => clearInterval(timer);
  }, []);
  
  const totalAmount = shares * price;
  
  const handleSubmit = async () => {
    if (!marketOpen) {
      alert('IPO subscription is only available during market hours (9 AM - 3 PM)');
      return;
    }
    
    setIsSubmitting(true);
    try {
      await onSubmit(shares);
      onClose();
    } catch (error) {
      console.error('Subscription failed:', error);
    } finally {
      setIsSubmitting(false);
    }
  };
  
  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-2xl shadow-2xl max-w-md w-full">
        {/* Header */}
        <div className="p-6 border-b border-gray-200">
          <div className="flex items-center justify-between">
            <h3 className="text-xl font-bold text-gray-800">Subscribe to {ipoName}</h3>
            <button onClick={onClose} className="text-gray-500 hover:text-gray-700">
              ✕
            </button>
          </div>
          
          {/* Market Status Badge */}
          <div className={`mt-4 inline-flex items-center px-3 py-1.5 rounded-full text-sm font-medium ${
            marketOpen 
              ? 'bg-green-100 text-green-800' 
              : 'bg-red-100 text-red-800'
          }`}>
            <span className="mr-2">{marketOpen ? '✅' : '⏸️'}</span>
            {marketOpen ? 'Market Open - Subscriptions Active' : 'Market Closed - Subscriptions Disabled'}
          </div>
        </div>
        
        {/* Content */}
        <div className="p-6">
          {!marketOpen && (
            <div className="mb-6 bg-amber-50 border border-amber-200 rounded-xl p-4">
              <div className="flex items-start space-x-3">
                <span className="text-amber-600 text-xl">⏰</span>
                <div>
                  <p className="font-medium text-amber-800">Subscription Window Closed</p>
                  <p className="text-sm text-amber-700 mt-1">
                    IPO subscriptions are only accepted during market hours:
                    <strong> Monday - Friday, 9:00 AM - 3:00 PM</strong>
                  </p>
                  <p className="text-xs text-amber-600 mt-2">
                    Next window opens at 9:00 AM tomorrow
                  </p>
                </div>
              </div>
            </div>
          )}
          
          {/* Subscription Form */}
          <div className="space-y-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Number of Shares
              </label>
              <div className="flex items-center">
                <input
                  type="range"
                  min="10"
                  max="10000"
                  step="10"
                  value={shares}
                  onChange={(e) => setShares(parseInt(e.target.value))}
                  className="flex-1 h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer"
                  disabled={!marketOpen}
                />
                <span className="ml-4 w-24 px-3 py-2 bg-gray-100 rounded-lg text-center font-mono font-medium">
                  {shares.toLocaleString()}
                </span>
              </div>
              <div className="flex justify-between text-xs text-gray-500 mt-2">
                <span>Min: 10</span>
                <span>Max: 10,000</span>
              </div>
            </div>
            
            <div className="bg-gray-50 rounded-xl p-4">
              <div className="space-y-2">
                <div className="flex justify-between">
                  <span className="text-gray-600">Share Price:</span>
                  <span className="font-medium">ETB {price.toFixed(2)}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Number of Shares:</span>
                  <span className="font-medium">{shares.toLocaleString()}</span>
                </div>
                <div className="border-t border-gray-300 pt-2">
                  <div className="flex justify-between">
                    <span className="text-lg font-medium text-gray-800">Total Amount:</span>
                    <span className="text-xl font-bold text-blue-600">
                      ETB {totalAmount.toLocaleString(undefined, {minimumFractionDigits: 2})}
                    </span>
                  </div>
                </div>
              </div>
            </div>
            
            {/* Current Time Display */}
            <div className="text-center text-sm text-gray-500">
              <div className="inline-flex items-center px-3 py-1.5 bg-gray-100 rounded-full">
                <span className="mr-2">🕒</span>
                Ethiopia Time: {EthiopiaTime.formatTime(EthiopiaTime.getCurrentTime())}
              </div>
            </div>
          </div>
        </div>
        
        {/* Footer */}
        <div className="p-6 border-t border-gray-200 bg-gray-50 rounded-b-2xl">
          <div className="flex space-x-4">
            <button
              onClick={onClose}
              className="flex-1 px-4 py-3 border-2 border-gray-300 text-gray-700 font-medium rounded-lg hover:bg-gray-50"
            >
              Cancel
            </button>
            <button
              onClick={handleSubmit}
              disabled={!marketOpen || isSubmitting}
              className={`flex-1 px-4 py-3 font-medium rounded-lg ${
                marketOpen
                  ? 'bg-gradient-to-r from-lime-500 to-lime-600 text-white hover:from-lime-600 hover:to-lime-700'
                  : 'bg-gray-300 text-gray-500 cursor-not-allowed'
              }`}
            >
              {isSubmitting ? 'Processing...' : marketOpen ? 'Confirm Subscription' : 'Market Closed'}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}