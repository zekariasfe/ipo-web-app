// src/app/routes/Dashboard.tsx
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';  // Make sure this path is correct
import { useWallet } from '../../context/WalletContext';

export default function Dashboard() {
    const { user, logout, isKycVerified } = useAuth();  // Destructure user here
    const { wallet, transactions, isLoading: walletLoading } = useWallet();
    const navigate = useNavigate();

    // Calculate recent transactions
    const recentTransactions = transactions.slice(0, 3);

    // If user is loading, show loading state
    if (!user) {
        return (
            <div className="min-h-screen flex items-center justify-center">
                <div className="text-center">
                    <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
                    <p className="mt-4 text-gray-600">Loading user data...</p>
                </div>
            </div>
        );
    }

    return (
        <div className="space-y-6">
            <h2 className="text-2xl font-bold text-gray-800">Dashboard</h2>
            
            {/* Welcome Card */}
            <div className="bg-white p-6 rounded-xl shadow">
                <p className="text-gray-600">
                    Welcome back, <span className="font-semibold">{user.name}</span>!
                </p>
                
                {/* KYC Status Card */}
                <div className="mt-6 p-6 bg-gradient-to-r from-blue-50 to-indigo-50 rounded-lg border">
                    <h3 className="font-semibold text-gray-800 mb-4">KYC Status</h3>
                    <div className="flex items-center justify-between">
                        <div>
                            <p className={`text-lg font-medium ${
                                user.kycStatus === 'verified' ? 'text-green-600' :
                                user.kycStatus === 'pending' ? 'text-yellow-600' :
                                user.kycStatus === 'rejected' ? 'text-red-600' :
                                'text-gray-600'
                            }`}>
                                {user.kycStatus === 'verified' ? '✅ Verified' :
                                 user.kycStatus === 'pending' ? '⏳ Under Review' :
                                 user.kycStatus === 'rejected' ? '❌ Verification Failed' :
                                 '📝 Not Started'}
                            </p>
                            {user.kycVerifiedAt && (
                                <p className="text-sm text-gray-500 mt-1">
                                    Verified on: {new Date(user.kycVerifiedAt).toLocaleDateString()}
                                </p>
                            )}
                        </div>
                        {user.kycStatus !== 'verified' && (
                            <button 
                                onClick={() => navigate('/kyc')}
                                className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 text-sm"
                            >
                                {user.kycStatus === 'pending' ? 'Check Status' : 'Complete KYC'}
                            </button>
                        )}
                    </div>
                </div>

                {/* Wallet Balance */}
                <div className="mt-6 p-6 bg-gradient-to-r from-green-50 to-emerald-50 rounded-lg border">
                    <div className="flex justify-between items-center">
                        <div>
                            <p className="text-sm text-gray-600">Wallet Balance</p>
                            {walletLoading ? (
                                <div className="h-8 w-32 bg-gray-200 rounded animate-pulse mt-1"></div>
                            ) : (
                                <p className="text-3xl font-bold text-gray-900">
                                    ETB {wallet?.balance?.toLocaleString() || '0'}
                                </p>
                            )}
                        </div>
                        <div className="text-right">
                            <p className="text-sm text-gray-600">Account Status</p>
                            <p className={isKycVerified ? 'text-green-600 font-medium' : 'text-amber-600 font-medium'}>
                                {isKycVerified ? '✅ Active' : '⏳ KYC Required'}
                            </p>
                        </div>
                    </div>
                </div>

                {/* Quick Actions */}
                <div className="mt-6 flex flex-wrap gap-3">
                    <button 
                        onClick={() => navigate('/ipos')}
                        className="px-5 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 font-medium"
                    >
                        Browse IPOs
                    </button>
                    {!isKycVerified && (
                        <button 
                            onClick={() => navigate('/kyc')}
                            className="px-5 py-3 bg-amber-100 text-amber-800 rounded-lg hover:bg-amber-200 font-medium"
                        >
                            Complete KYC
                        </button>
                    )}
                    <button
                        onClick={logout}
                        className="px-5 py-3 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 font-medium"
                    >
                        Log Out
                    </button>
                </div>
            </div>

            {/* Recent Activity */}
            <div className="bg-white p-6 rounded-xl shadow">
                <h3 className="font-semibold text-gray-800 mb-4">Recent Activity</h3>
                {recentTransactions.length === 0 ? (
                    <p className="text-gray-500 text-center py-4">No recent transactions</p>
                ) : (
                    <div className="space-y-3">
                        {recentTransactions.map((tx) => (
                            <div key={tx.id} className="flex justify-between items-center p-4 border rounded-lg hover:bg-gray-50">
                                <div>
                                    <p className="font-medium text-gray-900">{tx.description}</p>
                                    <p className="text-sm text-gray-500">
                                        {new Date(tx.timestamp).toLocaleDateString()} • 
                                        <span className={`ml-2 px-2 py-1 rounded-full text-xs ${
                                            tx.status === 'completed' ? 'bg-green-100 text-green-800' :
                                            tx.status === 'pending' ? 'bg-yellow-100 text-yellow-800' :
                                            'bg-red-100 text-red-800'
                                        }`}>
                                            {tx.status}
                                        </span>
                                    </p>
                                </div>
                                <div className="text-right">
                                    <p className={`text-lg font-semibold ${tx.amount > 0 ? 'text-green-600' : 'text-red-600'}`}>
                                        {tx.amount > 0 ? '+' : ''}ETB {Math.abs(tx.amount).toLocaleString()}
                                    </p>
                                </div>
                            </div>
                        ))}
                    </div>
                )}
            </div>

            {/* Quick Stats */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="bg-white p-4 rounded-xl shadow text-center">
                    <p className="text-sm text-gray-600">IPOs Available</p>
                    <p className="text-2xl font-bold text-gray-900">3</p>
                </div>
                <div className="bg-white p-4 rounded-xl shadow text-center">
                    <p className="text-sm text-gray-600">Total Invested</p>
                    <p className="text-2xl font-bold text-gray-900">
                        ETB {transactions
                            .filter(tx => tx.type === 'subscription' && tx.status === 'completed')
                            .reduce((sum, tx) => sum + Math.abs(tx.amount), 0)
                            .toLocaleString()}
                    </p>
                </div>
               
                <div className="bg-white p-4 rounded-xl shadow text-center">
                    <p className="text-sm text-gray-600">Portfolio Value</p>
                    <p className="text-2xl font-bold text-gray-900">
                        ETB {wallet?.balance?.toLocaleString() || '0'}
                    </p>
                </div>
            </div>
        </div>
    );
}