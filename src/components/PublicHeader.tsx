// src/components/PublicHeader.tsx
import React from 'react';
import { Link } from 'react-router-dom';

interface PublicHeaderProps {
  showUserMenu?: boolean;
  userName?: string;
  userEmail?: string;
  userRole?: string;
  onLogout?: () => void;
}

export default function PublicHeader({ 
  showUserMenu = false, 
  userName, 
  userEmail, 
  userRole, 
  onLogout 
}: PublicHeaderProps) {
  return (
    <header className="bg-white shadow-md border-b border-gray-200 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          {/* Logo & Title */}
          <div className="flex items-center space-x-4">
            <Link to="/">
              <div className="w-12 h-12 bg-gradient-to-br from-lime-600 to-lime-700 rounded-xl flex items-center justify-center shadow-lg">
                <span className="text-white font-bold text-lg">WCIB</span>
              </div>
            </Link>
            <div>
              <h1 className="text-xl font-bold text-gray-900">
                WCIB IPO Portal
              </h1>
              <p className="text-sm text-gray-600">
                Capital Markets Platform
              </p>
            </div>
          </div>

          {/* Right side - Login/User Menu */}
          <div className="flex items-center space-x-4">
            {showUserMenu && userName ? (
              <>
                {/* Admin Access Badge (if admin) */}
                {(userRole === 'ADMIN' || userRole === 'SUPER_ADMIN') && (
                  <Link
                    to="/admin"
                    className="flex items-center px-4 py-2 bg-gradient-to-r from-lime-500 to-lime-600 text-white rounded-lg hover:from-lime-600 hover:to-lime-700 shadow-sm"
                  >
                    <span className="mr-2">👑</span>
                    <span className="font-medium text-sm">Admin Panel</span>
                  </Link>
                )}
                
                {/* User Profile */}
                <div className="relative group">
                  <button className="flex items-center space-x-3 p-2 rounded-lg hover:bg-gray-50">
                    <div className="w-10 h-10 bg-gradient-to-br from-lime-100 to-lime-200 rounded-full flex items-center justify-center border-2 border-lime-300">
                      <span className="text-lime-700 font-semibold">
                        {userName?.charAt(0).toUpperCase() || 'U'}
                      </span>
                    </div>
                    <div className="text-left hidden xl:block">
                      <p className="text-sm font-medium text-gray-900">{userName}</p>
                      <p className="text-xs text-gray-500 truncate">{userEmail}</p>
                    </div>
                  </button>
                  
                  {/* Dropdown Menu */}
                  <div className="absolute right-0 mt-2 w-56 bg-white rounded-xl shadow-lg border border-gray-200 py-2 invisible group-hover:visible opacity-0 group-hover:opacity-100 transition-all duration-200 z-50">
                    <div className="px-4 py-3 border-b border-gray-100">
                      <p className="text-sm font-medium text-gray-900">{userName}</p>
                      <p className="text-xs text-gray-500 truncate">{userEmail}</p>
                      <div className={`mt-1 inline-flex items-center px-2 py-1 rounded-full text-xs ${
                        userRole === 'SUPER_ADMIN' ? 'bg-purple-100 text-purple-800' :
                        userRole === 'ADMIN' ? 'bg-lime-100 text-lime-800' :
                        'bg-blue-100 text-blue-800'
                      }`}>
                        {userRole?.replace('_', ' ') || 'User'}
                      </div>
                    </div>
                    
                    <div className="py-1">
                      <Link
                        to="/dashboard"
                        className="flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-50"
                      >
                        <span className="mr-3">👤</span>
                        My Profile
                      </Link>
                      {onLogout && (
                        <button
                          onClick={onLogout}
                          className="flex items-center w-full px-4 py-2 text-sm text-red-600 hover:bg-red-50"
                        >
                          <span className="mr-3">🚪</span>
                          Sign Out
                        </button>
                      )}
                    </div>
                  </div>
                </div>
              </>
            ) : (
              <div className="flex items-center space-x-4">
                <Link
                  to="/login"
                  className="px-4 py-2 text-gray-700 hover:text-lime-700 font-medium"
                >
                  Sign In
                </Link>
                <Link
                  to="/register"
                  className="px-4 py-2 bg-gradient-to-r from-lime-500 to-lime-600 text-white rounded-lg hover:from-lime-600 hover:to-lime-700 font-medium shadow-sm"
                >
                  Create Account
                </Link>
              </div>
            )}
          </div>
        </div>
      </div>
    </header>
  );
}