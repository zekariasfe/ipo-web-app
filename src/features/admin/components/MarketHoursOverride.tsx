// src/features/admin/components/MarketHoursOverride.tsx - UPDATED
import { useState, useEffect } from 'react';
import { EthiopiaTime } from '../../../utils/timeUtils';
import { OverrideService, type OverrideStatus } from '../../../services/overrideService';
import { useAuth } from '../../../context/AuthContext';

export default function MarketHoursOverride() {
  const { user } = useAuth();
  const [overrideEnabled, setOverrideEnabled] = useState(false);
  const [overrideUntil, setOverrideUntil] = useState('');
  const [overrideStatus, setOverrideStatus] = useState<OverrideStatus | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [message, setMessage] = useState<{ type: 'success' | 'error', text: string } | null>(null);
  
  useEffect(() => {
    // Load current override status
    const status = OverrideService.getOverrideStatus(user?.id);
    setOverrideStatus(status);
    setOverrideEnabled(status.isOverrideActive);
    
    // Set default override time (1 hour from now)
    const defaultTime = new Date();
    defaultTime.setHours(defaultTime.getHours() + 1);
    setOverrideUntil(defaultTime.toISOString().slice(0, 16));
  }, [user?.id]);
  
  const currentStatus = EthiopiaTime.getMarketStatus();
  
  const handleActivateOverride = async () => {
    if (!user || !overrideUntil) return;
    
    setIsLoading(true);
    setMessage(null);
    
    try {
      // Validate the datetime
      const selectedTime = new Date(overrideUntil);
      const now = new Date();
      
      if (selectedTime <= now) {
        setMessage({ type: 'error', text: 'End time must be in the future' });
        setIsLoading(false);
        return;
      }
      
      // Activate the override
      OverrideService.activateOverride(
        selectedTime.toISOString(),
        'Admin override for testing',
        user.id,
        user.name
      );
      
      // Update status
      const newStatus = OverrideService.getOverrideStatus(user.id);
      setOverrideStatus(newStatus);
      setOverrideEnabled(true);
      
      setMessage({ 
        type: 'success', 
        text: `Market override activated until ${selectedTime.toLocaleTimeString()}`
      });
      
      // Refresh the page to update market status everywhere
      setTimeout(() => {
        window.location.reload();
      }, 1500);
      
    } catch (error) {
      console.error('Failed to activate override:', error);
      setMessage({ type: 'error', text: 'Failed to activate override' });
    } finally {
      setIsLoading(false);
    }
  };
  
  const handleDeactivateOverride = () => {
    if (!user) return;
    
    if (window.confirm('Are you sure you want to deactivate the market override?')) {
      OverrideService.deactivateOverride(user.id, user.name);
      
      const newStatus = OverrideService.getOverrideStatus(user.id);
      setOverrideStatus(newStatus);
      setOverrideEnabled(false);
      
      setMessage({ 
        type: 'success', 
        text: 'Market override deactivated' 
      });
      
      setTimeout(() => {
        window.location.reload();
      }, 1000);
    }
  };
  
  const formatTimeRemaining = (minutes: number): string => {
    if (minutes > 1440) {
      const days = Math.floor(minutes / 1440);
      const hours = Math.floor((minutes % 1440) / 60);
      return `${days}d ${hours}h`;
    } else if (minutes > 60) {
      const hours = Math.floor(minutes / 60);
      const mins = minutes % 60;
      return `${hours}h ${mins}m`;
    } else {
      return `${minutes}m`;
    }
  };

  return (
    <div className="bg-white border border-gray-300 rounded-xl p-6">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-semibold text-gray-800">Market Hours Override</h3>
        {overrideStatus?.isOverrideActive && (
          <span className="px-3 py-1 bg-gradient-to-r from-amber-500 to-orange-500 text-white text-sm font-medium rounded-full animate-pulse">
            ⚡ ACTIVE
          </span>
        )}
      </div>
      
      <div className="space-y-4">
        {/* Current Status Display */}
        <div className="p-4 bg-gray-50 rounded-lg">
          <div className="flex items-center justify-between mb-2">
            <div>
              <p className="font-medium text-gray-700">Market Status</p>
              <p className={`text-sm ${
                currentStatus.isOpen || overrideStatus?.isOverrideActive
                  ? 'text-green-600' 
                  : 'text-amber-600'
              }`}>
                {overrideStatus?.isOverrideActive 
                  ? `OVERRIDE ACTIVE • ${overrideStatus.message}` 
                  : `${currentStatus.isOpen ? 'OPEN' : 'CLOSED'} • ${currentStatus.message}`
                }
              </p>
            </div>
            <div className="text-right">
              <p className="text-sm text-gray-500">Ethiopia Time</p>
              <p className="font-mono font-medium">
                {EthiopiaTime.formatTime(EthiopiaTime.getCurrentTime())}
              </p>
            </div>
          </div>
          
          {overrideStatus?.isOverrideActive && overrideStatus.overrideEndsAt && (
            <div className="mt-3 p-3 bg-amber-50 border border-amber-200 rounded">
              <div className="flex items-center justify-between">
                <span className="text-amber-800 text-sm">Override ends:</span>
                <span className="font-medium text-amber-900">
                  {new Date(overrideStatus.overrideEndsAt).toLocaleString()}
                </span>
              </div>
              <div className="mt-2 flex items-center justify-between">
                <span className="text-amber-800 text-sm">Time remaining:</span>
                <span className="font-bold text-amber-900">
                  {formatTimeRemaining(overrideStatus.timeRemaining)}
                </span>
              </div>
            </div>
          )}
        </div>
        
        {/* Override Controls */}
        {!overrideStatus?.isOverrideActive ? (
          <div className="border-t border-gray-200 pt-4">
            <label className="flex items-center space-x-3 cursor-pointer mb-4">
              <input
                type="checkbox"
                checked={overrideEnabled}
                onChange={(e) => setOverrideEnabled(e.target.checked)}
                className="w-5 h-5 text-lime-600 rounded focus:ring-lime-500"
              />
              <div>
                <span className="font-medium text-gray-700">Enable Market Override</span>
                <p className="text-sm text-gray-500">
                  Allows IPO subscriptions outside regular market hours (Emergency use only)
                </p>
              </div>
            </label>
            
            {overrideEnabled && (
              <div className="mt-4 p-4 bg-amber-50 border border-amber-200 rounded-lg">
                <label className="block text-sm font-medium text-amber-800 mb-2">
                  Override Until (Date & Time)
                </label>
                <input
                  type="datetime-local"
                  value={overrideUntil}
                  onChange={(e) => setOverrideUntil(e.target.value)}
                  className="w-full px-3 py-2 border border-amber-300 rounded-lg bg-white focus:ring-2 focus:ring-amber-500 focus:border-transparent"
                  min={new Date().toISOString().slice(0, 16)}
                />
                <p className="text-xs text-amber-600 mt-2">
                  ⚠️ This override will be logged and requires supervisory approval.
                  Only use for system testing or emergency market extensions.
                </p>
              </div>
            )}
            
            <button
              onClick={handleActivateOverride}
              disabled={!overrideEnabled || isLoading}
              className={`w-full py-3 rounded-lg font-medium mt-4 ${
                overrideEnabled && !isLoading
                  ? 'bg-gradient-to-r from-amber-500 to-orange-500 text-white hover:from-amber-600 hover:to-orange-600 shadow-lg'
                  : 'bg-gray-200 text-gray-500 cursor-not-allowed'
              }`}
            >
              {isLoading ? (
                <span className="flex items-center justify-center">
                  <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-2"></div>
                  Activating...
                </span>
              ) : (
                'Activate Market Override'
              )}
            </button>
          </div>
        ) : (
          <div className="border-t border-gray-200 pt-4">
            <div className="p-4 bg-red-50 border border-red-200 rounded-lg">
              <h4 className="font-semibold text-red-800 mb-2">Active Override Detected</h4>
              <p className="text-red-700 text-sm mb-4">
                Market hours are currently overridden. All users can subscribe to IPOs regardless of time.
              </p>
              
              <div className="space-y-3">
                <button
                  onClick={handleDeactivateOverride}
                  className="w-full py-3 bg-gradient-to-r from-red-500 to-red-600 text-white font-medium rounded-lg hover:from-red-600 hover:to-red-700"
                >
                  Deactivate Override Now
                </button>
                
                <button
                  onClick={() => {
                    OverrideService.clearOverride(user?.id || '', user?.name || '');
                    window.location.reload();
                  }}
                  className="w-full py-3 border-2 border-red-500 text-red-600 font-medium rounded-lg hover:bg-red-50"
                >
                  Clear All Override Data
                </button>
              </div>
            </div>
          </div>
        )}
        
        {/* Messages */}
        {message && (
          <div className={`p-4 rounded-lg ${
            message.type === 'success' 
              ? 'bg-green-50 border border-green-200 text-green-800' 
              : 'bg-red-50 border border-red-200 text-red-800'
          }`}>
            <div className="flex items-center">
              <span className="mr-2">{message.type === 'success' ? '✅' : '❌'}</span>
              {message.text}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}