// src/app/layout/AppLayout.tsx - COMPLETE VERSION
import { Outlet, Link, useLocation, useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';

export default function AppLayout() {
  const location = useLocation();
  const navigate = useNavigate();
  const { user, logout } = useAuth();
  
  const navItems = [
    { path: '/dashboard', label: 'Dashboard', icon: '📊', description: 'Overview' },
    { path: '/kyc', label: 'KYC', icon: '✅', description: 'Verification' },
    { path: '/ipos', label: 'IPOs', icon: '📈', description: 'Invest' },
    { path: '/portfolio', label: 'Portfolio', icon: '💼', description: 'My Investments' },
    { path: '/transactions', label: 'Transactions', icon: '💳', description: 'History' },
  ];

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-lime-50/30">
      {/* Header */}
      <header className="bg-white shadow-md border-b border-gray-200 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-20">
            {/* Logo & Title */}
            <div className="flex items-center space-x-4">
              <div className="w-12 h-12 bg-gradient-to-br from-lime-600 to-lime-700 rounded-xl flex items-center justify-center shadow-lg">
                <span className="text-white font-bold text-lg">WCIB</span>
              </div>
              <div>
                <h1 className="text-xl font-bold text-gray-900">
                  WCIB IPO Portal
                </h1>
                <p className="text-sm text-gray-600">
                  Capital Markets Platform
                </p>
              </div>
            </div>

            {/* Desktop Navigation */}
            <nav className="hidden lg:flex items-center space-x-1">
              {navItems.map((item) => (
                <Link
                  key={item.path}
                  to={item.path}
                  className={`group flex flex-col items-center px-4 py-3 rounded-xl transition-all duration-200 ${
                    location.pathname === item.path
                      ? 'bg-gradient-to-b from-lime-50 to-white border border-lime-100 shadow-sm'
                      : 'hover:bg-gray-50'
                  }`}
                >
                  <div className={`text-lg mb-1 ${
                    location.pathname === item.path ? 'text-lime-600' : 'text-gray-500'
                  }`}>
                    {item.icon}
                  </div>
                  <div className="text-center">
                    <div className={`text-sm font-semibold ${
                      location.pathname === item.path ? 'text-lime-700' : 'text-gray-700'
                    }`}>
                      {item.label}
                    </div>
                    <div className="text-xs text-gray-500 mt-0.5">
                      {item.description}
                    </div>
                  </div>
                </Link>
              ))}
              
              {/* User Profile & Admin Access */}
              {user && (
                <div className="flex items-center space-x-4 ml-4 pl-4 border-l border-gray-200">
                  {/* Admin Access Badge (if admin) */}
                  {(user.role === 'ADMIN' || user.role === 'SUPER_ADMIN') && (
                    <Link
                      to="/admin"
                      className="flex items-center px-4 py-2 bg-gradient-to-r from-lime-500 to-lime-600 text-white rounded-lg hover:from-lime-600 hover:to-lime-700 shadow-sm"
                    >
                      <span className="mr-2">👑</span>
                      <span className="font-medium text-sm">Admin Panel</span>
                    </Link>
                  )}
                  
                  {/* User Profile Dropdown */}
                  <div className="relative group">
                    <button className="flex items-center space-x-3 p-2 rounded-lg hover:bg-gray-50">
                      <div className="w-10 h-10 bg-gradient-to-br from-lime-100 to-lime-200 rounded-full flex items-center justify-center border-2 border-lime-300">
                        <span className="text-lime-700 font-semibold">
                          {user.name?.charAt(0).toUpperCase() || 'U'}
                        </span>
                      </div>
                      <div className="text-left hidden xl:block">
                        <p className="text-sm font-medium text-gray-900">{user.name}</p>
                        <p className="text-xs text-gray-500 truncate">{user.email}</p>
                      </div>
                      <svg className="w-4 h-4 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                      </svg>
                    </button>
                    
                    {/* Dropdown Menu */}
                    <div className="absolute right-0 mt-2 w-56 bg-white rounded-xl shadow-lg border border-gray-200 py-2 invisible group-hover:visible opacity-0 group-hover:opacity-100 transition-all duration-200 z-50">
                      <div className="px-4 py-3 border-b border-gray-100">
                        <p className="text-sm font-medium text-gray-900">{user.name}</p>
                        <p className="text-xs text-gray-500 truncate">{user.email}</p>
                        <div className={`mt-1 inline-flex items-center px-2 py-1 rounded-full text-xs ${
                          user.role === 'SUPER_ADMIN' ? 'bg-purple-100 text-purple-800' :
                          user.role === 'ADMIN' ? 'bg-lime-100 text-lime-800' :
                          'bg-blue-100 text-blue-800'
                        }`}>
                          {user.role?.replace('_', ' ') || 'User'}
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
                        <Link
                          to="/settings"
                          className="flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-50"
                        >
                          <span className="mr-3">⚙️</span>
                          Settings
                        </Link>
                        <div className="border-t border-gray-100 my-1"></div>
                        <button
                          onClick={handleLogout}
                          className="flex items-center w-full px-4 py-2 text-sm text-red-600 hover:bg-red-50"
                        >
                          <span className="mr-3">🚪</span>
                          Sign Out
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </nav>

            {/* Mobile menu button */}
            <div className="lg:hidden flex items-center space-x-4">
              {user && (
                <div className="w-10 h-10 bg-gradient-to-br from-lime-100 to-lime-200 rounded-full flex items-center justify-center border-2 border-lime-300">
                  <span className="text-lime-700 font-semibold">
                    {user.name?.charAt(0).toUpperCase() || 'U'}
                  </span>
                </div>
              )}
              <button className="p-2 rounded-lg text-gray-700 hover:bg-gray-100">
                <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                </svg>
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* KYC Status Banner (if user hasn't completed KYC) */}
      {user && !user.isKycVerified && user.role === 'USER' && (
        <div className="bg-gradient-to-r from-amber-50 to-yellow-50 border-y border-amber-200">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-3">
                <div className="w-8 h-8 bg-amber-100 rounded-full flex items-center justify-center">
                  <span className="text-amber-600">⚠️</span>
                </div>
                <div>
                  <p className="text-sm font-medium text-amber-800">
                    Complete your KYC verification to start investing in IPOs
                  </p>
                  <p className="text-xs text-amber-600">
                    Required for IPO subscriptions and portfolio access
                  </p>
                </div>
              </div>
              <Link
                to="/kyc"
                className="px-4 py-2 bg-gradient-to-r from-lime-500 to-lime-600 text-white text-sm font-medium rounded-lg hover:from-lime-600 hover:to-lime-700 shadow-sm"
              >
                Start KYC
              </Link>
            </div>
          </div>
        </div>
      )}

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="bg-white/90 backdrop-blur-sm rounded-2xl shadow-lg border border-gray-200/60 p-6 lg:p-8">
          <Outlet />
        </div>
      </main>

      {/* Footer with Lime Green Accents */}
      <footer className="mt-12 border-t border-gray-300 bg-gradient-to-r from-gray-900 to-gray-800 text-white py-8">
        <div className="max-w-7xl mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            {/* Company Info */}
            <div>
              <div className="flex items-center space-x-3 mb-4">
                <div className="w-10 h-10 bg-gradient-to-br from-lime-500 to-lime-600 rounded-lg flex items-center justify-center">
                  <span className="text-white font-bold">WCIB</span>
                </div>
                <div>
                  <h3 className="text-lg font-bold">Wegagen Capital Investment Bank S.C.</h3>
                  <p className="text-lime-300 text-sm">Licensed Capital Markets Operator</p>
                </div>
              </div>
              <p className="text-gray-300 text-sm">
                Your trusted partner for IPO subscriptions, investment banking, 
                and capital market services in Ethiopia.
              </p>
            </div>

            {/* Quick Links */}
            <div>
              <h4 className="font-semibold mb-4 text-lime-100">Quick Links</h4>
              <div className="space-y-2">
                <Link to="/dashboard" className="block text-gray-300 hover:text-lime-300 text-sm">Dashboard</Link>
                <Link to="/ipos" className="block text-gray-300 hover:text-lime-300 text-sm">Browse IPOs</Link>
                <Link to="/portfolio" className="block text-gray-300 hover:text-lime-300 text-sm">My Portfolio</Link>
                <Link to="/kyc" className="block text-gray-300 hover:text-lime-300 text-sm">KYC Verification</Link>
              </div>
            </div>

            {/* Resources */}
            <div>
              <h4 className="font-semibold mb-4 text-lime-100">Resources</h4>
              <div className="space-y-2">
                <a href="#" className="block text-gray-300 hover:text-lime-300 text-sm">IPO Investment Guide</a>
                <a href="#" className="block text-gray-300 hover:text-lime-300 text-sm">Market Insights</a>
                <a href="#" className="block text-gray-300 hover:text-lime-300 text-sm">FAQ & Help Center</a>
                <a href="#" className="block text-gray-300 hover:text-lime-300 text-sm">Risk Disclosure</a>
              </div>
            </div>

            {/* Contact & Regulation */}
            <div>
              <h4 className="font-semibold mb-4 text-lime-100">Regulation & Support</h4>
              <div className="space-y-3">
                <div className="flex items-start space-x-2">
                  <span className="text-lime-300">🏛️</span>
                  <p className="text-gray-300 text-sm">
                    Licensed by Ethiopian Capital Market Authority<br/>
                    Member of Ethiopian Securities Exchange
                  </p>
                </div>
                <div className="flex items-start space-x-2">
                  <span className="text-lime-300">📞</span>
                  <p className="text-gray-300 text-sm">
                    Customer Support: +251 11 5 50 50 50<br/>
                    Email: iposupport@wegagenbank.com
                  </p>
                </div>
                <div className="flex items-center space-x-2">
                  <span className="text-lime-300">🔒</span>
                  <p className="text-gray-300 text-sm">
                    Bank-grade security & encryption
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Bottom Bar */}
          <div className="mt-8 pt-6 border-t border-gray-700">
            <div className="flex flex-col md:flex-row justify-between items-center">
              <div className="text-center md:text-left mb-4 md:mb-0">
                <p className="text-gray-400 text-sm">
                  © {new Date().getFullYear()} Wegagen Capital Investment Bank S.C. All rights reserved.
                </p>
                <p className="text-gray-500 text-xs mt-1">
                  This platform is for authorized IPO subscription services only.
                </p>
              </div>
              <div className="flex items-center space-x-4">
                <span className="text-xs text-gray-400 bg-gray-800 px-3 py-1.5 rounded-full flex items-center">
                  <span className="w-2 h-2 bg-lime-400 rounded-full mr-2"></span>
                  ISO 27001 Certified
                </span>
                <span className="text-xs text-gray-400 bg-gray-800 px-3 py-1.5 rounded-full">
                  v2.1.0 • Production
                </span>
                {user && (
                  <span className="text-xs text-lime-400 bg-lime-900/30 px-3 py-1.5 rounded-full">
                    Logged in as: {user.email.split('@')[0]}
                  </span>
                )}
              </div>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}