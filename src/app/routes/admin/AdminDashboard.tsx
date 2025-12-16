// src/app/routes/admin/AdminDashboard.tsx - UPDATED
import { useAuth } from '../../../context/AuthContext';
import MarketHoursOverride from '../../../features/admin/components/MarketHoursOverride';
import { Link } from 'react-router-dom';
import { EthiopiaTime } from '../../../utils/timeUtils';

export default function AdminDashboard() {
  const { user } = useAuth();
  
  // Check if user is SUPER_ADMIN
  const isSuperAdmin = user?.role === 'SUPER_ADMIN';
  const currentTime = EthiopiaTime.getCurrentTime();
  const marketStatus = EthiopiaTime.getMarketStatus();

  return (
    <div className="p-6 space-y-8">
      {/* Header with User Info */}
      <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-800">Administration Dashboard</h1>
          <p className="text-gray-600">
            Welcome back, <span className="font-semibold text-lime-600">{user?.name}</span>
          </p>
        </div>
        <div className="flex items-center space-x-4">
          <div className="text-right hidden sm:block">
            <p className="text-sm font-medium text-gray-700">{user?.name}</p>
            <p className="text-xs text-gray-500">{user?.email}</p>
          </div>
          <div className={`px-3 py-1.5 rounded-full text-sm font-medium ${
            user?.role === 'SUPER_ADMIN' 
              ? 'bg-gradient-to-r from-purple-100 to-indigo-100 text-purple-800' 
              : 'bg-gradient-to-r from-lime-100 to-green-100 text-lime-800'
          }`}>
            {user?.role?.replace('_', ' ') || 'Admin'}
          </div>
        </div>
      </div>

      {/* Admin Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <div className="bg-gradient-to-br from-white to-gray-50 p-6 rounded-xl shadow border border-gray-200">
          <h3 className="font-semibold text-gray-700">Total Users</h3>
          <p className="text-3xl font-bold mt-2 text-gray-800">0</p>
          <p className="text-sm text-gray-500">Registered users</p>
        </div>
        
        <div className="bg-gradient-to-br from-white to-gray-50 p-6 rounded-xl shadow border border-gray-200">
          <h3 className="font-semibold text-gray-700">Active IPOs</h3>
          <p className="text-3xl font-bold mt-2 text-gray-800">0</p>
          <p className="text-sm text-gray-500">Open for subscription</p>
        </div>
        
        <div className="bg-gradient-to-br from-white to-gray-50 p-6 rounded-xl shadow border border-gray-200">
          <h3 className="font-semibold text-gray-700">Pending KYC</h3>
          <p className="text-3xl font-bold mt-2 text-amber-600">0</p>
          <p className="text-sm text-gray-500">Awaiting review</p>
        </div>
        
        <div className="bg-gradient-to-br from-white to-gray-50 p-6 rounded-xl shadow border border-gray-200">
          <h3 className="font-semibold text-gray-700">Documents</h3>
          <p className="text-3xl font-bold mt-2 text-gray-800">0</p>
          <p className="text-sm text-gray-500">Uploaded files</p>
        </div>
      </div>
      
      {/* Market Status Banner */}
      <div className={`p-4 rounded-xl border ${
        marketStatus.isOpen 
          ? 'bg-gradient-to-r from-green-50 to-lime-50 border-green-200' 
          : 'bg-gradient-to-r from-amber-50 to-orange-50 border-amber-200'
      }`}>
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <div className={`w-10 h-10 rounded-full flex items-center justify-center ${
              marketStatus.isOpen 
                ? 'bg-gradient-to-br from-green-400 to-lime-500' 
                : 'bg-gradient-to-br from-amber-400 to-orange-500'
            }`}>
              <span className="text-white">{marketStatus.isOpen ? '🕒' : '⏸️'}</span>
            </div>
            <div>
              <p className="font-medium text-gray-800">
                Market is {marketStatus.isOpen ? 'OPEN' : 'CLOSED'}
              </p>
              <p className={`text-sm ${marketStatus.isOpen ? 'text-green-600' : 'text-amber-600'}`}>
                {marketStatus.message} • Ethiopia Time: {EthiopiaTime.formatTime(currentTime)}
              </p>
            </div>
          </div>
          {isSuperAdmin && !marketStatus.isOpen && (
            <span className="px-3 py-1 bg-purple-100 text-purple-800 text-sm font-medium rounded-full">
              ⚡ Override Available
            </span>
          )}
        </div>
      </div>
      
      {/* Admin Quick Actions */}
      <div className="bg-white p-6 rounded-xl shadow border border-gray-200">
        <h3 className="text-lg font-semibold text-gray-800 mb-4">Admin Actions</h3>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <Link 
            to="/admin/ipos"
            className="p-4 border rounded-xl hover:bg-gray-50 text-center transition-all hover:shadow-md hover:border-lime-300 group"
          >
            <div className="text-2xl mb-2 group-hover:scale-110 transition-transform">🏢</div>
            <span className="font-medium text-gray-700">Manage IPOs</span>
          </Link>
          
          <Link 
            to="/admin/kyc-reviews"
            className="p-4 border rounded-xl hover:bg-gray-50 text-center transition-all hover:shadow-md hover:border-blue-300 group"
          >
            <div className="text-2xl mb-2 group-hover:scale-110 transition-transform">👥</div>
            <span className="font-medium text-gray-700">Review KYC</span>
          </Link>
          
          <Link 
            to="/admin/documents"
            className="p-4 border rounded-xl hover:bg-gray-50 text-center transition-all hover:shadow-md hover:border-green-300 group"
          >
            <div className="text-2xl mb-2 group-hover:scale-110 transition-transform">📄</div>
            <span className="font-medium text-gray-700">Upload Documents</span>
          </Link>
          
          <Link 
            to="/admin/commissions"
            className="p-4 border rounded-xl hover:bg-gray-50 text-center transition-all hover:shadow-md hover:border-purple-300 group"
          >
            <div className="text-2xl mb-2 group-hover:scale-110 transition-transform">💳</div>
            <span className="font-medium text-gray-700">Commission</span>
          </Link>
        </div>
      </div>

      {/* SUPER_ADMIN ONLY: Market Hours Override Section */}
      {isSuperAdmin && (
        <div className="mt-8 pt-8 border-t border-gray-200">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h2 className="text-xl font-bold text-gray-800">Super Admin Controls</h2>
              <p className="text-gray-600">System-level overrides and configurations</p>
            </div>
            <span className="px-3 py-1 bg-gradient-to-r from-purple-100 to-indigo-100 text-purple-800 text-sm font-medium rounded-full flex items-center">
              <span className="mr-2">⚡</span>
              Super Admin Only
            </span>
          </div>
          
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Market Hours Override */}
            <MarketHoursOverride />
            
            {/* System Diagnostics */}
            <div className="bg-white border border-gray-300 rounded-xl p-6">
              <h3 className="text-lg font-semibold text-gray-800 mb-4">System Diagnostics</h3>
              <div className="space-y-4">
                <div>
                  <p className="text-sm text-gray-600 mb-2">Server Status</p>
                  <div className="flex items-center space-x-2">
                    <div className="w-3 h-3 bg-green-500 rounded-full animate-pulse"></div>
                    <span className="font-medium text-gray-800">All systems operational</span>
                  </div>
                </div>
                
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <p className="text-sm text-gray-600 mb-2">Active Connections</p>
                    <div className="text-2xl font-bold text-gray-800">142</div>
                  </div>
                  <div>
                    <p className="text-sm text-gray-600 mb-2">API Response</p>
                    <div className="text-2xl font-bold text-green-600">48ms</div>
                  </div>
                </div>
                
                <div className="flex space-x-3">
                  <button className="flex-1 px-4 py-2 bg-gradient-to-r from-lime-500 to-lime-600 text-white text-sm font-medium rounded-lg hover:from-lime-600 hover:to-lime-700">
                    Run Diagnostics
                  </button>
                  <Link 
                    to="/admin/settings"
                    className="flex-1 px-4 py-2 border border-gray-300 text-gray-700 text-sm font-medium rounded-lg hover:bg-gray-50 text-center"
                  >
                    Advanced Settings
                  </Link>
                </div>
              </div>
            </div>
          </div>
          
          {/* Audit Note */}
          <div className="mt-6 p-4 bg-gradient-to-r from-gray-50 to-blue-50 border border-gray-300 rounded-xl">
            <div className="flex items-start space-x-3">
              <span className="text-gray-500 mt-1">📝</span>
              <div>
                <p className="font-medium text-gray-700">Audit Trail Active</p>
                <p className="text-sm text-gray-500">
                  All super admin actions are automatically logged with timestamp, user ID, and IP address.
                  Override actions require additional confirmation and are reviewed weekly.
                </p>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Recent Activity */}
      <div className="bg-white p-6 rounded-xl shadow border border-gray-200">
        <h3 className="text-lg font-semibold text-gray-800 mb-4">Recent Activity</h3>
        <div className="space-y-3">
          <div className="flex items-center justify-between p-3 hover:bg-gray-50 rounded-lg">
            <div className="flex items-center space-x-3">
              <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center">
                <span className="text-blue-600">📋</span>
              </div>
              <div>
                <p className="font-medium text-gray-800">New KYC submission</p>
                <p className="text-sm text-gray-500">5 minutes ago</p>
              </div>
            </div>
            <span className="px-2 py-1 bg-amber-100 text-amber-800 text-xs rounded">Pending</span>
          </div>
          
          <div className="flex items-center justify-between p-3 hover:bg-gray-50 rounded-lg">
            <div className="flex items-center space-x-3">
              <div className="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center">
                <span className="text-green-600">✅</span>
              </div>
              <div>
                <p className="font-medium text-gray-800">IPO subscription processed</p>
                <p className="text-sm text-gray-500">2 hours ago</p>
              </div>
            </div>
            <span className="px-2 py-1 bg-green-100 text-green-800 text-xs rounded">Completed</span>
          </div>
        </div>
        
        <button className="w-full mt-4 px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 font-medium">
          View All Activity
        </button>
      </div>
    </div>
  );
}