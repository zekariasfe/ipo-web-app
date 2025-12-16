// src/app/routes/IpoList.tsx
import { useState, useEffect } from 'react';
import { useAuth } from '../../context/AuthContext';
import MarketHoursGuard from '../../components/MarketHoursGuard';
import { EthiopiaTime } from '../../utils/timeUtils';
import ProtectedRoute from '../../components/ProtectedRoute';

export default function IpoList() {
  const { user } = useAuth();
  const [currentTime, setCurrentTime] = useState(EthiopiaTime.getCurrentTime());
  
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(EthiopiaTime.getCurrentTime());
    }, 60000);
    
    return () => clearInterval(timer);
  }, []);
  
  // Check if user is admin (for bypass)
  const isAdmin = user?.role === 'ADMIN' || user?.role === 'SUPER_ADMIN';
  
  return (
    <ProtectedRoute>
      <div className="max-w-6xl mx-auto">
        {/* Header with real-time clock */}
        <div className="mb-8">
          <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
            <div>
              <h1 className="text-2xl font-bold text-gray-800 mb-2">
                Available IPOs
              </h1>
              <p className="text-gray-600">
                Subscribe during market hours: 9:00 AM - 3:00 PM
              </p>
            </div>
            <div className="bg-white border border-gray-300 rounded-xl p-4 shadow-sm">
              <div className="flex items-center space-x-4">
                <div className="text-center">
                  <div className="text-sm text-gray-500">Ethiopia Time</div>
                  <div className="text-xl font-bold text-gray-800 font-mono">
                    {EthiopiaTime.formatTime(currentTime)}
                  </div>
                </div>
                <div className="h-10 w-px bg-gray-300"></div>
                <div className="text-center">
                  <div className="text-sm text-gray-500">Market Status</div>
                  <div className={`text-lg font-bold ${
                    EthiopiaTime.isMarketOpen() 
                      ? 'text-green-600' 
                      : 'text-amber-600'
                  }`}>
                    {EthiopiaTime.isMarketOpen() ? 'OPEN' : 'CLOSED'}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        
        {/* Market Hours Guard - blocks IPO subscription outside hours */}
        <MarketHoursGuard adminOverride={isAdmin}>
          {/* IPO Listing Content */}
          <div className="bg-white rounded-2xl shadow-lg border border-gray-200 overflow-hidden">
            {/* IPO Table Header */}
            <div className="border-b border-gray-200 p-6">
              <div className="flex items-center justify-between">
                <h2 className="text-lg font-semibold text-gray-800">
                  Active IPO Offerings
                </h2>
                {isAdmin && (
                  <div className="px-3 py-1 bg-purple-100 text-purple-800 text-sm font-medium rounded-full">
                    ⚡ Admin Mode: Time restrictions bypassed
                  </div>
                )}
              </div>
            </div>
            
            {/* IPO Table */}
            <div className="p-6">
              {/* Your existing IpoTable component */}
              <div className="text-center py-12">
                <div className="text-gray-400 text-6xl mb-4">📈</div>
                <h3 className="text-xl font-medium text-gray-700 mb-2">
                  IPO Listings
                </h3>
                <p className="text-gray-500">
                  {EthiopiaTime.isMarketOpen() 
                    ? 'Browse and subscribe to available IPOs' 
                    : 'Market opens at 9:00 AM'
                  }
                </p>
              </div>
            </div>
          </div>
          
          {/* Subscription Instructions */}
          {EthiopiaTime.isMarketOpen() && (
            <div className="mt-6 bg-gradient-to-r from-blue-50 to-indigo-50 border border-blue-200 rounded-xl p-6">
              <div className="flex items-start space-x-4">
                <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-xl flex items-center justify-center">
                  <span className="text-white text-xl">💡</span>
                </div>
                <div>
                  <h4 className="font-semibold text-blue-800 mb-2">
                    IPO Subscription Window Active
                  </h4>
                  <p className="text-blue-700 text-sm">
                    You can now subscribe to IPOs. The allocation window closes at 3:00 PM today.
                    All subscriptions will be processed after market close.
                  </p>
                  <div className="mt-4 flex items-center text-sm text-blue-600">
                    <span className="mr-2">⏳</span>
                    Time remaining today: {(() => {
                      const status = EthiopiaTime.getMarketStatus();
                      const hours = Math.floor(status.timeRemaining / 60);
                      const minutes = status.timeRemaining % 60;
                      return `${hours}h ${minutes}m`;
                    })()}
                  </div>
                </div>
              </div>
            </div>
          )}
        </MarketHoursGuard>
        
        {/* Market Schedule Info */}
        <div className="mt-8 bg-gray-50 border border-gray-200 rounded-xl p-6">
          <h4 className="font-semibold text-gray-800 mb-4">📅 Market Schedule</h4>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <h5 className="font-medium text-gray-700 mb-2">Regular Trading Hours</h5>
              <ul className="space-y-2 text-sm text-gray-600">
                <li className="flex justify-between">
                  <span>Monday - Friday:</span>
                  <span className="font-medium">9:00 AM - 3:00 PM</span>
                </li>
                <li className="flex justify-between">
                  <span>Saturday - Sunday:</span>
                  <span className="font-medium text-red-600">Closed</span>
                </li>
                <li className="flex justify-between">
                  <span>Public Holidays:</span>
                  <span className="font-medium text-red-600">Closed</span>
                </li>
              </ul>
            </div>
            <div>
              <h5 className="font-medium text-gray-700 mb-2">Upcoming IPO Deadlines</h5>
              <ul className="space-y-2 text-sm text-gray-600">
                <li className="flex justify-between">
                  <span>Awash Bank IPO:</span>
                  <span className="font-medium">Today, 3:00 PM</span>
                </li>
                <li className="flex justify-between">
                  <span>Ethio Telecom IPO:</span>
                  <span className="font-medium">Jan 30, 3:00 PM</span>
                </li>
                <li className="flex justify-between">
                  <span>Commercial Bank IPO:</span>
                  <span className="font-medium">Feb 15, 3:00 PM</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </ProtectedRoute>
  );
}