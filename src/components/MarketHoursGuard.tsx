// src/components/MarketHoursGuard.tsx - UPDATED
import { useState, useEffect } from 'react';
import { EthiopiaTime } from '../utils/timeUtils';
import { OverrideService } from '../services/overrideService';
import { useAuth } from '../context/AuthContext';

interface MarketHoursGuardProps {
  children: React.ReactNode;
  showCountdown?: boolean;
  adminOverride?: boolean;
}

export default function MarketHoursGuard({ 
  children, 
  showCountdown = true,
  adminOverride = false 
}: MarketHoursGuardProps) {
  const { user } = useAuth();
  const [marketStatus, setMarketStatus] = useState(EthiopiaTime.getMarketStatus());
  const [overrideStatus, setOverrideStatus] = useState(OverrideService.getOverrideStatus(user?.id));
  const [currentTime, setCurrentTime] = useState(EthiopiaTime.getCurrentTime());
  
  // Update every minute
  useEffect(() => {
    const timer = setInterval(() => {
      setMarketStatus(EthiopiaTime.getMarketStatus());
      setOverrideStatus(OverrideService.getOverrideStatus(user?.id));
      setCurrentTime(EthiopiaTime.getCurrentTime());
    }, 60000); // Update every minute
    
    return () => clearInterval(timer);
  }, [user?.id]);
  
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
  
  // Allow if: market open OR override active OR admin override
  const shouldAllowAccess = 
    marketStatus.isOpen || 
    overrideStatus.isOverrideActive || 
    (adminOverride && overrideStatus.canBypass);
  
  if (shouldAllowAccess) {
    return (
      <>
        {showCountdown && (
          <div className="mb-6">
            <div className={`border rounded-xl p-4 ${
              overrideStatus.isOverrideActive
                ? 'bg-gradient-to-r from-amber-50 to-orange-50 border-amber-300'
                : 'bg-gradient-to-r from-green-50 to-lime-50 border-green-300'
            }`}>
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <div className={`w-10 h-10 rounded-full flex items-center justify-center ${
                    overrideStatus.isOverrideActive
                      ? 'bg-gradient-to-br from-amber-400 to-orange-500'
                      : 'bg-gradient-to-br from-green-400 to-lime-500'
                  }`}>
                    <span className="text-white">
                      {overrideStatus.isOverrideActive ? '⚡' : '🕒'}
                    </span>
                  </div>
                  <div>
                    <p className="font-medium text-gray-800">
                      {overrideStatus.isOverrideActive ? 'MARKET OVERRIDE ACTIVE' : 'Market is OPEN'}
                    </p>
                    <p className={`text-sm ${
                      overrideStatus.isOverrideActive ? 'text-amber-700' : 'text-green-600'
                    }`}>
                      {overrideStatus.isOverrideActive 
                        ? `Override ends in ${formatTimeRemaining(overrideStatus.timeRemaining)}`
                        : `Closes in ${formatTimeRemaining(marketStatus.timeRemaining)}`
                      }
                    </p>
                  </div>
                </div>
                <div className="text-right">
                  <p className="text-sm text-gray-500">Ethiopia Time</p>
                  <p className="font-mono font-medium">
                    {EthiopiaTime.formatTime(currentTime)}
                  </p>
                </div>
              </div>
            </div>
          </div>
        )}
        {children}
      </>
    );
  }
  
  // Market is closed - show blocking message
  return (
    <div className="max-w-4xl mx-auto p-6">
      <div className="bg-gradient-to-br from-amber-50 to-orange-50 border-2 border-amber-300 rounded-2xl p-8 text-center">
        <div className="w-24 h-24 mx-auto bg-gradient-to-br from-amber-400 to-orange-500 rounded-full flex items-center justify-center mb-6">
          <span className="text-4xl">⏰</span>
        </div>
        
        <h2 className="text-2xl font-bold text-amber-800 mb-4">
          Market is Currently Closed
        </h2>
        
        <div className="bg-white/80 rounded-xl p-6 mb-6 max-w-lg mx-auto">
          <div className="grid grid-cols-2 gap-6">
            <div className="text-center">
              <div className="text-3xl font-bold text-amber-600 mb-2">
                {EthiopiaTime.formatTime(currentTime)}
              </div>
              <p className="text-sm text-amber-700">Current Time</p>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-green-600 mb-2">
                {formatTimeRemaining(marketStatus.timeRemaining)}
              </div>
              <p className="text-sm text-green-700">
                Until Market {marketStatus.nextEvent === 'open' ? 'Opens' : 'Opens Tomorrow'}
              </p>
            </div>
          </div>
        </div>
        
        <p className="text-amber-700 mb-6 max-w-2xl mx-auto">
          IPO subscription and allocation is only available during market hours:<br/>
          <strong>Monday - Friday, 9:00 AM to 3:00 PM (Ethiopia Time)</strong>
        </p>
        
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <button
            onClick={() => window.location.reload()}
            className="px-6 py-3 bg-gradient-to-r from-amber-500 to-orange-500 text-white font-medium rounded-lg hover:from-amber-600 hover:to-orange-600 shadow-lg flex items-center justify-center"
          >
            <span className="mr-2">🔄</span>
            Refresh Status
          </button>
          <a
            href="/dashboard"
            className="px-6 py-3 border-2 border-amber-500 text-amber-600 font-medium rounded-lg hover:bg-amber-50 flex items-center justify-center"
          >
            <span className="mr-2">📊</span>
            Return to Dashboard
          </a>
        </div>
      </div>
    </div>
  );
}