// src/features/admin/components/AdminDashboardStats.tsx
export default function AdminDashboardStats() {
    const stats = {
        totalUsers: 1250,
        activeUsers: 892,
        totalIPOs: 8,
        liveIPOs: 2,
        totalSubscriptions: 2375,
        totalSubscriptionAmount: 272125000,
        pendingKYCs: 45,
        platformRevenue: 1360625
    };

    const formatNumber = (num: number) => {
        if (num >= 1000000) return `ETB ${(num / 1000000).toFixed(1)}M`;
        if (num >= 1000) return `ETB ${(num / 1000).toFixed(0)}K`;
        return `ETB ${num.toLocaleString()}`;
    };

    return (
        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-4">
            <div className="bg-white rounded-xl shadow p-4">
                <p className="text-sm text-gray-600">Total Users</p>
                <p className="text-2xl font-bold text-gray-900">{stats.totalUsers.toLocaleString()}</p>
                <p className="text-xs text-green-600 mt-1">{stats.activeUsers} active</p>
            </div>
            
            <div className="bg-white rounded-xl shadow p-4">
                <p className="text-sm text-gray-600">Total IPOs</p>
                <p className="text-2xl font-bold text-gray-900">{stats.totalIPOs}</p>
                <p className="text-xs text-lime-600 mt-1">{stats.liveIPOs} live</p>
            </div>
            
            <div className="bg-white rounded-xl shadow p-4">
                <p className="text-sm text-gray-600">Subscriptions</p>
                <p className="text-2xl font-bold text-gray-900">{stats.totalSubscriptions.toLocaleString()}</p>
                <p className="text-xs text-gray-500 mt-1">{formatNumber(stats.totalSubscriptionAmount)}</p>
            </div>
            
            <div className="bg-white rounded-xl shadow p-4">
                <p className="text-sm text-gray-600">Pending KYC</p>
                <p className="text-2xl font-bold text-gray-900">{stats.pendingKYCs}</p>
                <button className="text-xs text-lime-600 hover:text-lime-700 font-medium mt-1">
                    Review →
                </button>
            </div>
            
            <div className="bg-white rounded-xl shadow p-4">
                <p className="text-sm text-gray-600">Revenue</p>
                <p className="text-2xl font-bold text-gray-900">{formatNumber(stats.platformRevenue)}</p>
                <p className="text-xs text-green-600 mt-1">+12.5% monthly</p>
            </div>
        </div>
    );
}