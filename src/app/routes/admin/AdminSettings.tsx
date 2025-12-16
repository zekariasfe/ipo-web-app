// src/app/routes/admin/AdminSettings.tsx
import { useAuth } from '../../../context/AuthContext';
import MarketHoursOverride from '../../../features/admin/components/MarketHoursOverride';
import { EthiopiaTime } from '../../../utils/timeUtils';

export default function AdminSettings() {
  const { user } = useAuth();
  
  // Only SUPER_ADMIN can access this page
  if (user?.role !== 'SUPER_ADMIN') {
    return (
      <div className="flex flex-col items-center justify-center min-h-[60vh]">
        <div className="text-center">
          <div className="text-6xl mb-4">🔒</div>
          <h2 className="text-2xl font-bold text-gray-800 mb-2">Access Denied</h2>
          <p className="text-gray-600 max-w-md">
            This page is restricted to SUPER_ADMIN users only.
            Please contact your system administrator for access.
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="p-6">
      {/* Header */}
      <div className="mb-8">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold text-gray-800 mb-2">System Settings</h1>
            <p className="text-gray-600">Configure platform settings and emergency overrides</p>
          </div>
          <div className="px-4 py-2 bg-gradient-to-r from-purple-500 to-indigo-600 text-white rounded-lg">
            SUPER_ADMIN
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Left Column - Market Controls */}
        <div className="lg:col-span-2 space-y-6">
          {/* Market Hours Override Card */}
          <div className="bg-white border border-gray-300 rounded-xl p-6 shadow-sm">
            <div className="flex items-center justify-between mb-6">
              <div>
                <h2 className="text-xl font-bold text-gray-800">Market Hours Controls</h2>
                <p className="text-gray-600 text-sm">Override regular market hours for testing or emergencies</p>
              </div>
              <div className="px-3 py-1 bg-amber-100 text-amber-800 text-sm font-medium rounded-full">
                ⚠️ Requires Audit Log
              </div>
            </div>
            <MarketHoursOverride />
          </div>

          {/* System Configuration */}
          <div className="bg-white border border-gray-300 rounded-xl p-6 shadow-sm">
            <h3 className="text-lg font-semibold text-gray-800 mb-4">Platform Configuration</h3>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Default IPO Subscription Limit
                </label>
                <input
                  type="number"
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg"
                  placeholder="e.g., 10000"
                  defaultValue="10000"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Auto-approve KYC Threshold
                </label>
                <select className="w-full px-3 py-2 border border-gray-300 rounded-lg">
                  <option value="manual">Manual Review (Recommended)</option>
                  <option value="auto">Auto-approve Verified Users</option>
                </select>
              </div>
            </div>
          </div>
        </div>

        {/* Right Column - Status & Audit Log */}
        <div className="lg:col-span-1">
          {/* Current Status */}
          <div className="bg-white border border-gray-300 rounded-xl p-6 mb-6">
            <h3 className="text-lg font-semibold text-gray-800 mb-4">Current Status</h3>
            <div className="space-y-4">
              <div>
                <p className="text-sm text-gray-600">Market Status</p>
                <p className={`text-lg font-bold ${EthiopiaTime.isMarketOpen() ? 'text-green-600' : 'text-amber-600'}`}>
                  {EthiopiaTime.isMarketOpen() ? 'OPEN' : 'CLOSED'}
                </p>
              </div>
              <div>
                <p className="text-sm text-gray-600">Ethiopia Time</p>
                <p className="text-lg font-bold font-mono">{EthiopiaTime.formatTime(EthiopiaTime.getCurrentTime())}</p>
              </div>
              <div>
                <p className="text-sm text-gray-600">Active Overrides</p>
                <p className="text-lg font-bold text-gray-800">0</p>
              </div>
            </div>
          </div>

          {/* Recent Overrides */}
          <div className="bg-white border border-gray-300 rounded-xl p-6">
            <h3 className="text-lg font-semibold text-gray-800 mb-4">Recent Overrides</h3>
            <div className="space-y-4">
              <div className="p-3 bg-gray-50 rounded-lg">
                <div className="flex justify-between items-start">
                  <div>
                    <p className="font-medium text-gray-800">Market Override</p>
                    <p className="text-xs text-gray-500">Yesterday, 4:30 PM</p>
                  </div>
                  <span className="px-2 py-1 bg-green-100 text-green-800 text-xs rounded">Expired</span>
                </div>
                <p className="text-sm text-gray-600 mt-2">Extended for system testing by {user?.name}</p>
              </div>
              
              <div className="p-3 bg-gray-50 rounded-lg">
                <div className="flex justify-between items-start">
                  <div>
                    <p className="font-medium text-gray-800">Market Override</p>
                    <p className="text-xs text-gray-500">Jan 10, 5:15 PM</p>
                  </div>
                  <span className="px-2 py-1 bg-gray-100 text-gray-800 text-xs rounded">Expired</span>
                </div>
                <p className="text-sm text-gray-600 mt-2">Emergency maintenance window</p>
              </div>
            </div>
            
            <button className="w-full mt-6 px-4 py-2 border-2 border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 font-medium">
              View Full Audit Log
            </button>
          </div>
        </div>
      </div>

      {/* Danger Zone */}
      <div className="mt-8 border-t border-gray-200 pt-8">
        <h3 className="text-xl font-bold text-red-700 mb-4">⚠️ Danger Zone</h3>
        <div className="bg-red-50 border border-red-200 rounded-xl p-6">
          <div className="flex items-start justify-between">
            <div>
              <h4 className="font-semibold text-red-800 mb-2">Emergency Shutdown</h4>
              <p className="text-red-700 text-sm">
                Immediately halt all IPO subscriptions. This action cannot be undone and will notify all users.
              </p>
            </div>
            <button className="px-6 py-3 bg-red-600 text-white font-medium rounded-lg hover:bg-red-700">
              Activate Emergency Shutdown
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}